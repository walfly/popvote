import React, { PropTypes, Component } from 'react';
import {List} from 'immutable';

export default class Tallies extends Component {
    static propTypes = {
        side: PropTypes.string,
        width: PropTypes.number,
        displacement: PropTypes.number,
        firstRow: PropTypes.instanceOf(List),
        full: PropTypes.instanceOf(List)
    }
    render() {
        return (
            <div className={`tally-container ${this.props.side}`} style={{width: this.props.width}}>
                <div style={{height: this.props.displacement * 40}}/>
                <div className='first-row'>
                    {this.props.firstRow.map((item, index) => <div key={index} className={item}/>)}
                </div>
                {this.props.full.map((item, index) => <div key={index} className={item}/>)}
            </div>
        );
    }
}
