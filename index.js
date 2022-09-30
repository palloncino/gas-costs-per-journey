const {destinations} = require('./destinations.json');

destinations.map((journey, index) => {
    const getCostsList = executeJourney(journey);
    console.log('.');
    console.log('.');
    console.log('.');
    getCostsList(index+1);
})

function executeJourney({name, trips}) { 

    let gasPrice = 1.7, kmPerLiter = 13, tot = 0;

    return function getCostsList(_index) {

        console.log(`( ${_index} ) => ${name}`);

        trips.map(trip => {

            let litersNeeded = (trip.km / kmPerLiter), tripCosts = (litersNeeded * gasPrice), message = '';

            if (trip?.taxes?.troll) {
                tripCosts += trip.taxes.troll
                message += `⚠️ Toll tax: + ${trip.taxes.troll} EUR. (Tunnel Schio)`
            }
            if (trip?.taxes?.highway) {
                tripCosts += trip.taxes.highway
                message += `⚠️ Highway tax: + ${trip.taxes.highway} EUR. `
            }
            
            if (message) console.log(message);
            
            console.log(`${tripCosts.toFixed(0)} EUR => ${trip.departure} to ${trip.destination} => driving hours: ${trip.hoursAndMinutes}h`);
            tot += tripCosts;
        })
        console.log("------------------------------");
        console.log(`Arrival cost: ${tot.toFixed(0)} EUR 💸`);
        console.log(`Round trip: ${(tot*2).toFixed(0)} EUR 💸`);
    }
}