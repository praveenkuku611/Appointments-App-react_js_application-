import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import {format} from 'date-fns'
import './index.css'
import AppointmentItem from '../AppointmentItem'

const arrayList = []

class Appointments extends Component {
  state = {
    appointmentList: arrayList,
    titleInput: '',
    dateInput: '',
    isFilterActive: false,
  }

  titleChanged = event => {
    this.setState({titleInput: event.target.value})
  }

  dateChanged = event => {
    this.setState({dateInput: event.target.value})
  }

  inputSubmit = event => {
    event.preventDefault()
    const {titleInput, dateInput} = this.state
    const dateFormat = dateInput
      ? format(new Date(dateInput), 'dd MMMM yyyy, EEEE')
      : ''

    const newAppointment = {
      id: uuidv4(),
      title: titleInput,
      date: dateFormat,
      isStarred: false,
    }

    this.setState(prevState => ({
      appointmentList: [...prevState.appointmentList, newAppointment],
      titleInput: '',
      dateInput: '',
    }))
  }

  isToggledStar = id => {
    this.setState(prevState => ({
      appointmentList: prevState.appointmentList.map(eachAppointment => {
        if (id === eachAppointment.id) {
          return {...eachAppointment, isStarred: !eachAppointment.isStarred}
        }
        return eachAppointment
      }),
    }))
  }

  getFilteredAppointmentsList = () => {
    const {appointmentList, isFilterActive} = this.state

    if (isFilterActive) {
      return appointmentList.filter(
        eachAppointment => eachAppointment.isStarred === true,
      )
    }
    return appointmentList
  }

  staredButtonClicked = () => {
    const {isFilterActive} = this.state
    this.setState({
      isFilterActive: !isFilterActive,
    })
  }

  render() {
    const {titleInput, dateInput, isStarred} = this.state
    const filterClassName = isStarred ? 'filter-filled' : 'filter-empty'
    const filteredAppointmentsList = this.getFilteredAppointmentsList()

    return (
      <div className="bg-container">
        <div className="container">
          <h1>Add Appointments</h1>
          <div className="main-container">
            <form className="formContainer" onSubmit={this.inputSubmit}>
              <label htmlFor="text">Title</label>
              <input
                type="text"
                placeholder="Title"
                id="text"
                onChange={this.titleChanged}
                value={titleInput}
              />
              <br />
              <label htmlFor="date">Date</label>
              <input
                type="date"
                placeholder="Date"
                is="date"
                onChange={this.dateChanged}
                value={dateInput}
              />
              <br />
              <button type="submit">Add</button>
            </form>
            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              alt="appointments"
            />
          </div>
          <div className="appointmentContainer">
            <div className="appointment-section">
              <h1>Appointments</h1>
              <button
                type="button"
                className={`starred ${filterClassName}`}
                onClick={this.staredButtonClicked}
              >
                Starred
              </button>
            </div>
            <ul className="appointment-container">
              {filteredAppointmentsList.map(eachAppointment => (
                <AppointmentItem
                  appointmentDetails={eachAppointment}
                  key={eachAppointment.id}
                  isToggledStar={this.isToggledStar}
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
