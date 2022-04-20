import chai from 'chai';
const expect = chai.expect;
import data from '../test/sampleData.js'
import Customer from '../src/classes/Customer.js'
describe('Customer', function() {
  let customer1;
  let customer2;
  let customer3;

  beforeEach( () => {
    customer1 = new Customer(data.sampleCustomerData[0].id, data.sampleCustomerData[0].name)
    customer2 = new Customer(data.sampleCustomerData[1].id, data.sampleCustomerData[1].name)
    customer3 = new Customer(data.sampleCustomerData[2].id, data.sampleCustomerData[2].name)
  })

  it('should have an id', function() {
    expect(customer1.id).to.equal(1);
  });

  it('should have a name', function() {
    expect(customer1.name).to.equal('Leatha Ullrich');
  });

  it('should hold a list of all their bookings', function() {
    customer1.generateAllBookings(data.sampleBookingData)
    expect(customer1.allBookings).to.deep.equal([
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
    customer1.generateAllBookings(data.sampleBookingData)
    customer1.generateTotalSpent(data.sampleRoomData)
    expect(customer1.totalSpent).to.equal(522.4);
  });
});
