var dateCursor = new Date();
var calendarTable = document.querySelector(".calendar_table");
var prevMonth = document.querySelector(".goToPrevMonth");
var nextMonth = document.querySelector(".goToNextMonth");
var tableData = null;
var boxForTarget = null;
var boxForModify = null;

var modal = document.getElementsByClassName("calendar_modal")[0];
var accept_btn = document.getElementsByClassName("column-accept")[0];
var close_btn = document.getElementsByClassName("column-close")[0];

var modal_change = document.getElementsByClassName("calendar_modal-change")[0];
var delete_btn = document.getElementsByClassName("column-delete")[0];
var modify_btn = document.getElementsByClassName("column-modify")[0];
var quit_btn = document.getElementsByClassName("column-quit")[0];

var title = document.getElementsByClassName("column-title")[0];
var title_change = document.getElementsByClassName("column-title")[1];
var input_box = document.getElementsByClassName("column-input")[1];
var todoList = document.querySelectorAll(".todoList");

// This block is for calendar_modal

function clickTableData(event) {
  boxForTarget = event.target.parentNode;
  var targetMonth = event.target.parentNode.childNodes[1].innerHTML;
  var targetDay = event.target.parentNode.childNodes[0].innerHTML;
  title.innerHTML = `${targetMonth} ${targetDay}`;
  modal.style.display = "block";
}

accept_btn.addEventListener("click", function() {
  var input = document.getElementsByClassName("column-input")[0].value;
  var box = document.createElement("div");
  var text = document.createTextNode(input);
  box.appendChild(text);
  box.className = "todoList";

  for (i = 0; i < boxForTarget.getElementsByClassName("todoList").length; i++) {
    if (
      boxForTarget.getElementsByClassName("todoList")[i].innerHTML ==
      box.innerHTML
    ) {
      box.innerHTML += "(2)";
    }
  }

  if (box.innerHTML === "") {
    return false;
  }

  boxForTarget.appendChild(box);
  document.getElementsByClassName("column-input")[0].value = null;
  modal.style.display = "none";

  todoList = document.querySelectorAll(".todoList");
  [].forEach.call(todoList, function(todoList) {
    todoList.addEventListener("click", clickTodoList, false);
  });
});

close_btn.addEventListener("click", function() {
  modal.style.display = "none";
});

// This block is for calendar_modal-change

function clickTodoList(event) {
  boxForModify = event.target.innerHTML;
  document.getElementsByClassName("column-input")[1].value =
    event.target.innerHTML;
  boxForTarget = event.target.parentNode;
  var targetMonth = event.target.parentNode.childNodes[1].innerHTML;
  var targetDay = event.target.parentNode.childNodes[0].innerHTML;

  title_change.innerHTML = `${targetMonth} ${targetDay}`;
  modal_change.style.display = "block";
}

delete_btn.addEventListener("click", function() {
  for (i = 0; i < boxForTarget.getElementsByClassName("todoList").length; i++) {
    if (
      boxForTarget.getElementsByClassName("todoList")[i].innerHTML ==
      document.getElementsByClassName("column-input")[1].value
    ) {
      boxForTarget.getElementsByClassName("todoList")[i].remove();
    }
  }
  modal_change.style.display = "none";
});

modify_btn.addEventListener("click", function() {
  var temp = null;

  if (document.getElementsByClassName("column-input")[1].value === "")
    return false;

  for (i = 0; i < boxForTarget.getElementsByClassName("todoList").length; i++) {
    if (
      boxForTarget.getElementsByClassName("todoList")[i].innerHTML ==
      boxForModify
    ) {
      temp = i;
      break;
    }
  }

  boxForTarget.getElementsByClassName("todoList")[
    temp
  ].innerHTML = document.getElementsByClassName("column-input")[1].value;

  modal_change.style.display = "none";
});

quit_btn.addEventListener("click", function() {
  modal_change.style.display = "none";
});

prevMonth.addEventListener("click", function() {
  dateCursor = new Date(
    dateCursor.getFullYear(),
    dateCursor.getMonth() - 1,
    dateCursor.getDate()
  );

  makeCalendar();

  tableData = document.querySelectorAll("img");

  [].forEach.call(tableData, function(tableData) {
    tableData.addEventListener("click", clickTableData, false);
  });
});

nextMonth.addEventListener("click", function() {
  dateCursor = new Date(
    dateCursor.getFullYear(),
    dateCursor.getMonth() + 1,
    dateCursor.getDate()
  );

  makeCalendar();

  tableData = document.querySelectorAll("img");

  [].forEach.call(tableData, function(tableData) {
    tableData.addEventListener("click", clickTableData, false);
  });
});

function makeImgTag() {
  var tdList = document.querySelectorAll("td");

  for (i = 0; i < tdList.length; i++) {
    var imgTag = document.createElement("img");
    imgTag.style = "border:none";
    tdList[i].appendChild(imgTag);
  }
}

// main function for making calendar

function makeCalendar() {
  var curFirstDate = new Date(
    dateCursor.getFullYear(),
    dateCursor.getMonth() + 0,
    1
  ).getDay();
  var curLastDay = new Date(
    dateCursor.getFullYear(),
    dateCursor.getMonth() + 1,
    0
  ).getDate();
  var prevLastDay = new Date(
    dateCursor.getFullYear(),
    dateCursor.getMonth() + 0,
    0
  ).getDate();

  var calendar_date = document.querySelector(".calendar_date");
  calendar_date.innerHTML = `${dateCursor.getFullYear() +
    0}년 ${dateCursor.getMonth() + 1}월`;

  var total_date = 42;

  while (calendarTable.rows.length != 0) {
    calendarTable.deleteRow(calendarTable.rows.length - 1);
  }

  var rowCursor = calendarTable.insertRow();
  var dateCount = 0;

  // For making previous month of calendar

  for (i = 0; i < curFirstDate; i++) {
    cellCursor = rowCursor.insertCell();
    cellCursor.innerHTML =
      "<font color=#bbbbbb>" +
      `${prevLastDay - curFirstDate + dateCount + 1}일`;

    var monthInfo = document.createElement("span");
    var text = document.createTextNode(`${dateCursor.getMonth()}월`);

    monthInfo.appendChild(text);
    cellCursor.appendChild(monthInfo);

    dateCount++;
  }

  // For making current month of calendar

  for (i = 1; i <= curLastDay; i++) {
    cellCursor = rowCursor.insertCell();
    cellCursor.innerHTML = `<font color=#000000>${i}일`;
    dateCount++;

    if (dateCount % 7 == 1) {
      cellCursor.innerHTML = "<font color=#ff4422>" + `${i}일`;
    }

    if (dateCount % 7 == 0) {
      rowCursor = calendarTable.insertRow();
    }

    var monthInfo = document.createElement("span");
    var text = document.createTextNode(`${dateCursor.getMonth() + 1}월`);

    monthInfo.appendChild(text);
    cellCursor.appendChild(monthInfo);
  }

  // For making rest month of calendar

  var temp = total_date - dateCount;

  for (i = 1; i <= temp; i++) {
    cellCursor = rowCursor.insertCell();
    cellCursor.innerHTML = "<font color=#bbbbbb>" + `${i}일`;
    dateCount++;

    if (dateCount % 7 == 0) rowCursor = calendarTable.insertRow();

    var monthInfo = document.createElement("span");
    var text = document.createTextNode(`${dateCursor.getMonth() + 2}월`);

    monthInfo.appendChild(text);
    cellCursor.appendChild(monthInfo);
  }

  makeImgTag();

  tableData = document.querySelectorAll("img");

  [].forEach.call(tableData, function(tableData) {
    tableData.addEventListener("click", clickTableData, false);
  });
}

makeCalendar();
