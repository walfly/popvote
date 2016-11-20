import React, { PropTypes, Component } from 'react';
import styles from './DifferenceSection.css';
import stringifyNum from '../utils/stringifyNum';

export default class DiffernceSection extends Component {
    static propTypes = {
        diff: PropTypes.number,
        lastName: PropTypes.string,
        winningParty: PropTypes.string
    }
    render() {
        return (<div className={`diff-section ${this.props.winningParty}-text`}>
            <div className="number">{stringifyNum(this.props.diff)}</div>
            <div className="number-exp">more people voted for {this.props.lastName}</div>
        </div>);
    }
}
