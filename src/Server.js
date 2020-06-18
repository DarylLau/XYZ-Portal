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
    applicantEmail: data.appplicantEmail,
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
  // for (let i = 0; i < data.noOfEmployee; i++){

  // }

  await booking
    .save()
    .then((data) => console.log(data))
    .catch((err) => console.log("error occur when saving"));

  console.log("check db");
  // res.setHeader("Content-Type", "application/json");
  // res.send(JSON.stringify({ message: "Message recieved successfully" }));
  res.json({ message: "recieved message successfully" });
});

app.get("/testRetrieve", async (req, res) => {
  try {
    const bookings = await Booking.find();
    console.log(bookings);
  } catch (err) {
    console.log(err);
  }
});
