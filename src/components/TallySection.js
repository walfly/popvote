import React, { PropTypes, Component } from 'react';
import Tallies from './Tallies';
import './TallySection.css';

export default class TallySection extends Component {
    static propTypes = {
        d: PropTypes.object,
        r: PropTypes.object,
        width: PropTypes.number
    }
    getData(data, color, side){
        const obj = {color, side};
        obj.svotes = data.cvotes;
        obj.width = (this.props.width/2);
        obj.votes = Number(data.cvotes.replace(/,/g, ''))/200;
        obj.fivers = Math.floor(obj.votes / 5);
        obj.remainder = Math.floor(obj.votes % 5);
        obj.numPerRow = Math.floor((obj.width - 20)/50);
        obj.rows = Math.floor(obj.fivers/obj.numPerRow);
        obj.firstRow = obj.fivers % obj.numPerRow;
        obj.rowsToRender = 150;
        obj.name = data.lname;
        return obj;
    }
    render() {
        const dem = this.getData(this.props.d, 'blue', 'right');
        const rep = this.getData(this.props.r, 'red', 'left');
        if (rep.votes > dem.votes) {
            rep.displacement = 0;
            dem.displacement = (rep.rows - dem.rows);
        } else {
            dem.displacement = 0;
            rep.displacement = (dem.rows - rep.rows);
        }
        debugger;
        return (
          <div style={{width: this.props.width}} className="tally-section">
            <Tallies
              {...rep}
            />
            <Tallies
              {...dem}
            />
          </div>
        );
    } 
}
