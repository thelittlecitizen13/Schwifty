function createTable()
{
    var gameSize = document.getElementById("gameSize").value;
    var gameNumbers = gameSize*gameSize - 1;
    var randomNumbersArray = generateRandomNumbersArray(gameNumbers);
    var emptySpotIndex = getEmptySpot(randomNumbersArray);
    randomNumbersArray[emptySpotIndex] = '';
    console.log(isArrayPlayable(randomNumbersArray, emptySpotIndex, gameSize));
    generateTable(randomNumbersArray, gameSize);
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
        if (numbers[counter] == 16)
        {
            return counter;
        }
        counter++;
    }
}

function isArrayPlayable(numbers, emptySpot, gameSize)
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

function generateTable(randomNumbersArray, gameSize)
{
    
    var tableDiv = document.getElementById("GameTable");
    
    tableDiv.innerHTML = "";
    var tbl = document.createElement('table');
    tbl.style.width = '60%';
    tbl.style.height = '60%';
    tbl.setAttribute('border', '1');
    var tbdy = document.createElement('tbody');
    for (var i = 0; i < gameSize; i++) {
        var tr = document.createElement('tr');
        for (var j = 0; j < gameSize; j++) {
            var td = document.createElement('td');
            var num = randomNumbersArray.shift();
            td.innerHTML = num;
            tr.appendChild(td)
        }
        tbdy.appendChild(tr);
        }
        
    
    tbl.appendChild(tbdy);
    tableDiv.appendChild(tbl);
}




  