import React, { useState } from "react";
import { Button } from "../../styles/elements";
import IndividualBooking from "./IndividualBooking";
import { totalCosting, formateDate } from "../../Helper/Helper";

const DashboardMain = ({ data }) => {
  const [showIndividualData, setShowIndividualData] = useState(false);
  const [individualData, setIndividualData] = useState({});

  const getIndividualData = (e) => {
    e.preventDefault();

    const id = e.target.id;
    for (let i = 0; i < data.length; i++) {
      if (data[i]._id === id) {
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
              <h3 key={"h3" + index}>{index + 1})</h3>
              <h3 key={"bookingId" + index}>
                Booking ID:
                <span>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </span>
                {value._id}
              </h3>

              <h3 key={"costing" + index}>
                Costing:
                <span>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </span>
                ${totalCosting(value)}
              </h3>
              <h3 key={"date" + index}>
                Request Created:<span>&nbsp;&nbsp;&nbsp;</span>
                {formateDate(value.created)}
              </h3>
              <h3 key={"bookingStatus" + index}>
                Booking status:<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
                {value.approvalStatus}
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
