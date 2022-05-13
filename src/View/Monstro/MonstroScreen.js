import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faPlusCircle } from '@fortawesome/free-solid-svg-icons';

import Card from '../components/Card/Card'
import Monstro from '../../Model/Monstro'

class MonstroScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filter: "",
            monstros: [],
            changeSelectedScreen: props.changeSelectedScreen,
            fileController: props.fileController
        };
        this.search = this.search.bind(this);
        this.state.monstros = this.state.fileController.getArray('Monstro');
    }

    handleButton = button => {
        button._id = 5;
        this.state.changeSelectedScreen(button);
    }

    search(event) {
        this.setState({ filter: event.target.value });
    }

    render() {
        const btnNewMonstro = { _id: 5, card: new Monstro() };
        return (
            <div className="col">
                <div className="row search">
                    <input type="text" className="searchBar" placeholder="Pesquisar" value={this.state.filter} onChange={this.search} />
                    <button className="btn btn-info" id="searchButton" type="submit"><FontAwesomeIcon icon={faSearch} /></button>
                </div>
                <div className="row screen-title">
                    <div className="col">
                        <h2>Monstro</h2>
                    </div>
                </div>
                <div className="row">
                    {this.state.monstros.filter(monstro => monstro.name.toUpperCase().includes(this.state.filter.toUpperCase())).map(monstro => (
                        <Card key={monstro._id} object={Object.assign(new Monstro(), monstro).convertToCard()} onClick={this.handleButton} />
                    ))}
                </div>
                <div> 
                    <FontAwesomeIcon className='add-item-button' icon={faPlusCircle} onClick={() => this.handleButton(btnNewMonstro)} />
                </div>
            </div>
        );
    }
}

export default MonstroScreen;
