import React, { useState, forwardRef, useImperativeHandle } from "react";
import styled from "@emotion/styled";

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

        if (currentRule === "email") {
          var pattern = new RegExp(
            /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
          );

          if (!pattern.test(value)) {
            setError("Invalid email format");
            return false;
          }
        }

        if (currentRule === "UEN") {
          var pattern = new RegExp(
            /^((\d{8}[A-Z]{1})|(?:19|20)\d{7}[A-Z]{1})|((T|S|R)\d{2}(LP|LL|FC|PF|RF|MQ|MM|NB|CC|CS|MB|FM|GS|DP|CP|NR|CM|CD|MD|HS|VH|CH|MH|CL|XL|CX|RP|TU|TC|FB|FN|PA|PB|SS|MC|SM|GA|GB)\d{4}[A-Z]{1})$/
          );
          if (!pattern.test(value)) {
            setError("Not a valid UEN");
            return false;
          }
        }

        if (currentRule === "contact") {
          var pattern = new RegExp(/^[0-9]+$/);
          if (!pattern.test(value)) {
            setError("Please enter in numbers only");
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
        style={
          error ? { borderColor: "red", borderWidth: 1 } : { borderWidth: 0 }
        }
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
