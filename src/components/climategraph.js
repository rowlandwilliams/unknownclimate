import React, { Component } from "react";
import "../App.css";
import * as d3 from "d3";
import D3Voronoi from 'd3-voronoi';
import ClimateData from './data/data'

class ClimateGraph extends Component {
    constructor(props) {
        super(props);
        this.myRef = React.createRef();
    }
    
    componentDidMount() {
        this.build();
        window.addEventListener('resize', this.build);
    }

    build = () => {
        d3.select('.svg').remove();
        
        var width = window.innerWidth * 0.7;
        const height = window.innerHeight;
        if (width > 500) { width = 500 } // set max width
        else if (width < 500) { width = window.innerWidth * 0.9 } // fill page on smaller screen
        
        
        let lx0 = d3.scaleTime() // define x axis
            .domain([new Date(2020, 0, 1), new Date(2020, 11, 31)])
            .range([50, width - 50])

        let ly0 = d3.scaleLinear()
            .domain([334, 420])
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

        // var voronoi = D3Voronoi()
        //     .x(function(d) { return lx0(Date.parse(d.date)) })
        //     .y(function(d) { return ly0(d.ppm) })
        //     .extent([[-50, -50], [width + 50, lHeight + 50]]) 

        const svg = d3.select(this.myRef.current)
                        .append('svg')
                        .attr('class', 'svg')
                        .attr('width', width + 50)
                        .attr('height', height + 50)
    
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