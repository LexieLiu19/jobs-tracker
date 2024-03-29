const FormRow = ({ type, name, value, handleChange, labelText }) => {
  return (
    <div className="form-row">
      <label className="form-label"> {labelText || name}</label>

      <input type={type} name={name} value={value} className="form-input" onChange={handleChange} />
    </div>
  );
};
export default FormRow;
