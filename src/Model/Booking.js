const mongoose = require(`mongoose`);

const BookingSchema = mongoose.Schema({
  noOfEmployee: Number,
  coyName: String,
  coyAddress: String,
  coyUEN: String,
  applicantName: String,
  applicantContact: Number,
  applicantEmail: String,
  approvalStatus: { type: String, default: "Pending" },
  employee: [
    {
      employeeName: String,
      employeeNric: String,
      employeePassport: String,
      countryOrigin: String,
      countryDestination: String,
      fromDate: String,
      toDate: String,
      costing: Number,
    },
  ],
  created: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Bookings", BookingSchema);
