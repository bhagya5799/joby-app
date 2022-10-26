import {AiFillStar} from 'react-icons/ai'
import {ImLocation} from 'react-icons/im'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {Link} from 'react-router-dom'
import './index.css'

const JobsList = props => {
  const {jobsDetailsList} = props
  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = jobsDetailsList

  return (
    <Link to={`jobs/${id}`} className="link">
      <li className="li-jobs-container">
        <div className="title-logo-container">
          <img src={companyLogoUrl} alt="company logo" className="each-logo" />
          <div className="star-title-container">
            <h1 className="jobs-heading">{title}</h1>
            <div className="star-rating-container">
              <AiFillStar className="star" />
              <p className="rating-para">{rating}</p>
            </div>
          </div>
        </div>
        <div className="location-employee-type-container">
          <div className="location-container">
            <ImLocation className="location-icon" />
            <p className="location-para">{location}</p>
            <BsFillBriefcaseFill className="location-icon" />
            <p className="location-para">{employmentType}</p>
          </div>
          <p className="lpa-para">{packagePerAnnum}</p>
        </div>
        <hr className="hr-line-job" />
        <h1 className="description-heading">Description</h1>
        <p className="location-para">{jobDescription}</p>
      </li>
    </Link>
  )
}

export default JobsList
