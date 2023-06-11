import './index.css'

const AppointmentItem = props => {
  const {appointmentDetails, toggleIsChanged} = props
  const {id, title, date, isStar} = appointmentDetails
  const startImage = isStar
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  const onChangeToggle = () => {
    toggleIsChanged(id)
  }
  return (
    <li className="list-container">
      <div className="inner-con">
        <p className="name">{title}</p>
        <button
          type="button"
          data-testid="star"
          className="btn"
          onClick={onChangeToggle}
        >
          <img src={startImage} className="star" alt="star" />
        </button>
      </div>
      <p className="date-para">Date: {date}</p>
    </li>
  )
}
export default AppointmentItem
