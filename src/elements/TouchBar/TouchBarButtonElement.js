// @flow

import { TouchBar } from 'electron';
import TouchBarItemElement from './TouchBarItemElement';
import type IonizeContainer from '../../IonizeContainer';

const { TouchBarButton } = TouchBar;

export default class TouchBarButtonElement extends TouchBarItemElement {
  constructor(
    props         : Object,
    rootContainer : IonizeContainer,
  ) {
    super(props, rootContainer);

    this.element = new TouchBarButton({
      label: props.label,
      backgroundColor: props.backgroundColor,
      icon: props.icon,
      iconPosition: props.icon,
      click: (menuItem, browserWindow, event) => {
        this.emitter.emit('click', event);
      }
    });
  }

  getSupportedProps(): { [string]: boolean } {
    return {
      label: true,
      backgroundColor: true,
      icon: true,
      iconPosition: true,
      onClick: true
    };
  }
}
