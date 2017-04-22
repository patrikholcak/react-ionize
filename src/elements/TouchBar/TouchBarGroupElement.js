// @flow

import { TouchBar } from 'electron';
import TouchBarBaseGroup from './TouchBarBaseGroup';
import TouchBarBaseItem from './TouchBarBaseItem';

import type { BrowserWindow } from 'electron';
type TouchBarItem = TouchBarBaseItem | TouchBarBaseGroup;

const { TouchBarGroup } = TouchBar;

export default class TouchBarGroupElement extends TouchBarBaseGroup {
  element: (null | TouchBarGroup);
  parentWindow: BrowserWindow;

  getPublicInstance(): (null | TouchBarGroup) {
    return this.element;
  }

  commitMount(
    newProps      : Object
  ) {
    this.setGroup(newProps);
  }

  commitUpdate(
    updatePayload : Array<mixed>,
    oldProps      : Object,
    newProps      : Object
  ): void {
    this.setGroup(newProps);
  }

  setGroup(props: Object) {
    this.element = new TouchBarGroup({
      label: props.label,
      icon: props.icon,
      showCloseButton: props.showCloseButton,
      items: this.items.map((item: TouchBarItem) => item.element)
    });
  }
}
