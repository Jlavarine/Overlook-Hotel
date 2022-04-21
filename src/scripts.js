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
const changeUserButton = document.querySelector('.change-user-button')
const userDashboard = document.querySelector('.dashboard-page-user')
const totalSpentHeader = document.querySelector('.total-spent')
const dashboardBookingsArea = document.querySelector('.dashboard__main-bookings')
const newBookingsArea = document.querySelector('.dashboard__main-new-bookings-info')
const findRoomButton = document.querySelector('.find-room')
const bookingDateField = document.querySelector('.booking-date-selection')
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~Global Variables~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
let customer;
let allBookings;
let allRooms;

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~Event Listeners~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
guestLoginButton.addEventListener('click', showLogin)
managerLoginButton.addEventListener('click', showManagerLogin)
changeUserButton.addEventListener('click', changeUser)
loginButton.addEventListener('click', logIn)
findRoomButton.addEventListener('click', createNewBookingsHTML)


window.addEventListener('load', () => {
  fetchData.then(data => {
    const allCustomers = data[0].customers
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

// this.id = id;
// this.userID = userID;
// this.date = date;
// this.roomNumber = roomNumber;
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
  hideAll([loginPage])
  showAll([loginSelection, initialMessage])
}

function logIn() {
  hideAll([loginPage])
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
  console.log(bookingDateField.value)
  let correctFormatDate = bookingDateField.value.split('-').join('/')
  let booking = allBookings[0]
  booking.generateRoomInfo(allRooms)
  booking.filterBookingsByDate(correctFormatDate)
  booking.availableRooms.forEach(room => {
    // booking.generateDate()
    newBookingsArea.innerHTML += `
    <div class="dashboard__booking-box-info" tabindex='0'>
    <p>Room Number: ${room.number}</p>
    <p>Room Type: ${room.roomType}</p>
    </div>
    <br>
    `
  })
}
export { customer, allBookings, allRooms }
