// @flow

import { TouchBar } from 'electron';
import type IonizeContainer from '../IonizeContainer';
import type { HostContext } from '../IonizeHostConfig';
import EventEmitter from 'events';

import BaseElement from './BaseElement';
import TextElement from './TextElement';
import configureWrappedEventHandler from '../util/configureWrappedEventHandler';

const { TouchBarButton } = TouchBar;

export class TouchBarElement extends BaseElement {
  button: TouchBarButton;
  getPublicInstance(): TouchBarButton {
    return this.button;
  };
}

const SUPPORTED_PROPS = {
  label: true,
  onClick: true
};

export default class TouchBarItemElement extends TouchBarElement {
  emitter: EventEmitter;
  attachedHandlers: { [string]: Function };

  constructor(
    props         : Object,
    rootContainer : IonizeContainer,
  ) {
    super(props, rootContainer);
    this.attachedHandlers = {};
    this.emitter = new EventEmitter();
    this.button = new TouchBarButton({
      label: props.label,
      click: (menuItem, browserWindow, event) => {
        this.emitter.emit('click', event);
      }
    });
  }

  finalizeBeforeMount(
    type          : string,
    props         : Object,
  ): boolean {
    if (props.onClick) {
      configureWrappedEventHandler(
        this.emitter,
        this.attachedHandlers,
        'onClick',
        'click',
        props.onClick,
        (rawHandler) => rawHandler()
      );
    }
    return false;
  }

  getSupportedProps(): { [string]: boolean } {
    return SUPPORTED_PROPS;
  }

  commitUpdate(
    updatePayload : Array<mixed>,
    oldProps      : Object,
    newProps      : Object
  ): void {
    for (let i = 0; i < updatePayload.length; i += 2) {
      let propKey = ((updatePayload[i]: any): string);
      let propVal = updatePayload[i+1];
      switch (propKey) {
        case 'onClick': {
          propVal = ((propVal: any): Function);
          configureWrappedEventHandler(
            this.emitter,
            this.attachedHandlers,
            'onClick',
            'click',
            propVal,
            (rawHandler) => rawHandler()
          );
          break;
        }
      }
    }

    this.button = new TouchBarButton({
      label: newProps.label,
      click: (menuItem, browserWindow, event) => {
        this.emitter.emit('click', event);
      }
    });
  }
}
