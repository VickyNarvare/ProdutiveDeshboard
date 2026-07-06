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
const stopBtn = document.querySelector("#stopTimer");

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

let dark = false;
themeToggle.addEventListener("click", () => {
  dark = !dark;

  if (dark) {
    main.style.backgroundImage = "url('./images/nightBg.png')";
    themeIcon.className = "ri-moon-clear-fill";
  } else {
    main.style.backgroundImage = "url('./images/dayBg.png')";
    themeIcon.className = "ri-sun-line";
  }

  themeToggle.classList.toggle("active");
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

const todoUi = (title, description) => {
  return `<div class="todoCard">
                <div class="todoTop">
                  <h4>${title}</h4>
                  <div class="todoActions">
                    <button><i class="ri-check-line" ></i></button>
                    <button><i class="ri-delete-bin-6-line"></i></button>
                  </div>
                </div>
                <p>${description}</p>
              </div>`;
};
