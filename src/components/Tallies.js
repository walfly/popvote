import React, { PropTypes, Component } from 'react';

export default class Tallies extends Component {
    static propTypes = {
        width: PropTypes.number,
        numPerRow: PropTypes.number,
        remainder: PropTypes.number,
        rowsToRender: PropTypes.number,
        firstRow: PropTypes.number,
        color: PropTypes.string,
        displacement: PropTypes.number,
        side: PropTypes.string,
        name: PropTypes.string,
        svotes: PropTypes.string
    }
    render() {
        const arr = [];
        const firstRow = [];

        for(let i = 1; i <= this.props.firstRow; i++){
            firstRow.push(
                <div
                    key={i}
                    className={`tally-item ${this.props.color} tally-item-${Math.floor(Math.random() * 11)}`}
                >
                </div>
            );
        }

        if(this.props.remainder){
            firstRow[this.props.side === 'left' ? 'unshift' : 'push'](
                <div
                    key={0}
                    className={`tally-item ${this.props.color} remainder-${this.props.remainder}`}
                >
                </div>
            );
        }

        for(let i = 0; i < this.props.numPerRow * (this.props.rowsToRender - this.props.displacement); i++){
            arr.push(
                <div
                    key={i}
                    className={`tally-item ${this.props.color} tally-item-${Math.floor(Math.random() * 11)}`}
                >
                </div>
            );
        }

        return (
            <div className={`tally-container ${this.props.side}`} style={{width: this.props.width}}>
                <h3>All <span>{this.props.name}</span> Voters</h3>
                <div style={{height: this.props.displacement * 40}}/>
                <p className="total-numeric">{this.props.svotes} TOTAL</p>
                <div className='first-row'>
                    {firstRow}
                </div>
                {arr}
            </div>
        );
    }
}
