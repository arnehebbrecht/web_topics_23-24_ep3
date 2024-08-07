self.onmessage = async function(event) {
  const { username } = event.data;
  const maxRows = 50;
  let startRow = 0;
  let cityData = [];

  try {
    while (startRow < 201) {
      const url = `http://api.geonames.org/citiesJSON?formatted=true&lang=en&username=${username}&style=full&north=90&south=-90&east=180&west=-180&fcode=PPLC&maxRows=${maxRows}&startRow=${startRow}`;
      
      // Fetch the data from the API
      const response = await fetch(url);
      const data = await response.json();
      
      // Check if status exists and log the message
      if (data.status) {
        // Check if the rate limit message is returned
        if (data.status.message === "the hourly limit of 1000 credits for hebbrechtarne has been exceeded. Please throttle your requests or use the commercial service.") {
          cityData = backup(); // Get backup data
          console.log(cityData); // Debugging line
          self.postMessage(cityData); // Send backup data to main thread
           // Sort the cityData alphabetically by name
          cityData.sort((a, b) => a.name.localeCompare(b.name));
          return; // Exit the async function
        }
      }
      else {
        // If data.geonames exists and is an array, concatenate with cityData
        if (Array.isArray(data.geonames)) {
          cityData = cityData.concat(data.geonames);
          startRow += maxRows; // Move to the next batch
        } else {
          throw new Error('Unexpected data structure');
        }
      }
    }

    self.postMessage(cityData); // Send final data to main thread


  } catch (error) {
    self.postMessage({ error: error.message });
  }
};

function backup(){
  const cityData = [
    {
      "lng": 116.397228240967,
      "geonameId": 1816670,
      "countrycode": "CN",
      "name": "Beijing",
      "fclName": "city, village,...",
      "toponymName": "Beijing",
      "fcodeName": "capital of a political entity",
      "wikipedia": "en.wikipedia.org/wiki/Beijing",
      "lat": 39.9074977414405,
      "fcl": "P",
      "population": 18960744,
      "fcode": "PPLC"
    },
    {
      "lng": 15.31357,
      "geonameId": 2314302,
      "countrycode": "CD",
      "name": "Kinshasa",
      "fclName": "city, village,...",
      "toponymName": "Kinshasa",
      "fcodeName": "capital of a political entity",
      "wikipedia": "en.wikipedia.org/wiki/Kinshasa",
      "lat": -4.32758,
      "fcl": "P",
      "population": 16000000,
      "fcode": "PPLC"
    },
    {
      "lng": -99.12766456604,
      "geonameId": 3530597,
      "countrycode": "MX",
      "name": "Mexico City",
      "fclName": "city, village,...",
      "toponymName": "Mexico City",
      "fcodeName": "capital of a political entity",
      "wikipedia": "en.wikipedia.org/wiki/Mexico_City",
      "lat": 19.428472427036,
      "fcl": "P",
      "population": 12294193,
      "fcode": "PPLC"
    },
    {
      "lng": 37.6155556,
      "geonameId": 524901,
      "countrycode": "RU",
      "name": "Moscow",
      "fclName": "city, village,...",
      "toponymName": "Moscow",
      "fcodeName": "capital of a political entity",
      "wikipedia": "en.wikipedia.org/wiki/Moscow",
      "lat": 55.7522222,
      "fcl": "P",
      "population": 10381222,
      "fcode": "PPLC"
    },
    {
      "lng": 90.40743827819824,
      "geonameId": 1185241,
      "countrycode": "BD",
      "name": "Dhaka",
      "fclName": "city, village,...",
      "toponymName": "Dhaka",
      "fcodeName": "capital of a political entity",
      "wikipedia": "en.wikipedia.org/wiki/Dhaka",
      "lat": 23.710395616597037,
      "fcl": "P",
      "population": 10356500,
      "fcode": "PPLC"
    },
    {
      "lng": 31.249666213989258,
      "geonameId": 360630,
      "countrycode": "EG",
      "name": "Cairo",
      "fclName": "city, village,...",
      "toponymName": "Cairo",
      "fcodeName": "capital of a political entity",
      "wikipedia": "en.wikipedia.org/wiki/Cairo",
      "lat": 30.06263141517916,
      "fcl": "P",
      "population": 9606916,
      "fcode": "PPLC"
    },
    {
      "lng": -0.125741958618164,
      "geonameId": 2643743,
      "countrycode": "GB",
      "name": "London",
      "fclName": "city, village,...",
      "toponymName": "London",
      "fcodeName": "capital of a political entity",
      "wikipedia": "en.wikipedia.org/wiki/London",
      "lat": 51.5085287758629,
      "fcl": "P",
      "population": 8961989,
      "fcode": "PPLC"
    },
    {
      "lng": 106.84513092041016,
      "geonameId": 1642911,
      "countrycode": "ID",
      "name": "Jakarta",
      "fclName": "city, village,...",
      "toponymName": "Jakarta",
      "fcodeName": "capital of a political entity",
      "wikipedia": "en.wikipedia.org/wiki/Jakarta",
      "lat": -6.214623197035775,
      "fcl": "P",
      "population": 8540121,
      "fcode": "PPLC"
    },
    {
      "lng": 139.69171,
      "geonameId": 1850147,
      "countrycode": "JP",
      "name": "Tokyo",
      "fclName": "city, village,...",
      "toponymName": "Tokyo",
      "fcodeName": "capital of a political entity",
      "wikipedia": "en.wikipedia.org/wiki/Tokyo",
      "lat": 35.6895,
      "fcl": "P",
      "population": 8336599,
      "fcode": "PPLC"
    },
    {
      "lng": 121.531846,
      "geonameId": 1668341,
      "countrycode": "TW",
      "name": "Taipei",
      "fclName": "city, village,...",
      "toponymName": "Taipei",
      "fcodeName": "capital of a political entity",
      "wikipedia": "en.wikipedia.org/wiki/Taipei",
      "lat": 25.047763,
      "fcl": "P",
      "population": 7871900,
      "fcode": "PPLC"
    },
    {
      "lng": -77.0282363891602,
      "geonameId": 3936456,
      "countrycode": "PE",
      "name": "Lima",
      "fclName": "city, village,...",
      "toponymName": "Lima",
      "fcodeName": "capital of a political entity",
      "wikipedia": "en.wikipedia.org/wiki/Lima",
      "lat": -12.0431818993027,
      "fcl": "P",
      "population": 7737002,
      "fcode": "PPLC"
    },
    {
      "lng": -74.08175468444824,
      "geonameId": 3688689,
      "countrycode": "CO",
      "name": "Bogotá",
      "fclName": "city, village,...",
      "toponymName": "Bogotá",
      "fcodeName": "capital of a political entity",
      "wikipedia": "en.wikipedia.org/wiki/Bogot%C3%A1",
      "lat": 4.609705849789108,
      "fcl": "P",
      "population": 7674366,
      "fcode": "PPLC"
    },
    {
      "lng": 51.4215087890625,
      "geonameId": 112931,
      "countrycode": "IR",
      "name": "Tehran",
      "fclName": "city, village,...",
      "toponymName": "Tehran",
      "fcodeName": "capital of a political entity",
      "wikipedia": "en.wikipedia.org/wiki/Tehran",
      "lat": 35.6943887761439,
      "fcl": "P",
      "population": 7153309,
      "fcode": "PPLC"
    },
    {
      "lng": 103.850069046021,
      "geonameId": 1880252,
      "countrycode": "SG",
      "name": "Singapore",
      "fclName": "city, village,...",
      "toponymName": "Singapore",
      "fcodeName": "capital of a political entity",
      "wikipedia": "en.wikipedia.org/wiki/Singapore",
      "lat": 1.28966883937733,
      "fcl": "P",
      "population": 5638700,
      "fcode": "PPLC"
    },
    {
      "lng": 100.501444,
      "geonameId": 1609350,
      "countrycode": "TH",
      "name": "Bangkok",
      "fclName": "city, village,...",
      "toponymName": "Bangkok",
      "fcodeName": "capital of a political entity",
      "wikipedia": "en.wikipedia.org/wiki/Bangkok",
      "lat": 13.753979,
      "fcl": "P",
      "population": 5104476,
      "fcode": "PPLC"
    },
    {
      "lng": -70.64826965332031,
      "geonameId": 3871336,
      "countrycode": "CL",
      "name": "Santiago",
      "fclName": "city, village,...",
      "toponymName": "Santiago",
      "fcodeName": "capital of a political entity",
      "wikipedia": "en.wikipedia.org/wiki/Santiago,_Chile",
      "lat": -33.46286,
      "fcl": "P",
      "population": 5088000,
      "fcode": "PPLC"
    },
    {
      "lng": 77.216721,
      "geonameId": 1264527,
      "countrycode": "IN",
      "name": "New Delhi",
      "fclName": "city, village,...",
      "toponymName": "New Delhi",
      "fcodeName": "capital of a political entity",
      "wikipedia": "en.wikipedia.org/wiki/New_Delhi",
      "lat": 28.6667,
      "fcl": "P",
      "population": 4400000,
      "fcode": "PPLC"
    },
    {
      "lng": 4.35606,
      "geonameId": 2796836,
      "countrycode": "BE",
      "name": "Brussels",
      "fclName": "city, village,...",
      "toponymName": "Brussels",
      "fcodeName": "capital of a political entity",
      "wikipedia": "en.wikipedia.org/wiki/Brussels",
      "lat": 50.84673,
      "fcl": "P",
      "population": 1015500,
      "fcode": "PPLC"
    },
    {
      "lng": 9.18333,
      "geonameId": 2657896,
      "countrycode": "IT",
      "name": "Rome",
      "fclName": "city, village,...",
      "toponymName": "Rome",
      "fcodeName": "capital of a political entity",
      "wikipedia": "en.wikipedia.org/wiki/Rome",
      "lat": 41.88333,
      "fcl": "P",
      "population": 2873000,
      "fcode": "PPLC"
    },
    {
      "lng": 28.979530,
      "geonameId": 745044,
      "countrycode": "TR",
      "name": "Istanbul",
      "fclName": "city, village,...",
      "toponymName": "Istanbul",
      "fcodeName": "capital of a political entity",
      "wikipedia": "en.wikipedia.org/wiki/Istanbul",
      "lat": 41.00824,
      "fcl": "P",
      "population": 15519267,
      "fcode": "PPLC"
    },
    {
      "lng": 116.407396,
      "geonameId": 1816670,
      "countrycode": "CN",
      "name": "Beijing",
      "fclName": "city, village,...",
      "toponymName": "Beijing",
      "fcodeName": "capital of a political entity",
      "wikipedia": "en.wikipedia.org/wiki/Beijing",
      "lat": 39.904199,
      "fcl": "P",
      "population": 21542000,
      "fcode": "PPLC"
    },
    {
      "lng": 144.963058,
      "geonameId": 216535,
      "countrycode": "AU",
      "name": "Melbourne",
      "fclName": "city, village,...",
      "toponymName": "Melbourne",
      "fcodeName": "capital of a political entity",
      "wikipedia": "en.wikipedia.org/wiki/Melbourne",
      "lat": -37.813629,
      "fcl": "P",
      "population": 4936000,
      "fcode": "PPLC"
    },
    {
      "lng": -3.70379,
      "geonameId": 3117735,
      "countrycode": "ES",
      "name": "Madrid",
      "fclName": "city, village,...",
      "toponymName": "Madrid",
      "fcodeName": "capital of a political entity",
      "wikipedia": "en.wikipedia.org/wiki/Madrid",
      "lat": 40.416775,
      "fcl": "P",
      "population": 3223000,
      "fcode": "PPLC"
    },
    {
      "lng": 37.6173,
      "geonameId": 524901,
      "countrycode": "RU",
      "name": "Moscow",
      "fclName": "city, village,...",
      "toponymName": "Moscow",
      "fcodeName": "capital of a political entity",
      "wikipedia": "en.wikipedia.org/wiki/Moscow",
      "lat": 55.7558,
      "fcl": "P",
      "population": 11920000,
      "fcode": "PPLC"
    },
    {
      "lng": 39.9626,
      "geonameId": 514829,
      "countrycode": "US",
      "name": "Columbus",
      "fclName": "city, village,...",
      "toponymName": "Columbus",
      "fcodeName": "city",
      "wikipedia": "en.wikipedia.org/wiki/Columbus,_Ohio",
      "lat": 31.4496,
      "fcl": "P",
      "population": 898553,
      "fcode": "PPL"
    },
    {
      "lng": -73.935242,
      "geonameId": 5128581,
      "countrycode": "US",
      "name": "New York",
      "fclName": "city, village,...",
      "toponymName": "New York",
      "fcodeName": "city",
      "wikipedia": "en.wikipedia.org/wiki/New_York_City",
      "lat": 40.730610,
      "fcl": "P",
      "population": 8419000,
      "fcode": "PPL"
    },
    {
      "lng": 2.1734,
      "geonameId": 3128760,
      "countrycode": "ES",
      "name": "Barcelona",
      "fclName": "city, village,...",
      "toponymName": "Barcelona",
      "fcodeName": "city",
      "wikipedia": "en.wikipedia.org/wiki/Barcelona",
      "lat": 41.3851,
      "fcl": "P",
      "population": 1620000,
      "fcode": "PPL"
    },
    {
      "lng": -46.633309,
      "geonameId": 3451190,
      "countrycode": "BR",
      "name": "São Paulo",
      "fclName": "city, village,...",
      "toponymName": "São Paulo",
      "fcodeName": "city",
      "wikipedia": "en.wikipedia.org/wiki/S%C3%A3o_Paulo",
      "lat": -23.55052,
      "fcl": "P",
      "population": 12252000,
      "fcode": "PPL"
    },
    {
      "lng": 151.2093,
      "geonameId": 2147714,
      "countrycode": "AU",
      "name": "Sydney",
      "fclName": "city, village,...",
      "toponymName": "Sydney",
      "fcodeName": "city",
      "wikipedia": "en.wikipedia.org/wiki/Sydney",
      "lat": -33.8688,
      "fcl": "P",
      "population": 5312163,
      "fcode": "PPL"
    },
    {
      "lng": 116.383331,
      "geonameId": 1814905,
      "countrycode": "CN",
      "name": "Shanghai",
      "fclName": "city, village,...",
      "toponymName": "Shanghai",
      "fcodeName": "city",
      "wikipedia": "en.wikipedia.org/wiki/Shanghai",
      "lat": 39.916668,
      "fcl": "P",
      "population": 24256800,
      "fcode": "PPL"
    },
    {
      "name": "Beijing",
      "countrycode": "CN",
      "lat": 39.907498,
      "lng": 116.397228,
      "population": 18960744,
      "wikipedia": "https://en.wikipedia.org/wiki/Beijing",
      "geonameId": 1816670,
      "fcl": "P",
      "fclName": "city, village,...",
      "fcode": "PPLC",
      "fcodeName": "capital of a political entity"
  },
  {
      "name": "Kinshasa",
      "countrycode": "CD",
      "lat": -4.327580,
      "lng": 15.313570,
      "population": 16000000,
      "wikipedia": "https://en.wikipedia.org/wiki/Kinshasa",
      "geonameId": 2314302,
      "fcl": "P",
      "fclName": "city, village,...",
      "fcode": "PPLC",
      "fcodeName": "capital of a political entity"
  },
  {
      "name": "Mexico City",
      "countrycode": "MX",
      "lat": 19.428472,
      "lng": -99.127665,
      "population": 12294193,
      "wikipedia": "https://en.wikipedia.org/wiki/Mexico_City",
      "geonameId": 3530597,
      "fcl": "P",
      "fclName": "city, village,...",
      "fcode": "PPLC",
      "fcodeName": "capital of a political entity"
  },
  {
      "name": "Moscow",
      "countrycode": "RU",
      "lat": 55.752222,
      "lng": 37.615556,
      "population": 10381222,
      "wikipedia": "https://en.wikipedia.org/wiki/Moscow",
      "geonameId": 524901,
      "fcl": "P",
      "fclName": "city, village,...",
      "fcode": "PPLC",
      "fcodeName": "capital of a political entity"
  },
  {
      "name": "Dhaka",
      "countrycode": "BD",
      "lat": 23.710396,
      "lng": 90.407438,
      "population": 10356500,
      "wikipedia": "https://en.wikipedia.org/wiki/Dhaka",
      "geonameId": 1185241,
      "fcl": "P",
      "fclName": "city, village,...",
      "fcode": "PPLC",
      "fcodeName": "capital of a political entity"
  },
  {
      "name": "Cairo",
      "countrycode": "EG",
      "lat": 30.062631,
      "lng": 31.249666,
      "population": 9606916,
      "wikipedia": "https://en.wikipedia.org/wiki/Cairo",
      "geonameId": 360630,
      "fcl": "P",
      "fclName": "city, village,...",
      "fcode": "PPLC",
      "fcodeName": "capital of a political entity"
  },
  {
      "name": "London",
      "countrycode": "GB",
      "lat": 51.508529,
      "lng": -0.125742,
      "population": 8961989,
      "wikipedia": "https://en.wikipedia.org/wiki/London",
      "geonameId": 2643743,
      "fcl": "P",
      "fclName": "city, village,...",
      "fcode": "PPLC",
      "fcodeName": "capital of a political entity"
  },
  {
      "name": "Jakarta",
      "countrycode": "ID",
      "lat": -6.214623,
      "lng": 106.845131,
      "population": 8540121,
      "wikipedia": "https://en.wikipedia.org/wiki/Jakarta",
      "geonameId": 1642911,
      "fcl": "P",
      "fclName": "city, village,...",
      "fcode": "PPLC",
      "fcodeName": "capital of a political entity"
  },
  {
      "name": "Tokyo",
      "countrycode": "JP",
      "lat": 35.689500,
      "lng": 139.691710,
      "population": 8336599,
      "wikipedia": "https://en.wikipedia.org/wiki/Tokyo",
      "geonameId": 1850147,
      "fcl": "P",
      "fclName": "city, village,...",
      "fcode": "PPLC",
      "fcodeName": "capital of a political entity"
  },
  {
      "name": "Taipei",
      "countrycode": "TW",
      "lat": 25.047763,
      "lng": 121.531846,
      "population": 7871900,
      "wikipedia": "https://en.wikipedia.org/wiki/Taipei",
      "geonameId": 1668341,
      "fcl": "P",
      "fclName": "city, village,...",
      "fcode": "PPLC",
      "fcodeName": "capital of a political entity"
  },
  {
      "name": "Lima",
      "countrycode": "PE",
      "lat": -12.043182,
      "lng": -77.028236,
      "population": 7737002,
      "wikipedia": "https://en.wikipedia.org/wiki/Lima",
      "geonameId": 3936456,
      "fcl": "P",
      "fclName": "city, village,...",
      "fcode": "PPLC",
      "fcodeName": "capital of a political entity"
  },
  {
      "name": "Bogotá",
      "countrycode": "CO",
      "lat": 4.609706,
      "lng": -74.081755,
      "population": 7674366,
      "wikipedia": "https://en.wikipedia.org/wiki/Bogot%C3%A1",
      "geonameId": 3688689,
      "fcl": "P",
      "fclName": "city, village,...",
      "fcode": "PPLC",
      "fcodeName": "capital of a political entity"
  },
  {
      "name": "Tehran",
      "countrycode": "IR",
      "lat": 35.694389,
      "lng": 51.421509,
      "population": 7153309,
      "wikipedia": "https://en.wikipedia.org/wiki/Tehran",
      "geonameId": 112931,
      "fcl": "P",
      "fclName": "city, village,...",
      "fcode": "PPLC",
      "fcodeName": "capital of a political entity"
  },
  {
      "name": "Singapore",
      "countrycode": "SG",
      "lat": 1.289669,
      "lng": 103.850069,
      "population": 5638700,
      "wikipedia": "https://en.wikipedia.org/wiki/Singapore",
      "geonameId": 1880252,
      "fcl": "P",
      "fclName": "city, village,...",
      "fcode": "PPLC",
      "fcodeName": "capital of a political entity"
  },
  {
      "name": "Bangkok",
      "countrycode": "TH",
      "lat": 13.753979,
      "lng": 100.501444,
      "population": 5104476,
      "wikipedia": "https://en.wikipedia.org/wiki/Bangkok",
      "geonameId": 1609350,
      "fcl": "P",
      "fclName": "city, village,...",
      "fcode": "PPLC",
      "fcodeName": "capital of a political entity"
  },
  {
      "name": "Santiago",
      "countrycode": "CL",
      "lat": -33.456938,
      "lng": -70.648270,
      "population": 4837295,
      "wikipedia": "https://en.wikipedia.org/wiki/Santiago",
      "geonameId": 3871336,
      "fcl": "P",
      "fclName": "city, village,...",
      "fcode": "PPLC",
      "fcodeName": "capital of a political entity"
  },
  {
      "name": "Bamako",
      "countrycode": "ML",
      "lat": 12.650000,
      "lng": -8.000000,
      "population": 4227569,
      "wikipedia": "https://en.wikipedia.org/wiki/Bamako",
      "geonameId": 2460596,
      "fcl": "P",
      "fclName": "city, village,...",
      "fcode": "PPLC",
      "fcodeName": "capital of a political entity"
  },
  {
      "name": "Riyadh",
      "countrycode": "SA",
      "lat": 24.687732,
      "lng": 46.721851,
      "population": 3750000,
      "wikipedia": "https://en.wikipedia.org/wiki/Riyadh",
      "geonameId": 108410,
      "fcl": "P",
      "fclName": "city, village,...",
      "fcode": "PPLC",
      "fcodeName": "capital of a political entity"
  },
  ];
  
  return cityData;
}