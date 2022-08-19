window.addEventListener("load", function() {
    fetch("http://statsapi.mlb.com/api/v1/schedule/games/?sportId=1").then(function(response) {
        response.json().then(function(json) {
            let active = document.getElementById("active-games")
            active.innerHTML = `
                <h2>There are ${json.dates[0].totalGames} MLB games today: ${json.dates[0].totalGamesInProgress} currently in progress, and ${(json.dates[0].totalGames) - (json.dates[0].totalGamesInProgress)} currently not in progress.</h2>                         
            `;
        });
    });
});

window.addEventListener("load", function() {
    fetch("http://statsapi.mlb.com/api/v1/schedule/games/?sportId=1").then(function(response) {
        response.json().then(function(json) {
            let gamesToday = document.getElementById("games-today")
            for(let i = 0; i<16; i++)
            gamesToday.innerHTML += `
                <ul>
                    <li>The <b>${json.dates[0].games[i].teams.home.team.name}</b> <i>(${json.dates[0].games[i].teams.home.leagueRecord.wins}-${json.dates[0].games[i].teams.home.leagueRecord.losses})</i> are hosting the <b>${json.dates[0].games[i].teams.away.team.name}</b> <i>(${json.dates[0].games[i].teams.away.leagueRecord.wins}-${json.dates[0].games[i].teams.away.leagueRecord.losses})</i> to${json.dates[0].games[i].dayNight} at ${json.dates[0].games[i].venue.name}. </li>
                    <li>This is game ${json.dates[0].games[i].seriesGameNumber} of a ${json.dates[0].games[i].gamesInSeries}-game series.</li>
                    <li><b>${json.dates[0].games[i].status.detailedState}</b></li>
                    <li><b>The score is ${json.dates[0].games[i].teams.home.team.name} - ${json.dates[0].games[i].teams.home.score}, ${json.dates[0].games[i].teams.away.team.name} - ${json.dates[0].games[i].teams.away.score}. </b></li>
                </ul>
            `;
        });
    });
});

fetch("http://statsapi.mlb.com/api/v1/schedule/games/?sportId=1").then(function(response) {
    response.json().then(function(json) {
        for(let i = 0; i<16; i++) {
            if(json.dates[0].games[i].status.detailedState.includes("Pre-Game") === true) {
                // Not sure how to access "detailedState" to change it to "Green". 
                document.getElementById("games-today").style.color = "Green"
            }
        };
    });
});

fetch("http://statsapi.mlb.com/api/v1/schedule/games/?sportId=1").then(function(response) {
    response.json().then(function(json) {
        for(let i = 0; i<16; i++) {
            if(json.dates[0].games[i].teams.home.score === "undefined") {
                // Again, not sure how to access "detailedState" to remove the "hidden" attribute and make it visible.
                json.dates[0].games[i].teams.home.score.removeAttribute("hidden")
            }
        };
    });
});