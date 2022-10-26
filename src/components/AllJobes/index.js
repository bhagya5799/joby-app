import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsSearch} from 'react-icons/bs'
import Header from '../Header'
import Profile from '../Profile'
import EmployeeType from '../EmployeeType'
import SalaryRange from '../SalaryRange'
import JobsList from '../JobsList'
import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const apiStatusConstant = {
  initial: 'INITIAL',
  inprogress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class AllJobs extends Component {
  state = {
    apiStatusProfile: apiStatusConstant.initial,
    profileDetails: {},
    apiStatusJobs: apiStatusConstant.initial,
    jobsListData: [],
    employeeType: [],
    salaryRange: '',
    searchInput: '',
  }

  componentDidMount() {
    this.getProfileData()
    this.getJobsList()
  }

  onEnterKey = event => {
    if (event.key === 'Enter') {
      this.getJobsList()
    }
  }

  changeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  changeSalaryRange = salaryId => {
    this.setState({salaryRange: salaryId}, this.getJobsList)
  }

  renderProfileDetailsInSuccess = () => {
    const {profileDetails} = this.state

    return <Profile userDetails={profileDetails} />
  }

  renderJobsInprogress = () => (
    <div className="loader-container" testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderProfileDetailsInprogress = () => (
    <div className="loader-container" testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  getJobsList = async () => {
    this.setState({apiStatusJobs: apiStatusConstant.inprogress})
    const {employeeType, salaryRange, searchInput} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/jobs?employment_type=${employeeType.join()}&minimum_package=${salaryRange}&search=${searchInput}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      const {jobs} = data
      const formattedData = jobs.map(eachJob => ({
        companyLogoUrl: eachJob.company_logo_url,
        employmentType: eachJob.employment_type,
        id: eachJob.id,
        jobDescription: eachJob.job_description,
        location: eachJob.location,
        packagePerAnnum: eachJob.package_per_annum,
        rating: eachJob.rating,
        title: eachJob.title,
      }))
      this.setState({
        jobsListData: formattedData,
        apiStatusJobs: apiStatusConstant.success,
      })
    } else {
      this.setState({apiStatusJobs: apiStatusConstant.failure})
    }
  }

  getProfileData = async () => {
    this.setState({apiStatusProfile: apiStatusConstant.inprogress})
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/profile'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    const data = await response.json()
    const profileDetails = data.profile_details
    if (response.ok === true) {
      const updatedProfileDetails = {
        name: profileDetails.name,
        profileImageUrl: profileDetails.profile_image_url,
        shortBio: profileDetails.short_bio,
      }
      this.setState({
        apiStatusProfile: apiStatusConstant.success,
        profileDetails: updatedProfileDetails,
      })
    } else {
      this.setState({apiStatusProfile: apiStatusConstant.failure})
    }
  }

  onAddAndRemoveEmployee = employmentId => {
    const {employeeType} = this.state

    if (employeeType.includes(employmentId)) {
      const updateEmployeeType = employeeType.filter(
        eachData => eachData !== employmentId,
      )
      this.setState({employeeType: updateEmployeeType}, this.getJobsList)
    } else {
      employeeType.push(employmentId)
      this.setState({employeeType: [...employeeType]}, this.getJobsList)
    }
  }

  renderNoJobs = () => (
    <div className="no-jobs-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        alt="no jobs"
      />
      <h1 className="no-jobs-heading">No Jobs Found</h1>
      <p className="no-jobs-para">
        We could not find any jobs. Try other filters
      </p>
    </div>
  )

  renderJobsInSuccess = () => {
    const {jobsListData} = this.state
    if (jobsListData.length === 0) {
      return this.renderNoJobs()
    }
    return (
      <div>
        <ul className="ul-jobs-list">
          {jobsListData.map(eachDataJob => (
            <JobsList jobsDetailsList={eachDataJob} key={eachDataJob.id} />
          ))}
        </ul>
      </div>
    )
  }

  renderJobsInFailure = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1 className="no-jobs-heading">Oops! Something Went Wrong</h1>
      <p className="no-jobs-para">
        We cannot seem to find the page you are looking for
      </p>
      <button className="btn" type="button" onClick={this.getJobsList}>
        Retry
      </button>
    </div>
  )

  renderJobListData = () => {
    const {apiStatusJobs} = this.state
    switch (apiStatusJobs) {
      case apiStatusConstant.inprogress:
        return this.renderJobsInprogress()
      case apiStatusConstant.success:
        return this.renderJobsInSuccess()
      case apiStatusConstant.failure:
        return this.renderJobsInFailure()
      default:
        return null
    }
  }

  renderProfileDetailsInFailure = () => (
    <div className="profile-failure">
      <button className="btn" type="button" onClick={this.getProfileData}>
        Retry
      </button>
    </div>
  )

  renderProfileDetails = () => {
    const {apiStatusProfile} = this.state

    switch (apiStatusProfile) {
      case apiStatusConstant.inprogress:
        return this.renderProfileDetailsInprogress()
      case apiStatusConstant.success:
        return this.renderProfileDetailsInSuccess()
      case apiStatusConstant.failure:
        return this.renderProfileDetailsInFailure()
      default:
        return null
    }
  }

  render() {
    const {employeeType, salaryRange, searchInput} = this.state
    console.log(employeeType, salaryRange)

    return (
      <div className="all-jobs-container">
        <Header />
        <div className="all-jobs-sub-container">
          <div className="profile-container">
            {this.renderProfileDetails()}
            <hr className="hr-line" />
            <div className="type-employee-container">
              <h1 className="employee-heading">Type of Employment</h1>
              <ul className="ul-employee">
                {employmentTypesList.map(eachEmployee => (
                  <EmployeeType
                    key={eachEmployee.label}
                    employeeDataList={eachEmployee}
                    onAddAndRemoveEmployee={this.onAddAndRemoveEmployee}
                  />
                ))}
              </ul>
            </div>
            <hr className="hr-line" />
            <div className="type-employee-container">
              <h1 className="employee-heading">Salary Range</h1>
              <ul className="ul-employee">
                {salaryRangesList.map(eachSalary => (
                  <SalaryRange
                    key={eachSalary.label}
                    salaryDataList={eachSalary}
                    activeSalaryId={salaryRange}
                    changeSalaryRange={this.changeSalaryRange}
                  />
                ))}
              </ul>
            </div>
          </div>
          <div className="job-list-container">
            <div className="search-input-container">
              <input
                type="search"
                className="search-input"
                value={searchInput}
                onChange={this.changeSearchInput}
                onKeyDown={this.onEnterKey}
              />
              <button
                type="button"
                className="btn-search"
                testid="searchButton"
                onClick={this.getJobsList}
              >
                <BsSearch className="search-icon" />
              </button>
            </div>

            {this.renderJobListData()}
          </div>
        </div>
      </div>
    )
  }
}

export default AllJobs
