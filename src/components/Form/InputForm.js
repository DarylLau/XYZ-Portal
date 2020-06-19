import React, { useState, useRef, useEffect } from "react";
import InputField from "./InputField";
import moment from "moment";
import Summary from "./Summary";
import styled from "@emotion/styled";
import { Form, FormH1, FormH3, Row, Button } from "../../styles/elements";

const InputForm = () => {
  const noOfNonDynamicFields = 6;
  const employeeNoOfFields = Array(7).fill(null);
  const [noOfEmployee, setNoOfEmployee] = useState(Array(1).fill(null));
  const [data, setData] = useState({});
  const date = moment().startOf("day").format("YYYY-MM-DD"); //new Date().toISOString().substr(0, 10);

  const inputRefs = useRef([
    React.createRef(),
    React.createRef(),
    React.createRef(),
    React.createRef(),
    React.createRef(),
    React.createRef(),
    noOfEmployee.map(() => employeeNoOfFields.map(() => React.createRef())),
  ]);

  const [showSummary, setShowSummary] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (name, value) => {
    // setData((prev) => ({ ...prev, [name]: value })); //not supported in IE/ edge
    setData((prev) => Object.assign({}, prev, { [name]: value }));
  };

  //so it refreshes everything the number of employee is updated
  useEffect(() => {
    handleChange("noOfEmployee", noOfEmployee.length);
  }, [noOfEmployee]);

  const submitForm = (e) => {
    e.preventDefault();

    let isValid = true;

    for (let i = 0; i < inputRefs.current.length; i++) {
      var valid = true;

      if (i === noOfNonDynamicFields) {
        for (let j = 0; j < noOfEmployee.length; j++) {
          for (let k = 0; k < employeeNoOfFields.length; k++) {
            console.log("i :" + i + " j " + j + " K " + k);
            valid = inputRefs.current[i][j][k].current.validate();
          }
        }
      } else {
        valid = inputRefs.current[i].current.validate();
      }
      console.log(valid);
      if (!valid) {
        isValid = false;
      }
    }
    if (!isValid) {
      return;
    }
    setShowSummary(true);
  };

  const handleAdd = (e) => {
    e.preventDefault();
    inputRefs.current[6].push(employeeNoOfFields.map((i) => React.createRef()));

    setNoOfEmployee((prev) => [...prev, null]);
  };

  const handleMinus = (e) => {
    e.preventDefault();
    if (noOfEmployee.length > 1) {
      const list = [...noOfEmployee];
      list.splice(list.length - 1, 1);
      setNoOfEmployee(list);
      inputRefs.current[6].pop(employeeNoOfFields.map(() => React.createRef()));
    }
  };

  const getToDateValue = (fromDateStr, toDateStr) => {
    var fromDate;
    var toDate;
    if (fromDateStr != null) fromDate = moment(fromDateStr, "YYYY-MM-DD");
    else fromDate = moment().startOf("day");
    if (toDateStr != null) toDate = moment(toDateStr, "YYYY-MM-DD");
    else toDate = moment().startOf("day");

    if (fromDate.isSameOrBefore(toDate)) {
      return toDate.format("YYYY-MM-DD");
    } else {
      return fromDate.format("YYYY-MM-DD");
    }
  };

  const postData = async (data, e) => {
    e.preventDefault();
    setSubmitted(true);
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };

    fetch(`./submit`, requestOptions)
      .then(async (response) => {
        const message = await response.json();

        // check for error response
        if (!response.ok) {
          // get error message from body or default to response status
          const error = (message && message.message) || response.status;
          return Promise.reject(error);
        }
        console.log(response);
        console.log(message);
        setSubmitSuccess(true);
      })
      .catch((error) => {
        setSubmitSuccess(false);
        console.error("There was an error!", error);
      });
  };

  /* <WeatherEngine location="sydney, au" />
    <WeatherEngine location="london, gb" /> */

  return (
    <div>
      {!showSummary ? (
        <div>
          <Form onSubmit={submitForm} className="form">
            <FormH1>Registration Form</FormH1>
            <h2>Company Details</h2>
            <InputField
              ref={inputRefs.current[0]}
              name="coyName"
              label="Name of Company*"
              onChange={handleChange}
              validation={"required"}
              value={data["coyName"]}
            />
            <InputField
              ref={inputRefs.current[1]}
              name="coyAddress"
              label="Address of Company*"
              onChange={handleChange}
              validation={"required"}
              value={data["coyAddress"]}
            />
            <InputField
              ref={inputRefs.current[2]}
              name="coyUEN"
              label="Unique Entity Number (UEN) of company"
              onChange={handleChange}
              validation={"required|UEN"}
              value={data["coyUEN"]}
            />
            <h2>Applicant Details</h2>
            <InputField
              ref={inputRefs.current[3]}
              name="applicantName"
              label="Name of Applicant*"
              onChange={handleChange}
              validation={"required"}
              value={data["applicantName"]}
            />
            <InputField
              ref={inputRefs.current[4]}
              name="applicantContact"
              label="Contact of Applicant*"
              onChange={handleChange}
              validation={"required|contact"}
              value={data["applicantContact"]}
            />
            <InputField
              ref={inputRefs.current[5]}
              name="applicantEmail"
              label="Email of Applicant*"
              onChange={handleChange}
              validation={"required|email"}
              value={data["applicantEmail"]}
            />
            <Row>
              <Button onClick={(e) => handleAdd(e)}>Add</Button>
              <FormH3> {noOfEmployee.length} </FormH3>
              <Button onClick={(e) => handleMinus(e)}>Minus</Button>
            </Row>
            {noOfEmployee.map((value, index) => (
              <div key={"div" + index}>
                <h2 key={"h3" + index}>Details of Employee {index + 1}</h2>
                <InputField
                  key={"employeeName" + index}
                  ref={inputRefs.current[6][index][0]}
                  name={"employeeName" + index}
                  label={"Name of Employee*"}
                  onChange={handleChange}
                  validation={"required"}
                  value={data[`employeeName${index}`]}
                />
                <InputField
                  key={"employeeNric" + index}
                  ref={inputRefs.current[6][index][1]}
                  name={"employeeNric" + index}
                  label={"NRIC/FIN "}
                  onChange={handleChange}
                  value={data[`employeeNric${index}`]}
                />
                <InputField
                  key={"employeePassport" + index}
                  ref={inputRefs.current[6][index][2]}
                  name={"employeePassport" + index}
                  label={"Passport No*"}
                  onChange={handleChange}
                  validation={"required"}
                  value={data[`employeePassport${index}`]}
                />
                <InputField
                  key={"countryOrigin" + index}
                  ref={inputRefs.current[6][index][3]}
                  name={"countryOrigin" + index}
                  label={"Country of Origin*"}
                  onChange={handleChange}
                  validation={"required"}
                  value={data[`countryOrigin${index}`]}
                />
                <InputField
                  key={"countryDestination" + index}
                  ref={inputRefs.current[6][index][4]}
                  name={"countryDestination" + index}
                  label={"Country of Destination*"}
                  onChange={handleChange}
                  validation={"required"}
                  value={data[`countryDestination${index}`]}
                />
                <InputField
                  key={"fromDate" + index}
                  ref={inputRefs.current[6][index][5]}
                  name={"fromDate" + index}
                  label={"From Date"}
                  onChange={handleChange}
                  type={"Date"}
                  validation={"required|startDate"}
                  // value={
                  //   data[`fromDate${index}`]
                  //     ? data[`fromDate${index}`]
                  //     : `${date}`
                  // }
                  value={data[`fromDate${index}`]}
                  min={`${date}`}
                />
                <InputField
                  key={"toDate" + index}
                  ref={inputRefs.current[6][index][6]}
                  name={"toDate" + index}
                  label={"To Date"}
                  onChange={handleChange}
                  type={"Date"}
                  validation={"required|endDate"}
                  // value={getToDateValue(
                  //   data[`fromDate${index}`],
                  //   data[`toDate${index}`]
                  // )}
                  value={data[`toDate${index}`]}
                  min={
                    data[`fromDate${index}`]
                      ? data[`fromDate${index}`]
                      : `${date}`
                  }
                />
              </div>
            ))}
            <Button margin type="submit">
              Continue
            </Button>
          </Form>
        </div>
      ) : (
        <Form>
          <Summary data={data} />
          <Row>
            <Button
              margin
              onClick={() => {
                setShowSummary(false);
                setSubmitted(false);
              }}
            >
              Edit
            </Button>
            <Button margin onClick={(e) => postData(data, e)}>
              Submit
            </Button>
          </Row>
          {submitted ? (
            submitSuccess ? (
              <h1>Submitted success</h1>
            ) : (
              <h2>Please try again, server may not be on</h2>
            )
          ) : null}
        </Form>
      )}
    </div>
  );
};

export default InputForm;
