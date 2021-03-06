import './css/styles.css';
import './images/turing-logo.png'
import { fetchData } from './apiCalls';
import { postDataset } from './apiCalls';
import { fetchUniqueUser } from './apiCalls';
import { fetchedUniqueUser } from './apiCalls';
import Customer from './classes/Customer.js'
import Booking from './classes/Booking.js'
import Room from './classes/Room.js'
// ~~~~~~~~~~~~~~~~~~~~~~~~~querySelectors~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
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
const filterValue = document.querySelector('.filter-by-room-values')
const clearFilters = document.querySelector('.clear-filters')
const noBookingsHeader = document.querySelector('.no-bookings')
const noDate = document.querySelector('.no-date-chosen')
const pastDate = document.querySelector('.past-date-chosen')
const bookingPage = document.querySelector('.booking-page')
const bookingPageArea = document.querySelector('.booking-page__room')
const bookRoomButton = document.querySelector('.book-room')
const cancelButton = document.querySelector('.cancel')
const confirmationPage = document.querySelector('.booking-confirmation-page')
const confirmBookingButton = document.querySelector('.yes-add-button')
const cancelBookingButton = document.querySelector('.no-go-back')
const welcomeMessage = document.querySelector('.welcome-message')
const managerDashboard = document.querySelector('.manager-dashboard')
const logOut = document.querySelector('.logout')
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~Global Variables~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
let customer;
let allBookings;
let allRooms;
let allCustomers;
let currentBooking;
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~Event Listeners~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
guestLoginButton.addEventListener('click', showLogin)
managerLoginButton.addEventListener('click', showManagerLogin)
changeUserButton.addEventListener('click', changeUser)
findRoomButton.addEventListener('click', createNewBookingsHTML)
clearFilters.addEventListener('click', clearDateAndTime)
loginButton.addEventListener('click', function() {
  checkManagerLogin()
  checkUsernameAndPassword()
})
passwordInput.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
    event.preventDefault();
    loginButton.click();
  };
});
bookRoomButton.addEventListener('click', loadConfirmationPage)
cancelButton.addEventListener('click', reloadDashboard)
confirmBookingButton.addEventListener('click', initiatePost)
cancelBookingButton.addEventListener('click', cancelBooking)
logOut.addEventListener('click', reloadPage)
newBookingsArea.addEventListener('click', function(e) {
  if(e.target.dataset.room) {
    openBookingPage(e)
  }
})
window.addEventListener('load', () => {
  fetchData.then(data => {
    allCustomers = data[1].customers
    instantiateRooms(data[2].rooms)
    instantiateBookings(data[0].bookings, allRooms)
  }).catch(error => welcomeMessage.innerText = 'Error: Please refresh!')
});
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~Functions~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
function instantiateBookings(bookingData, allRooms) {
  allBookings = bookingData.map(booking => {
    return new Booking(booking.id,booking.userID, booking.date, booking.roomNumber)
  })
  allBookings.forEach(booking => {
    booking.generateRoomInfo(allRooms)
  })
}

function instantiateRooms(roomData) {
  allRooms = roomData.map(room => {
    return new Room(room.number,room.roomType, room.bidet, room.bedSize, room.numBeds, room.costPerNight)
  })
}

function getUserFromLogin() {
  let splitUsername = usernameInput.value.split('')
  if(splitUsername.length === 10) {
    let userNumbers = []
    userNumbers.push(splitUsername[8])
    userNumbers.push(splitUsername[9])
    let userID = userNumbers.join('')
    let fetchedUniqueUser = Promise.all([fetchUniqueUser(`customers/${userID}`)])
    fetchedUniqueUser.then(data => {
      customer = new Customer(data[0].id, data[0].name)
      createMyBookedRoomsHTML()
    })
  }
  if(splitUsername.length === 9) {
    let userNumbers = []
    userNumbers.push(splitUsername[8])
    let userID = userNumbers.join('')
    let fetchedUniqueUser = Promise.all([fetchUniqueUser(`customers/${userID}`)])
    fetchedUniqueUser.then(data => {
      customer = new Customer(data[0].id, data[0].name)
      createMyBookedRoomsHTML()
    })
  }
}

function checkManagerLogin() {
  if(loginHeader.innerText !== 'Manager Login') {
    return
  } else if(loginHeader.innerText = 'Manager Login') {
    if(!usernameInput.value || !passwordInput.value){
      hideAll([loginError])
      showAll([noInputError])
      return
    }
    if(passwordInput.value !== 'overlook2021' || usernameInput.value !== 'manager' ) {
      hideAll([noInputError])
      showAll([loginError])
    }else {
     managerLogIn()
   }
    }
}


function checkUsernameAndPassword() {
  if(loginHeader.innerText !== 'Guest Login') {
    return
  }
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

function reloadPage() {
  window.location.reload()
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~DOM Updates~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

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

function managerLogIn() {
  showAll([managerDashboard])
  hideAll([loginPage, loginError, noInputError])

}

function changeUser() {
  usernameInput.value = ''
  passwordInput.value = ''
  hideAll([loginPage, noInputError, loginError])
  showAll([loginSelection, initialMessage])
}


function logIn() {
  hideAll([loginPage, loginError, noInputError])
  showAll([userDashboard, totalSpentHeader])
  getUserFromLogin()
}

function createMyBookedRoomsHTML() {
  welcomeMessage.innerText = `Welcome to the Overlook Hotel, ${customer.name}`
  customer.generateAllBookings(allBookings)
  customer.generateTotalSpent(allRooms)
  totalSpentHeader.innerText = `Total Spent: $${customer.totalSpent.toFixed(2)}`
  customer.allBookings.sort((a,b) => {

    a = parseInt(a.date.split('/').join(''))
    b = parseInt(b.date.split('/').join(''))
    return b - a
  })
  compareDates()
}

function compareDates() {
  customer.allBookings.forEach(booking => {
    let today = new Date()
    let dd = today.getDate()
    let mm = `0${today.getMonth() +1}`
    let yyyy = today.getFullYear()
    let currentDate = `${yyyy}${mm}${dd}`
    let calendarDate = `${yyyy}-${mm}-${dd}`
    bookingDateField.setAttribute("min", calendarDate);
    let dateNumber = parseInt(currentDate)
    let bookingDate = booking.date.split('/').join('')
    if(parseInt(bookingDate) < dateNumber) {
      dashboardBookingsArea.innerHTML += `
      <div class="dashboard__booking-box-info" tabindex='0'>
        <p>Date: ${booking.date}</p>
        <p>Room Number: ${booking.roomNumber}</p>
        <p>Booking ID: ${booking.id}</p>
        <p>Status: Completed</p><p>Invoice: $${booking.roomInfo.costPerNight.toFixed(2)}</p>
      </div>
      <br>`
    } else {
      dashboardBookingsArea.innerHTML += `
      <div class="dashboard__booking-box-info" tabindex='0'>
        <p>Date: ${booking.date}</p>
        <p>Room Number: ${booking.roomNumber}</p>
        <p>Booking ID: ${booking.id}</p>
        <p>Status: Upcoming</p>
        <p>Invoice: $${booking.roomInfo.costPerNight.toFixed(2)}</p>
      </div>
      <br>`
    }
  })
}

function getDate() {
  let today = new Date()
  let dd = today.getDate()
  let mm = `0${today.getMonth() +1}`
  let yyyy = today.getFullYear()
  let currentDate = `${yyyy}${mm}${dd}`
  return currentDate
}

function resetNewBookingsArea() {
  newBookingsArea.innerHTML = ''
  showAll([newBookingsArea])
  hideAll([noBookingsHeader, noDate, pastDate])
}

function createNewBookingsHTML() {
  resetNewBookingsArea()
  if(bookingDateField.value === '') {
    showAll([noDate])
    return
  }
  let date = getDate()
  if(bookingDateField.value.split('-').join('') < date) {
    showAll([pastDate])
    return
  }
  let booking = allBookings[0]
  booking.generateRoomInfo(allRooms)
  booking.filterBookingsByDate(bookingDateField.value.split('-').join('/'), allRooms, allBookings)
  if(booking.availableRooms.length === 0) {
    showAll([noBookingsHeader])
  }
  if(filterValue.value !== 'none') {
    createNewBookingsByRoomTypeHTML()
  } else {
    booking.availableRooms.forEach(room => {
      newBookingsArea.innerHTML += `
      <div class="dashboard__booking-box-info booking-button" tabindex='0'>
        <p>Room Number: ${room.number}</p>
        <p>Room Type: ${room.roomType}</p>
        <p>Cost Per Night: $${room.costPerNight.toFixed(2)}</p>
        <p>Bed Size: ${room.bedSize}</p>
        <p>Number of Beds: ${room.numBeds}</p>
        <p>Bidet: ${room.bidet}</p>
        <button type="button" name="book" class="book" data-room=${room.number}>Book Now</button>
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
  booking.filterBookingsByType(correctFormatDate, filterValue.value)
  if(booking.availableRooms.length === 0) {
    showAll([noBookingsHeader])
  }
  booking.availableRooms.forEach(room => {
    newBookingsArea.innerHTML += `
    <div class="dashboard__booking-box-info booking-button" tabindex='0'>
      <p>Room Number: ${room.number}</p>
      <p>Room Type: ${room.roomType}</p>
      <p>Cost Per Night: $${room.costPerNight.toFixed(2)}</p>
      <p>Bed Size: ${room.bedSize}</p>
      <p>Number of Beds: ${room.numBeds}</p>
      <p>Bidet: ${room.bidet}</p>
      <button type="button" name="book" class="book" data-room=${room.number}>Book Now</button>
    </div>
    <br>`
  })
}

function clearDateAndTime() {
  hideAll([newBookingsArea, noDate, pastDate])
  filterValue.value = 'none'
  bookingDateField.value = ''
}

function openBookingPage(e) {
  hideAll([userDashboard])
  showAll([bookingPage, bookingPageArea])
  allRooms.forEach(room => {
    if(room.number === parseInt(e.target.dataset.room)) {
      currentBooking = parseInt(e.target.dataset.room)
      bookingPageArea.innerHTML =`
      <p>Room Number: ${room.number}</p>
      <p>Room Type: ${room.roomType}</p>
      <p>Bed Size: ${room.bedSize}</p>
      <p>Number Beds: ${room.numBeds}</p>
      <p>Bidet: ${room.bidet}</p>
      <p>Cost Per Night: $${room.costPerNight.toFixed(2)}</p>`
    }
  })
}

function loadConfirmationPage() {
  hideAll([bookingPage])
  showAll([confirmationPage])
}

function reloadDashboard() {
  hideAll([bookingPage])
  showAll([userDashboard])
  clearFilters.click()
}

function cancelBooking() {
  hideAll([confirmationPage])
  showAll([bookingPage])
}

function initiatePost() {
  postDataset(customer.id, bookingDateField.value.split('-').join('/'), currentBooking)
  hideAll([bookingPageArea, confirmationPage])
  clearDateAndTime()
  updateCustomerBookings()
  showAll([userDashboard])
}

function updateCustomerBookings() {
  fetchData.then(data => {
      instantiateBookings(data[0].bookings, allRooms)
      customer.generateAllBookings(allBookings)
      dashboardBookingsArea.innerHTML = ''
      createMyBookedRoomsHTML()
  }).catch(error => welcomeMessage.innerText = 'Error: Please refresh!')
}
