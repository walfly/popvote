import React, { PropTypes, Component } from 'react';
import './TimeSinceSection.css';

export default class TimeSinceSection extends Component {
    static propTypes = {
        ts: PropTypes.number
    }
    render() {
        const date = new Date(this.props.ts);
        const hours = date.getHours() % 12 || 12;
        const ampm = date.getHours() >= 12 ? "pm" : "am";
        return (<div className="time-since-section">
            updated at {hours}:00{ampm}, {date.toDateString()}
        </div>);
    }
}
