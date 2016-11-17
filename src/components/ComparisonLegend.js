import React, { PropTypes, Component } from 'react';
import "./ComparisonLegend.css";


export default class ComparisonLegendSection extends Component {
    static propTypes = {
        repName: PropTypes.string,
        demName: PropTypes.string,
    } 
    render() {
        return (<div className="comparison-legend">
                <p className="rep rep-single"><span className="legend-text">200 {this.props.repName} Voters</span> = <span className="red tally-item remainder-1"></span></p>
                <p className="dem dem-single"><span className="blue tally-item remainder-1"></span> = <span className="legend-text">200 {this.props.demName} Voters</span></p>
                <p className="rep rep-five"><span className="legend-text">1000 {this.props.repName} Voters</span> = <span className="red tally-item tally-item-0"></span></p>
                <p className="dem dem-five"><span className="blue tally-item tally-item-0"></span> = <span className="legend-text">1000 {this.props.demName} Voters</span></p>
            </div>);
    }
}
