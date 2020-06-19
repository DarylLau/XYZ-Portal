import React, { useState, useRef, useEffect } from "react";
import { Form, Button, Row } from "../../styles/elements";
import { totalCosting, formateDate } from "../../Helper/Helper";
import IndividualBooking from "../Dashboard/IndividualBooking";

const AdminBoard = () => {
  const [bookings, setBookings] = useState([]);
  const [showIndividualData, setShowIndividualData] = useState(false);
  const [individualData, setIndividualData] = useState({});
  useEffect(() => {
    fetchItems();
  }, [showIndividualData]);

  const fetchItems = async () => {
    try {
      const data = await fetch(`./getAllBookings`);
      const items = await data.json();
      setBookings(items);
      console.log("a" + items);
    } catch (e) {
      console.log("error");
    }
  };

  const getIndividualData = (e) => {
    e.preventDefault();

    const id = e.target.id;
    for (let i = 0; i < bookings.length; i++) {
      if (bookings[i]._id === id) {
        // setIndividualData(JSON.stringify(data[i]));
        setIndividualData(bookings[i]);
        setShowIndividualData(true);
        break;
      }
    }
  };

  const updateApproval = (str, e) => {
    e.preventDefault();
    console.log(e.target.id);

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: e.target.id,
        approvalStatus: str,
      }),
    };

    fetch(`./updateBooking`, requestOptions)
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
        setShowIndividualData(false);
      })
      .catch((error) => {
        console.error("There was an error!", error);
      });
  };

  return (
    <div>
      <Form>
        {!showIndividualData ? (
          <div>
            <h1>All applications received</h1>
            {bookings.map((value, index) => (
              <div key={"div" + index}>
                <h3 key={"h3" + index}>{index + 1})</h3>
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
            <Row>
              <Button margin onClick={(e) => setShowIndividualData(false)}>
                Back
              </Button>
              <Button
                margin
                id={individualData._id}
                onClick={(e) => updateApproval("Rejected", e)}
              >
                Reject
              </Button>
              <Button
                margin
                id={individualData._id}
                onClick={(e) => updateApproval("Approved", e)}
              >
                Approve
              </Button>
            </Row>
          </div>
        )}
      </Form>
    </div>
  );
};

export default AdminBoard;
