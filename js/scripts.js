var gameSize;
var emptySpot;
var gameTime;
var gameTimeInterval;

function startNewGame()
{
    if (validateInput())
    {
        createTable();
        checkTable();
        resetTimer();
        startTimer();
    }
    
}

function validateInput()
{
    gameSize = document.getElementById("gameSize").value;
    if (gameSize == '' || isNaN(gameSize) || gameSize < 2)
    {
        alert("Wrong game size! \nplease enter a number from 2 to infinity");
        return false;
    }
    return true;
}

function createTable()
{
    gameSize = document.getElementById("gameSize").value;
    var gameNumbers = gameSize*gameSize - 1;
    var randomNumbersArray;
    do
    {
        randomNumbersArray = generateRandomNumbersArray(gameNumbers);
        emptySpot = getEmptySpot(randomNumbersArray);
        randomNumbersArray[emptySpot] = '';
    }
    while(isArrayPlayable(randomNumbersArray) != true );
    generateTable(randomNumbersArray);
}

function generateRandomNumbersArray(arraySize)
{
    var numbersArray = [...Array(arraySize + 2).keys()]
    numbersArray.shift();
    numbersArray = shuffle(numbersArray);
    return numbersArray;
}

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
}

function getEmptySpot(numbers)
{
    var counter = 0;
    for (var i = 0; i<numbers.length; i++)
    {
        if (numbers[counter] == gameSize*gameSize)
        {
            return counter;
        }
        counter++;
    }
}

function isArrayPlayable(numbers)
{
    var oppositeCounter = 0;
    var emptySpotLine = ((emptySpot / gameSize) + 1) | 0
    for (var i = 0; i < numbers.length ; i++)
    {
        if (numbers[i] == '')
        {
            continue;
        }
        for (var j = i; j < numbers.length; j++)
        {
            if (numbers[j] != '' && numbers[i] > numbers[j])
            {
                oppositeCounter++;
            }
        }
    }
    if (gameSize % 2 != 0)
    {
        return oppositeCounter % 2 == 0;
    }
    else
    {
        return (oppositeCounter + emptySpotLine) % 2 == 0;
    }
}

function generateTable(randomNumbersArray)
{
    
    var tableDiv = document.getElementById("gameTableDiv");
    var counter = 0;
    tableDiv.innerHTML = "";
    var tbl = document.createElement('table');
    tbl.setAttribute("id", "gameTable");
    tbl.className = "h-100 w-100";
    tbl.setAttribute('border', '1');
    var tbdy = document.createElement('tbody');
    for (var i = 0; i < gameSize; i++) {
        var tr = document.createElement('tr');
        tr.className = 'text-center font-weight-bold h4';
        for (var j = 0; j < gameSize; j++) {
            var td = document.createElement('td');
            
            var cellID = "cell" + counter;
            td.setAttribute("id", cellID);
            var onclick = `replaceCell('${cellID}', '${counter}');`;
            td.setAttribute("onclick", onclick);
            var num = randomNumbersArray.shift();
            td.innerHTML = num;
            tr.appendChild(td)
            counter++;
        }
        tbdy.appendChild(tr);
        }
        
    
    tbl.appendChild(tbdy);
    tableDiv.appendChild(tbl);
}

function replaceCell(cellID, idNumber)
{
    var cellElement = document.getElementById(cellID);
    var table = document.getElementById("gameTable")
    var lineNumber = (((idNumber / gameSize) + 1) | 0) -1;
    var placeInLine = idNumber % gameSize;
    //console.log(`Line: ${lineNumber}, cell: ${placeInLine}`);
    
    try
    {
        var nextCell = table.rows[lineNumber-1].cells[placeInLine];
        if ('' == nextCell.innerHTML)
        {
            replaceValues(cellElement, nextCell);
            checkTable();
            return;
        }
    }
    catch{}
    try
    {
        var nextCell = table.rows[lineNumber+1].cells[placeInLine];
        if ('' == nextCell.innerHTML)
        {
            replaceValues(cellElement, nextCell);
            checkTable();
            return;
        }
    }
    catch{}
    try
    {
        var nextCell = table.rows[lineNumber].cells[placeInLine-1];
        if ('' == nextCell.innerHTML)
        {
            replaceValues(cellElement, nextCell);
            checkTable();
            return;
        }
    }
    catch{}
    try
    {
        var nextCell = table.rows[lineNumber].cells[placeInLine+1];
        if ('' == nextCell.innerHTML)
        {
            replaceValues(cellElement, nextCell);
            checkTable();
            return;
        }
    }
    catch{}
    
}

function replaceValues(cell1, cell2)
{
    var cell1Value = cell1.innerHTML;
    var cell2Value = cell2.innerHTML;
    cell1.innerHTML = cell2Value;
    cell2.innerHTML = cell1Value;
}

function checkTable()
{
    var isTableCompleted = checkTableValues();
    if (isTableCompleted)
    {
        gameWon();
    }
}

function checkTableValues()
{
    validateStopwatchRun();
    var index = 1;
    var isNotCompleted = false;
    var table = document.getElementById("gameTable");
    for (var i = 0, row; row = table.rows[i]; i++) {
        for (var j = 0, cell; cell = row.cells[j]; j++) {
            if (cell.innerHTML == index)
            {
                cell.className = "bg-success text-white";
            }
            else
            {
                if(cell.innerHTML == '')
                {
                    cell.className = "bg-white";
                }
                else
                {
                    cell.className = "bg-danger text-white";
                    isNotCompleted = true;
                }
                
            }
            index++;
        }  
     }
     console.log(!isNotCompleted);
     return !isNotCompleted;
}

function validateStopwatchRun()
{
    if (isWatchPaused())
    {
        resetTimer();
        startTimer();
    }
}

function gameWon()
{
    gameTime = getShowTime();
    pauseTimer();
    var modal = document.getElementById("wonModal");
    modal.style.display = "block";
}

function recordWinner()
{
    var modal = document.getElementById("wonModal");
    modal.style.display = "none";
    var winnerFullName = document.getElementById("fullName").value;
    var winnerRank = document.getElementById("rank").value;
    var currentDate = generateDate();
    
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





  