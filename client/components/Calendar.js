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
import EditMenuModal from './EditMenuModal'

function Calendar(props) {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [showModal, setShowModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [menuToEdit, setMenuToEdit] = useState('')
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

  function handleToggleAddModal() {
    return setShowModal(!showModal)
  }

  function handleToggleEditModal(menu) {
    setMenuToEdit(menu)
    return setShowEditModal(!showEditModal)
  }

  console.log('hellddo', selectedDate)
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
                        onClick={() => handleToggleAddModal()}
                      />
                      <AddMenuModal
                        show={showModal}
                        handleToggleModal={handleToggleAddModal}
                        addMenu={props.addMenu}
                        date={selectedDate}
                      />
                    </div>

                    {props.menus &&
                      props.menus
                        .filter(menu =>
                          isSameDay(parseISO(menu.createdAt), day)
                        )
                        .map(menu => (
                          <div
                            key={menu.id}
                            className="menu"
                            onClick={() => handleToggleEditModal(menu)}
                          >
                            {menu.name}

                            <EditMenuModal
                              show={showEditModal}
                              handleToggleModal={handleToggleEditModal}
                              menu={menuToEdit}
                              editMenu={props.editMenu}
                              deleteMenu={props.deleteMenu}
                            />
                          </div>
                        ))}
                  </div>
                )
              })}
            </div>
          )
        })}
      </div>
    </>
  )
}

const mapState = state => {
  return {
    menus: state.menus,
    menu: state.menu
  }
}

export default connect(mapState)(Calendar)
