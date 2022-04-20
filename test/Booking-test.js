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
})
