import React, { useState } from "react";
import moment from "moment";
import { Button } from "../../styles/elements";
import IndividualBooking from "./IndividualBooking";
import { totalCosting, formateDate } from "../../Helper/Helper";

const DashboardMain = ({ data }) => {
  const [showIndividualData, setShowIndividualData] = useState(false);
  const [individualData, setIndividualData] = useState({});

  // const totalCosting = (value) => {
  //   var cost = 0;
  //   for (let i = 0; i < value.noOfEmployee; i++) {
  //     cost += value.employee[i].costing;
  //   }
  //   return cost;
  // };

  // const formateDate = (dateObj) => {
  //   var momentObj = moment(dateObj);
  //   var momentString = momentObj.format("dddd, MMMM Do YYYY h:mm:ss a");
  //   return momentString;
  // };

  const getIndividualData = (e) => {
    e.preventDefault();

    const id = e.target.id;
    for (let i = 0; i < data.length; i++) {
      if (data[i]._id === id) {
        // setIndividualData(JSON.stringify(data[i]));
        setIndividualData(data[i]);
        setShowIndividualData(true);
        break;
      }
    }
  };

  return (
    <div>
      {!showIndividualData ? (
        <div>
          <h2>Hi {data[0].applicantName}, these are your applications</h2>
          {data.map((value, index) => (
            <div key={"div" + index}>
              <h3 key={"bookingId" + index}>Booking ID: {value._id}</h3>

              <h3 key={"costing" + index}>Costing: ${totalCosting(value)}</h3>
              <h3 key={"date" + index}>
                Request Created: {formateDate(value.created)}
              </h3>
              <h3 key={"bookingStatus" + index}>
                Booking status: {value.approvalStatus}
              </h3>
              <Button
                key={"button" + index}
                margin
                id={value._id}
                onClick={(e) => getIndividualData(e)}
              >
                View Details
              </Button>
            </div>
          ))}
        </div>
      ) : (
        <div>
          <IndividualBooking data={individualData}></IndividualBooking>
          <Button margin onClick={(e) => setShowIndividualData(false)}>
            Back
          </Button>
        </div>
      )}
    </div>
  );
};

export default DashboardMain;
