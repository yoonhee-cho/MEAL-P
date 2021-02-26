import React from 'react'

export default function WeekNames() {
  function cornerClassName(idx) {
    if (idx === 0) return 'rounded-tl-corner'
    if (idx === 6) return 'rounded-tr-corner'
  }

  return (
    <div className="week-name">
      {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((dayName, idx) => {
        return (
          <div className={`dayName ${cornerClassName(idx)}`} key={dayName}>
            {dayName}
          </div>
        )
      })}
    </div>
  )
}
