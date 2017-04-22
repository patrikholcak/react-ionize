declare module 'electron' {
  declare var dialog: any;

  declare type ElectronApp = {|
    isReady: () => boolean,
    on: (string, Function) => ElectronApp,
    once: (string, Function) => ElectronApp,
    removeListener: (string, Function) => ElectronApp,

    test_makeReady: () => void,
  |};

  declare var app: ElectronApp;

  declare class BrowserWindow {
    on: (string, Function) => BrowserWindow;
    once: (string, Function) => BrowserWindow;
    removeListener: (string, Function) => BrowserWindow;
    removeAllListeners: (string) => BrowserWindow;
    setParentWindow: (?BrowserWindow) => void;
    getParentWindow: () => BrowserWindow;
    show: () => void;
    hide: () => void;
    close: () => void;
    loadURL: (string, ?Object) => void;
    id: number;

    webContents: any; // TODO
    setPosition: (number, number, ?boolean) => void;
    getPosition: () => [number, number];
    setMovable: (boolean) => void;
    setSize: (number, number, ?boolean) => void;
    getSize: () => [number, number];
    setResizable: (boolean) => void;
    setTouchBar: (touchBar: TouchBar) => void;
  }

  declare class Menu {
    static setApplicationMenu: (Menu) => void;
    append: (MenuItem) => void;
  }

  declare class MenuItem {
  }

  declare class TouchBarItem {
    constructor(options?: Object): void;
  }

  declare class TouchBar {
    static TouchBarButton: typeof TouchBarItem;
    static TouchBarColorPicker: typeof TouchBarItem;
    static TouchBarGroup: typeof TouchBarItem;
    static TouchBarLabel: typeof TouchBarItem;
    static TouchBarPopover: typeof TouchBarItem;
    static TouchBarScrubber: typeof TouchBarItem;
    static TouchBarSegmentedControl: typeof TouchBarItem;
    static TouchBarSlider: typeof TouchBarItem;
    static TouchBarSpacer: typeof TouchBarItem;

    constructor(items: Array<TouchBarItem>): void;
    constructor(options: { items: Array<TouchBarItem>, escapeItem?: TouchBarItem }): void;
  }

  declare var ElectronTestUtils: {|
    getWindow: (number) => BrowserWindow,
    getMenu: (number) => Menu,
    getMenuItem: (number) => MenuItem,
    reset: () => void,
  |};


};
