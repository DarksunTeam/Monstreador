import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faPlusCircle } from '@fortawesome/free-solid-svg-icons';

import Card from '../components/Card/Card'
import Entity1 from '../../Model/Entity1'

class Entity1Screen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            filter: "",
            entity1s: [],
            changeSelectedScreen: props.changeSelectedScreen,
            fileController: props.fileController
        };
        this.search = this.search.bind(this);
        this.state.entity1s = this.state.fileController.getArray('Entity1');
    }

    handleButton = button => {
        button._id = 5;
        this.state.changeSelectedScreen(button);
    }

    search(event) {
        this.setState({ filter: event.target.value });
    }

    render() {
        const btnNewEntity1 = { _id: 5, card: new Entity1() };
        return (
            <div className="col">
                <div className="row search">
                    <input type="text" className="searchBar" placeholder="Pesquisar" value={this.state.filter} onChange={this.search} />
                    <button className="btn btn-info" id="searchButton" type="submit"><FontAwesomeIcon icon={faSearch} /></button>
                </div>
                <div className="row screen-title">
                    <div className="col">
                        <h2>Entity 1</h2>
                    </div>
                </div>
                <div className="row">
                    {this.state.entity1s.filter(entity1 => entity1.name.toUpperCase().includes(this.state.filter.toUpperCase())).map(entity1 => (
                        <Card key={entity1._id} object={Object.assign(new Entity1(), entity1).convertToCard()} onClick={this.handleButton} />
                    ))}
                </div>
                <div>
                    <FontAwesomeIcon icon={faPlusCircle} onClick={() => this.handleButton(btnNewEntity1)} />
                </div>
            </div>
        );
    }
}

export default Entity1Screen;
