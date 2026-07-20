
const notes=JSON.parse(localStorage.getItem("notes")) || [];

const tasks=JSON.parse(localStorage.getItem("tasks")) || [];

document.getElementById("notesCount").textContent=notes.length;

document.getElementById("tasksCount").textContent=tasks.length;

document.getElementById("focusTime").textContent=

localStorage.getItem("focusTime") || "0h";

document.getElementById("streakCount").textContent=

localStorage.getItem("streak") || 0;