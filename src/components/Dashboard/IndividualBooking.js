import React from "react";

const IndividualBooking = ({ data }) => {
  const numberOfEmployee = Array(data.noOfEmployee).fill(null);
  const employees = data.employee;
  console.log(employees[0]);
  return (
    <div>
      <h1>Booking Details of {data._id}</h1>
      <h1>Approval Status: {data.approvalStatus}</h1>
      <h2>Company Details</h2>
      <h3>
        Company Name:
        <span>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </span>
        {data.coyName}
      </h3>
      <h3>
        Company Address:
        <span>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </span>
        {data.coyAddress}
      </h3>
      <h3>
        Company UEN:
        <span>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </span>
        {data.coyUEN}
      </h3>
      <h2>Applicant Details</h2>
      <h3>
        Applicant Name:
        <span>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </span>
        {data.applicantName}
      </h3>
      <h3>
        Applicant Contact:
        <span>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </span>
        {data.applicantContact}
      </h3>
      <h3>
        Applicant Email:
        <span>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </span>
        {data.applicantEmail}
      </h3>
      {numberOfEmployee.map((value, index) => (
        <div key={"divKey" + index}>
          <h2 key={"employee" + index}>Employee {index + 1} detail</h2>
          <h3 key={"employeeName" + index}>
            Employee Name:
            <span>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </span>
            {employees[index].employeeName}
          </h3>
          <h3 key={"employeeNric" + index}>
            Employee Nric:
            <span>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </span>
            {employees[index].employeeNric}
          </h3>
          <h3 key={"employeePassport" + index}>
            Employee Passport:
            <span>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </span>
            {employees[index].employeePassport}
          </h3>
          <h3 key={"countryOrigin" + index}>
            Country of Origin:
            <span>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </span>
            {employees[index].countryOrigin}
          </h3>
          <h3 key={"countryDestination" + index}>
            Country of Destination:
            <span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
            {employees[index].countryDestination}
          </h3>
          <h3 key={"fromDate" + index}>
            From Date:
            <span>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </span>
            {employees[index].fromDate}
          </h3>
          <h3 key={"toDate" + index}>
            To Date:
            <span>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </span>
            {employees[index].toDate}
          </h3>
          <h3 key={"costing" + index}>
            Costing:
            <span>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </span>
            ${employees[index].costing}
          </h3>
        </div>
      ))}
    </div>
  );
};

export default IndividualBooking;
