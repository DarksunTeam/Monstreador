import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

import Monstro from '../../Model/Monstro';
import './MonstroForm.css';

class MonstroForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fileController: props.fileController,
            monstro: props.fileController.get('Monstro', props.selectedCard._id)
        };
        if (this.state.monstro != null) {
            this.baseState = JSON.parse(JSON.stringify(this.state.monstro));
        } else {
            this.state.monstro = new Monstro(this.state.fileController.getNewId('Monstro'), '', [], '', '');
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleReset = this.handleReset.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
    }

    handleInputChange(event) {
        const target = event.target;
        let value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        let monstro = this.state.monstro;
        monstro[name] = value;

        if (name === 'nome') {
            monstro.fileName = monstro.nome.normalize("NFD").replace(/[^\d\w]/g, "") + '.json';
        }

        this.setState({
            monstro: monstro
        });
    }

    handleTagInputChange(type, itens) {
        let monstro = this.state.monstro;
        monstro[type] = itens;
        this.setState({
            monstro: monstro
        });
    }

    handleSubmit() {
        if (this.baseState != null) {
            this.state.fileController.removeObject('Monstro', this.baseState.fileName);
        }
        this.state.fileController.setObject('Monstro', this.state.monstro);
    }

    handleReset(event) {
        this.setState({ monstro: JSON.parse(JSON.stringify(this.baseState)) });
        event.preventDefault();
    }

    handleDelete(event) {
        let confirmed = true;
        if (window && window.process && window.process.type) {
            const ipcRenderer = window.require("electron").ipcRenderer;
            confirmed = ipcRenderer.sendSync("dialog");
        }
        if (confirmed) {
            if (this.baseState != null) {
                this.state.fileController.removeObject('Monstro', this.baseState.fileName);
            }
            this.state.fileController.removeObject('Monstro', this.state.monstro.fileName);
        } else {
            event.preventDefault();
        }
    }

    render() {
        return (
            <div className="col">
                <form onKeyPress={(e) => { e.key === 'Enter' && e.target.type !== 'textarea' && e.preventDefault(); }}>
                    <div className="row">
                        <label className="col-12">
                            Nome:<br />
                            <input type="text" name="nome" value={this.state.monstro.nome} onChange={this.handleInputChange}></input>
                        </label>
                    </div>
                    <div className="row">
                        <label className="col-2">
                            Forca:<br />
                            <input type="number" name="forca" value={this.state.monstro.forca} onChange={this.handleInputChange}></input>
                        </label>
                        <label className="col-2">
                            Destreza:<br />
                            <input type="number" name="destreza" value={this.state.monstro.destreza} onChange={this.handleInputChange}></input>
                        </label>
                        <label className="col-2">
                            Constituicao:<br />
                            <input type="number" name="constituicao" value={this.state.monstro.constituicao} onChange={this.handleInputChange}></input>
                        </label>
                        <label className="col-2">
                            Inteligencia:<br />
                            <input type="number" name="inteligencia" value={this.state.monstro.inteligencia} onChange={this.handleInputChange}></input>
                        </label>
                        <label className="col-2">
                            Sabedoria:<br />
                            <input type="number" name="sabedoria" value={this.state.monstro.sabedoria} onChange={this.handleInputChange}></input>
                        </label>
                        <label className="col-2">
                            Carisma:<br />
                            <input type="number" name="carisma" value={this.state.monstro.carisma} onChange={this.handleInputChange}></input>
                        </label>
                    </div>
                    <div className="row">
                        <label className="col-3">
                            Pontos de Vida:<br />
                            <input type="number" name="pontosdevida" value={this.state.monstro.pontosdevida} onChange={this.handleInputChange}></input>
                        </label>
                        <label className="col-3">
                            Pontos de Mana:<br />
                            <input type="number" name="pontosdemana" value={this.state.monstro.pontosdemana} onChange={this.handleInputChange}></input>
                        </label>
                        <label className="col-3">
                            Iniciativa:<br />
                            <input type="number" name="iniciativa" value={this.state.monstro.iniciativa} onChange={this.handleInputChange}></input>
                        </label>
                        <label className="col-3">
                            Percepcao:<br />
                            <input type="number" name="percepcao" value={this.state.monstro.percepcao} onChange={this.handleInputChange}></input>
                        </label>
                        <label className="col-3">
                            Defesa:<br />
                            <input type="number" name="defesa" value={this.state.monstro.defesa} onChange={this.handleInputChange}></input>
                        </label>
                        <label className="col-3">
                            Fortitude:<br />
                            <input type="number" name="fortitude" value={this.state.monstro.fortitude} onChange={this.handleInputChange}></input>
                        </label>
                        <label className="col-3">
                            Reflexo:<br />
                            <input type="number" name="reflexo" value={this.state.monstro.reflexo} onChange={this.handleInputChange}></input>
                        </label>
                        <label className="col-3">
                            Vontade:<br />
                            <input type="number" name="vontade" value={this.state.monstro.vontade} onChange={this.handleInputChange}></input>
                        </label>
                        <label className="col-3">
                            Velocidade Andar:<br />
                            <input type="number" name="velocidadeandar" value={this.state.monstro.velocidadeandar} onChange={this.handleInputChange}></input>
                        </label>
                        <label className="col-3">
                            Velocidade Escalar:<br />
                            <input type="number" name="velocidadeescalar" value={this.state.monstro.velocidadeescalar} onChange={this.handleInputChange}></input>
                        </label>
                        <label className="col-3">
                        Velocidade Nadar:<br />
                            <input type="number" name="velocidadenadar" value={this.state.monstro.velocidadenadar} onChange={this.handleInputChange}></input>
                        </label>
                        <label className="col-3">
                        Velocidade Voar:<br />
                            <input type="number" name="velocidadevoar" value={this.state.monstro.velocidadevoar} onChange={this.handleInputChange}></input>
                        </label>
                    </div>
                    <div className="row">
                        <label className="col-12">
                            Descrição:<br />
                            <textarea type="text" name="description"id="MonstroFormDescription" rows="4" value={this.state.monstro.description} onChange={this.handleInputChange}></textarea >
                        </label>
                    </div>
                    <button className="btn btn-info" onClick={this.handleReset}>Desfazer</button>
                    <button className="btn btn-info" onClick={this.handleSubmit}>Salvar</button>
                    <button className="btn btn-danger" onClick={this.handleDelete}>
                        <FontAwesomeIcon icon={faTrashAlt} />
                    </button>
                </form>
            </div>
        );
    }
}

export default MonstroForm;
