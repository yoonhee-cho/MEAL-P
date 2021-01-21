import React, {Component} from 'react'
import {connect} from 'react-redux'
import CssBaseline from '@material-ui/core/CssBaseline'
import WeeklypriceCard from './weeklypriceCard'
import SimpleLineChart from './simpleLineChart'

class Weeklyprices extends Component {
  constructor() {
    super()
    this.processData = this.processData.bind(this)
  }

  processData(data) {
    //helper function formats sequelize createdAt date to readable string
    // input: '2019-01-20T04:20:30.847Z'
    // output: 01/20
    const convertDate = str => {
      return `${str.slice(5, 7)}/${str.slice(8, 10)}`
    }

    const reduced = data
      .map(el => {
        // map removes unnecessary data from JSON
        let obj = {name: convertDate(el.createdAt)}
        obj[el.category] = el.data
        // console.log(obj)
        return obj
      })
      .reduce((acc, el) => {
        // reduce finds unique dates
        if (el.name in acc) {
          //if date already exists in the accumulator, merge that object into existing object
          acc[el.name] = {...acc[el.name], ...el}

          //we'll add 'name' back in at the end... sort won't necessarily keep 'name' key as first value in obj
          delete acc[el.name].name

          //sort keys
          const ordered = {}
          Object.keys(acc[el.name])
            .sort()
            .forEach(key => {
              ordered[key] = acc[el.name][key]
            })

          //adds 'name' back in, spreads in sorted keys
          acc[el.name] = {name: el.name, ...ordered}
        } else {
          // create new obj w key date
          acc[el.name] = el
        }

        return acc
      }, {})

    return Object.values(reduced)
  }

  render() {
    const {weeklyprices} = this.props
    //truncate at 14 elements
    const truncatedData = this.processData(weeklyprices).slice(0, 12)
    return (
      <div id="weeklyPricesContainer">
        <CssBaseline />

        <h2>WEEKLY SPENDING</h2>
        {/* LINE CHART */}
        <div id="weeklyPriceComponents">
          <div className="chartContainer">
            <SimpleLineChart measurements={truncatedData} />
          </div>

          <div className="fitnessRight">
            <WeeklypriceCard />
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    weeklyprices: state.weeklyprices
  }
}

export default connect(mapStateToProps)(Weeklyprices)
