import React, {useState} from 'react'
import {takeMonth} from './calendarGenerator'
import {
  format,
  isSameMonth,
  isSameDay,
  addMonths,
  subMonths,
  parseISO
} from 'date-fns'
import WeekNames from './WeekNames'
import {connect} from 'react-redux'
import AddMenuModal from './AddMenuModal'

function Calendar(props) {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [showModal, setShowModal] = useState(false)
  const data = takeMonth(selectedDate)()

  function dayColor(day) {
    if (!isSameMonth(day, selectedDate)) return 'not-same-month'
    if (isSameDay(day, selectedDate)) return 'same-day'
  }

  function cornerClassName(wIdx, dIdx) {
    if (wIdx !== data.length - 1) return
    if (dIdx === 0) return 'rounded-bl-corner'
    if (dIdx === 6) return 'rounded-br-corner'
  }

  function handleToggleModal() {
    return setShowModal(!showModal)
  }

  console.log('hello', props.menus)
  return (
    <>
      <div className="week-name-box">
        <div className="week-name-title">
          <i
            className="fas fa-chevron-circle-left"
            onClick={() => setSelectedDate(subMonths(selectedDate, 1))}
          />
          <i
            className="fas fa-chevron-circle-right"
            onClick={() => setSelectedDate(addMonths(selectedDate, 1))}
          />
          <h1 className="year-month">
            {format(selectedDate, 'MMMM')} {format(selectedDate, 'yyyy')}
          </h1>
        </div>

        <WeekNames />

        {data.map((week, wIdx) => {
          return (
            <div className="week-name" key={week}>
              {week.map((day, dIdx) => {
                return (
                  <div
                    key={day}
                    onClick={() => setSelectedDate(day)}
                    className={`col ${dayColor(day)} ${cornerClassName(
                      wIdx,
                      dIdx
                    )}`}
                  >
                    <div className="day-header">
                      {format(day, 'dd')}
                      <i
                        className="fas fa-plus-circle"
                        onClick={() => handleToggleModal()}
                      />
                    </div>

                    {props.menus &&
                      props.menus
                        .filter(menu =>
                          isSameDay(parseISO(menu.createdAt), day)
                        )
                        .map(menu => (
                          <div key={menu.id} className="menu">
                            {menu.name}
                          </div>
                        ))}
                  </div>
                )
              })}
            </div>
          )
        })}
      </div>

      <AddMenuModal show={showModal} handleToggleModal={handleToggleModal} />
    </>
  )
}

const mapState = state => {
  return {
    menus: state.menus
  }
}

const mapDispatch = dispatch => {
  return {}
}

export default connect(mapState, mapDispatch)(Calendar)
