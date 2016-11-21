import React, { PropTypes, Component } from 'react';
import {chooseColorText} from "../utils/chooseColor"
import "./ElectoralVotes.css";

export default class ElectoralVotes extends Component {
    static propTypes = {
        winner: PropTypes.object,
        year: PropTypes.string
    }
    render() {
        const will = this.props.year === "2016" ? "will elect" : "elected";
        return (
            <div className="electoral-votes">
                <p>The Electoral College {will} <span className={chooseColorText(this.props.winner.party)}>{`${this.props.winner.fname} ${this.props.winner.lname}`}</span></p>
            </div>
        )
    }
}
