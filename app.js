let st = document.querySelector(".st");
let res = document.querySelector(".res");
let interVal;
let min = 0;
let sec = 0;

st.addEventListener("click", () => {
  if (st.innerHTML === "Start") {
    st.innerHTML = "Stop";
    interVal = setInterval(() => {
      sec++;
      if (sec >= 60) {
        sec = 0;
        min++;
      }
      let formattedtime = `${String(min).padStart(2, "0")}:${String(
        sec
      ).padStart(2, "0")}`;
      document.querySelector(".time").innerHTML = formattedtime;
    }, 1000);
  } else {
    st.innerHTML = "Start";
    clearInterval(interVal);
  }
});

res.addEventListener("click", () => {
  clearInterval(interVal);
  st.innerHTML == "Stop" ? (st.innerHTML = "Start") : (st.innerHTML = "Start");
  min = 0;
  sec = 0;
  let formattedtime = `${String(min).padStart(2, "0")}:${String(sec).padStart(
    2,
    "0"
  )}`;
  document.querySelector(".time").innerHTML = formattedtime;
});

let add = document.querySelector(".addtodo");
let container = document.querySelector(".tasks");
let todos = [];

add.addEventListener("click", () => {
  let input = document.querySelector(".inputy");
  let text = input.value.trim();

  // Ensure input is not empty
  if (text) {
    todos.push({ text }); // Add todo to the array
    render(); // Call render function to display the todos
    input.value = ""; // Clear input field
  } else {
    alert("Please enter a task."); // Alert if input is empty
  }
});

function render() {
  container.innerHTML = ""; // Clear existing todos
  for (let i = 0; i < todos.length; i++) {
    let h3 = document.createElement("h3");
    let div = document.createElement("div");
    let input = document.createElement("input");
    input.classList.add("check");
    input.type = "checkbox";
    div.classList.add("task");

    let textco = todos[i].text;
    h3.textContent = textco; // Set the todo text

    // Append checkbox and todo text to the task div
    div.append(input);
    div.append(h3);
    container.append(div);

    // Add event listener to the checkbox
    input.addEventListener("change", function () {
      if (input.checked) {
        // Wrap text in <del> tag when checked
        const del = document.createElement("del");
        del.textContent = textco; // Set the del text to the todo text
        h3.innerHTML = ""; // Clear the current text
        h3.appendChild(del); // Append the <del> to the h3
        h3.style.color = "#6b6b6b";
      } else {
        // When unchecked, remove <del> and show original text
        h3.textContent = textco; // Restore original text
        h3.style.color = "#111";
      }
    });
  }
}

// Calendar rendering code remains unchanged
const daysTag = document.querySelector(".days"),
  currentDate = document.querySelector(".current-date"),
  prevNextIcon = document.querySelectorAll(".icons span");

let date = new Date(),
  currYear = date.getFullYear(),
  currMonth = date.getMonth();

const months = [
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

const renderCalendar = () => {
  let firstDayofMonth = new Date(currYear, currMonth, 1).getDay(),
    lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate(),
    lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay(),
    lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate();

  let liTag = "";
  for (let i = firstDayofMonth; i > 0; i--) {
    liTag += `<li class="inactive">${lastDateofLastMonth - i + 1}</li>`;
  }
  for (let i = 1; i <= lastDateofMonth; i++) {
    let isToday =
      i === date.getDate() &&
      currMonth === new Date().getMonth() &&
      currYear === new Date().getFullYear()
        ? "active"
        : "";
    liTag += `<li class="${isToday}">${i}</li>`;
  }
  for (let i = lastDayofMonth; i < 6; i++) {
    liTag += `<li class="inactive">${i - lastDayofMonth + 1}</li>`;
  }
  currentDate.innerText = `${months[currMonth]} ${currYear}`;
  daysTag.innerHTML = liTag;
};

renderCalendar();
prevNextIcon.forEach((icon) => {
  icon.addEventListener("click", () => {
    currMonth = icon.id === "prev" ? currMonth - 1 : currMonth + 1;
    if (currMonth < 0 || currMonth > 11) {
      date = new Date(currYear, currMonth, new Date().getDate());
      currYear = date.getFullYear();
      currMonth = date.getMonth();
    } else {
      date = new Date();
    }
    renderCalendar();
  });
});
