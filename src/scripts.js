// This is the JavaScript entry file - your code begins here
// Do not delete or rename this file ********

// An example of how you tell webpack to use a CSS (SCSS) file
import './css/styles.css';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'
import { fetchData } from './apiCalls';
import { fetchedUniqueUser } from './apiCalls';
import Customer from './classes/Customer.js'

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
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~Global Variables~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
let customer;
let bookings;

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~Event Listeners~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
guestLoginButton.addEventListener('click', showLogin)
managerLoginButton.addEventListener('click', showManagerLogin)
changeUserButton.addEventListener('click', changeUser)
loginButton.addEventListener('click', logIn)


window.addEventListener('load', () => {
  fetchData.then(data => {
    // console.log(typeof(data))
    // console.log('data',data[0])
    const allCustomers = data[0].customers
    customer = new Customer(allCustomers[0].id, allCustomers[0].name)
    console.log('user', customer)
    console.log(data[0]);
    console.log(data[1]);
    console.log(data[2]);
  })
});

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

function changeUser() {
  hideAll([loginPage])
  showAll([loginSelection, initialMessage])
}

function logIn() {
  hideAll([loginPage])
  showAll([userDashboard, totalSpentHeader])
  // totalSpentHeader.innerText =
}
