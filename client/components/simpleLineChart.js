import React from 'react'
import ResponsiveContainer from 'recharts/lib/component/ResponsiveContainer'
import LineChart from 'recharts/lib/chart/LineChart'
import Line from 'recharts/lib/cartesian/Line'
import XAxis from 'recharts/lib/cartesian/XAxis'
import YAxis from 'recharts/lib/cartesian/YAxis'
import CartesianGrid from 'recharts/lib/cartesian/CartesianGrid'
import Tooltip from 'recharts/lib/component/Tooltip'
import Legend from 'recharts/lib/component/Legend'

// dummy data for reference
const data = [
  {name: 'Mon', Visits: 2200, Dollars: 34},
  {name: 'Tue', Visits: 1280, Dollars: 23},
  {name: 'Wed', Visits: 5000, Dollars: 43},
  {name: 'Thu', Visits: 4780, Dollars: 29},
  {name: 'Fri', Visits: 5890, Dollars: 48},
  {name: 'Sat', Visits: 4390, Dollars: 38},
  {name: 'Sun', Visits: 4490, Dollars: 43}
]

const COLORS = ['#82ca9d', '#8884d8']

//util function to get all data keys! one data key => one line in this chart.
const getDataKeys = data => {
  //array of all data keys
  const allKeys = data.reduce((acc, el) => {
    acc = [...acc, ...Object.keys(el)]
    return acc
  }, [])
  //remove any duplicates
  const set = new Set(allKeys)

  //return array of all data keys except 'name'
  return Array.from(set).filter(key => key !== 'name')
}

const SimpleLineChart = props => {
  const {weeklyPrices} = props
  //   const dataKeys = getDataKeys(weeklyPrices) // an array of all data keys

  console.log('LINE CHART DATA!', weeklyPrices)

  return (
    // 99% per https://github.com/recharts/recharts/issues/172

    <ResponsiveContainer width="99%" height={320}>
      <LineChart data={data}>
        <XAxis dataKey="name" stroke="whitesmoke" />
        <YAxis stroke="whitesmoke" />
        <CartesianGrid vertical={false} strokeDasharray="3 3" />
        <Tooltip />
        <Legend />

        {/* {dataKeys.map((key, idx) => {
          return (
            <Line
              key={`${key}-${idx}`}
              type="monotone"
              dataKey={key}
              stroke="#8884d8"
            />
          )
        })} */}
        <Line
          type="monotone"
          dataKey="Dollars"
          stroke="#82ca9d"
          strokeDasharray="3 4 5 2"
        />
      </LineChart>
    </ResponsiveContainer>
  )
}

export default SimpleLineChart
