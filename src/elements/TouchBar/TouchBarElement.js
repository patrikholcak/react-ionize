// @flow

import { TouchBar } from 'electron';
import TouchBarBaseGroup from './TouchBarBaseGroup';
import TouchBarBaseItem from './TouchBarBaseItem';

import type { HostContext } from '../../IonizeHostConfig';
import type { BrowserWindow } from 'electron';

type TouchBarItem = TouchBarBaseItem | TouchBarBaseGroup;

export default class TouchBarElement extends TouchBarBaseGroup {
  element: (null | TouchBar);
  parentWindow: BrowserWindow;

  getPublicInstance(): (null | TouchBar) {
    return this.element;
  }

  getSupportedProps(): { [string]: boolean } {
    return {
      escapeItem: true
    };
  }

  commitMount(
    newProps      : Object
  ) {
    this.setTouchBar();
  }

  commitUpdate(
    updatePayload : Array<mixed>,
    oldProps      : Object,
    newProps      : Object
  ): void {
    // TODO: Re-render only when children change, set escapeItem
    this.setTouchBar();
  }

  setTouchBar() {
    const touchBar = new TouchBar({
      // escapeItem: escapeItem.element,
      items: this.items.map((item: TouchBarItem) => item.element)
    });

    this.parentWindow.setTouchBar(touchBar);

    this.element = touchBar;
  }
}
