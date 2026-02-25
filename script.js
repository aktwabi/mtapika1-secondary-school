const resultsForm = document.querySelector("#results-form");
const resultsBody = document.querySelector("#results-body");

const attendanceForm = document.querySelector("#attendance-form");
const attendanceList = document.querySelector("#attendance-list");
const presentCount = document.querySelector("#present-count");
const absentCount = document.querySelector("#absent-count");
const lateCount = document.querySelector("#late-count");

const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector("#nav-menu");

const pad = (value) => (value < 10 ? `0${value}` : `${value}`);
const formatDate = (date) =>
  `${date.toLocaleString("sw-TZ", { month: "short" })} ${pad(
    date.getDate()
  )}, ${date.getFullYear()}`;

const gradeFromScore = (score) => {
  if (score >= 85) return "A";
  if (score >= 70) return "B";
  if (score >= 55) return "C";
  if (score >= 40) return "D";
  return "F";
};

const updateAttendanceCounts = () => {
  const items = attendanceList.querySelectorAll(".attendance-item");
  let present = 0;
  let absent = 0;
  let late = 0;

  items.forEach((item) => {
    if (item.classList.contains("present")) present += 1;
    if (item.classList.contains("absent")) absent += 1;
    if (item.classList.contains("late")) late += 1;
  });

  presentCount.textContent = present;
  absentCount.textContent = absent;
  lateCount.textContent = late;
};

if (resultsForm) {
  resultsForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const studentName = document.querySelector("#student-name").value.trim();
    const scoreValue = Number(document.querySelector("#score").value);
    const subjectValue = document.querySelector("#subject").value;

    if (!studentName || Number.isNaN(scoreValue)) {
      alert("Tafadhali jaza jina la mwanafunzi na alama.");
      return;
    }

    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${studentName}</td>
      <td>${subjectValue}</td>
      <td>${scoreValue}</td>
      <td>${gradeFromScore(scoreValue)}</td>
      <td>${formatDate(new Date())}</td>
    `;
    resultsBody.prepend(row);
    resultsForm.reset();
  });
}

if (attendanceForm) {
  attendanceForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const nameValue = document.querySelector("#attendance-name").value.trim();
    const statusValue = document.querySelector("#attendance-status").value;

    if (!nameValue) {
      alert("Tafadhali jaza jina la mwanafunzi.");
      return;
    }

    const item = document.createElement("div");
    item.className = `attendance-item ${statusValue}`;
    item.innerHTML = `
      <span>${nameValue}</span>
      <span>${statusValue === "present" ? "Amehudhuria" : statusValue === "late" ? "Amechelewa" : "Hakuhudhuria"}</span>
    `;
    attendanceList.prepend(item);
    attendanceForm.reset();
    updateAttendanceCounts();
  });
}

if (navToggle) {
  navToggle.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });
}

updateAttendanceCounts();
