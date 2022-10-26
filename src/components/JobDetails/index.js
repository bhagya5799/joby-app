import {Component} from 'react'
import Cookies from 'js-cookie'
import {AiFillStar} from 'react-icons/ai'
import {ImLocation} from 'react-icons/im'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {FiExternalLink} from 'react-icons/fi'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import Skills from '../Skills'
import SimilarJobs from '../SimilarJobs'
import './index.css'

const apiStatusConstant = {
  initial: 'INITIAL',
  inprogress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class JobsDetails extends Component {
  state = {apiStatus: apiStatusConstant.initial, jobDetailsList: []}

  componentDidMount() {
    this.getJobDetailsData()
  }

  getJobDetailsData = async () => {
    this.setState({apiStatus: apiStatusConstant.inprogress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    const data = await response.json()
    console.log(data)

    if (response.ok === true) {
      const updateData = {
        companyLogoUrl: data.job_details.company_logo_url,
        companyWebsiteUrl: data.job_details.company_website_url,
        employmentType: data.job_details.employment_type,
        id: data.job_details.id,
        jobDescription: data.job_details.job_description,
        lifeAtCompany: {
          description: data.job_details.life_at_company.description,
          imageUrl: data.job_details.life_at_company.image_url,
        },
        location: data.job_details.location,
        packagePerAnnum: data.job_details.package_per_annum,
        rating: data.job_details.rating,
        skills: data.job_details.skills.map(eachData => ({
          name: eachData.name,
          imageUrl: eachData.image_url,
        })),
        title: data.job_details.title,
        similarJobs: data.similar_jobs.map(eachSimilar => ({
          id: eachSimilar.id,
          title: eachSimilar.title,
          companyLogoUrl: eachSimilar.company_logo_url,
          employmentType: eachSimilar.employment_type,
          jobDescription: eachSimilar.job_description,
          location: eachSimilar.location,
          rating: eachSimilar.rating,
        })),
      }
      this.setState({
        jobDetailsList: updateData,
        apiStatus: apiStatusConstant.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstant.failure})
    }
  }

  renderJobsDetailsInprogress = () => (
    <div className="loader-container" testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderJobsDetailsInSuccess = () => {
    const {jobDetailsList} = this.state
    const {
      companyLogoUrl,
      title,
      rating,
      location,
      employmentType,
      packagePerAnnum,
      jobDescription,
      companyWebsiteUrl,
      skills,
      lifeAtCompany,
      similarJobs,
    } = jobDetailsList
    const {description, imageUrl} = lifeAtCompany

    return (
      <div className="alt-container">
        <div className="details-container">
          <div className="job-details-logo-title-container">
            <img
              src={companyLogoUrl}
              alt="job details company logo"
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
          <div className="location-employee-type-container">
            <h1 className="description-heading">Description</h1>
            <div>
              <a href={companyWebsiteUrl} className="link color-element">
                Visit
                <FiExternalLink />
              </a>
            </div>
          </div>
          <p className="location-para">{jobDescription}</p>
          <h1 className="description-heading">Skills</h1>
          <ul className="ul-job-details-container">
            {skills.map(eachSkills => (
              <Skills listOfSkills={eachSkills} key={eachSkills.name} />
            ))}
          </ul>
          <h1 className="description-heading">Life at Company</h1>
          <div className="life-container">
            <p className="location-para">{description}</p>
            <img
              src={imageUrl}
              alt="life at company"
              className="life-at-company-image"
            />
          </div>
        </div>
        <h1 className="description-heading">Similar Jobs</h1>
        <ul className="ul-job-details-container">
          {similarJobs.map(eachSimilarJobs => (
            <SimilarJobs
              key={eachSimilarJobs.id}
              similarJobsList={eachSimilarJobs}
            />
          ))}
        </ul>
      </div>
    )
  }

  renderJobsDetailsInFailure = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1 className="no-jobs-heading">Oops! Something Went Wrong</h1>
      <p className="no-jobs-para">
        We cannot seem to find the page you are looking for
      </p>
      <button className="btn" type="button" onClick={this.getJobDetailsData}>
        Retry
      </button>
    </div>
  )

  renderJobDetails = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstant.inprogress:
        return this.renderJobsDetailsInprogress()
      case apiStatusConstant.success:
        return this.renderJobsDetailsInSuccess()
      case apiStatusConstant.failure:
        return this.renderJobsDetailsInFailure()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="bg-job-details-container">
        <Header />
        <div className="sub-job-details-container">
          {this.renderJobDetails()}
        </div>
      </div>
    )
  }
}

export default JobsDetails
