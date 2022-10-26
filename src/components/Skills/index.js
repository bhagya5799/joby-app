import './index.css'

const Skills = props => {
  const {listOfSkills} = props
  const {name, imageUrl} = listOfSkills

  return (
    <li className="li-skills-container">
      <img src={imageUrl} alt={name} className="skill-image" />
      <p className="skill-para">{name}</p>
    </li>
  )
}

export default Skills
