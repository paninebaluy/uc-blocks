import { applyClassNames } from '../../lib/classNames.js';
import { Block } from '../../../../../abstract/Block.js';

const DEFAULT_STYLE = {
  transition: 'transition',
  visible: 'visible',
  hidden: 'hidden',
};

export class PresenceToggle extends Block {
  constructor() {
    super();

    this._visible = false;
    this._visibleStyle = DEFAULT_STYLE.visible;
    this._hiddenStyle = DEFAULT_STYLE.hidden;
    this._externalTransitions = false;

    this.defineAccessor('styles', (styles) => {
      if (!styles) {
        return;
      }
      this._externalTransitions = true;
      this._visibleStyle = styles.visible;
      this._hiddenStyle = styles.hidden;
    });

    this.defineAccessor('visible', (visible) => {
      if (typeof visible !== 'boolean') {
        return;
      }

      this._visible = visible;
      this._handleVisible();
    });
  }

  _handleVisible() {
    this.style.visibility = this._visible ? 'inherit' : 'hidden';
    applyClassNames(this, {
      [DEFAULT_STYLE.transition]: !this._externalTransitions,
      [this._visibleStyle]: this._visible,
      [this._hiddenStyle]: !this._visible,
    });
    this.setAttribute('aria-hidden', this._visible ? 'false' : 'true');
  }

  initCallback() {
    super.initCallback();
    this.setAttribute('hidden', '');

    if (!this._externalTransitions) {
      this.classList.add(DEFAULT_STYLE.transition);
    }

    this._handleVisible();
    setTimeout(() => this.removeAttribute('hidden'), 0);
  }
}
PresenceToggle.template = /*html*/ `
<slot></slot>
`;
