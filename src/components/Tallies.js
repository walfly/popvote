import React, { PropTypes, Component } from 'react';
import {List} from 'immutable';
import jump from 'jump.js'
import {easeInOutQuint} from 'ez.js';
import {scrollButtonOn, scrollButtonOff} from '../actions'

export default class Tallies extends Component {
    static propTypes = {
        side: PropTypes.string,
        width: PropTypes.number,
        displacement: PropTypes.number,
        firstRow: PropTypes.instanceOf(List),
        full: PropTypes.instanceOf(List)
        // dispatch: PropTypes.func.isRequired
    }
    onScrollClick() {
        scrollButtonOn()
        jump(this.frow, {
            a11y: false,
            duration: 2300,
            offset: -40,
            easing: easeInOutQuint,
            callback: scrollButtonOff
        })
    }
    render() {
        let scroller;
        if(this.props.displacement > 0){
            scroller = <div 
                className="scroll-button"
                onClick={() => this.onScrollClick()}
            > 
                SCROLL DOWN
            </div>
        }
        return (
            <div className={`tally-container ${this.props.side}`} style={{width: this.props.width}}>
                {scroller}
                <div style={{height: this.props.displacement * 40}}/>
                <div ref={(el) => this.frow = el} className='first-row'>
                    {this.props.firstRow.map((item, index) => <div key={index} className={item}/>)}
                </div>
                {this.props.full.map((item, index) => <div key={index} className={item}/>)}
            </div>
        );
    }
}
