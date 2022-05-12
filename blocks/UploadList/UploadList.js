import { Block } from '../../abstract/Block.js';
import { FileItem } from '../FileItem/FileItem.js';
import { UiConfirmation } from '../ConfirmationDialog/ConfirmationDialog.js';

/**
 * @typedef {Partial<import('../FileItem/FileItem.js').State> &
 *   Partial<import('../ActivityIcon/ActivityIcon.js').State> &
 *   Partial<import('../ActivityCaption/ActivityCaption.js').State>} ExternalState
 */

/**
 * @typedef {{
 *   doneBtnHidden: Boolean;
 *   uploadBtnHidden: Boolean;
 *   uploadBtnDisabled: Boolean;
 *   hasFiles: Boolean;
 *   moreBtnDisabled: Boolean;
 *   onAdd: () => void;
 *   onUpload: () => void;
 *   onDone: () => void;
 *   onCancel: () => void;
 * }} State
 */

/** @extends {Block<State & ExternalState>} */
export class UploadList extends Block {
  activityType = Block.activities.UPLOAD_LIST;

  /** @type {State} */
  init$ = {
    doneBtnHidden: true,
    uploadBtnHidden: false,
    uploadBtnDisabled: false,
    hasFiles: false,
    moreBtnDisabled: true,
    onAdd: () => {
      this.initFlow(true);
    },
    onUpload: () => {
      this.set$({
        uploadBtnHidden: false,
        doneBtnHidden: true,
        uploadBtnDisabled: true,
        '*uploadTrigger': {},
      });
    },
    onDone: () => {
      this.set$({
        '*currentActivity': this.doneActivity || '',
      });
      this.setForCtxTarget('uc-modal', '*modalActive', false);
      this.output();
    },
    onCancel: () => {
      let cfn = new UiConfirmation();
      cfn.confirmAction = () => {
        this.cancelFlow();
        this.uploadCollection.clearAll();
        this.output();
      };
      cfn.denyAction = () => {
        this.historyBack();
      };
      this.$['*confirmation'] = cfn;
    },
  };

  /** @private */
  _renderMap = Object.create(null);

  updateButtonsState() {
    let itemIds = this.uploadCollection.items();
    let summary = {
      total: itemIds.length,
      uploaded: 0,
      uploading: 0,
    };
    for (let id of itemIds) {
      let item = this.uploadCollection.read(id);
      if (item.getValue('uuid')) {
        summary.uploaded += 1;
      } else if (item.getValue('isUploading')) {
        summary.uploading += 1;
      }
    }
    let allUploaded = summary.total === summary.uploaded;
    this.set$({
      uploadBtnHidden: allUploaded,
      doneBtnHidden: !allUploaded,
      uploadBtnDisabled: summary.uploading > 0,
    });

    if (!this.$['*--cfg-confirm-upload'] && allUploaded) {
      this.$.onDone();
    }
  }

  initCallback() {
    super.initCallback();

    this.bindCssData('--cfg-show-empty-list');

    this.registerActivity(this.activityType, () => {
      this.set$({
        '*activityCaption': this.l10n('selected'),
        '*activityIcon': 'local',
      });
    });

    this.sub('*--cfg-multiple', (val) => {
      this.$.moreBtnDisabled = !val;
    });

    this.uploadCollection.observe(() => {
      this.updateButtonsState();
    });

    this.sub('*uploadList', (/** @type {String[]} */ list) => {
      if (list?.length === 0 && !this.$['*--cfg-show-empty-list']) {
        this.cancelFlow();
        this.ref.files.innerHTML = '';
        return;
      }

      this.updateButtonsState();
      this.set$({
        hasFiles: list.length > 0,
      });

      list.forEach((id) => {
        if (!this._renderMap[id]) {
          let item = new FileItem();
          this._renderMap[id] = item;
        }
      });

      for (let id in this._renderMap) {
        if (!list.includes(id)) {
          this._renderMap[id].remove();
          delete this._renderMap[id];
        }
      }

      let fr = document.createDocumentFragment();
      Object.values(this._renderMap).forEach((el) => fr.appendChild(el));
      this.ref.files.replaceChildren(fr);
      Object.keys(this._renderMap).forEach((id) => {
        /** @type {Block} */
        let el = this._renderMap[id];
        // rendering components async improves initial list render time a bit
        setTimeout(() => {
          el['entry-id'] = id;
          if (!el.innerHTML) {
            el.render();
          }
        });
      });
      this.setForCtxTarget('uc-modal', '*modalActive', true);
    });
  }
}

UploadList.template = /*html*/ `
<div class="no-files" set="@hidden: hasFiles">
  <slot name="empty"><span l10n="no-files"></span></slot>
</div>
<div class="files" ref="files"></div>
<div class="toolbar">
  <button
    class="cancel-btn secondary-btn"
    set="onclick: onCancel;"
    l10n="clear"></button>
  <div></div>
  <button
    class="add-more-btn secondary-btn"
    set="onclick: onAdd; @disabled: moreBtnDisabled"
    l10n="add-more"></button>
  <button
    class="upload-btn primary-btn"
    set="@hidden: uploadBtnHidden; onclick: onUpload; @disabled: uploadBtnDisabled"
    l10n="upload"></button>
  <button
    class="done-btn primary-btn"
    set="@hidden: doneBtnHidden; onclick: onDone"
    l10n="done"></button>
</div>
`;
