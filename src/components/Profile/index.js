import './index.css'

const Profile = props => {
  const {userDetails} = props
  const {name, profileImageUrl, shortBio} = userDetails

  return (
    <div className="profile">
      <img src={profileImageUrl} alt="profile" className="avatar" />
      <h1 className="name">{name}</h1>
      <p className="short-bio">{shortBio}</p>
    </div>
  )
}

export default Profile
