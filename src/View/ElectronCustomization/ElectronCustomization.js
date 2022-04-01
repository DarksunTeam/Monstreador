import React from 'react';
import './ElectronCustomization.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWindowMinimize, faWindowMaximize, faWindowClose } from '@fortawesome/free-solid-svg-icons'; //faWindowRestore, 

function ElectronCustomization() {
  if (window && window.process && window.process.type) {
    const ipcRenderer = window.require("electron").ipcRenderer;
    return (
      <div className="container" id="titleBar">
        <div className="row justify-content-end">
          <div className="titlebar-option" id="minimizeButton" onClick={(e) => ipcRenderer.send("minimize")}><FontAwesomeIcon icon={faWindowMinimize} /></div>
          <div className="titlebar-option" id="maximizeButton" onClick={(e) => ipcRenderer.send("maximize")}><FontAwesomeIcon icon={faWindowMaximize} /></div>
          <div className="titlebar-option" id="closeButton" onClick={(e) => ipcRenderer.send("close")}><FontAwesomeIcon icon={faWindowClose} /></div>
        </div>
      </div>
    );
  } else {
    return null
  }
}

export default ElectronCustomization;