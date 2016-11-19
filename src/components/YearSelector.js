import React, { PropTypes, Component } from 'react';
import Select from './Select'
import './YearSelector.css';

export default class YearSelector extends Component {
    static propTypes = {
        year: PropTypes.string,
        yearList: PropTypes.array,
        onChange: PropTypes.func
    }
    render() {
        return (
            <div className="year-select">
                <span className="star-left">★</span>
                    <Select
                        onChange={(e) => this.props.onChange(e)}
                        options={this.props.yearList}
                        value={this.props.year}
                    />
                    <span className="star-right">★</span>
            </div>
        );
    }
}
