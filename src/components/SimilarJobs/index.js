import {AiFillStar} from 'react-icons/ai'
import {ImLocation} from 'react-icons/im'
import {BsFillBriefcaseFill} from 'react-icons/bs'

import './index.css'

const SimilarJobs = props => {
  const {similarJobsList} = props
  const {
    title,
    companyLogoUrl,
    rating,
    jobDescription,
    location,
    employmentType,
  } = similarJobsList

  return (
    <li>
      <div className="card-container">
        <div className="job-details-logo-title-container">
          <img
            src={companyLogoUrl}
            alt="similar job company logo"
            className="job-details-logo"
          />
          <div className="star-title-container">
            <h1 className="jobs-heading">{title}</h1>
            <div className="star-rating-container">
              <AiFillStar className="star" />
              <p className="rating-para">{rating}</p>
            </div>
          </div>
        </div>
        <h1 className="description-heading">Description</h1>
        <p className="location-para">{jobDescription}</p>
        <div className="location-container">
          <ImLocation className="location-icon" />
          <p className="location-para">{location}</p>
          <BsFillBriefcaseFill className="location-icon" />
          <p className="location-para">{employmentType}</p>
        </div>
      </div>
    </li>
  )
}

export default SimilarJobs
