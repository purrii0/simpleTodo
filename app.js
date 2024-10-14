const api = "AIzaSyCjtUddePcygPsqLdeVYLNPHr5YNNpmWa0";
const CALENDAR_ID = "primary";

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
  st.innerHTML == "Stop" ? (st.innerHTML = "Start") : (st.innerHTML = "start");
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
  let text = input.value;
  todos.push({ text });
  render();
});

function render() {
  container.innerHTML = "";
  for (let i = 0; i < todos.length; i++) {
    let h3 = document.createElement("h3");
    let div = document.createElement("div");
    let input = document.createElement("input");
    input.classList.add("check");
    input.type = "checkbox";
    div.classList.add("task");

    let textco = todos[i].text;

    h3.append(textco);
    div.append(input);
    div.append(h3);
    container.append(div);
  }
}
const daysTag = document.querySelector(".days"),
  currentDate = document.querySelector(".current-date"),
  prevNextIcon = document.querySelectorAll(".icons span");
// getting new date, current year and month
let date = new Date(),
  currYear = date.getFullYear(),
  currMonth = date.getMonth();
// storing full name of all months in array
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
  let firstDayofMonth = new Date(currYear, currMonth, 1).getDay(), // getting first day of month
    lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate(), // getting last date of month
    lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay(), // getting last day of month
    lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate(); // getting last date of previous month
  let liTag = "";
  for (let i = firstDayofMonth; i > 0; i--) {
    // creating li of previous month last days
    liTag += `<li class="inactive">${lastDateofLastMonth - i + 1}</li>`;
  }
  for (let i = 1; i <= lastDateofMonth; i++) {
    // creating li of all days of current month
    // adding active class to li if the current day, month, and year matched
    let isToday =
      i === date.getDate() &&
      currMonth === new Date().getMonth() &&
      currYear === new Date().getFullYear()
        ? "active"
        : "";
    liTag += `<li class="${isToday}">${i}</li>`;
  }
  for (let i = lastDayofMonth; i < 6; i++) {
    // creating li of next month first days
    liTag += `<li class="inactive">${i - lastDayofMonth + 1}</li>`;
  }
  currentDate.innerText = `${months[currMonth]} ${currYear}`; // passing current mon and yr as currentDate text
  daysTag.innerHTML = liTag;
};
renderCalendar();
prevNextIcon.forEach((icon) => {
  // getting prev and next icons
  icon.addEventListener("click", () => {
    // adding click event on both icons
    // if clicked icon is previous icon then decrement current month by 1 else increment it by 1
    currMonth = icon.id === "prev" ? currMonth - 1 : currMonth + 1;
    if (currMonth < 0 || currMonth > 11) {
      // if current month is less than 0 or greater than 11
      // creating a new date of current year & month and pass it as date value
      date = new Date(currYear, currMonth, new Date().getDate());
      currYear = date.getFullYear(); // updating current year with new date year
      currMonth = date.getMonth(); // updating current month with new date month
    } else {
      date = new Date(); // pass the current date as date value
    }
    renderCalendar(); // calling renderCalendar function
  });
});
