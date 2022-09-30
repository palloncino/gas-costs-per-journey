const Barcellona = {
    name: 'Barcellona',
    destinations: [
        {
            departure: 'Valdagno',
            destination: 'Genoa',
            km: 350,
            hoursAndMinutes: '4:00'
        },
        {
            departure: 'Genoa',
            destination: 'Nice',
            km: 200,
            hoursAndMinutes: '2:30'
        },
        {
            departure: 'Nice',
            destination: 'Marseille',
            km: 250,
            hoursAndMinutes: '4:00'
        },
        {
            departure: 'Marseille',
            destination: 'Montpellier',
            km: 170,
            hoursAndMinutes: '4:00'
        },
        {
            departure: 'Marseille',
            destination: 'Barcellona',
            km: 350,
            hoursAndMinutes: '3:50'
        }
    ]
}

const GoToRome = {
    name: 'Rome',
    destinations: [
        {
            departure: 'Valdagno',
            destination: 'Rome',
            km: 600,
            hoursAndMinutes: '6:00'
        }
    ]
}

const GoToNaples = {
    name: 'Naples',
    destinations: [
        {
            departure: 'Valdagno',
            destination: 'Rome',
            km: 600,
            hoursAndMinutes: '6:00'
        },
        {
            departure: 'Rome',
            destination: 'Naples',
            km: 230,
            hoursAndMinutes: '2:30'
        },
    ]
}

const GoToBari = {
    name: '(Rome, Naples and) Bari!',
    destinations: [
        {
            departure: 'Valdagno',
            destination: 'Rome',
            km: 600,
            hoursAndMinutes: '6:00'
        },
        {
            departure: 'Rome',
            destination: 'Naples',
            km: 230,
            hoursAndMinutes: '2:30'
        },
        {
            departure: 'Naples',
            destination: 'Bari',
            km: 260,
            hoursAndMinutes: '3:00'
        },
    ]
}

const Bucarest = {
    name: 'Bucarest',
    destinations: [
        {
            departure: 'Valdagno',
            destination: 'Zagreb',
            km: 470,
            hoursAndMinutes: '5:00'
        },
        {
            departure: 'Zagreb',
            destination: 'Belgrado',
            km: 400,
            hoursAndMinutes: '4:00'
        },
        {
            departure: 'Belgrado',
            destination: 'Craiova',
            km: 370,
            hoursAndMinutes: '5:00'
        },
        {
            departure: 'Craiova',
            destination: 'Bucarest',
            km: 230,
            hoursAndMinutes: '3:00'
        },
    ]
}

const Innsbruck = {
    name: 'Innsbruck, Austria',
    destinations: [
        {
            departure: 'Valdagno',
            destination: 'Innsbruck',
            km: 260,
            hoursAndMinutes: '3:30'
        }
    ]
}

const Vicenza = {
    name: 'Vicenza',
    destinations: [
        {
            departure: 'Valdagno',
            destination: 'Vicenza',
            km: 31,
            hoursAndMinutes: '0:38'
        }
    ]
}

const Asiago = {
    name: 'Asiago',
    destinations: [
        {
            departure: 'Valdagno',
            destination: 'Asiago',
            km: 46,
            hoursAndMinutes: '1:00',
            taxes: {
                troll: 2
            }
        }
    ]
}

const ContraPria = {
    name: 'ContraPria',
    destinations: [
        {
            departure: 'Valdagno',
            destination: 'ContraPria',
            km: 30,
            hoursAndMinutes: '0:40',
            taxes: {
                troll: 2
            }
        }
    ]
}

const chainedResults = [
    Vicenza,
    ContraPria,
    Asiago,
    Innsbruck,
    GoToRome,
    GoToNaples,
    GoToBari,
    Barcellona, 
    Bucarest, 
];

chainedResults.map((journey, index) => {
    const getCostsList = executeJourney(journey);
    console.log('.');
    console.log('.');
    console.log('.');
    getCostsList(index+1);
})

function executeJourney({name, destinations}) { 

    let gasPrice = 1.7, kmPerLiter = 13, tot = 0;

    return function getCostsList(_index) {

        console.log(`( ${_index} ) => ${name}`);

        destinations.map(trip => {

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