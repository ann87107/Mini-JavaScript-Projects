const movieSelect = document.getElementById("movie");
const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(.occupied)");

const count = document.getElementById("count");
const seatInfo = document.getElementById("seat-info");
const total = document.getElementById("total");

populateUI();

let ticketPrice = document.getElementById("movie").value;

// Update the selected count, price and seat-info
function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll(".row .seat.selected");
  // map through and set it into the local storage
  const selectedIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));
  localStorage.setItem("selectedSeats", JSON.stringify(selectedIndex));

  const selectedSeatsTotal = selectedSeats.length;
  count.innerText = selectedSeatsTotal;
  total.innerText = selectedSeatsTotal * ticketPrice;

  if (selectedSeatsTotal > 1) {
    seatInfo.innerText = "seats";
  } else {
    seatInfo.innerText = "seat";
  }
}

//set the selected movie index and price into the local storage
function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem("selectedMovieIndex", movieIndex);
  localStorage.setItem("selectedMoviePrice", moviePrice);
}


// Get data from localStorage and populate UI
function populateUI() {
  const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));

  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add("selected");
      }
    })
  }

  const selectedMovieIndex = localStorage.getItem("selectedMovieIndex");
  if (selectedMovieIndex !== null) {
    movieSelect.selectedIndex = selectedMovieIndex;
  }
}

//Change the ticket Price by the change event
movieSelect.addEventListener("change", e => {
  ticketPrice = e.target.value;
  setMovieData(e.target.selectedIndex, e.target.value);
  updateSelectedCount();
})

//Select the seat by the click event
container.addEventListener("click", e => {
  if (e.target.classList.contains("seat") && !e.target.classList.contains("occupied")) {
    e.target.classList.toggle("selected");
    updateSelectedCount();
  }
})

// Initial count and total set
updateSelectedCount();