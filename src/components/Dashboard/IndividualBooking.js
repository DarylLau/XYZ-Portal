import React, { useState } from "react";

const IndividualBooking = ({ data }) => {
  const numberOfEmployee = Array(data.noOfEmployee).fill(null);
  const employees = data.employee;
  console.log(employees[0]);
  return (
    <div>
      <h1>Booking Details of {data._id}</h1>
      <h1>Approval Status: {data.approvalStatus}</h1>
      <h2>Company Details</h2>
      <h3>Company Name: {data.coyName}</h3>
      <h3>Company Address: {data.coyAddress}</h3>
      <h3>Company UEN: {data.coyUEN}</h3>
      <h2>Applicant Details</h2>
      <h3>Applicant Name: {data.applicantName}</h3>
      <h3>Applicant Contact: {data.applicantContact}</h3>
      <h3>Applicant Email: {data.applicantEmail}</h3>
      {numberOfEmployee.map((value, index) => (
        <div key={"divKey" + index}>
          <h2 key={"employee" + index}>Employee {index + 1} detail</h2>
          <h3 key={"employeeName" + index}>
            Employee Name : {employees[index].employeeName}
          </h3>
          <h3 key={"employeeNric" + index}>
            Employee Nric : {employees[index].employeeNric}
          </h3>
          <h3 key={"employeePassport" + index}>
            Employee Passport : {employees[index].employeePassport}
          </h3>
          <h3 key={"countryOrigin" + index}>
            Country of Origin : {employees[index].countryOrigin}
          </h3>
          <h3 key={"countryDestination" + index}>
            Country of Destination : {employees[index].countryDestination}
          </h3>
          <h3 key={"fromDate" + index}>
            From Date : {employees[index].fromDate}
          </h3>
          <h3 key={"toDate" + index}>To Date : {employees[index].toDate}</h3>
          <h3 key={"costing" + index}>Costing : ${employees[index].costing}</h3>
        </div>
      ))}
    </div>
  );
};

export default IndividualBooking;
