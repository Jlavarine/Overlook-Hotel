import chai from 'chai';
const expect = chai.expect;
import data from '../test/sampleData.js'
import User from '../src/classes/User.js'
describe('User', function() {
  let user1;
  let user2;
  let user3;

  beforeEach( () => {
    user1 = new User(data.sampleUserData[0].id, data.sampleUserData[0].name)
    user2 = new User(data.sampleUserData[1].id, data.sampleUserData[1].name)
    user3 = new User(data.sampleUserData[2].id, data.sampleUserData[2].name)
  })

  it('should have an id', function() {
    expect(user1.id).to.equal(1);
  });

  it('should have a name', function() {
    expect(user1.name).to.equal('Leatha Ullrich');
  });

  it('should hold a list of all their bookings', function() {
    user1.generateAllBookings(data.sampleBookingData)
    expect(user1.allBookings).to.deep.equal([
      {
      "id": "5fwrgu4i7k55hl6t8",
      "userID": 1,
      "date": "2022/02/05",
      "roomNumber": 12
    },
    {
      "id": "5fwrgu4i7k55hl727",
      "userID": 1,
      "date": "2022/01/20",
      "roomNumber": 22
    }])
  })

  it('should generate total spent on all bookings', function() {
    user1.generateAllBookings(data.sampleBookingData)
    user1.generateTotalSpent(data.sampleRoomData)
    expect(user1.totalSpent).to.equal(522.4);
  });
});
