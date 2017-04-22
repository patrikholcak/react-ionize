// @flow

import {
  TouchBar,
  MenuItem
} from 'electron';

import type IonizeContainer from '../../IonizeContainer';
import type { HostContext } from '../../IonizeHostConfig';
import type { BrowserWindow } from 'electron';

import BaseElement from '../BaseElement';
import TextElement from '../TextElement';
import TouchBarItemElement from './TouchBarItemElement';
import GenericElement from '../GenericElement';

function commitTouchBar(parentWindow: BrowserWindow, items: Array<TouchBarItemElement>, escapeItem?: TouchBarItemElement) {
  const touchBar = new TouchBar({
    // escapeItem: escapeItem.element,
    items: items.map(item => item.element)
  });

  parentWindow.setTouchBar(touchBar);

  return touchBar;
}

export default class TouchBarElement extends BaseElement {
  element: (null | TouchBar);
  items: Array<TouchBarItemElement>;
  parentWindow: BrowserWindow;

  getPublicInstance(): (null | TouchBar) {
    return this.element;
  }

  constructor(
    props         : Object,
    rootContainer : IonizeContainer,
  ) {
    super(props, rootContainer);
    this.element = null;
    this.items = [];
  }

  getSupportedProps(): { [string]: boolean } {
    return {
      escapeItem: true
    };
  }

  appendChildBeforeMount(
    child         : (BaseElement | TextElement)
  ): void {
    if (child instanceof TouchBarItemElement) {
      this.items.push(child);
    }
  }

  finalizeBeforeMount(
    type          : string,
    props         : Object
  ): boolean {
    return true;
  }

  commitMount(
    newProps      : Object
  ) {
    this.element = commitTouchBar(this.parentWindow, this.items, newProps.escapeItem);
  }

  prepareUpdate(
    oldProps              : Object,
    newProps              : Object,
    rootContainerInstance : IonizeContainer
  ): null | Array<mixed> {
    let updatePayload: (null | Array<mixed>) = ['forceCommit', true];
    return updatePayload;
  }

  appendChild(
    child                 : (BaseElement | TextElement)
  ): void {
    if (child instanceof TouchBarItemElement) {
      this.items.push(child);
    }
  }

  insertBefore(
    child                 : (BaseElement | TextElement),
    beforeChild           : (BaseElement | TextElement),
  ): void {
    if (child instanceof TouchBarItemElement) {
      const ix = this.items.indexOf(child);
      if (ix !== -1) {
        this.items.splice(ix, 1)
      }
      const bIx = this.items.indexOf(((beforeChild: any): TouchBarItemElement));
      if (bIx === -1) {
        throw new Error('This child does not exist.');
      }
      this.items.splice(bIx, 0, child);
    }
  }

  removeChild(
    child                 : (BaseElement | TextElement),
  ): void {
    const ix = this.items.indexOf(((child: any): TouchBarItemElement));
    this.items.splice(ix, 1);
  }

  commitUpdate(
    updatePayload : Array<mixed>,
    oldProps      : Object,
    newProps      : Object
  ): void {
    // TODO: Re-render only when children change, set escapeItem
    this.element = commitTouchBar(this.parentWindow, this.items);
  }
}
