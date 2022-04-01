import React from '../../../node_modules/react';

import './AboutScreen.css'

class AboutScreen extends React.Component {

    render() {
        let appIcon = "/img/electron-logo.png";
        if (window && window.process && window.process.type) {
            const ipcRenderer = window.require("electron").ipcRenderer;
            appIcon = ipcRenderer.sendSync("isDev") ? "/img/react-logo.png" : "/img/electron-logo.png";
        }
        return (
            <div className="col">
                <img id="centerIcon" alt="" src={appIcon}></img>
                <div >
                    <h1>ElectronReactTemplate</h1>
                    <h3>A template of an electron application using react</h3>
                    <h6>Criador: Marcos "Coppola" Gonçalves (Coppolaop)</h6>
                    <h6>Repositório: github.com/coppolaop/ElectronReactTemplate</h6>
                </div>
                <div className="version">
                    <h6>Versão 1.0.0</h6>
                </div>
            </div>
        );
    }
}

export default AboutScreen;