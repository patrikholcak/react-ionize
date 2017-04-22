// @flow

import { TouchBar } from 'electron';
import TouchBarBaseItem from './TouchBarBaseItem';
import type IonizeContainer from '../../IonizeContainer';

const { TouchBarColorPicker } = TouchBar;

export default class TouchBarColorPickerElement extends TouchBarBaseItem {
  constructor(
    props         : Object,
    rootContainer : IonizeContainer,
  ) {
    super(props, rootContainer);

    this.element = new TouchBarColorPicker({
      availableColors: props.availableColors,
      selectedColor: props.selectedColor,
      change: props.onChange
    });
  }

  getSupportedProps(): { [string]: boolean } {
    return {
      availableColors: true,
      selectedColor: true,
      onChange: true
    };
  }
}
