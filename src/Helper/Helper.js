import moment from "moment";

export const totalCosting = (value) => {
  var cost = 0;
  for (let i = 0; i < value.noOfEmployee; i++) {
    cost += value.employee[i].costing;
  }
  return cost;
};

export const formateDate = (dateObj) => {
  var momentObj = moment(dateObj);
  var momentString = momentObj.format("dddd, MMMM Do YYYY h:mm:ss a");
  return momentString;
};

//actually wanted to use this to fit into the toDate value
export const getToDateValue = (fromDateStr, toDateStr) => {
  var fromDate;
  var toDate;
  if (fromDateStr != null) fromDate = moment(fromDateStr, "YYYY-MM-DD");
  else fromDate = moment().startOf("day");
  if (toDateStr != null) toDate = moment(toDateStr, "YYYY-MM-DD");
  else toDate = moment().startOf("day");

  if (fromDate.isSameOrBefore(toDate)) {
    return toDate.format("YYYY-MM-DD");
  } else {
    return fromDate.format("YYYY-MM-DD");
  }
};
