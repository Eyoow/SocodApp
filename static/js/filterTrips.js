// this filters through trips.
function filterTrips(trips,max_distance, date,numRiders, gender = false ){
    var results = trips;
    // filters trips by gender only if requested
    if(gender){
      results = filterResults(results, "gender", gender);
    }
    // filters trips by seats available
    results = filterResults(results, "seats", numRiders,1000);
     // filters trips by dates
    results =filterResults(results, "date", date.start, date.end);
    // this gives rider option to join trips in progress
    results.forEach(trip => { 
        // checks every stop if its in range
         trip.stops = filterResults(stops, "distance", 0, max_distance);

        });
        // filters trips that have at least one stop in range. 
   results = filterResults(results, "stops.length",1, 1000);
        return results;
}
