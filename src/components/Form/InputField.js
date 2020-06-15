import React, { useState, forwardRef, useImperativeHandle } from "react";

const InputField = forwardRef((props, ref) => {
  const [value, setValue] = useState(props.value);
  const [error, setError] = useState("");

  const handleChange = (event) => {
    setValue(event.target.value);
    setError("");
    //pass to parent component - sort of calling the event of parent
    props.onChange(event.target.name, event.target.value);
  };

  const validate = () => {
    if (props.validation) {
      const rules = props.validation.split("|");
      for (let i = 0; i < rules.length; i++) {
        const currentRule = rules[i];

        if (currentRule === "required") {
          if (!value) {
            setError("This field is required");
            return false;
          }
        }
      }
    }
    return true;
  };

  useImperativeHandle(ref, () => {
    return {
      validate: () => validate(),
    };
  });

  return (
    <div className="input-wrapper">
      {props.label && <label>{props.label}</label>}
      <input
        placeholder={props.placeholder}
        name={props.name}
        onChange={(event) => handleChange(event)}
        type={props.type}
        value={props.value ? props.value : value} //empty use value from local state
        autoComplete={props.autoComplete}
        min={props.min}
        max={props.max}
      ></input>
      {error && <p className="error">{error}</p>}
    </div>
  );
});

InputField.defaultProps = {
  placeholder: "",
  name: "",
  type: "text",
  value: "",
  autoComplete: "off",
  validation: "",
  min: "",
  max: "",
};

export default InputField;
