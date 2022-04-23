const fetchDatasets = (dataset) => {
    return fetch(`http://localhost:3001/api/v1/${dataset}`)
      .then(response => response.json())
      .catch(error => console.log(`Error: ${dataset} fetch failed`))
}
// CORRECT
// let fetchData = Promise.all([fetchDatasets('customers'), fetchDatasets('rooms'), fetchDatasets('bookings')])
let fetchData = Promise.all([fetchDatasets('bookings'), fetchDatasets('customers'), fetchDatasets('rooms')])


const fetchUniqueUser = (dataset) => {
    return fetch(`http://localhost:3001/api/v1/${dataset}`)
      .then(response => response.json())
      .catch(error => console.log(`Error: ${dataset} fetch failed`))
}

let fetchedUniqueUser = Promise.all([fetchUniqueUser('customers/1')])


const postDataset = (userId, date, roomNumber) => {

   fetch('http://localhost:3001/api/v1/bookings', {
    method: 'POST',
    body: JSON.stringify({
      "userID": userId,
      "date": date,
      "roomNumber": roomNumber
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  }).then(response => response.json())
  .then(response => console.log('post response', response))

  fetchDatasets('bookings')
  fetchDatasets('customers')
  fetchDatasets('rooms')
  fetchData = Promise.all([fetchDatasets('bookings'), fetchDatasets('customers'), fetchDatasets('rooms')])
}



export { fetchData , postDataset, fetchedUniqueUser}
