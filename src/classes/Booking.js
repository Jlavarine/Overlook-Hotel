import Room from './Room.js'
class Booking {
  constructor(id, userID, date, roomNumber) {
    this.id = id;
    this.userID = userID;``
    this.date = date;
    this.roomNumber = roomNumber;
    this.roomInfo;
    this.availableRooms = []
  }

  generateRoomInfo(roomData) {
    const matchingRoom = roomData.find(room => this.roomNumber === room.number);
    this.roomInfo = new Room(matchingRoom.number, matchingRoom.roomType, matchingRoom.bidet, matchingRoom.bedSize, matchingRoom.numBeds, matchingRoom.costPerNight)
  }

  filterBookingsByDate(date, allRooms, allBookings) {
    this.availableRooms = []
    let nonAvailableRooms = allBookings.filter(booking => booking.date === date)
    allRooms.forEach(room => this.availableRooms.push(room))
    nonAvailableRooms.forEach(nonRooms => {
      this.availableRooms.forEach((room,index) => {
        if(nonRooms.roomNumber === room.number) {
          this.availableRooms.splice(index, 1)
        }
      })
    })
  }

  filterBookingsByType(date, filteredValue) {
    let filteredRoomTypes = []
    this.availableRooms.forEach(room => {
      if(room.roomType === filteredValue) {
        filteredRoomTypes.push(room)
    }
  })
    this.availableRooms = filteredRoomTypes
  }
}

export default Booking
