import React from 'react';
import TagsInput from 'react-tagsinput';
import 'react-tagsinput/react-tagsinput.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';

import Entity1 from '../../Model/Entity1';

import './Entity1Form.css'


class Entity1Form extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fileController: props.fileController,
            entity1: props.fileController.get('Entity1', props.selectedCard._id)
        };
        if (this.state.entity1 != null) {
            this.baseState = JSON.parse(JSON.stringify(this.state.entity1));
        } else {
            this.state.entity1 = new Entity1(this.state.fileController.getNewId('Entity1'), '', [], '', '');
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

        let entity1 = this.state.entity1;
        entity1[name] = value;

        if (name === 'name') {
            entity1.fileName = entity1.name.normalize("NFD").replace(/[^\d\w]/g, "") + '.json';
        }

        this.setState({
            entity1: entity1
        });
    }

    handleTagInputChange(type, itens) {
        let entity1 = this.state.entity1;
        entity1[type] = itens;
        this.setState({
            entity1: entity1
        });
    }

    handleSubmit() {
        if (this.baseState != null) {
            this.state.fileController.removeObject('Entity1', this.baseState.fileName);
        }
        this.state.fileController.setObject('Entity1', this.state.entity1);
    }

    handleReset(event) {
        this.setState({ entity1: JSON.parse(JSON.stringify(this.baseState)) });
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
                this.state.fileController.removeObject('Entity1', this.baseState.fileName);
            }
            this.state.fileController.removeObject('Entity1', this.state.entity1.fileName);
        } else {
            event.preventDefault();
        }
    }

    render() {
        return (
            <div className="col">
                <form onKeyPress={(e) => { e.key === 'Enter' && e.target.type !== 'textarea' && e.preventDefault(); }}>
                    <div className="form-group">
                        <label className="col">
                            Nome:<br />
                            <input type="text" name="name" value={this.state.entity1.name} onChange={this.handleInputChange}></input>
                        </label>
                    </div>
                    <div className="form-group">
                        <label className="col">
                            Descrição:<br />
                            <textarea type="text" name="description" id="Entity1FormDescription" value={this.state.entity1.description} onChange={this.handleInputChange}></textarea >
                        </label>
                    </div>
                    <div className="form-group">
                        <label className="col">
                            Subtítulo:<br />
                            <TagsInput
                                value={this.state.entity1.subtitles}
                                onChange={this.handleTagInputChange.bind(this, 'subtitles')}
                                inputProps={{
                                    className: 'react-tagsinput-input',
                                    placeholder: 'Adicionar'
                                }}
                            />
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

export default Entity1Form;
