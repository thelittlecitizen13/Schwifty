function createTable()
{
    var gameSize = document.getElementById("gameSize").value;
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
        //td.appendChild(document.createTextNode('\u0020'))
        //i == 1 && j == 1 ? td.setAttribute('rowSpan', '2') : null;
        tr.appendChild(td)
      }
      tbdy.appendChild(tr);
    }
    
  
  tbl.appendChild(tbdy);
  tableDiv.appendChild(tbl);
}