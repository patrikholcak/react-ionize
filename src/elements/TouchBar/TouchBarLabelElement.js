// @flow

import { TouchBar } from 'electron';
import TouchBarBaseItem from './TouchBarBaseItem';
import type IonizeContainer from '../../IonizeContainer';

const { TouchBarLabel } = TouchBar;

export default class TouchBarLabelElement extends TouchBarBaseItem {
  constructor(
    props         : Object,
    rootContainer : IonizeContainer,
  ) {
    super(props, rootContainer);

    this.element = new TouchBarLabel({
      label: props.label,
      textColor: props.textColor
    });
  }

  getSupportedProps(): { [string]: boolean } {
    return {
      label: true,
      textColor: true
    };
  }
}
