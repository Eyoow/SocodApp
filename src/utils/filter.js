function filterTrips(trips,distance){
    return trips.filter(trip => trip.stops[0].startDistance && trip.stops[-1].endDistance < distance)
}

export default filterTrips;