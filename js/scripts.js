function createTable()
{
    generateTable();
}

function generateTable()
{
    var gameSize = document.getElementById("gameSize").value;
    var tableDiv = document.getElementById("GameTable");
    var gameNumbers = gameSize*gameSize - 1;
    var randomNumbersArray = generateRandomNumbersArray(gameNumbers)
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
            
            if (i != gameSize-1 || j != gameSize-1)
            {
                var num = randomNumbersArray.pop();
                td.innerHTML = num;
            }
            tr.appendChild(td)
        }
        tbdy.appendChild(tr);
        }
        
    
    tbl.appendChild(tbdy);
    tableDiv.appendChild(tbl);
}

function generateRandomNumbersArray(arraySize)
{
    var numbersArray = [...Array(arraySize + 1).keys()]
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
  