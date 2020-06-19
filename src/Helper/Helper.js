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
