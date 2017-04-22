// @flow

import { TouchBar } from 'electron';
import TouchBarBaseItem from './TouchBarBaseItem';
import type IonizeContainer from '../../IonizeContainer';

const { TouchBarSlider } = TouchBar;

export default class TouchBarSliderElement extends TouchBarBaseItem {
  constructor(
    props         : Object,
    rootContainer : IonizeContainer,
  ) {
    super(props, rootContainer);

    this.element = new TouchBarSlider({
      label: props.label,
      value: props.value,
      minValue: props.minValue,
      maxValue: props.maxValue,
      change: (value) => this.emitter.emit('change', value)
    });
  }

  getSupportedProps(): { [string]: boolean } {
    return {
      label: true,
      value: true,
      minValue: true,
      maxValue: true,
      onChange: true
    };
  }
}
