import React, { PropTypes, Component } from 'react';
import './DifferenceSection.css';
import stringifyNum from '../utils/stringifyNum';

export default class DiffernceSection extends Component {
    static propTypes = {
        diff: PropTypes.number
    }
    render() {
        return (<div className="diff-section">
            <div className="number">{stringifyNum(this.props.diff)}</div>
            <div className="number-exp">more people voted for Clinton</div>
        </div>);
    }
}
