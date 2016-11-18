import React, { PropTypes, Component } from 'react';

export default class YearSelect extends Component {
    static propTypes = {
        year: PropTypes.string,
        yearList: PropTypes.array,
        onChange: PropTypes.func
    }
    render() {
        return (
            <div className="year-select">
                ★
                    <select onChange={(e) => this.props.onChange(e.target.value)} value={this.props.year}>
                        {this.props.yearList.map(item => {
                            return <option value={item} key={item}> {item} </option>
                        })}
                    </select>
                ★
            </div>
        );
    }
}
