import { uploadFileGroup } from '../submodules/upload-client/upload-client.js';

export class OutputDataMngr {
  /**
   * @param {String} pubkey
   * @param {Boolean} useGroup
   */
  constructor(pubkey, useGroup) {
    this.pubkey = pubkey;
    this.useGroup = useGroup;
  }

  /** @private */
  _cbMap = {};

  /** @param {import('../submodules/upload-client/upload-client.js').UploadcareFile[]} val */
  set files(val) {
    /** @private */
    this._files = val;
    if (this.useGroup) {
      let idArr = this._files.map((ucFile) => {
        return ucFile.uuid;
      });
      uploadFileGroup(idArr, {
        publicKey: this.pubkey,
      }).then((group) => {
        this.groupUuid = group.uuid;
      });
    }
    this._cbMap.files.forEach((cb) => {
      cb(this._files);
    });
  }

  get files() {
    return this._files;
  }

  /** @param {String} val */
  set groupUuid(val) {
    /** @private */
    this._groupUuid = val;
    this._cbMap.groupUuid.forEach((cb) => {
      cb(this._groupUuid);
    });
  }

  get groupUuid() {
    return this._groupUuid;
  }

  /**
   * @param {String} fieldName
   * @param {(val: any) => void} callback
   */
  sub(fieldName, callback) {
    if (!this._cbMap[fieldName]) {
      this._cbMap[fieldName] = new Set();
    }
    this._cbMap[fieldName].add(callback);
    return {
      remove: () => {
        this._cbMap[fieldName].delete(callback);
      },
    };
  }
}
