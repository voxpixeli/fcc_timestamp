
const months =[ 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December' ];

function daysInMonth(month,year) {
    return new Date(year, month, 0).getDate();
}

function isInt(str) {
  return /^\+?[0-9]\d*$/.test(str);
}

module.exports = function(arg) {
  
  const darg = decodeURIComponent(arg);
  
  var date = undefined;
  
  // check natural date format, i.e. January 12, 2017  
  // check if date format is <Month day, year>
  var args = darg.split(' ');

  if (args.length==3) {  // 3 space-separated values
    if (months.indexOf(args[0]) > -1) {  // month ok
      var month = months.indexOf(args[0]);
      if (isInt(args[2])) { // year ok
        var year = +args[2];
        var arg1 = args[1].replace(',', '');
        if (isInt(arg1)) {
          var day = +arg1;
          if (day>0 && day<=daysInMonth(year, month)) { // day ok
            date = new Date(year, month, day);
          }
        }
      }
    }
  }
  
  // check unix timestamp format
  if(date == undefined) {
      if (isInt(darg)) {
        date = new Date();
        date.setTime(+darg);
      }
  }
  
  if(date == undefined) {
    return { 'unix': null, 'natural': null };
  } else {
    return { 'unix': date.getTime(), 'natural': months[date.getMonth()] + ' ' + date.getDate() + ', ' + date.getFullYear() };
  }
  
}

