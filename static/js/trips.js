$(document).ready( function(){
   trips.forEach(element => {

     var htmlString = `<div class = "trip"> <img src = ${element.driver.picture}/>`;
     htmlString += `<p class = "caption"> ${element.driver.name}</p>`;
     htmlString += `<ul class = "trip-info"><li>${element.dates[0]}</li>`;
     htmlString += `<li>$${element.price}</li> <li>${element.stops[0]}</li>`;
     htmlString += ` <li>${element.stops[-1]}</li></ul>`;
     htmlString += ` <ul class = "trip-riders">`;

     element.riders.forEach( function(rider){
      htmlString += `<li> <img src = ${rider.picture}/> <p class = "caption"> ${rider.name}</p></li>`;
     });

     htmlString += `</ul> </div>`;

 


       $("#results").append(htmlString);
   });

});