// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/styles.css';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'
import { fetchData } from './apiCalls';
import { fetchedUniqueUser } from './apiCalls';
import Customer from './classes/Customer.js'
import Booking from './classes/Booking.js'
import Room from './classes/Room.js'



const initialMessage = document.querySelector('.initial-message')
const guestLoginButton = document.querySelector('.guest-login')
const managerLoginButton = document.querySelector('.manager-login')
const loginSelection = document.querySelector('.login-selection')
const loginPage = document.querySelector('.login-page')
const loginHeader = document.querySelector('.login-header')
const loginButton = document.querySelector('.login-button')
const usernameInput = document.querySelector('.username-input')
const passwordInput = document.querySelector('.password-input')
const loginError = document.querySelector('.login-error')
const noInputError = document.querySelector('.login-error-no-input')
const changeUserButton = document.querySelector('.change-user-button')
const userDashboard = document.querySelector('.dashboard-page-user')
const totalSpentHeader = document.querySelector('.total-spent')
const dashboardBookingsArea = document.querySelector('.dashboard__main-bookings')
const newBookingsArea = document.querySelector('.dashboard__main-new-bookings-info')
const findRoomButton = document.querySelector('.find-room')
const bookingDateField = document.querySelector('.booking-date-selection')
const filterByRoomSection = document.querySelector('.filter-by-room')
const filterValue = document.querySelector('.filter-by-room-values')
const clearFilters = document.querySelector('.clear-filters')
const noBookingsHeader = document.querySelector('.no-bookings')
const noDate = document.querySelector('.no-date-chosen')
const bookingPage = document.querySelector('.booking-page')
const bookingPageArea = document.querySelector('.booking-page__room')
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~Global Variables~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
let customer;
let allBookings;
let allRooms;
let allCustomers;
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~Event Listeners~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
guestLoginButton.addEventListener('click', showLogin)
managerLoginButton.addEventListener('click', showManagerLogin)
changeUserButton.addEventListener('click', changeUser)
// loginButton.addEventListener('click', logIn)
findRoomButton.addEventListener('click', createNewBookingsHTML)
clearFilters.addEventListener('click', clearDateAndTime)

// CORRECT
newBookingsArea.addEventListener('click', function(e) {
  if(e.target.dataset.room) {
    openBookingPage(e)
  }
})



loginButton.addEventListener('click', checkUsernameAndPassword)

window.addEventListener('load', () => {
  fetchData.then(data => {
    allCustomers = data[0].customers
    customer = new Customer(allCustomers[1].id, allCustomers[1].name)
    instantiateBookings(data[2].bookings)
    instantiateRooms(data[1].rooms)
    console.log('allRooms', allRooms)
    console.log('user', customer)
    console.log(data[0]);
    console.log(data[1]);
    console.log(data[2]);
  })
});
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~DOM Updates~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
function instantiateBookings(bookingData) {
    allBookings = bookingData.map(booking => {
      return new Booking(booking.id,booking.userID, booking.date, booking.roomNumber)
    })
}

function instantiateRooms(roomData) {
    allRooms = roomData.map(room => {
      return new Room(room.number,room.roomType, room.bidet, room.bedSize, room.numBeds, room.costPerNight)
    })
}

function show(e) {
  e.classList.remove('hidden')
}

function hide(e) {
  e.classList.add('hidden')
}

function showAll(elements) {
  elements.forEach(element => show(element))
}

function hideAll(elements) {
  elements.forEach(e => hide(e))
}

function showLogin() {
  loginHeader.innerText = 'Guest Login'
  hideAll([loginSelection, initialMessage])
  show(loginPage)
}

function showManagerLogin() {
  showLogin()
  loginHeader.innerText = 'Manager Login'
}

function changeUser() {
  hideAll([loginPage, noInputError, loginError])
  showAll([loginSelection, initialMessage])
}

function logIn() {
  hideAll([loginPage, loginError, noInputError])
  showAll([userDashboard, totalSpentHeader])
  createMyBookedRoomsHTML()
  // totalSpentHeader.innerText =
}

function createMyBookedRoomsHTML() {
  customer.generateAllBookings(allBookings)
  customer.generateTotalSpent(allRooms)
  totalSpentHeader.innerText = `Total Spent: $${customer.totalSpent.toFixed(2)}`
  customer.allBookings.sort((a,b) => {
    return a.roomNumber - b.roomNumber
  })
  customer.allBookings.forEach(booking => {
    // booking.generateDate()
    dashboardBookingsArea.innerHTML += `
    <div class="dashboard__booking-box-info" tabindex='0'>
    <p>Date: ${booking.date}</p>
    <p>Room Number: ${booking.roomNumber}</p>
    </div>
    <br>
    `
  })
}

function createNewBookingsHTML() {

  hideAll([noBookingsHeader, noDate])
  newBookingsArea.innerHTML = ''
  if(bookingDateField.value === '') {
    showAll([noDate])
    return
  }
  let correctFormatDate = bookingDateField.value.split('-').join('/')
  let booking = allBookings[0]
  booking.generateRoomInfo(allRooms)
  booking.filterBookingsByDate(correctFormatDate, allRooms, allBookings)
  if(booking.availableRooms.length === 0) {
    showAll([noBookingsHeader])
  }
  if(filterValue.value !== 'none') {
    createNewBookingsByRoomTypeHTML()
  } else {
    console.log(booking.availableRooms)
    booking.availableRooms.forEach(room => {
      newBookingsArea.innerHTML += `
      <div class="dashboard__booking-box-info booking-button" tabindex='0' data-room=${room.number}>
      <p data-room=${room.number}>Room Number: ${room.number}</p>
      <p data-room=${room.number}>Room Type: ${room.roomType}</p>
      </div>
      <br>`
    })
  }
}

function createNewBookingsByRoomTypeHTML() {
  hideAll([noBookingsHeader])
  newBookingsArea.innerHTML = ''
  let correctFormatDate = bookingDateField.value.split('-').join('/')
  let booking = allBookings[0]
  booking.generateRoomInfo(allRooms)
  // booking.filterBookingsByDate(correctFormatDate)
  booking.filterBookingsByType(correctFormatDate, filterValue.value)
  console.log(booking.availableRooms)
  if(booking.availableRooms.length === 0) {
    showAll([noBookingsHeader])
  }
  booking.availableRooms.forEach(room => {
    newBookingsArea.innerHTML += `
    <div class="dashboard__booking-box-info booking-button" tabindex='0' data-room=${room.number}>
      <p data-room=${room.number}>Room Number: ${room.number}</p>
      <p data-room=${room.number}>Room Type: ${room.roomType}</p>
    </div>
    <br>`
  })
}

function clearDateAndTime() {
  hideAll([newBookingsArea])
  filterValue.value = 'none'
  bookingDateField.value = ''
}

function openBookingPage(e) {
  hideAll([userDashboard])
  showAll([bookingPage])
  allRooms.forEach(room => {
    if(room.number === parseInt(e.target.dataset.room)) {
      console.log('if')
      bookingPageArea.innerHTML =`
      <p>Room Number: ${room.number}</p>
      <p>Room Type: ${room.roomType}</p>
      <p>Bed Size: ${room.bedSize}</p>
      <p>Number Beds: ${room.numBeds}</p>
      <p>Bidet: ${room.bidet}</p>
      <p>Cost Per Night: ${room.costPerNight}</p>`
    }
    })
}

function checkUsernameAndPassword() {
  allCustomers.forEach(customer => {
    if(!usernameInput.value || !passwordInput.value){
      hideAll([loginError])
      showAll([noInputError])
      return
    }
    if(passwordInput.value !== 'overlook2021' || usernameInput.value !== `customer${customer.id}` ) {
      hideAll([noInputError])
      showAll([loginError])
    }else {
     logIn()
   }
  })
}

// export { customer, allBookings, allRooms }
