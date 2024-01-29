const InputField = ({ type, name, value, onChange, placeholder }) => (
    <label className="input-container">
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className=""
      />
    </label>
);

export default InputField;