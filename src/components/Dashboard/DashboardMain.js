import React, { useState, useRef, useEffect } from "react";
import InputField from "../Form/InputField";
import { Form, FormH1, FormH3, Row, Button } from "../../styles/elements";

const DashboardMain = () => {
  const [data, setData] = useState({});
  const inputRefs = useRef([React.createRef(), React.createRef()]);

  const handleChange = (name, value) => {
    setData((prev) => Object.assign({}, prev, { [name]: value }));
  };

  const submitForm = (e) => {
    e.preventDefault();

    console.log(data);

    let isValid = true;

    for (let i = 0; i < inputRefs.current.length; i++) {
      var valid = inputRefs.current[i].current.validate();
      console.log(valid);
      if (!valid) {
        isValid = false;
      }
    }
    if (!isValid) {
      return;
    }
    console.log("logged in");
  };

  return (
    <div>
      <Form onSubmit={submitForm} className="form">
        <FormH1>Enter the details</FormH1>

        <InputField
          ref={inputRefs.current[0]}
          name="applicantName"
          label="Applicant Name*:"
          onChange={handleChange}
          validation={"required"}
          value={data["applicantName"]}
        />
        <InputField
          ref={inputRefs.current[1]}
          name="applicantContact"
          label="Applicant Contact*:"
          onChange={handleChange}
          validation={"required|contact"}
          value={data["applicantContact"]}
        />
        <Button margin type="submit">
          Continue
        </Button>
      </Form>
      <Form>
        <FormH1>Showing the details</FormH1>
      </Form>
    </div>
  );
};

export default DashboardMain;
