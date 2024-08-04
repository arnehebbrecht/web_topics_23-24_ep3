function backup(){const e=[{lng:116.397228240967,geonameId:1816670,countrycode:"CN",fcl:"P",fclName:"city, village,...",fcode:"PPLC",fcodeName:"capital of a political entity",lat:39.9074977414405,name:"Beijing",population:18960744,toponymName:"Beijing",wikipedia:"en.wikipedia.org/wiki/Beijing"},{lng:15.31357,geonameId:2314302,countrycode:"CD",fcl:"P",fclName:"city, village,...",fcode:"PPLA",fcodeName:"capital of a political entity",lat:-4.32254,name:"Kinshasa",population:825e4,toponymName:"Kinshasa",wikipedia:"en.wikipedia.org/wiki/Kinshasa"},{lng:-99.12766456604,geonameId:3530597,countrycode:"MX",fcl:"P",fclName:"city, village,...",fcode:"PPLA",fcodeName:"capital of a political entity",lat:19.4326077,name:"Mexico City",population:8918653,toponymName:"Mexico City",wikipedia:"en.wikipedia.org/wiki/Mexico_City"},{lng:37.6155556,geonameId:524901,countrycode:"RU",fcl:"P",fclName:"city, village,...",fcode:"PPLC",fcodeName:"capital of a political entity",lat:55.75222,name:"Moscow",population:1192e4,toponymName:"Moscow",wikipedia:"en.wikipedia.org/wiki/Moscow"},{lng:-77.0368707,geonameId:5585030,countrycode:"US",fcl:"P",fclName:"city, village,...",fcode:"PPLC",fcodeName:"capital of a political entity",lat:38.907192,name:"Washington, D.C.",population:702455,toponymName:"Washington, D.C.",wikipedia:"en.wikipedia.org/wiki/Washington,_D.C."},{lng:135.502253,geonameId:1863979,countrycode:"JP",fcl:"P",fclName:"city, village,...",fcode:"PPLC",fcodeName:"capital of a political entity",lat:35.689487,name:"Tokyo",population:13929286,toponymName:"Tokyo",wikipedia:"en.wikipedia.org/wiki/Tokyo"},{lng:144.963058,geonameId:2158177,countrycode:"AU",fcl:"P",fclName:"city, village,...",fcode:"PPLC",fcodeName:"capital of a political entity",lat:-37.813629,name:"Canberra",population:381488,toponymName:"Canberra",wikipedia:"en.wikipedia.org/wiki/Canberra"},{lng:2.173403,geonameId:3128760,countrycode:"ES",fcl:"P",fclName:"city, village,...",fcode:"PPLC",fcodeName:"capital of a political entity",lat:41.385064,name:"Madrid",population:3223334,toponymName:"Madrid",wikipedia:"en.wikipedia.org/wiki/Madrid"},{lng:10.451526,geonameId:2800817,countrycode:"DE",fcl:"P",fclName:"city, village,...",fcode:"PPLC",fcodeName:"capital of a political entity",lat:51.165691,name:"Berlin",population:3769495,toponymName:"Berlin",wikipedia:"en.wikipedia.org/wiki/Berlin"},{lng:1.2921,geonameId:1880251,countrycode:"SG",fcl:"P",fclName:"city, village,...",fcode:"PPLC",fcodeName:"capital of a political entity",lat:103.8219,name:"Singapore",population:5638676,toponymName:"Singapore",wikipedia:"en.wikipedia.org/wiki/Singapore"}];return e}self.onmessage=async function(e){const{username:i}=e.data,a=50;let o=0,t=[];try{while(o<201){const e=`http://api.geonames.org/citiesJSON?formatted=true&lang=en&username=${encodeURIComponent(i)}&style=full&north=90&south=-90&east=180&west=-180&fcode=PPLC&maxRows=${a}&startRow=${o}`,n=await fetch(e),l=await n.json();if(l.status&&"the hourly limit of 1000 credits for hebbrechtarne has been exceeded. Please throttle your requests or use the commercial service."===l.status.message)return console.log("Rate limit exceeded. Using backup data."),t=backup(),console.log(t),void self.postMessage(t)}console.log("Worker finished fetching city data"),console.log(t),self.postMessage(t)}catch(n){self.postMessage({error:n.message})}};