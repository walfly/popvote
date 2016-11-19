import React, { PropTypes, Component } from 'react';
import './Select.css';

export default class Select extends Component {
    static propTypes = {
        onChange: PropTypes.func,
        options: PropTypes.array,
        value: PropTypes.string
    }
    constructor(props) {
        super(props);
        this.state = {
            open: false
        }
    }
    onClick(val){
        this.props.onChange(val); 
        this.setState({
            open: !this.state.open
        });  
    }
    render() {
        return (
            <div 
                onMouseLeave={() => this.setState({open: false})}
                onMouseEnter={() => this.setState({open: true})}
                onClick={() => this.setState({open: !this.state.open})}
                className="select-header"
            >
                {this.props.value}<span className="arrow"></span>
                <ul className={`select-dropdown ${this.state.open ? 'open' : 'closed'}`}>
                    {
                        this.props.options.map(item => {
                            return <li onClick={() => this.onClick(item)} className="option" key={item.value} value={item.value}>{item.name}</li>
                        })
                    }
                </ul>
            </div>
        )
    }
}
