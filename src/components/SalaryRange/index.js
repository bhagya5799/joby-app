import './index.css'

const SalaryRange = props => {
  const {salaryDataList, activeSalaryId, changeSalaryRange} = props
  const {label, salaryRangeId} = salaryDataList
  const isChecked = activeSalaryId === salaryRangeId
  const onChangeSalaryRange = () => {
    changeSalaryRange(salaryRangeId)
  }

  return (
    <li className="li-salary">
      <input
        id={label}
        type="radio"
        className="check-box"
        checked={isChecked}
        onChange={onChangeSalaryRange}
      />
      <label htmlFor={label} className="label-para">
        {label}
      </label>
    </li>
  )
}

export default SalaryRange
