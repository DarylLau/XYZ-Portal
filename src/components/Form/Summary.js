import React from "react";

const Summary = ({ data }) => {
  const numberOfEmployee = Array(data["noOfEmployee"]).fill(null);
  console.log(data);
  //console.log(data["coyName"]);

  return (
    <div>
      <h1>Booking Details</h1>
      <h1>Company Details</h1>
      <h3>
        Name of company:
        <span>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </span>
        {data["coyName"]}
      </h3>
      <h3>
        Address of company:
        <span>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </span>{" "}
        {data["coyAddress"]}
      </h3>
      <h3>
        UEN of Company:
        <span>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </span>{" "}
        {data["coyUEN"]}
      </h3>
      <h1>Applicant Details</h1>
      <h3>
        Name of Applicant:
        <span>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </span>{" "}
        {data["applicantName"]}
      </h3>
      <h3>
        Contact of Applicant:
        <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>{" "}
        {data["applicantContact"]}
      </h3>
      <h3>
        Email of Applicant:
        <span>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </span>{" "}
        {data["applicantEmail"]}
      </h3>
      {numberOfEmployee.map((value, index) => (
        <div key={"div" + index}>
          <h1 key={"h3" + index}>Details of Employee {index + 1}</h1>
          <h3 key={"employeeName" + index}>
            Name of Employee:
            <span>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;
            </span>{" "}
            {data[`employeeName${index}`]}
          </h3>
          <h3 key={"employeeNric" + index}>
            NRIC/FIN:{" "}
            <span>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </span>
            {data[`employeeNric${index}`]}
          </h3>
          <h3 key={"employeePassport" + index}>
            Passport No:
            <span>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </span>{" "}
            {data[`employeePassport${index}`]}
          </h3>
          <h3 key={"countryOrigin" + index}>
            Country of Origin:
            <span>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </span>{" "}
            {data[`countryOrigin${index}`]}
          </h3>
          <h3 key={"countryDestination" + index}>
            Country of Destination: <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
            {data[`countryDestination${index}`]}
          </h3>
          <h3 key={"fromDate" + index}>
            From Date:
            <span>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </span>{" "}
            {data[`fromDate${index}`]}
          </h3>
          <h3 key={"toDate" + index}>
            To Date:
            <span>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </span>{" "}
            {data[`toDate${index}`]}
          </h3>
        </div>
      ))}
    </div>
  );
};

export default Summary;
