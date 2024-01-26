import * as d3 from 'd3';
import { useEffect, useRef } from 'react';

const PieChart = ({ data, changeFilter }) => {
    const svgRef = useRef();
    useEffect(() => {
        const svg = d3.select(svgRef.current);
        const pie = d3.pie().value(d => d[1]);
        const slices = pie(Object.entries(data));
        const arc = d3.arc().innerRadius(0).outerRadius(500 / 2);

        svg.selectAll('path')
            .data(slices)
            .enter()
            .append('path')
            .attr('d', arc)
            .attr('fill', (d, i) => d3.schemeCategory10[i])
            .attr("stroke", "#ddd")
            .attr("transition", "0.3s")
            .attr('opacity', 0)
            .attr('name', d => d.data[0])
            .transition()
            .duration(500)
            .ease(d3.easeLinear)
            .attr('opacity', 1)
            .delay(d => d.index * 200);

        slices.map((d, i) => {
            d.data[0] = d.data[0].charAt(0).toUpperCase() + d.data[0].slice(1);
        })

        svg.selectAll('text')
            .data(slices)
            .enter()
            .append('text')
            .attr('text-anchor', 'middle')
            .attr('font-size', '2rem')
            .attr('font-weight', 'bold')
            .attr('name', d => d.data[0])
            .text(d => `${d.data[0]}: ${d.data[1]}`);


        const paths = svg.selectAll('path');
        const texts = svg.selectAll('text');
        paths.on('mouseover', (e, d) => {
            paths.filter(':hover').classed('hovered', true);
            paths.filter(':not(:hover)').classed('hovered', false);
            texts.filter((e, i) => e.index == d.index).classed('hovered', true);
            texts.filter((e, i) => e.index != d.index).classed('hovered', false);
            paths.filter(':not(:hover)').classed('fade', true);
        }).on('mouseout', (e, d) => {
            paths.classed('hovered', false);
            texts.classed('hovered', false);
            const selected = paths.nodes().some(el => el.classList.contains('selected'));
            if (!selected)
                paths.classed('fade', false);
        }).on('click', (d, e) => {
            changeFilter(e.data[0], e.data[1]);
            paths.filter(el => el.index == e.index).classed("selected", true);
            paths.filter(el => el.index != e.index).classed("selected", false);
        })

        return () => {
            svg.selectAll('*').remove();
        }

    }, [data]);

    return (
        <div className='pie-chart' >
            <svg ref={svgRef} width={600} height={600}></svg>
        </div>
    )
}

export default PieChart;