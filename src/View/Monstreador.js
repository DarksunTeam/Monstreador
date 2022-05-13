import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import { faGhost, faCommentDots } from '@fortawesome/free-solid-svg-icons';

import './style.css'

import ElectronCustomization from './ElectronCustomization/ElectronCustomization';
import LateralBorder from './LateralBorder/LateralBorder';

import MonstroScreen from './Monstro/MonstroScreen';
import AboutScreen from './About/AboutScreen';
import Entity1Form from './Entity1/Entity1Form';

import FileController from '../Controller/FileController';

class Monstreador extends React.Component {

  constructor(props) {
    super(props);
    const initialScreen = Number(window.localStorage.getItem('selectedScreen') || 1);
    this.state = {
      selectedScreen: initialScreen,
      selectedCard: null,
      fileController: new FileController(),
      buttons: [
        { _id: 1, icon: faGhost, text: "Monstro", card: null },
        { _id: 4, icon: faCommentDots, text: "Sobre", card: null }
      ]
    };
  }

  changeSelectedScreen = button => {
    if (this.state.buttons.forEach(btn => {
      if (btn._id === button._id) {
        window.localStorage.setItem('selectedScreen', button._id)
      }
    }));
    this.setState({ selectedCard: button.card });
    this.setState({ selectedScreen: button._id });
  }

  ScreenSwitch() {
    // eslint-disable-next-line
    this.state.fileController = new FileController();
    switch (this.state.selectedScreen) {
      case 1:
        return <MonstroScreen changeSelectedScreen={this.changeSelectedScreen} fileController={this.state.fileController} />;
      case 4:
        return <AboutScreen />;
      case 5:
        return <Entity1Form changeSelectedScreen={this.changeSelectedScreen} selectedCard={this.state.selectedCard} fileController={this.state.fileController} />
      default:
        return null;
    }
  }

  render() {
    return (
      <div id="content">
        <header>
          <ElectronCustomization />
        </header>
        <div className="container-fluid">
          <div className="row">
            <LateralBorder selectedButton={this.state.selectedScreen} buttons={this.state.buttons} changeSelectedScreen={this.changeSelectedScreen} />
            <div id="workspace">
              {this.ScreenSwitch()}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Monstreador;
