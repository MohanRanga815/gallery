import {Component} from 'react'

import {v4} from 'uuid'

import {format} from 'date-fns'

import AppointmentItem from '../AppointmentItem'

import './index.css'

class Appointments extends Component {
  state = {
    appointmentsList: [],
    titleInput: '',
    dateInput: '',
    isFilterActive: false,
  }

  toggleIsChanged = id => {
    this.setState(prevState => ({
      appointmentsList: prevState.appointmentsList.map(eachAppointment => {
        if (eachAppointment.id === id) {
          return {...eachAppointment, isStar: !eachAppointment.isStar}
        }
        return eachAppointment
      }),
    }))
  }

  onClickFilter = () => {
    const {isFilterActive} = this.state
    this.setState({
      isFilterActive: !isFilterActive,
    })
  }

  onAddAppointment = event => {
    event.preventDefault()
    const {titleInput, dateInput} = this.state

    const formattedDate = dateInput
      ? format(new Date(dateInput), 'dd MMMM yyyy, EEEE')
      : ''

    const newAppointment = {
      id: v4(),
      title: titleInput,
      date: formattedDate,
      isStar: false,
    }
    this.setState(prevState => ({
      appointmentsList: [...prevState.appointmentsList, newAppointment],
      titleInput: '',
      dateInput: '',
    }))
  }

  changeTitle = event => {
    this.setState({titleInput: event.target.value})
  }

  changeDate = event => {
    this.setState({dateInput: event.target.value})
  }

  getFilterResults = () => {
    const {appointmentsList, isFilterActive} = this.state
    if (isFilterActive) {
      return appointmentsList.filter(
        eachTransaction => eachTransaction.isStar === true,
      )
    }
    return appointmentsList
  }

  render() {
    const {titleInput, dateInput, isFilterActive} = this.state
    const filterClassName = isFilterActive ? 'filter-filled' : 'filter-empty'
    const filterAppointmentList = this.getFilterResults()

    return (
      <div className="app-container">
        <div className="responsive-con">
          <div className="appointment-con">
            <div className="inner-card">
              <form className="form-container" onSubmit={this.onAddAppointment}>
                <h1 className="app-heading">Add Appointment</h1>
                <label htmlFor="title" className="label">
                  Title
                </label>
                <input
                  type="text"
                  value={titleInput}
                  className="title"
                  placeholder="Title"
                  onChange={this.changeTitle}
                  autoComplete="OFF"
                />
                <label className="label" htmlFor="date">
                  Date
                </label>
                <input
                  type="date"
                  placeholder="dd/mm/yyyy"
                  value={dateInput}
                  onChange={this.changeDate}
                  className="date"
                />
                <button className="btn" type="submit">
                  Add
                </button>
              </form>
              <img
                src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
                className="image"
                alt="appointments"
              />
            </div>
            <hr className="line" />
            <div className="appointment-container">
              <h1 className="app-head">Appointments</h1>
              <button
                type="button"
                className={`filter-style ${filterClassName}`}
                onClick={this.onClickFilter}
              >
                Starred
              </button>
            </div>
            <ul className="list">
              {filterAppointmentList.map(eachApp => (
                <AppointmentItem
                  key={eachApp.id}
                  appointmentDetails={eachApp}
                  toggleIsChanged={this.toggleIsChanged}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}
export default Appointments
