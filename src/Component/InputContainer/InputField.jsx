import Images from "../../assets";

const InputField = ({error, value, setValue, label, icon, type, name, placeholder , textarea, props }) => {
    return (
      <>
      <div className={`input-pop-up-container ${type === 'date' ? 'w-40' : ''}`}>
        <label>
          <img src={icon} alt={`${label} Icon`} />
          <span>{label}</span>
        </label>

        {
          textarea ? 
          <textarea aname={name} placeholder={placeholder}>{value}</textarea>:
          <input value={value} type={type} name={name} placeholder={placeholder} onChange={(e)=>setValue(e)} {...props} />
        }
      
        {
          error && (
            <div className="error-input-field">
              <img  src={Images.icon_error} />
              <span>{error}</span>
            </div>
          )
        }
      </div>
      </>
      
    );
};

export default InputField;