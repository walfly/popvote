import React, { PropTypes, Component } from 'react';
import "./About.css";
import alex from "../img/alex_savard_design.png";
import walker from "../img/walker_flynn_dev.png";
import Twitter from "dibs-vg/dist/react/twitter";

export default class About extends Component {
    render() {
        return (<div className="about-section">
                <h2>About</h2>
                <div className="write-up">
                    <p>
                        WhoGotMoreVotes.com is a non-partisan, data-driven illustration of a single metric often lost in the coverage of presidential elections: who got more votes?
                    </p>
                    <p>
                        Our historical data comes from the <a href="http://uselectionatlas.org/RESULTS/" target="_blank">US Elections Atlas</a>. 
                    </p>
                    <p>
                        Our 2016 data comes from the <a href="http://www.cnn.com/election/results" target="_blank">CNN</a> and is updated hourly.
                    </p>
                </div>
                <div className="write-up-after"/>
                <h2>Creators</h2>
                <div className="creators-section">
                    <div className="bio alex">
                         <img src={alex} alt="alex" />
                         <p className="name">Alex Savard</p>
                         <p> Designer - Data Vis - NYC</p>
                         <a href="https://twitter.com/DataMadeVisible?lang=en" target="_blank"><Twitter/>@DataMadeVisible</a>
                    </div>
                    <div className="bio walker">
                        <img src={walker} alt="walker" />
                        <p className="name">Walker Flynn</p>
                        <p> Designer - Developer - NYC</p>
                        <a href="https://twitter.com/walkercheese?lang=en" target="_blank"><Twitter/>@walkercheese</a>
                    </div>
                </div>
                <div className="creators-section-after"/>

                <div className="about-footer">
                    © Copyright 2016 - Who Got More Votes LLC
                </div>
            </div>);
    }
}
