import './index.css'

import {Link, withRouter} from 'react-router-dom'

import Cookies from 'js-cookie'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <div className="nav-container">
      <Link to="/">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
          className="logo-resize"
        />
      </Link>
      <ul className="ul-container">
        <Link to="/" className="link">
          <li className="nav-para">Home</li>
        </Link>
        <Link to="/jobs" className="link">
          <li className="nav-para">Jobs</li>
        </Link>
      </ul>
      <li>
        <button className="logout-btn" type="button" onClick={onClickLogout}>
          Logout
        </button>
      </li>
    </div>
  )
}

export default withRouter(Header)
