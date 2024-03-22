import React from 'react';
import './yearly.css';

export function generateYearlyCalendar(date) {
  const monthNames = [
    'January', 'February', 'March', 'April',
    'May', 'June', 'July', 'August',
    'September', 'October', 'November', 'December'
  ];
  const weekdays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  const year = date.getFullYear();
  const today = new Date();

  const months = monthNames.map((monthName, index) => {
    const monthDays = new Date(year, index + 1, 0).getDate();
    const firstDayOfWeek = new Date(year, index, 1).getDay();
    const rows = [];

    for (let i = 0; i < 6; i++) {
      const cells = [];
      for (let j = 0; j < 7; j++) {
        const dayOfMonth = i * 7 + j - firstDayOfWeek + 1;
        const currentDate = new Date(year, index, dayOfMonth);
        const isToday = currentDate.toDateString() === today.toDateString();
        const cellClassName = isToday ? 'today' : '';
        if (dayOfMonth > 0 && dayOfMonth <= monthDays) {
          cells.push(
            <td key={`day-${dayOfMonth}`} className={cellClassName}>
              {dayOfMonth}
            </td>
          );
        } else {
          cells.push(<td key={`empty-${i}-${j}`} className="empty-cell">&nbsp;</td>);
        }
      }
      rows.push(<tr key={`row-${i}`}>{cells}</tr>);
    }

    return (
      <table key={monthName} className="yearly-month-table">
        <thead>
          <tr>
            <th colSpan="7">{monthName}</th>
          </tr>
          <tr>
            {weekdays.map((weekday) => (
              <th key={`weekday-${weekday}`} className="weekday-cell">{weekday}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </table>
    );
  });

  const rows = [];
  let cells = [];

  months.forEach((month, index) => {
    if (index % 4 !== 0) {
      cells.push(<td key={`month-${index}`}>{month}</td>);
    } else {
      rows.push(<tr key={`row-${index / 4}`}>{cells}</tr>);
      cells = [];
      cells.push(<td key={`month-${index}`}>{month}</td>);
    }
    if (index === months.length - 1) {
      rows.push(<tr key={`row-${index / 4 + 1}`}>{cells}</tr>);
    }
  });

  return <table className="yearly-calendar">{rows}</table>;
}
