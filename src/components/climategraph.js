import React, { Component } from "react";
import "../App.css";
import * as d3 from "d3";
import ClimateData from './data/data'

class ClimateGraph extends Component {
    // constructor(props) {
    //     super(props);

    //     this.state = {
    //         data: ClimateData
    //     }
    // }

    componentDidMount() {
        this.logData();
    }

    logData = () => {
        console.log(ClimateData)
    }

    render() {
        return (
            <div></div>
        )
    }
}

export default ClimateGraph;