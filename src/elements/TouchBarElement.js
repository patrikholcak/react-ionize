// @flow

import {
  TouchBar,
  MenuItem
} from 'electron';

import type IonizeContainer from '../IonizeContainer';
import type { HostContext } from '../IonizeHostConfig';

import BaseElement from './BaseElement';
import TouchBarItemElement from './TouchBarItemElement';
import GenericElement from './GenericElement';

function commitTouchBar(parentWindow: BrowserWindow, touchBarElements: Array<BaseElement>) {
  const touchBar = new TouchBar(touchBarElements.filter(element => element instanceof TouchBarItemElement).map(item => item.button))

  parentWindow.setTouchBar(touchBar)

  return touchBar;
}

export default class TouchBarElement extends BaseElement {
  touchBar: (null | TouchBar);
  touchBarElements: Array<BaseElement>;

  getPublicInstance(): (null | Menu) {
    return this.touchBar;
  }

  constructor(
    props         : Object,
    rootContainer : IonizeContainer,
  ) {
    super(props, rootContainer);
    this.touchBar = null;
    this.touchBarElements = [];
  }

  appendChildBeforeMount(
    child         : (BaseElement)
  ): void {
    if (child instanceof TouchBarItemElement
    ||  child instanceof GenericElement) {
      this.touchBarElements.push(child);
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
    this.touchBar = commitTouchBar(this.parentWindow, this.touchBarElements);
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
    child                 : (BaseElement)
  ): void {
    if (child instanceof TouchBarItemElement
    ||  child instanceof GenericElement) {
      this.touchBarElements.push(child);
    }
  }

  insertBefore(
    child                 : (BaseElement),
    beforeChild           : (BaseElement),
  ): void {
    if (child instanceof TouchBarItemElement
    ||  child instanceof GenericElement) {
      const ix = this.touchBarElements.indexOf(child);
      if (ix !== -1) {
        this.touchBarElements.splice(ix, 1)
      }
      const bIx = this.touchBarElements.indexOf(beforeChild);
      if (bIx === -1) {
        throw new Error('This child does not exist.');
      }
      this.touchBarElements.splice(bIx, 0, child);
    }
  }

  removeChild(
    child                 : (BaseElement),
  ): void {
    const ix = this.touchBarElements.indexOf(child);
    this.touchBarElements.splice(ix, 1);
  }

  commitUpdate(
    updatePayload : Array<mixed>,
    oldProps      : Object,
    newProps      : Object
  ): void {
    this.touchBar = commitTouchBar(this.parentWindow, this.touchBarElements);
  }
}
