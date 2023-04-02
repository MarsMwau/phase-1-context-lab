/* Your Code Here */

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

// const allWagesFor = function () {
//     const eligibleDates = this.timeInEvents.map(function (e) {
//         return e.date
//     })

//     const payable = eligibleDates.reduce(function (memo, d) {
//         return memo + wagesEarnedOnDate.call(this, d)
//     }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

//     return payable
// }


function createEmployeeRecord(arr) {
    return {
      firstName: arr[0],
      familyName: arr[1],
      title: arr[2],
      payPerHour: arr[3],
      timeInEvents: [],
      timeOutEvents: []
    }
  }
  
  function createEmployeeRecords(arrOfArrs) {
    return arrOfArrs.map(createEmployeeRecord);
  }
  
  function createTimeInEvent(employeeRecord, dateTimeString) {
    const [date, time] = dateTimeString.split(" ");
    const timeIn = {
      type: "TimeIn",
      hour: parseInt(time),
      date: date
    };
    employeeRecord.timeInEvents.push(timeIn);
    return employeeRecord;
  }
  

  function createTimeOutEvent(employeeRecord, dateTimeString) {
    const [date, time] = dateTimeString.split(" ");
    const timeOut = {
      type: "TimeOut",
      hour: parseInt(time),
      date: date
    };
    employeeRecord.timeOutEvents.push(timeOut);
    return employeeRecord;
  }
  
  
  
  function hoursWorkedOnDate(employee, date) {
    const timeIn = employee.timeInEvents.find(event => event.date === date);
    const timeOut = employee.timeOutEvents.find(event => event.date === date);
    return (timeOut.hour - timeIn.hour) / 100;
  }
  
  function wagesEarnedOnDate(employee, date) {
    const hoursWorked = hoursWorkedOnDate(employee, date);
    return hoursWorked * employee.payPerHour;
  }
  
  function allWagesFor(employee) {
    const datesWorked = employee.timeInEvents.map(event => event.date);
    const wages = datesWorked.map(date => wagesEarnedOnDate(employee, date));
    return wages.reduce((total, wage) => total + wage, 0);
  }
  
  function calculatePayroll(employees) {
    return employees.reduce((total, employee) => total + allWagesFor(employee), 0);
  }
  
  function parseCsvData(csvData) {
    const rows = csvData.split('\n');
    const employeeData = rows.map(row => row.split(','));
    return createEmployeeRecords(employeeData);
  }
  
  const csvData = `John,Doe,CEO,40
  Jane,Doe,CTO,35`;
  
  const employees = parseCsvData(csvData);
  
  const john = employees[0];
  const jane = employees[1];
  
  createTimeInEvent(john, "2019-10-15 0900");
  createTimeOutEvent(john, "2019-10-15 1700");
  createTimeInEvent(jane, "2019-10-15 0900");
  createTimeOutEvent(jane, "2019-10-15 1600");
  
  console.log(allWagesFor(john)); // Output: 320
  console.log(allWagesFor(jane)); // Output: 245
  console.log(calculatePayroll(employees)); // Output: 565
  