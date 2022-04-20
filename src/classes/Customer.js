class Customer {
  constructor(id, name) {
    this.id = id;
    this.name = name;
    this.allBookings //past/present/future
    this.totalSpent;
  }

  generateAllBookings(bookingData) {
    this.allBookings = bookingData.filter(booking => booking.userID === this.id)
  }

  generateTotalSpent(roomData) {
    this.totalSpent = this.allBookings.reduce((acc, booking) => {
      roomData.forEach(room => {
        if(booking.roomNumber === room.number) {
          acc += room.costPerNight
        }
      })
      return acc
    },0)
  }
}


export default Customer;
