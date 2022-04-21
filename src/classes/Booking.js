import Room from './Room.js'

class Booking {
  constructor(id, userID, date, roomNumber) {
    this.id = id;
    this.userID = userID;
    this.date = date;
    this.roomNumber = roomNumber;
    this.roomInfo;
  }

  generateRoomInfo(roomData) {
    const matchingRoom = roomData.find(room => this.roomNumber === room.number);
    this.roomInfo = new Room(matchingRoom.number, matchingRoom.roomType, matchingRoom.bidet, matchingRoom.bedSize, matchingRoom.numBeds, matchingRoom.costPerNight)
  }
}

export default Booking
