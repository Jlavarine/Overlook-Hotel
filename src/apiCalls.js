const fetchDatasets = (dataset) => {
    return fetch(`http://localhost:3001/api/v1/${dataset}`)
      .then(response => response.json())
      .catch(error => console.log(`Error: ${dataset} fetch failed`))
}

let fetchData = Promise.all([fetchDatasets('bookings'), fetchDatasets('customers'), fetchDatasets('rooms')])


const fetchUniqueUser = (dataset) => {
    return fetch(`http://localhost:3001/api/v1/${dataset}`)
      .then(response => response.json())
      .catch(error => console.log(`Error: ${dataset} fetch failed`))
}

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
  .catch(error => console.log(error))

  fetchDatasets('bookings')
  fetchDatasets('customers')
  fetchDatasets('rooms')
  fetchData = Promise.all([fetchDatasets('bookings'), fetchDatasets('customers'), fetchDatasets('rooms')])
}



export { fetchData , postDataset, fetchUniqueUser}
