const express = require("express");
const mongoose = require("mongoose");
const Booking = require("./Model/Booking");

const app = express();
const port = process.env.PORT || 5000;
const bodyParser = require("body-parser");
app.use(bodyParser.json());
// console.log that your server is up and running
app.listen(port, () => console.log(`Listening on port ${port}`));
mongoose.connect(
  `mongodb://localhost/test`,
  { useNewUrlParser: true, useUnifiedTopology: true },
  function (err) {
    if (err) throw err;
    console.log("connected to mongdb successfully");
  }
);

// create a GET route

app.get("/express_backend", (req, res) => {
  res.send({ express: "YOUR EXPRESS BACKEND IS CONNECTED TO REACT" });
});

app.get("/bookings", (req, res) => {
  const applicantName = req.query.applicantName; // query = {sex:"female"}
  const applicantContact = req.query.applicantContact;
  console.log(
    `applicantName ${applicantName} applicantContact ${applicantContact}`
  );
  Booking.find({
    applicantName: applicantName,
    applicantContact: applicantContact,
  })
    .sort("-created")
    .exec(function (err, bookings) {
      if (err) throw err;

      var jsonFormat = JSON.parse(JSON.stringify(bookings));
      console.log(jsonFormat);
      //console.log(jsonFormat[0].employee[0]);
      res.send(jsonFormat);
      // console.log(bookings.employee);
    });
});

app.get("/getAllBookings", async (req, res) => {
  Booking.find()
    .sort("-created")
    .exec(function (err, bookings) {
      if (err) throw err;

      var jsonFormat = JSON.parse(JSON.stringify(bookings));
      console.log(jsonFormat);
      //console.log(jsonFormat[0].employee[0]);
      res.send(jsonFormat);
      // console.log(bookings.employee);
    });
});

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

app.post("/submit", async (req, res) => {
  var data = req.body;
  console.log(data);

  const booking = new Booking({
    coyName: data.coyName,
    coyAddress: data.coyAddress,
    coyUEN: data.coyUEN,
    applicantName: data.applicantName,
    applicantContact: data.applicantContact,
    applicantEmail: data.applicantEmail,
    noOfEmployee: data.noOfEmployee,
  });
  for (let i = 0; i < data.noOfEmployee; i++) {
    console.log(data[`employeeName${i}`]);
    booking.employee.push({
      employeeName: data[`employeeName${i}`],
      employeeNric: data[`employeeNric${i}`],
      employeePassport: data[`employeePassport${i}`],
      countryOrigin: data[`countryOrigin${i}`],
      countryDestination: data[`countryDestination${i}`],
      fromDate: data[`fromDate${i}`],
      toDate: data[`toDate${i}`],
      costing: getRandomInt(1000, 5000),
    });
  }

  await booking
    .save()
    .then((data) => console.log(data))
    .catch((err) => console.log("error occur when saving"));

  console.log("check db");
  // res.setHeader("Content-Type", "application/json");
  // res.send(JSON.stringify({ message: "Message recieved successfully" }));
  res.json({ message: "recieved message successfully" });
});

app.post("/updateBooking", async (req, res) => {
  var data = req.body;
  console.log(data);
  await Booking.findByIdAndUpdate(
    `${data.id}`,
    {
      approvalStatus: data.approvalStatus,
    },
    { new: true },
    function (err, booking) {
      if (err) throw err;
      res.json({ message: "Updated successfully" });
    }
  );
});
