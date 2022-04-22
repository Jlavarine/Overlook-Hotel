import chai from 'chai';
const expect = chai.expect;
import data from '../test/sampleData.js'
import Booking from '../src/classes/Booking.js'
describe('Booking', function() {
  let booking1;
  let booking2;
  let booking3;

  beforeEach( () => {
    booking1 = new Booking(data.sampleBookingData[0].id, data.sampleBookingData[0].userID, data.sampleBookingData[0].date, data.sampleBookingData[0].roomNumber)

    booking2 = new Booking(data.sampleBookingData[1].id, data.sampleBookingData[1].userID, data.sampleBookingData[1].date, data.sampleBookingData[1].roomNumber)

    booking3 = new Booking(data.sampleBookingData[2].id, data.sampleBookingData[2].userID, data.sampleBookingData[2].date, data.sampleBookingData[2].roomNumber)
  })

  it('should have an ID', function() {
    expect(booking1.id).to.equal("5fwrgu4i7k55hl6t8");
  });

  it('should have a User ID', function() {
    expect(booking1.userID).to.equal(1);
  });

  it('should have a date', function() {
    expect(booking1.date).to.equal("2022/02/05");
  });

  it('should have a bed size', function() {
    expect(booking1.roomNumber).to.equal(12);
  });

  it('should hold the info of the room associated with the booking', function() {
    booking1.generateRoomInfo(data.sampleRoomData)
    expect(booking1.roomInfo).to.deep.equal(
    {
    "number": 12,
    "roomType": "single room",
    "bidet": false,
    "bedSize": "twin",
    "numBeds": 2,
    "costPerNight": 172.09
    }
  );
  });

  it('should filter Bookings based on a date', function() {
   booking1.filterBookingsByDate('2022/04/22', data.sampleRoomData, data.sampleBookingData)
   expect(booking1.availableRooms).to.deep.equal([
       {
       "number": 12,
       "roomType": "single room",
       "bidet": false,
       "bedSize": "twin",
       "numBeds": 2,
       "costPerNight": 172.09
     },
     {
       "number": 22,
       "roomType": "single room",
       "bidet": false,
       "bedSize": "full",
       "numBeds": 2,
       "costPerNight": 350.31
     },
     {
       "number": 13,
       "roomType": "single room",
       "bidet": false,
       "bedSize": "queen",
       "numBeds": 2,
       "costPerNight": 423.92
     }
   ])
 })

 it('should filter Bookings based on a date', function() {
  booking1.filterBookingsByDate('2074/04/22', data.sampleRoomData, data.sampleBookingData)
  expect(booking1.availableRooms).to.deep.equal([
      {
      "number": 12,
      "roomType": "single room",
      "bidet": false,
      "bedSize": "twin",
      "numBeds": 2,
      "costPerNight": 172.09
    },
    {
      "number": 22,
      "roomType": "single room",
      "bidet": false,
      "bedSize": "full",
      "numBeds": 2,
      "costPerNight": 350.31
    },
    {
      "number": 13,
      "roomType": "single room",
      "bidet": false,
      "bedSize": "queen",
      "numBeds": 2,
      "costPerNight": 423.92
    },
    {
      "number": 15,
      "roomType": "residential suite",
      "bidet": false,
      "bedSize": "full",
      "numBeds": 1,
      "costPerNight": 294.56
    }
  ])
})

 it('should filter Bookings based on a date and room type', function() {
  booking1.filterBookingsByDate('2022/04/22', data.sampleRoomData, data.sampleBookingData)
  booking1.filterBookingsByType('2022/04/22', 'single room')
  expect(booking1.availableRooms).to.deep.equal([
      {
      "number": 12,
      "roomType": "single room",
      "bidet": false,
      "bedSize": "twin",
      "numBeds": 2,
      "costPerNight": 172.09
    },
    {
      "number": 22,
      "roomType": "single room",
      "bidet": false,
      "bedSize": "full",
      "numBeds": 2,
      "costPerNight": 350.31
    },
    {
      "number": 13,
      "roomType": "single room",
      "bidet": false,
      "bedSize": "queen",
      "numBeds": 2,
      "costPerNight": 423.92
    }
  ])
})
it('should filter Bookings based on a date and room type', function() {
 booking1.filterBookingsByDate('2022/04/22', data.sampleRoomData, data.sampleBookingData)
 booking1.filterBookingsByType('2022/04/22', 'lorem ipsum')
 expect(booking1.availableRooms).to.deep.equal([])
})
})
