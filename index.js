// Check questionnaire completion status

document.addEventListener('DOMContentLoaded', () => {
  const questionsCompleted = localStorage.getItem('questionsCompleted');
  console.log('questionsCompleted:', questionsCompleted); // Debugging line

  const matchListScreen = document.getElementById('matchListScreen');
  const questionnairePrompt = document.getElementById('questionnairePrompt');

  if (!questionsCompleted) {
    matchListScreen.classList.add('hidden');
    questionnairePrompt.classList.remove('hidden');
  } else {
    matchListScreen.classList.remove('hidden');
    questionnairePrompt.classList.add('hidden');
  }
});

// Remove active state from all match cards
function removeActiveStates() {
  document.querySelectorAll(".match-card").forEach((card) => {
    card.classList.remove("active");
  });

}

// Match data for all users with individual state properties
const matchData = {
  crystal: {
    name: "Crystal",
    initials: "CR",
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
    goals: ["Marathon training"],
    isSaved: false,
    isFriendRequested: false
  },
  kate: {
    name: "Kate",
    initials: "KA",
    level: "excellent",
    experience: "6+ months",
    travel: "12 km",
    schedule: {
      days: ["S", "M", "T", "W", "T", "F", "S"],
      activeDays: [false, true, false, true, true, false, true],
      times: ["3pm - 10pm"]
    },
    environment: ["Indoor gym", "Spin class"],
    targeted: ["Full body", "Upper Body"],
    exercises: ["Cardio", "HIIT", "Strength training"],
    goals: ["Build muscle", "Improve stamina", "Weight loss"],
    isSaved: false,
    isFriendRequested: false
  },
  amanda: {
    name: "Amanda",
    level: "good",
    initials: "AM",
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
    goals: ["Social connections", "Mental health", "Physical health"],
    isSaved: false,
    isFriendRequested: false
  },
  megan: {
    name: "Megan",
    initials: "ME",
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
    goals: ["Tone muscles", "Increase flexibility"],
    isSaved: false,
    isFriendRequested: false
  },
  becky: {
    name: "Becky",
    initials: "BE",
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
    goals: ["Improve endurance"],
    isSaved: false,
    isFriendRequested: false
  },
  sarah: {
    name: "Sarah",
    initials: "SH",
    level: "fair",
    experience: "0-1 year",
    travel: "3 km",
    schedule: {
      days: ["S", "M", "T", "W", "T", "F", "S"],
      activeDays: [true, false, false, false, false, false, true],
      times: ["12pm - 1pm"]
    },
    environment: ["Home workouts", "Outdoors"],
    targeted: ["General fitness"],
    exercises: ["Light cardio", "Beginner yoga"],
    goals: ["Get started", "Build confidence"],
    isSaved: false,
    isFriendRequested: false
  }
};

// Global variable to track the current match ID being viewed
let currentMatchId = null;

// Load detail view with data for a match
function loadDetail(matchId) {
  currentMatchId = matchId; // Save the current match ID
  const data = matchData[matchId];


  // Clear previous profile picture
  const detailHeader = document.querySelector('.detail-header');
  const existingPictures = detailHeader.querySelectorAll('.profile-picture');
  existingPictures.forEach(pic => pic.remove());

  // Add new profile picture
  const detailPicture = document.createElement('div');
  detailPicture.className = 'profile-picture';
  detailPicture.innerHTML = `<div class="placeholder">${data.initials}</div>`;
  detailHeader.insertBefore(detailPicture, detailHeader.firstChild);


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

  // Reset or update button states based on the current match's state
  const saveBtn = document.getElementById("saveMatchBtn");
  const friendBtn = document.getElementById("friendRequestBtn");

  if (data.isSaved) {
    saveBtn.textContent = "Match Saved";
    saveBtn.style.backgroundColor = "green";
  } else {
    saveBtn.textContent = "Save Match";
    saveBtn.style.backgroundColor = "#ffb6c1"; // Original button color
  }
  
  if (data.isFriendRequested) {
    friendBtn.textContent = "Friend Request Sent";
    friendBtn.style.backgroundColor = "green";
  } else {
    friendBtn.textContent = "Friend Request";
    friendBtn.style.backgroundColor = "#ffb6c1"; // Original button color
  }
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

// Save Match & Friend Request button logic
document.getElementById("saveMatchBtn").addEventListener("click", function() {
  if (!currentMatchId) return;
  matchData[currentMatchId].isSaved = true;
  this.textContent = "Match Saved";
  this.style.backgroundColor = "green";
});

document.getElementById("friendRequestBtn").addEventListener("click", function() {
  if (!currentMatchId) return;
  matchData[currentMatchId].isFriendRequested = true;
  this.textContent = "Friend Request Sent";
  this.style.backgroundColor = "green";
});
