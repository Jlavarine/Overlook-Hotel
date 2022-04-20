let sampleUserData = [
{
  "id": 1,
  "name": "Leatha Ullrich"
  },
{
  "id": 2,
  "name": "Rocio Schuster"
},
{
  "id": 3,
  "name": "Kelvin Schiller"
}
]

let sampleBookingData = [
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
},
{
  "id": "5fwrgu4i7k55hl71j",
  "userID": 2,
  "date": "2022/01/11",
  "roomNumber": 13
}
]

let sampleRoomData = [
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
]


module.exports = { sampleUserData, sampleBookingData, sampleRoomData }
