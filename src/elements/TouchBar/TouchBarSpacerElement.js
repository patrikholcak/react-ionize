// @flow

import { TouchBar } from 'electron';
import TouchBarBaseItem from './TouchBarBaseItem';
import type IonizeContainer from '../../IonizeContainer';

const { TouchBarSpacer } = TouchBar;

export default class TouchBarSpacerElement extends TouchBarBaseItem {
  constructor(
    props         : Object,
    rootContainer : IonizeContainer,
  ) {
    super(props, rootContainer);

    this.element = new TouchBarSpacer({
      size: props.size
    });
  }

  getSupportedProps(): { [string]: boolean } {
    return {
      size: true
    };
  }
}
