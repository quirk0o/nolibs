import * as d3 from 'd3'
import React, { createRef, useEffect, useMemo } from 'react'
import { format } from 'src/date'
import { count, groupBy, map, pipe, prop, tap, toPairs } from 'src/fns'

const chartData = (data, width, height) => {
  const xExtent = d3.extent(data, prop('date'))
  const x = d3.scaleLinear()
    .domain(xExtent)
    .range([0, width])

  format('YYYY-MM-DD')(data[0].date)
  const sumByDate = pipe(
    groupBy((d) => d.date.getTime()),
    map(count),
    tap(console.log.bind(console)),
    toPairs,
    map(([date, count]) => ({ date: new Date(date), count }))
  )(data)
  const y = d3.scaleLinear()
    .domain([0, d3.max(sumByDate, prop('count'))])
    .range([height, 0])

  return { x, sumByDate, y }
}

export const ActivityChart = ({ events }) => {
  const svgRef = createRef()

  const width = 1000
  const height = 200

  const data = useMemo(() => events.map((event) => ({ date: new Date(event.event_date), id: event.id })), [events])
  const { x, sumByDate, y } = useMemo(() => chartData(data, width, height), [data])
  console.log(sumByDate)
  useEffect(() => {
    d3
      .select(svgRef.current)
      .append('g')
      .selectAll('rect')
      .data(sumByDate)
      .enter()
      .append('rect')
      .attr('x', d => x(d.date))
      .attr('y', d => height - y(d.count))
      .attr('width', 10)
      .attr('height', d => y(d.count))
      .style('fill', '#69b3a2')
      .style('stroke', 'white')
  }, [x, y, sumByDate])

  return (
    <svg width={width} height={height} ref={svgRef} />
  )
}
