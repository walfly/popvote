import React, { PropTypes, Component } from 'react';
import "./ComparisonLegend.css";


export default class ComparisonLegendSection extends Component {
    static propTypes = {
        winner: PropTypes.object,
        second: PropTypes.object,
    } 
    render() {
        return (<div className="comparison-legend">
                <p className={`rep ${this.props.winner.get('data').color}-comp rep-five`}>
                    <span className="legend-text">1000 {this.props.winner.get('data').name} Voters</span>
                     {"="} 
                    <span className={`${this.props.winner.get('data').color} tally-item tally-item-0`}></span>
                </p>
                <p className={`dem dem-five ${this.props.second.get('data').color}-comp dem-desktop`}>
                    <span className={`${this.props.second.get('data').color} tally-item tally-item-0`}></span>
                    {"="}
                    <span className="legend-text">1000 {this.props.second.get('data').name} Voters</span>
                </p>
                <p className={`dem dem-five ${this.props.second.get('data').color}-comp dem-mobile`}>
                    <span className="legend-text">1000 {this.props.second.get('data').name} Voters</span>
                    {"="}
                    <span className={`${this.props.second.get('data').color} tally-item tally-item-0`}></span>
                </p>
            </div>);
    }
}
