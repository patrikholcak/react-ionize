import React from 'react';
import Ionize from 'react-ionize';
import path from 'path';

import 'index.html';

class ExampleApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      size: [300, 300],
      position: [100, 100],
      title: 'Click me!',
      background: null
    };
  }

  render() {
    return <app>
      <menu>
        <submenu label="Electron">
          <about />
          <sep />
          <forcereload />
          <quit />
        </submenu>
        <submenu label="Custom Menu">
          <item label="Foo the bars" />
          <sep />
          <item label="Baz the quuxes" />
        </submenu>
      </menu>
      <window
        file={path.resolve(__dirname, "index.html")}
        show={this.state.show}
        size={this.state.size}
        position={this.state.position}
        onReadyToShow={() => this.setState({ show: true })}
        onResize={size => this.setState({ size })}
        onMoved={position => this.setState({ position })}
      >
        <touchBar>
          <touchBarButton
            label={this.state.title}
            backgroundColor={this.state.background}
            onClick={() => this.setState({ title: 'Clicked!' })}
          />

          <touchBarPopover label="Popover" showCloseButton={false}>
            <touchBarButton label="Btn 1" />
            <touchBarButton label="Btn 2" />
            <touchBarButton label="Btn 3" />
          </touchBarPopover>

          <touchBarGroup>
            <touchBarButton label="Btn 1" />
            <touchBarButton label="Btn 2" />
            <touchBarButton label="Btn 3" />
          </touchBarGroup>

          <touchBarSpacer size="flexible" />

          <touchBarLabel
            label="Label"
            textColor="red"
          />

          <touchBarColorPicker
            availableColors={["#fff", "#000"]}
            selectedColor="#000"
            onChange={(color: string) => console.log('Selected color:', color)}
          />

        </touchBar>
      </window>
    </app>
  }
}

Ionize.start(
  <ExampleApp />
);
