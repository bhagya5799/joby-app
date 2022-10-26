import './index.css'

const EmployeeType = props => {
  const {employeeDataList, onAddAndRemoveEmployee} = props
  const {label, employmentTypeId} = employeeDataList
  const onChangeEmployeeType = () => {
    onAddAndRemoveEmployee(employmentTypeId)
  }

  return (
    <li className="li-salary">
      <input
        id={label}
        type="checkbox"
        onChange={onChangeEmployeeType}
        className="check-box"
      />
      <label htmlFor={label} className="label-para">
        {label}
      </label>
    </li>
  )
}

export default EmployeeType
