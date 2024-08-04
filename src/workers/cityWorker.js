self.onmessage = async function(event) {
  const { username } = event.data;
  const maxRows = 50;
  let startRow = 0;
  let cityData = [];

  try {
    while (startRow < 201) {
      const url = `http://api.geonames.org/citiesJSON?formatted=true&lang=en&username=${encodeURIComponent(username)}&style=full&north=90&south=-90&east=180&west=-180&fcode=PPLC&maxRows=${maxRows}&startRow=${startRow}`;
      
      // Fetch the data from the API
      const response = await fetch(url);
      const data = await response.json();
      
      // Check if status exists and log the message
      if (data.status) {
        // Check if the rate limit message is returned
        if (data.status.message === "the hourly limit of 1000 credits for hebbrechtarne has been exceeded. Please throttle your requests or use the commercial service.") {
          console.log('Rate limit exceeded. Using backup data.'); // Debugging line
          cityData = backup(); // Get backup data
          console.log(cityData); // Debugging line
          self.postMessage(cityData); // Send backup data to main thread
          return; // Exit the async function
        }
      }
      // else {
      //   // If data.geonames exists and is an array, concatenate with cityData
      //   if (Array.isArray(data.geonames)) {
      //     cityData = cityData.concat(data.geonames);
      //     startRow += maxRows; // Move to the next batch
      //   } else {
      //     throw new Error('Unexpected data structure');
      //   }
      // }
    }
    console.log('Worker finished fetching city data'); // Debugging line
    console.log(cityData); // Debugging line
    self.postMessage(cityData); // Send final data to main thread


  } catch (error) {
    self.postMessage({ error: error.message });
  }
};

function backup(){
  const cityData = [
    {
      lng: 116.397228240967,
      geonameId: 1816670,
      countrycode: "CN",
      fcl: "P",
      fclName: "city, village,...",
      fcode: "PPLC",
      fcodeName: "capital of a political entity",
      lat: 39.9074977414405,
      name: "Beijing",
      population: 18960744,
      toponymName: "Beijing",
      wikipedia: "en.wikipedia.org/wiki/Beijing"
    },
    {
      lng: 15.31357,
      geonameId: 2314302,
      countrycode: "CD",
      fcl: "P",
      fclName: "city, village,...",
      fcode: "PPLA",
      fcodeName: "capital of a political entity",
      lat: -4.32254,
      name: "Kinshasa",
      population: 8250000,
      toponymName: "Kinshasa",
      wikipedia: "en.wikipedia.org/wiki/Kinshasa"
    },
    {
      lng: -99.12766456604,
      geonameId: 3530597,
      countrycode: "MX",
      fcl: "P",
      fclName: "city, village,...",
      fcode: "PPLA",
      fcodeName: "capital of a political entity",
      lat: 19.4326077,
      name: "Mexico City",
      population: 8918653,
      toponymName: "Mexico City",
      wikipedia: "en.wikipedia.org/wiki/Mexico_City"
    },
    {
      lng: 37.6155556,
      geonameId: 524901,
      countrycode: "RU",
      fcl: "P",
      fclName: "city, village,...",
      fcode: "PPLC",
      fcodeName: "capital of a political entity",
      lat: 55.7522200,
      name: "Moscow",
      population: 11920000,
      toponymName: "Moscow",
      wikipedia: "en.wikipedia.org/wiki/Moscow"
    },
    {
      lng: -77.0368707,
      geonameId: 5585030,
      countrycode: "US",
      fcl: "P",
      fclName: "city, village,...",
      fcode: "PPLC",
      fcodeName: "capital of a political entity",
      lat: 38.907192,
      name: "Washington, D.C.",
      population: 702455,
      toponymName: "Washington, D.C.",
      wikipedia: "en.wikipedia.org/wiki/Washington,_D.C."
    },
    {
      lng: 135.502253,
      geonameId: 1863979,
      countrycode: "JP",
      fcl: "P",
      fclName: "city, village,...",
      fcode: "PPLC",
      fcodeName: "capital of a political entity",
      lat: 35.689487,
      name: "Tokyo",
      population: 13929286,
      toponymName: "Tokyo",
      wikipedia: "en.wikipedia.org/wiki/Tokyo"
    },
    {
      lng: 144.963058,
      geonameId: 2158177,
      countrycode: "AU",
      fcl: "P",
      fclName: "city, village,...",
      fcode: "PPLC",
      fcodeName: "capital of a political entity",
      lat: -37.813629,
      name: "Canberra",
      population: 381488,
      toponymName: "Canberra",
      wikipedia: "en.wikipedia.org/wiki/Canberra"
    },
    {
      lng: 2.173403,
      geonameId: 3128760,
      countrycode: "ES",
      fcl: "P",
      fclName: "city, village,...",
      fcode: "PPLC",
      fcodeName: "capital of a political entity",
      lat: 41.385064,
      name: "Madrid",
      population: 3223334,
      toponymName: "Madrid",
      wikipedia: "en.wikipedia.org/wiki/Madrid"
    },
    {
      lng: 10.451526,
      geonameId: 2800817,
      countrycode: "DE",
      fcl: "P",
      fclName: "city, village,...",
      fcode: "PPLC",
      fcodeName: "capital of a political entity",
      lat: 51.165691,
      name: "Berlin",
      population: 3769495,
      toponymName: "Berlin",
      wikipedia: "en.wikipedia.org/wiki/Berlin"
    },
    {
      lng: 1.2921,
      geonameId: 1880251,
      countrycode: "SG",
      fcl: "P",
      fclName: "city, village,...",
      fcode: "PPLC",
      fcodeName: "capital of a political entity",
      lat: 103.8219,
      name: "Singapore",
      population: 5638676,
      toponymName: "Singapore",
      wikipedia: "en.wikipedia.org/wiki/Singapore"
    }
  ];
  return cityData;
}
