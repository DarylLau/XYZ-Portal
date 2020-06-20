import React, { useState, useRef, useEffect } from "react";
import InputField from "../Form/InputField";
import { Form, FormH1, FormH3, Row, Button } from "../../styles/elements";
import DashboardMain from "./DashboardMain";

const DashboardLogin = () => {
  const [data, setData] = useState({});
  const inputRefs = useRef([React.createRef(), React.createRef()]);
  const [bookings, setBookings] = useState([]);
  const [showBooking, setShowBooking] = useState(false);

  const handleChange = (name, value) => {
    setData((prev) => Object.assign({}, prev, { [name]: value }));
  };

  const submitForm = async (e) => {
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
    const items = await getBookingDataByNameAndContact(
      data["applicantName"],
      data["applicantContact"]
    );

    setBookings(items);
    setShowBooking(true);
  };

  const getBookingDataByNameAndContact = async (name, contact) => {
    // e.preventDefault();
    // console.log("id is : " + e.target.id); // to know stuff later
    setBookings([]);
    const fetchItems = await fetch(
      `./bookings?applicantName=${name}&applicantContact=${contact}`
    );

    const items = await fetchItems.json();
    return items;
  };

  const returnToPreviousPage = (e) => {
    e.preventDefault();
    setBookings([]);
    setShowBooking(false);
  };

  return (
    <div>
      {!showBooking ? (
        <div>
          <Form onSubmit={submitForm} className="form">
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
              Check Bookings
            </Button>
            {/* <Button
              margin
              id="12345678"
              onClick={(e) => getBookingDataByNameAndContact("123", 1234)}
            >
              testbutton
            </Button> */}
          </Form>
        </div>
      ) : (
        <div>
          <Form>
            {bookings.length === 0 ? (
              <div>
                <h1>Opps! You have not register any booking yet</h1>
                <Button
                  margin
                  id="12345678"
                  onClick={(e) => returnToPreviousPage(e)}
                >
                  Back
                </Button>
              </div>
            ) : (
              <div>
                <DashboardMain data={bookings}></DashboardMain>
              </div>
            )}
          </Form>
        </div>
      )}
    </div>
  );
};

export default DashboardLogin;
