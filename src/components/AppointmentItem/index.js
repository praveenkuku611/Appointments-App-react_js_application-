import './index.css'

const AppointmentItem = props => {
  const {appointmentDetails, isToggledStar} = props
  const {id, title, date, isStarred} = appointmentDetails

  const starImageUrl = isStarred
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  const starClicked = () => {
    isToggledStar(id)
  }

  return (
    <li className="appointment-item">
      <div className="heading-section">
        <p>{title}</p>
        <button
          type="button"
          className="star-button"
          onClick={starClicked}
          data-testid="star"
        >
          <img src={starImageUrl} className="star-img" alt="star" />
        </button>
      </div>
      <p className="date-string">Date: {date}</p>
    </li>
  )
}

export default AppointmentItem
