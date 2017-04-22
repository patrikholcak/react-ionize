// @flow

import BaseElement from '../BaseElement';
import TextElement from '../TextElement';
import TouchBarBaseItem from './TouchBarBaseItem';
import type IonizeContainer from '../../IonizeContainer';

type TouchBarItem = TouchBarBaseItem | TouchBarBaseGroup;

export default class TouchBarBaseGroup extends BaseElement {
  element: any;
  items: Array<TouchBarItem>;

  constructor(
    props         : Object,
    rootContainer : IonizeContainer,
  ) {
    super(props, rootContainer);
    this.element = null;
    this.items = [];
  }

  getPublicInstance(): any {
    return this.element;
  }

  appendChildBeforeMount(
    child         : (BaseElement | TextElement)
  ): void {
    if (child instanceof TouchBarBaseItem
    ||  child instanceof TouchBarBaseGroup) {
      this.items.push(child);
    }
  }

  finalizeBeforeMount(
    type          : string,
    props         : Object
  ): boolean {
    return true;
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
    if (child instanceof TouchBarBaseItem
    ||  child instanceof TouchBarBaseGroup) {
      this.items.push(child);
    }
  }

  insertBefore(
    child                 : (BaseElement | TextElement),
    beforeChild           : (BaseElement | TextElement),
  ): void {
    if (child instanceof TouchBarBaseItem
    ||  child instanceof TouchBarBaseGroup) {
      const ix = this.items.indexOf(child);
      if (ix !== -1) {
        this.items.splice(ix, 1)
      }
      const bIx = this.items.indexOf(((beforeChild: any): TouchBarItem));
      if (bIx === -1) {
        throw new Error('This child does not exist.');
      }
      this.items.splice(bIx, 0, child);
    }
  }

  removeChild(
    child                 : (BaseElement | TextElement),
  ): void {
    const ix = this.items.indexOf(((child: any): TouchBarItem));
    this.items.splice(ix, 1);
  }
}
