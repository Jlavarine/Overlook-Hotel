# Overlook Hotel
Overlook Hotel is an application that allows a customer to search for hotel bookings, book new rooms, and see their previous bookings and allows managers to view stats about the hotel, search for customers, as well as add and delete bookings for customers.

## Built With
  * JavaScript
  * CSS
  * HTML
  * Webpack

## Contributors:
  * Jacob Lavarine [GitHub](https://github.com/Jlavarine)


## Getting Started:

1. Start by going [here](https://github.com/Jlavarine/whats-cookin). From here you will want to click on the green rectangular button titled 'Code'. This should open a drop down menu where you should see a link. To the left of the link there should be an icon with two over lapping squares. You can click the icon to copy the link. For convince you can copy here, git@github.com:Jlavarine/whats-cookin.git.

2. You will want to clone down the repo to you terminal using `git clone git@github.com:Jlavarine/whats-cookin.git`.
3. Once you have cloned the repo, change into the directory and install the project dependencies. Run `npm install` or `npm i` to install project dependencies.
4. Run npm start in the terminal to see the HTML page. You will need to copy and paste the local server from the terminal and paste it into your browser. The local server should be simialiar to, "http://localhost:8080/". `Control + C` is the command to stop running the local server. Closing the terminal without stopping the server first could allow the server to continue to run in the background and cause problems. This is because this application uses webpack.
5. Do not run `npm audit fix --force`. This will update to the latest version of packages. You need to be using `webpack-dev-server@3.11.2` which is not the latest version.
6. You will need to clone down a sent repo to use as a local server. The site will not use local data but data from a deployed API. You can clone down the repo here https://github.com/turingschool-examples/overlook-api. Follow the instructions in it's README to clone it down and run from your local.

### Using the Application:

### As a Customer:
*  On page load, there is a section to choose who is using the application. There is a Guest login and a manager login. Once the proper user is selected, you will need to enter your username/password to access the site.

*  Once logged in, the customer will see their dashboard. The dashboard shows their past and future bookings, the total spent on all their bookings so far, and a section to book a new room.

![Guest Login   Dashboard](https://user-images.githubusercontent.com/96446170/165378262-d4160b02-221e-49e3-b93e-567573d18552.gif)

* Booking a room: The customer can navigate to the Book A Room section to book a new room. This section gives the customer a way to search for available rooms, not only by a specific date, but also by the type of room. 

![Search For Room](https://user-images.githubusercontent.com/96446170/165379003-3687740e-f5b0-433e-a94e-cce45321797f.gif)

* Once a customer sees a room they would like to book, they can click the book now button on the room details. They will then be brought to a new page that describes the room with all its details. If the customer still wishes to proceed with the booking, they can click the book now button to be taken to a final confirmation page. Once the user books the room, the user will be directed back to their dashboard where the new booking will now be displayed in their bookings section, and their total spent will be updated based on the price of the newly booked room.

![Book Room](https://user-images.githubusercontent.com/96446170/165382932-19876cfe-e237-4a2d-96d3-d0b8b84de5a8.gif)


### As a Manager:
*  On page load, there is a section to choose who is using the application. There is a Guest login and a manager login. Once the proper user is selected, you will need to enter your username/password to access the site.

## Where to Add Your Code

### JavaScript

You have to be very intentional with where you add your feature code. This repo uses a tool called [webpack](https://webpack.js.org/) to combine many JavaScript files into one big file. Webpack enables you to have many, separate JavaScript files to keep your code organized and readable. Webpack expects all of your code files to be in a specific place, or else it doesn't know how to combine them all behind the scenes.

**Create all of your feature code files in the `src` directory.**

Since code is separated into multiple files, you need to use the `import` and `export` syntax to share code across file.

Here is a video that walks through some information about [import and export](https://www.youtube.com/watch?v=_3oSWwapPKQ). There are a lot of resources out there about `import` and `export`, and resources will sometimes call them `ES6 modules`. It's something you will see in React and beyond.

### HTML

Add the HTML you need in the `index.html` file in the `./dist` directory. There is some boilerplate HTML that exists from the start that you can modify.

### Images

Add your image files in the `src/images` directory. Similar to CSS files, you need to `import` image files in the JavaScript entry file (`scripts.js`). Then go into the HTML and add an `img` element with the `src` attribute pointing to the `images` directory. There is an example in the `index.html` file for you to see.

## How to View Your Code in Action

In the terminal, run:

bash
npm start

You will see a bunch of lines output to your terminal. One of those lines will be something like:

bash
Project is running at http://localhost:8080/

Go to `http://localhost:8080/` in your browser to view your code running in the browser.

---

## Test Files Organization

Similar to feature code, your test code needs to be put in a specific place for it to run successfully.

**Put all of your test files in the `test` directory.** As a convention, all test filenames should end with `-test.js`. For instance: `box-test.js`.

## Running Your Tests

Run your test suite using the command:

bash
npm test

The test results will output to the terminal.

---


## Webpack?

If you look in the `package.json` file, you'll see one of the library dependencies called `webpack`. If you're interested in learning more about what Webpack is and how it works behind the scenes, take a look through the [Webpack configuration documentation](https://webpack.js.org/concepts/).

## Deploying to GitHub Pages

_If you are finished with the functionality and testing of your project_, then you can consider deploying your project to the web! This way anyone can play it without cloning down your repo.

[GitHub Pages](https://pages.github.com/) is a great way to deploy your project to the web. Don't worry about this until your project is free of bugs and well tested!

If you _are_ done, you can follow [this procedure](./gh-pages-procedure.md) to get your project live on GitHub Pages.

## Challenges:
  * Verifying the usernames and passwords were dynamically correct.

## Future Additions:
 * I would like to create a more robust Manager Dashboard.
