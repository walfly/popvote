import React, { PropTypes, Component } from 'react';
import Tallies from './Tallies';
import ComparisonLegend from './ComparisonLegend';
import {Map} from 'immutable';
import './TallySection.css';

export default class TallySection extends Component {
    static propTypes = {
        tallies: PropTypes.instanceOf(Map),
        width: PropTypes.number
    }
    render() {
        const rep = this.props.tallies.get('winner');
        const dem = this.props.tallies.get('second');
        return (
          <div style={{width: this.props.width}} className="tally-section">
            <h3 className={`${rep.get('data').color}-header`}>
                All <span>{rep.get('data').name}</span> Voters
                <p className="total-numeric">({rep.get('data').svotes} TOTAL)</p>
            </h3>
            <h3 className={`${dem.get('data').color}-header`}>
                All <span>{dem.get('data').name}</span> Voters
                <p className="total-numeric">({dem.get('data').svotes} TOTAL)</p>
            </h3>
            <ComparisonLegend winner={rep} second={dem}/>
            <Tallies
              side={dem.get('data').side}
              width={dem.get('data').width}
              displacement={dem.get('data').displacement}
              firstRow={dem.getIn(['list', 'first'])}
              full={dem.getIn(['list', 'full'])}
            />
            <Tallies
              side={rep.get('data').side}
              width={rep.get('data').width}
              displacement={rep.get('data').displacement}
              firstRow={rep.getIn(['list', 'first'])}
              full={rep.getIn(['list', 'full'])}
            />
          </div>
        );
    } 
}
