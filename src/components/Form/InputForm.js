import React, { useState, useRef, useEffect } from "react";
import InputField from "./InputField";
import moment from "moment";
import Summary from "./Summary";

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
  const [edit, setEdit] = useState(false);

  console.log(inputRefs);
  console.log(inputRefs.current[1]);
  console.log(inputRefs.current[6][0][0]);
  console.log("render");
  console.log(date);

  const handleChange = (name, value) => {
    // setData((prev) => ({ ...prev, [name]: value })); //not supported in IE/ edge
    setData((prev) => Object.assign({}, prev, { [name]: value }));
  };

  useEffect(() => {
    handleChange("noOfEmployee", noOfEmployee.length);
    //InsertStartingDateIfNotExist();
  }, [noOfEmployee]);

  const submitForm = (e) => {
    e.preventDefault();

    console.log(data);

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
    console.log("logged in");
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
    console.log("From date: " + fromDateStr + " ,to Date: " + toDateStr);
    var fromDate;
    var toDate;
    if (fromDateStr != null) fromDate = moment(fromDateStr, "YYYY-MM-DD");
    else fromDate = moment().startOf("day");
    if (toDateStr != null) toDate = moment(toDateStr, "YYYY-MM-DD");
    else toDate = moment().startOf("day");
    console.log(
      "From date: " +
        fromDate.format("YYYY-MM-DD") +
        " ,to Date: " +
        toDate.format("YYYY-MM-DD")
    );
    if (fromDate.isSameOrBefore(toDate)) {
      return toDate.format("YYYY-MM-DD");
    } else {
      return fromDate.format("YYYY-MM-DD");
    }
  };

  const InsertStartingDateIfNotExist = () => {
    for (let i = 0; i < noOfEmployee.length; i++) {
      if (!data[`fromDate${i}`]) {
        handleChange(`fromDate${i}`, date);
      }
      if (!data[`toDate${i}`]) {
        handleChange(`toDate${i}`, date);
      }
    }
    //var origDate = value ? value : date;
  };

  /* <WeatherEngine location="sydney, au" />
    <WeatherEngine location="london, gb" /> */

  return (
    <div>
      {!showSummary ? (
        <div>
          <form onSubmit={submitForm} className="form">
            <h1>React register form</h1>
            <InputField
              ref={inputRefs.current[0]}
              name="coyName"
              label="Name of Company*:"
              onChange={handleChange}
              validation={"required"}
              value={data["coyName"]}
            />
            <InputField
              ref={inputRefs.current[1]}
              name="coyAddress"
              label="Address of Company*:"
              onChange={handleChange}
              validation={"required"}
              value={data["coyAddress"]}
            />
            <InputField
              ref={inputRefs.current[2]}
              name="coyUEN"
              label="Unique Entity Number (UEN) of company:"
              onChange={handleChange}
              validation={"required|UEN"}
              value={data["coyUEN"]}
            />
            <InputField
              ref={inputRefs.current[3]}
              name="applicantName"
              label="Name of Applicant*:"
              onChange={handleChange}
              validation={"required"}
              value={data["applicantName"]}
            />
            <InputField
              ref={inputRefs.current[4]}
              name="applicantContact"
              label="Contact of Applicant*:"
              onChange={handleChange}
              validation={"required|contact"}
              value={data["applicantContact"]}
            />
            <InputField
              ref={inputRefs.current[5]}
              name="applicantEmail"
              label="Email of Applicant*:"
              onChange={handleChange}
              validation={"required|email"}
              value={data["applicantEmail"]}
            />
            <button onClick={(e) => handleAdd(e)}>Add</button>
            <h3>{noOfEmployee.length}</h3>
            <button onClick={(e) => handleMinus(e)}>Minus</button>
            {noOfEmployee.map((value, index) => (
              <div key={"div" + index}>
                <h3 key={"h3" + index}>Details of Employee {index + 1}</h3>
                <InputField
                  key={"employeeName" + index}
                  ref={inputRefs.current[6][index][0]}
                  name={"employeeName" + index}
                  label={"Name of employee*"}
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
                  label={"Passport No.*"}
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
            <button type="submit">Continue</button>
          </form>
        </div>
      ) : (
        <div classname="form">
          <Summary data={data} />
          <button onClick={() => setShowSummary(false)}>Edit</button>
          <button onClick={() => setShowSummary(false)}>Submit</button>
        </div>
      )}
    </div>
  );

  // const Home = () => (
  //   <div>
  //     <h1>Home Page</h1>
  //     <h1>App</h1>
  //     <form></form>
  //     {/* <WeatherEngine location="sydney, au" />
  //   <WeatherEngine location="london, gb" /> */}
  //   </div>
  // );
};

export default InputForm;
