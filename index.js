// Remove active state from all match cards
function removeActiveStates() {
  document.querySelectorAll(".match-card").forEach((card) => {
    card.classList.remove("active");
  });
}

// Match data for all users
const matchData = {
  crystal: {
    name: "Crystal",
    level: "excellent",
    experience: "3+ years",
    travel: "15 km",
    schedule: {
      days: ["S", "M", "T", "W", "T", "F", "S"],
      activeDays: [false, true, true, false, true, true, false],
      times: ["6am - 8am"]
    },
    environment: ["Outdoor track", "Boxing gym"],
    targeted: ["Cardio", "Stamina"],
    exercises: ["Boxing", "Running"],
    goals: ["Marathon training"]
  },
  kate: {
    name: "Kate",
    level: "excellent",
    experience: "4+ years",
    travel: "12 km",
    schedule: {
      days: ["S", "M", "T", "W", "T", "F", "S"],
      activeDays: [false, true, false, true, true, false, true],
      times: ["7pm - 10pm"]
    },
    environment: ["Indoor gym", "Spin class"],
    targeted: ["Full body", "Endurance"],
    exercises: ["Cycling", "HIIT", "Strength training"],
    goals: ["Build muscle", "Improve stamina"]
  },
  amanda: {
    name: "Amanda",
    level: "good",
    experience: "3-5 years",
    travel: "10 km",
    schedule: {
      days: ["S", "M", "T", "W", "T", "F", "S"],
      activeDays: [true, true, true, true, false, false, false],
      times: ["12pm - 6pm", "6pm - 12am"]
    },
    environment: ["Indoor gym", "Group class"],
    targeted: ["Lower body", "Upper body", "Endurance"],
    exercises: ["Cardio", "Yoga", "Pilates"],
    goals: ["Social connections", "Mental health", "Physical health"]
  },
  megan: {
    name: "Megan",
    level: "good",
    experience: "2-4 years",
    travel: "8 km",
    schedule: {
      days: ["S", "M", "T", "W", "T", "F", "S"],
      activeDays: [true, false, true, false, true, false, true],
      times: ["1pm - 4pm"]
    },
    environment: ["CrossFit gym", "Outdoors"],
    targeted: ["Full body", "Core strength"],
    exercises: ["CrossFit", "Light running"],
    goals: ["Tone muscles", "Increase flexibility"]
  },
  becky: {
    name: "Becky",
    level: "okay",
    experience: "1-2 years",
    travel: "5 km",
    schedule: {
      days: ["S", "M", "T", "W", "T", "F", "S"],
      activeDays: [false, false, true, false, true, false, true],
      times: ["7pm - 9pm"]
    },
    environment: ["Home gym", "Local park"],
    targeted: ["Core", "Lower body"],
    exercises: ["Weightlifting", "HIIT"],
    goals: ["Improve endurance"]
  },
  sarah: {
    name: "Sarah",
    level: "fair",
    experience: "0-1 year",
    travel: "3 km",
    schedule: {
      days: ["S", "M", "T", "W", "T", "F", "S"],
      activeDays: [true, false, false, false, false, false, true],
      times: ["Weekends only"]
    },
    environment: ["Home workouts", "Outdoors"],
    targeted: ["General fitness"],
    exercises: ["Light cardio", "Beginner yoga"],
    goals: ["Get started", "Build confidence"]
  }
};

// Load detail view with data for a match
function loadDetail(matchId) {
  const data = matchData[matchId];
  document.getElementById("detailName").textContent = data.name;
  document.getElementById("detailExperience").innerHTML = "<strong>Experience:</strong> " + data.experience;
  document.getElementById("detailTravel").innerHTML = "<strong>Travel:</strong> " + data.travel;

  // Gauge
  const gaugeEl = document.getElementById("detailGauge");
  gaugeEl.className = "gauge " + data.level;
  const gaugeContainer = document.getElementById("detailGaugeContainer");
  gaugeContainer.className = "gauge-container " + data.level;

  // Days of week
  const daysContainer = document.getElementById("detailDays");
  daysContainer.innerHTML = "";
  data.schedule.days.forEach((day, i) => {
    const span = document.createElement("span");
    span.className = "day" + (data.schedule.activeDays[i] ? " active" : "");
    span.textContent = day;
    daysContainer.appendChild(span);
  });

  // Times
  const timesContainer = document.getElementById("detailTimes");
  timesContainer.innerHTML = "";
  data.schedule.times.forEach(time => {
    const span = document.createElement("span");
    span.className = "time-block";
    span.textContent = time;
    timesContainer.appendChild(span);
  });

  // Build bullet lists for environment, targeted areas, exercises, goals
  function buildList(elementId, items) {
    const ul = document.getElementById(elementId);
    ul.innerHTML = "";
    items.forEach(item => {
      const li = document.createElement("li");
      li.textContent = item;
      ul.appendChild(li);
    });
  }
  buildList("detailEnvironment", data.environment);
  buildList("detailTargeted", data.targeted);
  buildList("detailExercises", data.exercises);
  buildList("detailGoals", data.goals);
}

// Toggle between match list and detail screens
document.querySelectorAll(".match-card").forEach(card => {
  card.addEventListener("click", () => {
    removeActiveStates();
    card.classList.add("active");
    const matchId = card.getAttribute("data-match");
    loadDetail(matchId);
    document.getElementById("matchListScreen").classList.add("hidden");
    document.getElementById("detailScreen").classList.remove("hidden");
  });
});

// Back button returns to match list screen
document.getElementById("backButton").addEventListener("click", () => {
  document.getElementById("matchListScreen").classList.remove("hidden");
  document.getElementById("detailScreen").classList.add("hidden");
  removeActiveStates();
});

// // Nav Bar: set active state and redirect to error page
// document.querySelectorAll(".nav-icon").forEach(icon => {
//   icon.addEventListener("click", function(e) {
//     e.preventDefault();
//     document.querySelectorAll(".nav-icon").forEach(i => i.classList.remove("active"));
//     this.classList.add("active");
//     setTimeout(() => {
//       window.location.href = "profile.html";
//     }, 300);
//   });
// });

// Save Match & Friend Request button logic
document.getElementById("saveMatchBtn").addEventListener("click", function() {
  this.textContent = "Match Saved";
  this.style.backgroundColor = "green";
});
document.getElementById("friendRequestBtn").addEventListener("click", function() {
  this.textContent = "Friend Request Sent";
  this.style.backgroundColor = "green";
});
