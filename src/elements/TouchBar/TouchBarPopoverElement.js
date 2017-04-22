// @flow

import { TouchBar } from 'electron';
import TouchBarBaseGroup from './TouchBarBaseGroup';
import TouchBarBaseItem from './TouchBarBaseItem';

type TouchBarItem = TouchBarBaseItem | TouchBarBaseGroup;

const { TouchBarPopover } = TouchBar;

export default class TouchBarPopoverElement extends TouchBarBaseGroup {
  element: (null | TouchBarPopover);

  getPublicInstance(): (null | TouchBarPopover) {
    return this.element;
  }

  commitMount(
    newProps      : Object
  ) {
    this.setPopover(newProps);
  }

  commitUpdate(
    updatePayload : Array<mixed>,
    oldProps      : Object,
    newProps      : Object
  ): void {
    this.setPopover(newProps);
  }

  setPopover(props: Object) {
    this.element = new TouchBarPopover({
      label: props.label,
      icon: props.icon,
      showCloseButton: props.showCloseButton,
      items: this.items.map((item: TouchBarItem) => item.element)
    });
  }
}
