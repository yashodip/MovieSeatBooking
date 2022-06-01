const container = document.querySelector(".container")
const seats = document.querySelectorAll(".row .seat:not(.occupied)")
const count = document.getElementById("count")
const total = document.getElementById("total")
const movies = document.getElementById("movies")
let ticketPrice = +movies.value

function setMovieData() {
  localStorage.setItem("movieIndex", movies.selectedIndex)
  localStorage.setItem("ticketPrice", ticketPrice)
}

function updateCount() {
  const selected = document.querySelectorAll(".row .seat.selected")
  const selectedIndex = [...selected].map(function (item) {
    return [...seats].indexOf(item)
  })
  localStorage.setItem("selectedSeats", JSON.stringify(selectedIndex))
  setMovieData()
  count.innerText = selected.length
  total.innerText = ticketPrice * selected.length
}

//change event on select
movies.addEventListener("change", (e) => {
  ticketPrice = +e.target.value
  updateCount()
})

//add event on seats
container.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("occupied")
  ) {
    e.target.classList.toggle("selected")

    updateCount()
  }
})
console.log(ticketPrice)

function initialLoad() {
  movies.selectedIndex = localStorage.getItem("movieIndex")
  const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"))

  selectedSeats &&
    seats.forEach((item, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        item.classList.add("selected")
      }
    })
  console.log(ticketPrice)
}

initialLoad()
updateCount()
