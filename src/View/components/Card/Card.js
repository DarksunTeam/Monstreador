import React from 'react';

import './Card.css'

class Card extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      object: props.object,
      onClick: props.onClick
    }
  }

  render() {
    const button = { _id: null, card: this.props.object };
    return (
      <div className="col-3" style={{ padding: 0 }}>
        <li className="card-item">
          <div className="card-info">
            <strong>{this.state.object.title}</strong>
            <div className="card-subtitles">{this.state.object.subtitles.join(', ')}</div>
          </div>
          <p className="card-description">{this.state.object.description}</p>
          <button className="btn btn-info btn-card" onClick={() => this.state.onClick(button)} >Visualizar</button>
        </li>
      </div>
    );
  }
}

export default Card;