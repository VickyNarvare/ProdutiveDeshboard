localStorage.clear;
function opencards() {
  var allElems = document.querySelectorAll(".elem");
  var fullelem = document.querySelectorAll(".fullElem");
  var back = document.querySelectorAll(".fullElem .back");
  allElems.forEach(function (elem, id) {
    elem.addEventListener("click", function () {
      fullelem[id].style.display = "block";
      allElems[id].style.display = "none";
    });
  });

  back.forEach(function (elem, id) {
    elem.addEventListener("click", function () {
      fullelem[id].style.display = "none";
      allElems[id].style.display = "block";
    });
  });
}

opencards();
let flag = 0;
var form = document.querySelector("form");
var input = document.querySelector("#input");
var details = document.querySelector("#textbox");

var taskcheckbox = document.querySelector("#checkbox");

function todolist() {
  var currentTask = [];
  if (localStorage.getItem("currentTask")) {
    currentTask = JSON.parse(localStorage.getItem("currentTask"));
  }

  function renderTask() {
    localStorage.setItem("currentTask", JSON.stringify(currentTask));
    var allTask = document.querySelector(".allTask");
    var sum = "";
    currentTask.forEach(function (elem, id) {
      sum =
        sum +
        `<div class="task">
              <h3>${elem.task}<span class=${elem.imp}> imp</span><i id=${id} class="ri-arrow-down-s-fill"></i></h3>

              <button class="complete">Mark As Complete</button>
            </div>
            <div class="alldetails">
            <div class="detailsss">
              <h3>Details :-</h3>
                <h4>${elem.details}</h4>
              </div>
              </div>`;
    });

    allTask.innerHTML = sum;
    var drop = document.querySelectorAll(".task h3 i");
    var det = document.querySelectorAll(".alldetails .detailsss");
    var adet = document.querySelectorAll(".alldetails ");

    drop.forEach(function (elem, id) {
      elem.addEventListener("click", function () {
        if (flag == 0) {
          adet[elem.id].style.display = "block";
          flag = 1;
        } else if (flag == 1) {
          adet[elem.id].style.display = "none";

          flag = 0;
        }
      });
    });
    var markcomplete = document.querySelectorAll(".task button");
    var t = document.querySelectorAll(".task");
    markcomplete.forEach(function (elem, id) {
      elem.addEventListener("click", function () {
        currentTask.splice(id, 1);
        renderTask();
      });
    });
  }

  renderTask();
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    currentTask.push({
      task: input.value,
      details: details.value,
      imp: taskcheckbox.checked,
    });

    renderTask();
  });
}
todolist();
function dailyplanner() {
  let maxsum = "";
  var dayplandata = JSON.parse(localStorage.getItem("dayplanData")) || {};
  var dayplanner = document.querySelector(".day-planner");
  var hours = Array.from({ length: 18 }, function (elem, idx) {
    return `${6 + idx}:00 - ${7 + idx}:00`;
  });
  hours.forEach(function (elem, idx) {
    var dayplan = dayplandata[idx] || "";
    maxsum =
      maxsum +
      `<div class="day-planner-time">
            <p>${elem}</p>
            <input id=${idx} type="text" name="" id="" placeholder="..." value=${dayplan}>
          </div>`;
  });

  dayplanner.innerHTML = maxsum;

  var inputdayplanner = document.querySelectorAll(".day-planner-time input");

  inputdayplanner.forEach(function (elem) {
    elem.addEventListener("input", function () {
      dayplandata[elem.id] = elem.value;
      localStorage.setItem("dayplanData", JSON.stringify(dayplandata));
    });
  });
}

dailyplanner();
async function fetchQuote() {
  let response = await fetch("https://api.quotable.io/random");
  let data = await response.json();

  var motivation2 = document.querySelector(".motivation-2 h1");
  var motivation3 = document.querySelector(".motivation-3 h2");
  motivation2.innerHTML = `${data.content}`;
  motivation3.innerHTML = `- ${data.author}`;
}

fetchQuote();

function pomodoro() {
  let worksession = true;
  let totaltime = 1499;
  let interval = null;
  let timer = document.querySelector(".pomo-timer h1");
  let btn1 = document.querySelector(".start");
  let btn2 = document.querySelector(".pause");
  let btn3 = document.querySelector(".reset");
  let work = document.querySelector(".pomo-timer h2");
  function updatetime() {
    let min = Math.floor(totaltime / 60);
    let sec = totaltime % 60;

    if (sec == 0 && min == 0) {
      timer.textContent = `0${min}:0${sec}`;
    } else if (sec < 10) {
      timer.textContent = `${min}:0${sec}`;
    } else if (sec == 0) {
      timer.textContent = `${min}:${sec}0`;
    } else if (min < 10 || min == 0) {
      timer.textContent = `0${min}:${sec}`;
    } else {
      timer.textContent = `${min}:${sec}`;
    }
  }
  function starttime() {
    clearInterval(interval);
    if (worksession) {
      totaltime = 1499;
      interval = setInterval(function () {
        if (totaltime >= 0) {
          updatetime();
          totaltime--;
        } else {
          worksession = false;
          clearInterval(interval);
          timer.textContent = "05:00";
          work.textContent = "Break Time!";
          work.style.backgroundColor = "red";
          work.style.left = "31%";
        }
      }, 1000);
    } else {
      totaltime = 299;
      interval = setInterval(function () {
        if (totaltime >= 0) {
          updatetime();
          totaltime--;
        } else {
          worksession = true;
          clearInterval(interval);
          timer.textContent = "25:00";
          work.textContent = "Work Session";
          work.style.backgroundColor = "#519872";
        }
      }, 1000);
    }
  }
  function stoptime() {
    clearInterval(interval);
  }

  function reset() {
    if (worksession) {
      clearInterval(interval);
      totaltime = 1499;
      updatetime();
      timer.textContent = "25:00";
    } else {
      clearInterval(interval);
      totaltime = 299;

      updatetime();
      timer.textContent = "05:00";
    }
  }
  btn1.addEventListener("click", function () {
    starttime();

    if (totaltime == 0) {
      stoptime();
    }
  });
  btn2.addEventListener("click", function () {
    stoptime();
  });

  btn3.addEventListener("click", function () {
    reset();
  });

  work.addEventListener("click", function () {
    starttime();
    if (worksession) {
      worksession = false;
      clearInterval(interval);
      timer.textContent = "05:00";
      work.textContent = "Break Time!";
      work.style.backgroundColor = "red";
      work.style.left = "31%";
    } else {
      worksession = true;
      clearInterval(interval);
      timer.textContent = "25:00";
      work.textContent = "Work Session";
      work.style.backgroundColor = "#519872";
      work.style.left = "27%";
    }
  });
}
pomodoro();
function weatherFunctionality() {
  var city = "Bhubnaeswar";

  var header1Time = document.querySelector(".header1 h1");
  var header1Date = document.querySelector(".header1 h4");
  var header2Temp = document.querySelector(".header2 h2");
  var header2Condition = document.querySelector(".header2 h4");
  var precipitation = document.querySelector(".header2 .precipitation");
  var humidity = document.querySelector(".header2 .humidity");
  var wind = document.querySelector(".header2 .wind");

  var data = null;

  async function weatherAPICall() {
    var response = await fetch(
      `http://api.weatherapi.com/v1/current.json?key=5a762dd80e4942b9a08163622252606&q=${city}`,
    );
    data = await response.json();

    header2Temp.innerHTML = `${data.current.temp_c}°C`;
    header2Condition.innerHTML = `${data.current.condition.text}`;
    wind.innerHTML = `Wind: ${data.current.wind_kph} km/h`;
    humidity.innerHTML = `Humidity: ${data.current.humidity}%`;
    precipitation.innerHTML = `Heat Index : ${data.current.heatindex_c}%`;
  }

  weatherAPICall();

  function timeDate() {
    const totalDaysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    var date = new Date();
    var dayOfWeek = totalDaysOfWeek[date.getDay()];
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();
    var tarik = date.getDate();
    var month = monthNames[date.getMonth()];
    var year = date.getFullYear();

    header1Date.innerHTML = `${tarik} ${month}, ${year}`;

    if (hours > 12) {
      header1Time.innerHTML = `${dayOfWeek}, ${String(hours - 12).padStart("2", "0")}:${String(minutes).padStart("2", "0")}:${String(seconds).padStart("2", "0")} PM`;
    } else {
      header1Time.innerHTML = `${dayOfWeek}, ${String(hours).padStart("2", "0")}:${String(minutes).padStart("2", "0")}:${String(seconds).padStart("2", "0")} AM`;
    }
  }

  setInterval(() => {
    timeDate();
  }, 1000);
}

weatherFunctionality();

function changeTheme() {
  var button = document.querySelector(".button");
  var root = document.documentElement;
  var circle = document.querySelector("#circle");
  let flag = 0;
  button.addEventListener("click", function () {
    if (flag == 0) {
      circle.style.left = "45%";
      flag = 1;

      root.style.setProperty("--pri", "#565449");
      root.style.setProperty("--sec", "#1a1713");
      root.style.setProperty("--tri1", "#11120d");
      root.style.setProperty("--tri2", "#d8cfbc");
    } else {
      circle.style.left = "0%";
      flag = 0;
      root.style.setProperty("--pri", "#111822");
      root.style.setProperty("--sec", "#333740");
      root.style.setProperty("--tri1", "#6C6A6A");
      root.style.setProperty("--tri2", "#a27b5b");
    }
  });
}
changeTheme();

