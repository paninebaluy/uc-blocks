import { Block } from '../../abstract/Block.js';

export class DataOutput extends Block {
  init$ = {
    '*outputItemTemplate': null,
  };

  /** @private */
  _dataSubs = new Set();

  /**
   * @param {String} name
   * @param {String} type
   * @param {any} data
   */
  notifyHost(name, type, data) {
    if (this.hasAttribute(DataOutput.fireEventAttrName)) {
      this.dispatchEvent(
        new CustomEvent(name, {
          bubbles: true,
          composed: true,
          detail: {
            timestamp: Date.now(),
            type,
            ctxName: this.ctxName,
            data,
          },
        })
      );
    }
    if (this.hasAttribute(DataOutput.consoleAttrName)) {
      console.log(data);
    }
    if (this.hasAttribute(DataOutput.formValueAttrName)) {
      if (!this._input) {
        /** @private */
        this._input = document.createElement('input');
        this._input.type = 'text';
        this.appendChild(this._input);
      }
      this._input.value = JSON.stringify(data);
    }
  }

  renderItems() {
    if (!this.$['*outputItemTemplate'] || !this.files?.length) {
      return;
    }
    let html = '';
    this.files.forEach((fileItem) => {
      /** @type {String} */
      let itemHtml = this.$['*outputItemTemplate'];
      for (let prop in fileItem) {
        itemHtml = itemHtml.split(`{{${prop}}}`).join(fileItem[prop]);
      }
      html += itemHtml;
    });
    this.innerHTML = html;
  }

  initCallback() {
    let from = this.getAttribute('from') || DataOutput.defaultFrom;
    /** @type {import('../../abstract/OutputDataMngr.js').OutputDataMngr} */
    this.data = this.$[from];

    this._dataSubs.add(
      this.data.sub('files', (files) => {
        /** @type {import('../../submodules/upload-client/upload-client.js').UploadcareFile[]} */
        this.files = files;
        if (!files) {
          this.innerHTML = '';
          return;
        }
        this.notifyHost(DataOutput.outputEventName, 'files', files);
      })
    );

    this._dataSubs.add(
      this.data.sub('groupUuid', (uuid) => {
        /** @type {String} */
        this.groupUuid = uuid;
        if (!uuid) {
          return;
        }
        this.notifyHost(DataOutput.outputEventName, 'groupUuid', uuid);
      })
    );
  }

  destroyCallback() {
    this._dataSubs.forEach((sub) => {
      sub.remove();
    });
    this._dataSubs = null;
  }
}

DataOutput.outputEventName = 'data-output';
DataOutput.fireEventAttrName = 'fire-event';
DataOutput.consoleAttrName = 'console';
DataOutput.formValueAttrName = 'form-value';
DataOutput.defaultFrom = '*outputData';
