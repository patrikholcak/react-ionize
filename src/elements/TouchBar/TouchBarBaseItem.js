// @flow

import IonizeContainer from '../../IonizeContainer';
import BaseElement from '../BaseElement';
import configureWrappedEventHandler from '../../util/configureWrappedEventHandler';
import EventEmitter from 'events';

import type { TouchBarItem } from 'electron';

export default class TouchBarBaseItem extends BaseElement {
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
    const supportedProps = this.getSupportedProps();

    for (const prop in newProps) {
      switch (prop) {
        case 'onClick':
        case 'onChange':
          if (!supportedProps[prop]) break;

          const propVal = ((newProps[prop]: any): Function);

          configureWrappedEventHandler(
            this.emitter,
            this.attachedHandlers,
            prop,
            prop.replace(/^on/, '').toLowerCase(),
            propVal,
            (rawHandler) => rawHandler()
          );
        default:
          // $FlowFixMe
          this.element[prop] = newProps[prop]
          break;
      }
    }
  }
}
