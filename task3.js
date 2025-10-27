// =====================
// Image Carousel
// =====================
const images = [
  "maths.webp",   // replace with your own images
  "ma.jpg",
  "mm.webp"
  
];
let index = 0;
const carouselImg = document.getElementById("carousel-img");

document.getElementById("next").addEventListener("click", () => {
  index = (index + 1) % images.length;
  carouselImg.src = images[index];
});

document.getElementById("prev").addEventListener("click", () => {
  index = (index - 1 + images.length) % images.length;
  carouselImg.src = images[index];
});

// =====================
// Quiz
// =====================
document.getElementById("quiz-form").addEventListener("submit", e => {
  e.preventDefault();
  const answer = document.querySelector("input[name='q1']:checked");
  document.getElementById("quiz-result").textContent =
    answer && answer.value === "8" ? "✅ Correct!" : "❌ Try Again!";
});

// =====================
// Weather Checker (Real API)
// =====================
document.getElementById("getWeather").addEventListener("click", () => {
  const city = document.getElementById("city").value || "London";
  const apiKey = "3a3a902b872491defb2e823e553bc6f3"; // 🔑 Your OpenWeatherMap API key (must be inside quotes!)

  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
    .then(response => response.json())
    .then(data => {
      if (data.cod === "404") {
        document.getElementById("weather-result").textContent = "❌ City not found!";
        return;
      }
      if (data.main) {
        const temp = data.main.temp;
        const condition = data.weather[0].description;
        document.getElementById("weather-result").textContent =
          `Weather in ${city}: ${temp}°C 🌤 ${condition}`;
      } else {
        document.getElementById("weather-result").textContent = "⚠ Unexpected response!";
      }
    })
    .catch((error) => {
      console.error("Weather API error:", error);
      document.getElementById("weather-result").textContent = "⚠ Error fetching weather!";
    });
});

// =====================
// Joke Generator (JokeAPI)
// =====================
document.getElementById("jokeBtn").addEventListener("click", () => {
  fetch("https://v2.jokeapi.dev/joke/Any?type=single")
    .then(response => response.json())
    .then(data => {
      if (data.joke) {
        document.getElementById("joke").textContent = `😂 ${data.joke}`;
      } else {
        document.getElementById("joke").textContent = "⚠ No joke available!";
      }
    })
    .catch((error) => {
      console.error("Joke API error:", error);
      document.getElementById("joke").textContent = "⚠ Couldn’t fetch a joke!";
    });
});
