import React, { PropTypes, Component } from 'react';
import "./ComparisonsSections.css";
import stringifyNum from '../utils/stringifyNum';


export default class ComparisonsSection extends Component {
    static propTypes = {
        diff: PropTypes.number,
        height: PropTypes.number
    }
    render() {
        return (<div className="comparisons-section">
            <div className="dividing-line" />
            <div className="how-big">
                What does <span className="blue-text">{stringifyNum(this.props.diff)}</span> look like?
            </div>
        </div>);
    }
}
