import BaseElement from './BaseElement';
import AppElement from './AppElement';
import WindowElement from './WindowElement';
import GenericElement from './GenericElement';
import TextElement from './TextElement';
import MenuElement from './MenuElement';
import SubmenuElement from './SubmenuElement';
import {
  SeparatorElement,
  RoleMenuItemElement,
  CustomMenuItemElement,
  isRoleMenuItemType,
} from './MenuItemElement';

// TouchBar
import TouchBarElement from './TouchBar/TouchBarElement';
import TouchBarButton from './TouchBar/TouchBarButtonElement';
import TouchBarLabel from './TouchBar/TouchBarLabelElement';
import TouchBarSpacer from './TouchBar/TouchBarSpacerElement';
import TouchBarColorPicker from './TouchBar/TouchBarColorPickerElement';
import TouchBarGroup from './TouchBar/TouchBarGroupElement';
import TouchBarSlider from './TouchBar/TouchBarSliderElement';
import TouchBarPopover from './TouchBar/TouchBarPopoverElement';

export {
  BaseElement,
  AppElement,
  WindowElement,
  GenericElement,
  TextElement,
  MenuElement,
  SubmenuElement,
};

export function createElectronInstance(
  type      : string,
  props     : Object,
  container : IonizeContainer,
  context   : HostContext,
): BaseElement {
  switch (type) {
    case 'app': {
      return new AppElement(props, container);
    }
    case 'window': {
      return new WindowElement(props, container);
    }
    case 'menu': {
      return new MenuElement(props, container);
    }
    case 'submenu': {
      return new SubmenuElement(props, container);
    }
    case 'sep': {
      return new SeparatorElement(props, container);
    }
    case 'item': {
      return new CustomMenuItemElement(props, container);
    }
    case 'touchBar': {
      return new TouchBarElement(props, container);
    }
    case 'touchBarButton': {
      return new TouchBarButton(props, container);
    }
    case 'touchBarColorPicker': {
      return new TouchBarColorPicker(props, container);
    }
    case 'touchBarGroup': {
      return new TouchBarGroup(props, container);
    }
    case 'touchBarPopover': {
      return new TouchBarPopover(props, container);
    }
    case 'touchBarLabel': {
      return new TouchBarLabel(props, container);
    }
    case 'touchBarSlider': {
      return new TouchBarSlider(props, container);
    }
    case 'touchBarSpacer': {
      return new TouchBarSpacer(props, container);
    }
    default: {
      if (isRoleMenuItemType(type)) {
        return new RoleMenuItemElement(type, props, container);
      } else {
        return new GenericElement(type, props, container);
      }
    }
  }
};
