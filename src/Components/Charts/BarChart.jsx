import { useEffect, useRef } from "react";
import * as d3 from 'd3';
const BarChart = ({ data, changeFilter, selectedData }) => {
    const svgRef = useRef();
    useEffect(() => {
        let newData = Object.values(data);

        const svg = d3.select(svgRef.current);
        const chart = svg.append('g').attr('transform', 'translate(50, 50)');
        const yRange = newData.reduce((max, curr) => (curr > max ? curr : max), 0);
        const yScale = d3.scaleLinear()
            .domain([0, yRange * 1.1])
            .range([500, 0]);

        const xScale = d3.scaleBand()
            .domain(newData.map((value, index) => index))
            .range([0, 800])
            .padding(0.3);

        const colorScale = d3.scaleOrdinal(d3.schemePastel1);
        const textBox = svg.append('text').attr('transform', 'translate(500, 300)').attr('text-anchor', 'middle').attr('font-size', '2rem').attr('font-weight', 'bold').attr('opacity', 0).attr('font-family', 'sans-serif')

        chart.selectAll('rect')
            .data(newData)
            .join('rect')
            .attr('x', (value, index) => xScale(index))
            .attr('fill', (d, i) => colorScale(i))
            .attr('width', xScale.bandwidth())
            .attr('height', 0)
            .attr('y', 500)
            .transition()
            .duration(1000)
            .delay((d, i) => i * 200)
            .ease(d3.easeBounce)
            .attr('height', value => 500 - yScale(value))
            .attr('y', d => yScale(d));

        const xAxis = d3.axisBottom(xScale).ticks(newData.length);
        chart.append('g').call(xAxis).attr('transform', 'translate(0, 500)');

        const yAxis = d3.axisLeft(yScale);
        chart.append('g').call(yAxis);

        const bars = chart.selectAll('rect');
        bars.on('mouseenter', function (event, value) {
            const index = bars.nodes().indexOf(this);
            bars.filter((d, i) => i !== index).classed('fade', true);
            bars.filter(":hover").classed('fade', false);
            textBox.attr('opacity', 1);
            textBox.text(Object.keys(data)[index].charAt(0).toUpperCase() + Object.keys(data)[index].slice(1) + ": " + value);
        }).on('mouseleave', function (event, value) {
            if (!bars.filter('.selected').empty()) {
                bars.filter('.selected').classed('fade', false);
                bars.filter(":not(.selected)").classed('fade', true);
            } else {
                bars.classed('fade', false);
            }
            textBox.attr('opacity', 0);

        }).on('click', function (event, value) {
            const index = bars.nodes().indexOf(this);
            bars.classed('selected', false);
            bars.filter((d, i) => i === index).classed('selected', true);
            changeFilter(Object.keys(data)[index], value);
        });

        return () => {
            svg.selectAll('*').remove();
        }

    }, [data])
    return (
        <div className='bar-chart'>
            <svg ref={svgRef} width={1000} height={600} ></svg>
        </div>
    )
}

export default BarChart;