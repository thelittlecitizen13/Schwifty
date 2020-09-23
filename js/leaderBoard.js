function loadLeaderboard()
{
    var records = getRecords();
    for (record of records)
    {
        generateLeaderboardTableRecord(record.fullName, record.rank, record.gameTime, record.gameSize, record.date);
    }
}

function generateLeaderboardTableRecord(winnerFullName, winnerRank, gameTime, gameSize, currentDate)
{
    var tableRecord = document.createElement('tr');
    var tableDoc = document.createElement('td');
    tableDoc.innerHTML = winnerFullName;
    tableRecord.appendChild(tableDoc);
    tableDoc = document.createElement('td');
    tableDoc.innerHTML = winnerRank;
    tableRecord.appendChild(tableDoc);
    tableDoc = document.createElement('td');
    tableDoc.innerHTML = gameTime;
    tableRecord.appendChild(tableDoc);
    tableDoc = document.createElement('td');
    tableDoc.innerHTML = gameSize;
    tableRecord.appendChild(tableDoc);
    tableDoc = document.createElement('td');
    tableDoc.innerHTML = currentDate;
    tableRecord.appendChild(tableDoc);
    var table = document.getElementById('winnersTableRow');
    var tbody = table.getElementsByClassName("tablebody")[0];
    tbody.appendChild(tableRecord);

}

function generateDate()
{
    var objToday = new Date(),
	weekday = new Array('Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'),
	dayOfWeek = weekday[objToday.getDay()],
	domEnder = function() { var a = objToday; if (/1/.test(parseInt((a + "").charAt(0)))) return "th"; a = parseInt((a + "").charAt(1)); return 1 == a ? "st" : 2 == a ? "nd" : 3 == a ? "rd" : "th" }(),
	dayOfMonth = today + ( objToday.getDate() < 10) ? '0' + objToday.getDate() + domEnder : objToday.getDate() + domEnder,
	months = new Array('January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'),
	curMonth = months[objToday.getMonth()],
	curYear = objToday.getFullYear(),
	curHour = objToday.getHours() > 12 ? objToday.getHours() - 12 : (objToday.getHours() < 10 ? "0" + objToday.getHours() : objToday.getHours()),
	curMinute = objToday.getMinutes() < 10 ? "0" + objToday.getMinutes() : objToday.getMinutes(),
	curSeconds = objToday.getSeconds() < 10 ? "0" + objToday.getSeconds() : objToday.getSeconds(),
	curMeridiem = objToday.getHours() > 12 ? "PM" : "AM";
    var today = curHour + ":" + curMinute + "." + curSeconds + curMeridiem + " " + dayOfWeek + " " + dayOfMonth + " of " + curMonth + ", " + curYear;
    return today;
}

function storeRecord(record)
{
    var uid = uuidv4();
    localStorage.setItem(uid, JSON.stringify(record));
}

function getRecords()
{
    let values = [],
        keys = Object.keys(localStorage),
        i = keys.length;

    while ( i-- ) {
        values.push( JSON.parse(localStorage.getItem(keys[i])));
    }

    return values;
}

function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }

loadLeaderboard();