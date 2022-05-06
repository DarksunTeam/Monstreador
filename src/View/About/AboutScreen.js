import React from '../../../node_modules/react';

import './AboutScreen.css'

class AboutScreen extends React.Component {

    render() {
        let appIcon = "/img/monstreador-logo.png";
        if (window && window.process && window.process.type) {
            const ipcRenderer = window.require("electron").ipcRenderer;
            appIcon = ipcRenderer.sendSync("isDev") ? "/img/monstreador-dev-logo.png" : "/img/monstreador-logo.png";
        }
        return (
            <div className="col">
                <img id="centerIcon" alt="" src={appIcon}></img>
                <div >
                    <h1>Monstreador</h1>
                    <h3>Uma aplicação para criação de monstros de RPG</h3>
                    <h6>Criador: Marcos "Coppola" Gonçalves (Coppolaop)</h6>
                    <h6>Repositório: github.com/coppolaop/ElectronReactTemplate</h6>
                    <h6><br/></h6>
                    <h6>Product Owner: Marcos "Coppola" Gonçalves (Coppolaop)</h6>
                    <h6>Scrum Master: Vitor Abel (vitor-abel)<h6>
                    </h6>Desenvolvedores:</h6>
                    <h6>Igor Huayck (Flaigor), Phillipe Ramos (PhillipeRamos) e Vitor Abel (vitor-abel)</h6>
                </div>
                <div className="version">
                    <h6>Versão 1.0.0</h6>
                </div>
            </div>
        );
    }
}

export default AboutScreen;