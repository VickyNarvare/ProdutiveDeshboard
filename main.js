const quoteButton = document.querySelector("#quoteButton");
const quoteOverlay = document.querySelector("#Quote-overlay");
const quoteText = document.querySelector(".quote");
const quoteAuthor = document.querySelector("#QuoteAuthor");
const refreshBtn = document.querySelector(".refresh");
const closeQuoteOverlay = document.querySelector("#closeQuoteOverlay");

const themeToggle = document.querySelector(".theme-toggle");
const themeIcon = document.querySelector("#themeIcon");
const main = document.querySelector("main");

const timeCon = document.querySelector(".time");
const dateCon = document.querySelector(".date");

const temperature = document.querySelector("#temperature");
const condition = document.querySelector("#condition");
const humidity = document.querySelector("#humidity");
const wind = document.querySelector("#wind");
const weatherIcon = document.querySelector("#weatherIcon");
const city = "Indore";

const stopWatchButton = document.querySelector("#stopWatchButton");
const stopWatchOverlay = document.querySelector("#stopWatchOverlay");
const closeStopWatchOverlay = document.querySelector("#closeStopWatchOverlay");

const todoListButton = document.querySelector("#todoListButton");
const todoListOverlay = document.querySelector("#todoListOverlay");
const closeTodoListOverlay = document.querySelector("#closeTodoListOverlay");

const dailyGoalButton = document.querySelector("#dailyGoalButton");
const dailyGoalOverlay = document.querySelector("#dailyGoalOverlay");
const closeDailyGoalOverlay = document.querySelector("#closeDailyGoalOverlay");

const stopWatchText = document.querySelector("#timerDisplay");
const startBtn = document.querySelector("#startTimer");
const pauseBtn = document.querySelector("#pauseTimer");
const resetBtn = document.getElementById("resetTimer");

const todoForm = document.querySelector("#todoForm");
const todoCardCon = document.querySelector(".todoList");

const close = (overlay, button) => {
  button.addEventListener("click", () => {
    overlay.style.display = "none";
  });
};
const open = (overlay, button) => {
  button.addEventListener("click", () => {
    overlay.style.display = "flex";
  });
};

open(stopWatchOverlay, stopWatchButton);
close(stopWatchOverlay, closeStopWatchOverlay);

open(todoListOverlay, todoListButton);
close(todoListOverlay, closeTodoListOverlay);

open(dailyGoalOverlay, dailyGoalButton);
close(dailyGoalOverlay, closeDailyGoalOverlay);

open(quoteOverlay, quoteButton);
close(quoteOverlay, closeQuoteOverlay);

const getQuote = async () => {
  try {
    const response = await fetch("https://dummyjson.com/quotes/random");
    const data = await response.json();
    quoteText.textContent = data.quote;
    quoteAuthor.textContent = data.author;
  } catch (error) {
    console.error(error);
  }
};
getQuote();

refreshBtn.addEventListener("click", () => {
  getQuote();
});

let dark = JSON.parse(localStorage.getItem("theme")) || false;

function applyTheme() {
  if (dark) {
    main.style.backgroundImage = "url('./images/nightBg.png')";
    themeIcon.className = "ri-moon-clear-fill";
    themeToggle.classList.add("active");
    document.body.classList.remove("light");
    document.body.classList.add("dark");
  } else {
    main.style.backgroundImage = "url('./images/dayBg.png')";
    themeIcon.className = "ri-sun-line";
    themeToggle.classList.remove("active");
    document.body.classList.remove("dark");
    document.body.classList.add("light");
  }
}
applyTheme();
themeToggle.addEventListener("click", () => {
  dark = !dark;
  localStorage.setItem("theme", JSON.stringify(dark));
  applyTheme();
});

const clock = (time, date) => {
  timeCon.textContent = time;
  dateCon.textContent = date;
};
setInterval(() => {
  const date = new Date();
  const time = date.toLocaleTimeString("en-IN", {
    hour12: true,
  });
  const monthYear = date.toLocaleDateString("en-IN", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
  clock(time, monthYear);
}, 1000);

const WeatherUi = (text, icon, humidityText, temp_c, wind_kph) => {
  weatherIcon.setAttribute("src", `https:${icon}`);
  temperature.textContent = `${temp_c}°C`;
  humidity.textContent = `${humidityText}%`;
  wind.textContent = `${wind_kph}km/h`;
  condition.textContent = text;
};

WeatherUi();

const fetchWeather = async () => {
  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=6ea60cf711b7495e81961239250808&q=${city}`,
    );
    if (!response.ok) {
      throw new Error("City not found");
    }

    const data = await response.json();
    const { text, icon } = data.current.condition;
    const { humidity, temp_c, wind_kph } = data.current;
    WeatherUi(text, icon, humidity, temp_c, wind_kph);
  } catch (error) {
    alert(error.message);
  }
};
fetchWeather();

const TodoData = JSON.parse(localStorage.getItem("todoData")) || [];

const todoUi = (title, description, idx, ifCompleted) => {
  return `
    <div class="todoCard ${ifCompleted ? "completed" : ""}" data-index="${idx}">
      <span class="priority important">Important</span>

      <div class="todoTop">
        <h4>${title}</h4>

        <div class="todoActions">
          <button onclick="completeTodo(this)">
            <i class="ri-check-line"></i>
          </button>

          <button onclick="deleteTodo(this)">
            <i class="ri-delete-bin-6-line"></i>
          </button>
        </div>
      </div>

      <p>${description}</p>
    </div>
  `;
};

const renderTodos = () => {
  todoCardCon.innerHTML = "";

  TodoData.forEach((todo, idx) => {
    todoCardCon.innerHTML += todoUi(
      todo.title,
      todo.description,
      idx,
      todo.ifCompleted,
    );
  });
};

renderTodos();

todoForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const title = document.querySelector("#todoTitle").value.trim();
  const description = document.querySelector("#todoDescription").value.trim();

  if (!title || !description) return;

  TodoData.push({
    title,
    description,
    ifCompleted: false,
  });

  localStorage.setItem("todoData", JSON.stringify(TodoData));

  renderTodos();

  todoForm.reset();
});

const completeTodo = (button) => {
  const todoCard = button.closest(".todoCard");
  const idx = Number(todoCard.dataset.index);

  TodoData[idx].ifCompleted = !TodoData[idx].ifCompleted;

  localStorage.setItem("todoData", JSON.stringify(TodoData));

  renderTodos();
};

const deleteTodo = (button) => {
  const todoCard = button.closest(".todoCard");
  const idx = Number(todoCard.dataset.index);

  TodoData.splice(idx, 1);

  localStorage.setItem("todoData", JSON.stringify(TodoData));

  renderTodos();
};

const plannerContainer = document.querySelector(".planner-grid");

let dayPlanData = JSON.parse(localStorage.getItem("dayPlanData")) || [];
function plannerTaskUi(time, value, index) {
  plannerContainer.innerHTML += `
        <div class="time-slot">
            <h3>${time}</h3>
            <input type="text" class="plannerInput" data-index="${index}" placeholder="Enter your Goal..." value="${value}"/>
        </div>
    `;
}

const hours = Array.from({ length: 18 }, (_, i) => {
  return `${6 + i}:00 - ${7 + i}:00`;
});

hours.forEach((time, index) => {
  plannerTaskUi(time, dayPlanData[index] || "", index);
});

document.querySelectorAll(".plannerInput").forEach((input) => {
  input.addEventListener("input", function () {
    const index = this.dataset.index;
    dayPlanData[index] = this.value;
    localStorage.setItem("dayPlanData", JSON.stringify(dayPlanData));
  });
});

let seconds = 25 * 60;
let timer = null;

function StopWatchUiUpdate() {
  const mins = String(Math.floor(seconds / 60)).padStart(2, "0");
  const secs = String(seconds % 60).padStart(2, "0");

  timerDisplay.textContent = `${mins}:${secs}`;
}

startBtn.addEventListener("click", () => {
  if (timer !== null) return;

  timer = setInterval(() => {
    if (seconds > 0) {
      seconds--;
      StopWatchUiUpdate();
    } else {
      clearInterval(timer);
      timer = null;
      alert("Time's Up!");
    }
  }, 1000);
});

pauseBtn.addEventListener("click", () => {
  clearInterval(timer);
  timer = null;
});

resetBtn.addEventListener("click", () => {
  clearInterval(timer);
  timer = null;
  seconds = 25 * 60; 
  StopWatchUiUpdate();
});

StopWatchUiUpdate();
