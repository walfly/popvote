import React, { PropTypes, Component } from 'react';
import "./ComparisonLegend.css";


export default class ComparisonLegendSection extends Component {
    static propTypes = {
        repName: PropTypes.string,
        demName: PropTypes.string,
    } 
    render() {
        return (<div className="comparison-legend">
                <p className="rep rep-five"><span className="legend-text">1000 {this.props.repName} Voters</span> = <span className="red tally-item tally-item-0"></span></p>
                <p className="dem dem-five dem-desktop"><span className="blue tally-item tally-item-0"></span> = <span className="legend-text">1000 {this.props.demName} Voters</span></p>
                <p className="dem dem-five dem-mobile"><span className="legend-text">1000 {this.props.demName} Voters</span> = <span className="blue tally-item tally-item-0"></span></p>
            </div>);
    }
}
