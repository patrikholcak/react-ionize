// @flow

import IonizeContainer from '../../IonizeContainer';
import BaseElement from '../BaseElement';
import configureWrappedEventHandler from '../../util/configureWrappedEventHandler';
import EventEmitter from 'events';

import type { TouchBarItem } from 'electron';

export default class TouchBarItemElement extends BaseElement {
  element: TouchBarItem;
  attachedHandlers: { [string]: Function };
  emitter: EventEmitter;

  constructor(
    props         : Object,
    rootContainer : IonizeContainer,
  ) {
    super(props, rootContainer);

    this.attachedHandlers = {};
    this.emitter = new EventEmitter();
  }

  getPublicInstance(): TouchBarItem {
    return this.element;
  };

  finalizeBeforeMount(
    type          : string,
    props         : Object,
  ): boolean {
    const supportedProps = this.getSupportedProps();

    if (props.onClick && supportedProps.onClick) {
      configureWrappedEventHandler(
        this.emitter,
        this.attachedHandlers,
        'onClick',
        'click',
        props.onClick,
        (rawHandler) => rawHandler()
      );
    }

    if (props.onChange && supportedProps.onChange) {
      configureWrappedEventHandler(
        this.emitter,
        this.attachedHandlers,
        'onChange',
        'change',
        props.onChange,
        (rawHandler) => rawHandler()
      );
    }
    return false;
  }

  commitUpdate(
    updatePayload : Array<mixed>,
    oldProps      : Object,
    newProps      : Object
  ): void {
    for (let i = 0; i < updatePayload.length; i += 2) {
      const supportedProps = this.getSupportedProps();
      const propKey = ((updatePayload[i]: any): string);
      let propVal = updatePayload[i+1];

      switch (propKey) {
        case 'onClick': {
          if (!supportedProps.onClick) break;

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
        case 'onChange': {
          if (!supportedProps.onChange) break;

          propVal = ((propVal: any): Function);
          configureWrappedEventHandler(
            this.emitter,
            this.attachedHandlers,
            'onChange',
            'change',
            propVal,
            (rawHandler) => rawHandler()
          );
          break;
        }
        default: {
          // $FlowFixMe
          this.element[propKey] = propVal
          break;
        }
      }
    }
  }
}
