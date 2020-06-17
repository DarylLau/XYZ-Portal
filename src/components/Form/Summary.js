import React from "react";

const Summary = ({ data }) => {
  const numberOfEmployee = Array(data["noOfEmployee"]).fill(null);
  console.log(data);
  //console.log(data["coyName"]);

  return (
    <div>
      <h1>Booking Details</h1>
      <h1>Company Details</h1>
      <h2>Name of company: {data["coyName"]}</h2>
      <h2>Address of company: {data["coyAddress"]}</h2>
      <h2>UEN of Company: {data["coyUEN"]}</h2>
      <h1>Applicant Details</h1>
      <h2>Name of Applicant: {data["applicantName"]}</h2>
      <h2>Contact of Applicant: {data["applicantContact"]}</h2>
      <h2>Email of Applicant: {data["applicantEmail"]}</h2>
      {numberOfEmployee.map((value, index) => (
        <div key={"div" + index}>
          <h1 key={"h3" + index}>Details of Employee {index + 1}</h1>
          <h2 key={"employeeName" + index}>
            Name of Employee: {data[`employeeName${index}`]}
          </h2>
          <h2 key={"employeeNric" + index}>
            NRIC/FIN: {data[`employeeNric${index}`]}
          </h2>
          <h2 key={"employeePassport" + index}>
            Passport No.: {data[`employeePassport${index}`]}
          </h2>
          <h2 key={"countryOrigin" + index}>
            Country of Origin: {data[`countryOrigin${index}`]}
          </h2>
          <h2 key={"countryDestination" + index}>
            Country of Destination: {data[`countryDestination${index}`]}
          </h2>
          <h2 key={"fromDate" + index}>
            From Date: {data[`fromDate${index}`]}
          </h2>
          <h2 key={"toDate" + index}>To Date: {data[`toDate${index}`]}</h2>
        </div>
      ))}
    </div>
  );
};

export default Summary;
