import React, { Component } from "react";
import "../App.css";
import * as d3 from "d3";
import ClimateData from './data/data'

class ClimateGraph extends Component {
    constructor(props) {
        super(props);
        this.myRef = React.createRef();
    }
    
    componentDidMount() {
        this.build();
    }

    build = () => {
        const width = window.innerWidth * 0.7;
        const height = window.innerHeight;

        let lx0 = d3.scaleTime() // define x axis
            .domain([new Date(2020, 0, 1), new Date(2020, 11, 31)])
            .range([50, width - 50])

        let ly0 = d3.scaleLinear()
            .domain([314, 420])
            .range([height - 50, 50]);

        let lXAxis = g => g
            .attr("transform", 'translate(0,' + (height - 50) + ')')
            .call(d3.axisBottom(lx0).tickFormat(d3.timeFormat('%b')))
        
        let  lYAxis = g => g
            .attr("transform", 'translate(' + 50 +',0)')
            .call(d3.axisLeft(ly0))

        let lineGraphLine = d3.line()
            .x(d => lx0(Date.parse(d.date))) 
            .y(d => ly0(d.ppm))

        const svg = d3.select(this.myRef.current)
                        .append('svg')
                        .attr('width', width)
                        .attr('height', height)
    
        svg.append('g')
                .call(lXAxis)
                .attr('class', 'lXAxis')
                .call(g => g.selectAll(".domain, line") // remove axis line and ticks
                .remove())

        svg.append('g')
                .call(lYAxis)
                .attr('class', 'lYAxis')
                .call(g => g.selectAll(".domain, line, text") // remove axis line and ticks
                .remove())

        var centuries = svg.selectAll('.century.c')
                .data(ClimateData.linegraph)
                .enter()    
                .append('g')
                .attr('class', d => 'g century c' + d.century)
                     
        centuries.selectAll('.y-line')
                .data(d => d.year_values)
            .enter()
                .append('path')
                .attr('class', d => 'y-line ' + d.year)
                .attr('id', d => 'y' + d.year)
                .attr('d', function(d) { return lineGraphLine(d.values); })
                .attr('fill', 'none')
                .style('stroke', 'white')
                .style('stroke-width', 1)
                .attr('opacity', 1)       
    }

    render() {
        return (
            <div ref={this.myRef} className='graph' style={{display:"flex", justifyContent:"center"}}>
            </div>
        )
    }
}

export default ClimateGraph;