// @flow

import { TouchBar } from 'electron';
import TouchBarBaseItem from './TouchBarBaseItem';
import type IonizeContainer from '../../IonizeContainer';

const { TouchBarButton } = TouchBar;

export default class TouchBarButtonElement extends TouchBarBaseItem {
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
      click: () => this.emitter.emit('click')
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
