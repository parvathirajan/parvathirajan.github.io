export function dateDiff(date1, date2, what, msg = "") {
  var diff = Math.floor(date1.getTime() - date2.getTime());
  var day = 1000 * 60 * 60 * 24;
  var days = Math.floor(diff / day);
  var months = Math.floor(days / 31);
  var years = Math.floor(months / 12);

  if (what == "years") {
    var ret = years + msg;
  }

  // if (what == "months") {
  //   var ret = months + msg;
  // }

  // if (what == "days") {
  //   var ret = days + msg;
  // }

  return ret;
}

export function currentDateTime() {
  var today = new Date();
  var date = (today.getMonth() + 1).toString().padStart(2, "0") + "-" + today.getDate().toString().padStart(2, "0") + "-" + today.getFullYear();
  var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds().toString().padStart(2, "0");
  var dateTime = date + " " + time;
  return '"' + dateTime + '"';
}

