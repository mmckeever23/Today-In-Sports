window.onload = function() {
let d = moment().format('LLLL');
document.getElementById("date").innerHTML = d;
};

window.addEventListener("load", function() {
    fetch("http://statsapi.mlb.com/api/v1/schedule/games/?sportId=1").then(function(response) {
        response.json().then(function(json) {
            let active = document.getElementById("active-games")
            active.innerHTML = `
                <h4 span style="color: rgb(4, 30, 66)">There are <span style="color: rgb(187, 0, 33)">${json.dates[0].totalGames}</span> MLB games today: <span style="color: rgb(187, 0, 33)">${json.dates[0].totalGamesInProgress}</span> currently in progress, and <span style="color: rgb(187, 0, 33)">${(json.dates[0].totalGames) - (json.dates[0].totalGamesInProgress)}</span> currently not in progress.</h4>                         
                `;
        });
    });
});

window.addEventListener("load", function() {
    let gamesList = document.getElementById('games-list1')
    fetch("http://statsapi.mlb.com/api/v1/schedule/games/?sportId=1").then(function(response) {
        response.json().then(function(json) {
            let data = json.dates[0];
            for(let i = 0; i<16; i++) {
                const dateToTime = date => date.toLocaleString('en-US', {
                    hour: 'numeric',
                    minute: 'numeric'
                });
                const dateString = json.dates[0].games[i].gameDate;
                const localDate = new Date(dateString);

                gamesList.innerHTML += `      
                <p><b>${data.games[i].teams.home.team.name}</b> <i>(${json.dates[0].games[i].teams.home.leagueRecord.wins}-${json.dates[0].games[i].teams.home.leagueRecord.losses})</i> vs. <b>${json.dates[0].games[i].teams.away.team.name}</b> <i>(${json.dates[0].games[i].teams.away.leagueRecord.wins}-${json.dates[0].games[i].teams.away.leagueRecord.losses})</i><br>
                Game ${data.games[i].seriesGameNumber} of a ${json.dates[0].games[i].gamesInSeries}-game series at ${json.dates[0].games[i].venue.name}</p>
                    `;
                    if (data.games[i].status.detailedState.includes("Scheduled") == true) {
                        gamesList.innerHTML += `   
                        <h5><span style="color: red">${data.games[i].status.detailedState}</span><br>
                        Game begins at ${dateToTime(localDate)}</h5>
                        `;
                    } else if (data.games[i].status.detailedState.includes("Pre-Game") == true) {
                        gamesList.innerHTML += `   
                        <h5><span style="color: red">${data.games[i].status.detailedState}</span><br>
                        Game begins at ${dateToTime(localDate)}</h5>
                        `;
                    } else if (data.games[i].status.detailedState.includes("Warmup") == true) {
                        gamesList.innerHTML += `   
                        <h5><span style="color: red">${data.games[i].status.detailedState}</span><br>
                        Game begins at ${dateToTime(localDate)}</h5>
                        `;
                    } else if (data.games[i].status.detailedState.includes("In Progress") == true) {
                        gamesList.innerHTML += `   
                        <h5><span style="color: rgb(0, 230, 0)">${data.games[i].status.detailedState}</span><br>
                        ${json.dates[0].games[i].teams.home.team.name} - ${json.dates[0].games[i].teams.home.score}, ${json.dates[0].games[i].teams.away.team.name} - ${json.dates[0].games[i].teams.away.score}</h5>
                        `;
                    } else if (data.games[i].status.detailedState.includes("Game Over") == true) {
                        gamesList.innerHTML += `   
                        <h5><span style="color: blue">${data.games[i].status.detailedState}</span><br>
                        ${json.dates[0].games[i].teams.home.team.name} - ${json.dates[0].games[i].teams.home.score}, ${json.dates[0].games[i].teams.away.team.name} - ${json.dates[0].games[i].teams.away.score}</h5>
                        `;
                    } else if (data.games[i].status.detailedState.includes("Final") == true && data.games[i].teams.away.isWinner == true) {
                        gamesList.innerHTML += `   
                        <h5><span style="color: blue">${data.games[i].status.detailedState}</span><br>
                        ${json.dates[0].games[i].teams.home.team.name} - ${json.dates[0].games[i].teams.home.score}<span style="text-transform:uppercase">${json.dates[0].games[i].teams.away.team.name} - ${json.dates[0].games[i].teams.away.score}</span></h5>
                        `;
                    } else if (data.games[i].status.detailedState.includes("Final") == true && data.games[i].teams.home.isWinner == true) {
                        gamesList.innerHTML += `
                        <h5><span style="color: blue">${data.games[i].status.detailedState}</span><br>
                        <span style="text-transform:uppercase">${json.dates[0].games[i].teams.home.team.name} - ${json.dates[0].games[i].teams.home.score}</span>, ${json.dates[0].games[i].teams.away.team.name} - ${json.dates[0].games[i].teams.away.score}</h5>
                        `;
                    }
                };  
            });
        });
    });