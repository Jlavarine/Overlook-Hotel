import chai from 'chai';
const expect = chai.expect;
import data from '../test/sampleData.js'
import Room from '../src/classes/Room.js'

describe('Room', function() {
  let room1;
  let room2;
  let room3;

  beforeEach( () => {
    room1 = new Room(data.sampleRoomData[0].number, data.sampleRoomData[0].roomType, data.sampleRoomData[0].bidet, data.sampleRoomData[0].bedSize, data.sampleRoomData[0].numBeds, data.sampleRoomData[0].costPerNight)

    room2 = new Room(data.sampleRoomData[1].number, data.sampleRoomData[1].roomType, data.sampleRoomData[1].bidet, data.sampleRoomData[1].bedSize, data.sampleRoomData[1].numBeds, data.sampleRoomData[1].costPerNight)

    room3 = new Room(data.sampleRoomData[2].number, data.sampleRoomData[2].roomType, data.sampleRoomData[2].bidet, data.sampleRoomData[2].bedSize, data.sampleRoomData[2].numBeds, data.sampleRoomData[2].costPerNight)
  })

  it('should have a number', function() {
    expect(room1.number).to.equal(12);
  });

  it('should have a room type', function() {
    expect(room1.roomType).to.equal('single room');
  });

  it('should return a boolean for the bidet property', function() {
    expect(room1.bidet).to.equal(false);
  });

  it('should have a bed size', function() {
    expect(room1.bedSize).to.equal('twin');
  });

  it('should have some number of beds', function() {
    expect(room1.numBeds).to.equal(2);
  });

  it('should have a cost per night', function() {
    expect(room1.costPerNight).to.equal(172.09);
  });
})
