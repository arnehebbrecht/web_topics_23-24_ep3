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
    console.log('Worker finished fetching city data'); // Debugging line
    console.log(cityData); // Debugging line
    self.postMessage(cityData); // Send final data to main thread

  } catch (error) {
    self.postMessage({ error: error.message });
  }
};

function backup(){
  const cityData = [
    { City: "Beijing", CountryCode: "CN", Latitude: 39.9075, Longitude: 116.3972, Population: 18960744, WikipediaLink: "Beijing" },
    { City: "Kinshasa", CountryCode: "CD", Latitude: -4.3276, Longitude: 15.3136, Population: 16000000, WikipediaLink: "Kinshasa" },
    { City: "Mexico City", CountryCode: "MX", Latitude: 19.4285, Longitude: -99.1277, Population: 12294193, WikipediaLink: "Mexico City" },
    { City: "Moscow", CountryCode: "RU", Latitude: 55.7522, Longitude: 37.6156, Population: 10381222, WikipediaLink: "Moscow" },
    { City: "Dhaka", CountryCode: "BD", Latitude: 23.7104, Longitude: 90.4074, Population: 10356500, WikipediaLink: "Dhaka" },
    { City: "Cairo", CountryCode: "EG", Latitude: 30.0626, Longitude: 31.2497, Population: 9606916, WikipediaLink: "Cairo" },
    { City: "London", CountryCode: "GB", Latitude: 51.5085, Longitude: -0.1257, Population: 8961989, WikipediaLink: "London" },
    { City: "Jakarta", CountryCode: "ID", Latitude: -6.2146, Longitude: 106.8451, Population: 8540121, WikipediaLink: "Jakarta" },
    { City: "Tokyo", CountryCode: "JP", Latitude: 35.6895, Longitude: 139.6917, Population: 8336599, WikipediaLink: "Tokyo" },
    { City: "Taipei", CountryCode: "TW", Latitude: 25.0478, Longitude: 121.5318, Population: 7871900, WikipediaLink: "Taipei" },
    { City: "Lima", CountryCode: "PE", Latitude: -12.0432, Longitude: -77.0282, Population: 7737002, WikipediaLink: "Lima" },
    { City: "Bogotá", CountryCode: "CO", Latitude: 4.6097, Longitude: -74.0818, Population: 7674366, WikipediaLink: "Bogotá" },
    { City: "Tehran", CountryCode: "IR", Latitude: 35.6944, Longitude: 51.4215, Population: 7153309, WikipediaLink: "Tehran" },
    { City: "Singapore", CountryCode: "SG", Latitude: 1.2897, Longitude: 103.8501, Population: 5638700, WikipediaLink: "Singapore" },
    { City: "Bangkok", CountryCode: "TH", Latitude: 13.7540, Longitude: 100.5014, Population: 5104476, WikipediaLink: "Bangkok" },
    { City: "Santiago", CountryCode: "CL", Latitude: -33.4569, Longitude: -70.6483, Population: 4837295, WikipediaLink: "Santiago" },
    { City: "Bamako", CountryCode: "ML", Latitude: 12.6500, Longitude: -8.0000, Population: 4227569, WikipediaLink: "Bamako" },
    { City: "Riyadh", CountryCode: "SA", Latitude: 24.6877, Longitude: 46.7218, Population: 4205961, WikipediaLink: "Riyadh" },
    { City: "Addis Ababa", CountryCode: "ET", Latitude: 9.0250, Longitude: 38.7469, Population: 3860000, WikipediaLink: "Addis Ababa" },
    { City: "Madrid", CountryCode: "ES", Latitude: 40.4165, Longitude: -3.7026, Population: 3255944, WikipediaLink: "Madrid" },
    { City: "Caracas", CountryCode: "VE", Latitude: 10.4880, Longitude: -66.8792, Population: 3000000, WikipediaLink: "Caracas" },
    { City: "Kyiv", CountryCode: "UA", Latitude: 50.4547, Longitude: 30.5238, Population: 2797553, WikipediaLink: "Kyiv" },
    { City: "Quito", CountryCode: "EC", Latitude: -0.2299, Longitude: -78.5249, Population: 2781641, WikipediaLink: "Quito" },
    { City: "Luanda", CountryCode: "AO", Latitude: -8.8368, Longitude: 13.2343, Population: 2776168, WikipediaLink: "Luanda" },
    { City: "Mogadishu", CountryCode: "SO", Latitude: 2.0371, Longitude: 43.2551, Population: 2587183, WikipediaLink: "Mogadishu" },
    { City: "Brasília", CountryCode: "BR", Latitude: -15.7797, Longitude: -47.9297, Population: 2207718, WikipediaLink: "Brasília" },
    { City: "Tashkent", CountryCode: "UZ", Latitude: 41.2646, Longitude: 69.2163, Population: 1978028, WikipediaLink: "Tashkent" },
    { City: "Khartoum", CountryCode: "SD", Latitude: 15.5518, Longitude: 32.5324, Population: 1974647, WikipediaLink: "Khartoum" },
    { City: "Accra", CountryCode: "GH", Latitude: 5.5560, Longitude: -0.1969, Population: 1963264, WikipediaLink: "Accra" },
    { City: "Bucharest", CountryCode: "RO", Latitude: 44.4322, Longitude: 26.1063, Population: 1877155, WikipediaLink: "Bucharest" },
    { City: "Rabat", CountryCode: "MA", Latitude: 34.0133, Longitude: -6.8326, Population: 1655753, WikipediaLink: "Rabat" },
    { City: "Pretoria", CountryCode: "ZA", Latitude: -25.7449, Longitude: 28.1878, Population: 1619438, WikipediaLink: "Pretoria" },
    { City: "Harare", CountryCode: "ZW", Latitude: -17.8277, Longitude: 31.0534, Population: 1542813, WikipediaLink: "Harare" },
    { City: "Asunción", CountryCode: "PY", Latitude: -25.2865, Longitude: -57.6470, Population: 1482200, WikipediaLink: "Asunción" },
    { City: "Nouakchott", CountryCode: "MR", Latitude: 18.0858, Longitude: -15.9785, Population: 1184530, WikipediaLink: "Nouakchott" },
    { City: "Libreville", CountryCode: "GA", Latitude: 0.3924, Longitude: 9.4536, Population: 846090, WikipediaLink: "Libreville" },
    { City: "Ulaanbaatar", CountryCode: "MN", Latitude: 47.9077, Longitude: 106.8832, Population: 844818, WikipediaLink: "Ulaanbaatar" },
    { City: "Ottawa", CountryCode: "CA", Latitude: 45.4112, Longitude: -75.6981, Population: 812129, WikipediaLink: "Ottawa" },
    { City: "Washington", CountryCode: "US", Latitude: 38.8951, Longitude: -77.0364, Population: 689545, WikipediaLink: "Washington" },
    { City: "Athens", CountryCode: "GR", Latitude: 37.9838, Longitude: 23.7278, Population: null, WikipediaLink: "Athens" }
  ];
  return cityData;
  
}
