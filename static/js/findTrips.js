function findTrips(user){

 return $.get("/api/trips",(res)=>{
    res.forEach(trip => {
       trip.stops.forEach(stop => {
           stop.distance = getDistance(stop.lat,stop.lon,user.lat,user.lon);
       });
       trip.seats = trip.max_riders -trip.riders.length; 
    });
    return res;
       
});
}