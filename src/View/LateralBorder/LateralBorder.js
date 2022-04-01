import React from '../../../node_modules/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

class LateralBorder extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedButton: props.selectedButton,
      buttons: props.buttons,
      changeSelectedScreen: props.changeSelectedScreen
    };
  }

  handleActiveButton = button => {
    this.setState({ selectedButton: button._id });
    this.state.changeSelectedScreen(button);
  }

  render() {
    let appIcon = "/img/electron-logo.png";
    if (window && window.process && window.process.type) {
      const ipcRenderer = window.require("electron").ipcRenderer;
      appIcon = ipcRenderer.sendSync("isDev") ? "/img/react-logo.png" : "/img/electron-logo.png";
    }

    return (
      <div id="lateralBorder">
        <img id="appIcon" alt="" src={appIcon}></img>
        <div id="menu-buttons">
          <BorderButtons buttons={this.state.buttons} onClick={this.handleActiveButton} selectedButton={this.state.selectedButton} />
        </div>
      </div>
    );
  }
}

class BorderButtons extends React.Component {

  render() {
    const {
      buttons,
      onClick,
      selectedButton
    } = this.props;

    return (
      buttons.map((button, index) =>
        <button key={index} className={selectedButton === button._id ? "menu-button menu-button-selected" : "menu-button"} onClick={() => onClick(button)} >
          <div className="main-text">
            <FontAwesomeIcon icon={button.icon} />
            <br />
            <span>{button.text}</span>
          </div>
        </button>
      )
    )
  }
}

export default LateralBorder;
