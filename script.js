window.onload = function() {
let d = moment().format('LLLL');
document.getElementById("date").innerHTML = d;
};

window.addEventListener("load", function() {
    fetch("http://statsapi.mlb.com/api/v1/schedule/games/?sportId=1").then(function(response) {
        response.json().then(function(json) {
            let active = document.getElementById("active-games")
            active.innerHTML = `
                <h4>There are <span style="color: red">${json.dates[0].totalGames}</span> MLB games today: <span style="color: red">${json.dates[0].totalGamesInProgress}</span> currently in progress, and <span style="color: red">${(json.dates[0].totalGames) - (json.dates[0].totalGamesInProgress)}</span> currently not in progress.</h4>                         
                `;
        });
    });
});

window.addEventListener("load", function() {
    let gamesList = document.getElementById('games-list1')
    fetch("http://statsapi.mlb.com/api/v1/schedule/games/?sportId=1").then(function(response) {
        response.json().then(function(json) {
            let data = json.dates[0];
            for(let i = 0; i<5; i++) {
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
                        <i>Game begins at ${dateToTime(localDate)}</i></h5>;
                        `;
                    } else if (data.games[i].status.detailedState.includes("Pre-Game") == true) {
                        gamesList.innerHTML += `   
                        <h5><span style="color: red">${data.games[i].status.detailedState}</span><br>
                        <i>Game begins at ${dateToTime(localDate)}</i></h5>;
                        `;
                    } else if (data.games[i].status.detailedState.includes("Warmup") == true) {
                        gamesList.innerHTML += `   
                        <h5><span style="color: orange">${data.games[i].status.detailedState}</span><br>
                        <i>Game begins at ${dateToTime(localDate)}</i></h5>;
                        `;
                    } else if (data.games[i].status.detailedState.includes("In Progress") == true) {
                        gamesList.innerHTML += `   
                        <h5><span style="color: green">${data.games[i].status.detailedState}</span><br>
                        <i>${json.dates[0].games[i].teams.home.team.name} - ${json.dates[0].games[i].teams.home.score}, ${json.dates[0].games[i].teams.away.team.name} - ${json.dates[0].games[i].teams.away.score}<i></h5>
                        `;
                    } else if (data.games[i].status.detailedState.includes("Game Over") == true) {
                        gamesList.innerHTML += `   
                        <h5>Game Status: <span style="color: blue">${data.games[i].status.detailedState}</span><br>
                        <i>${json.dates[0].games[i].teams.home.team.name} - ${json.dates[0].games[i].teams.home.score}, ${json.dates[0].games[i].teams.away.team.name} - ${json.dates[0].games[i].teams.away.score}<i></h5>
                        `;
                    } else if (data.games[i].status.detailedState.includes("Final") == true) {
                        gamesList.innerHTML += `   
                        <h5>Game Status: <span style="color: purple">${data.games[i].status.detailedState}</span><br>
                        <i>${json.dates[0].games[i].teams.home.team.name} - ${json.dates[0].games[i].teams.home.score}, ${json.dates[0].games[i].teams.away.team.name} - ${json.dates[0].games[i].teams.away.score}<i></h5>
                        `;
                    };
                };  
            });
        });
    });

window.addEventListener("load", function() {
    let gamesList = document.getElementById('games-list2')
    fetch("http://statsapi.mlb.com/api/v1/schedule/games/?sportId=1").then(function(response) {
        response.json().then(function(json) {
            let data = json.dates[0];
            for(let i = 6; i<10; i++) {
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
                        <i>Game begins at ${dateToTime(localDate)}</i></h5>;
                        `;
                    } else if (data.games[i].status.detailedState.includes("Pre-Game") == true) {
                        gamesList.innerHTML += `   
                        <h5><span style="color: red">${data.games[i].status.detailedState}</span><br>
                        <i>Game begins at ${dateToTime(localDate)}</i></h5>;
                        `;
                    } else if (data.games[i].status.detailedState.includes("Warmup") == true) {
                        gamesList.innerHTML += `   
                        <h5><span style="color: orange">${data.games[i].status.detailedState}</span><br>
                        <i>Game begins at ${dateToTime(localDate)}</i></h5>;
                        `;
                    } else if (data.games[i].status.detailedState.includes("In Progress") == true) {
                        gamesList.innerHTML += `   
                        <h5><span style="color: green">${data.games[i].status.detailedState}</span><br>
                        <i>${json.dates[0].games[i].teams.home.team.name} - ${json.dates[0].games[i].teams.home.score}, ${json.dates[0].games[i].teams.away.team.name} - ${json.dates[0].games[i].teams.away.score}<i></h5>
                        `;
                    } else if (data.games[i].status.detailedState.includes("Game Over") == true) {
                        gamesList.innerHTML += `   
                        <h5>Game Status: <span style="color: blue">${data.games[i].status.detailedState}</span><br>
                        <i>${json.dates[0].games[i].teams.home.team.name} - ${json.dates[0].games[i].teams.home.score}, ${json.dates[0].games[i].teams.away.team.name} - ${json.dates[0].games[i].teams.away.score}<i></h5>
                        `;
                    } else if (data.games[i].status.detailedState.includes("Final") == true) {
                        gamesList.innerHTML += `   
                        <h5>Game Status: <span style="color: purple">${data.games[i].status.detailedState}</span><br>
                        <i>${json.dates[0].games[i].teams.home.team.name} - ${json.dates[0].games[i].teams.home.score}, ${json.dates[0].games[i].teams.away.team.name} - ${json.dates[0].games[i].teams.away.score}<i></h5>
                        `;
                    };
                };  
            });
        });
    });

window.addEventListener("load", function() {
    let gamesList = document.getElementById('games-list3')
    fetch("http://statsapi.mlb.com/api/v1/schedule/games/?sportId=1").then(function(response) {
        response.json().then(function(json) {
            let data = json.dates[0];
            for(let i = 11; i<16; i++) {
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
                        <i>Game begins at ${dateToTime(localDate)}</i></h5>;
                        `;
                    } else if (data.games[i].status.detailedState.includes("Pre-Game") == true) {
                        gamesList.innerHTML += `   
                        <h5><span style="color: red">${data.games[i].status.detailedState}</span><br>
                        <i>Game begins at ${dateToTime(localDate)}</i></h5>;
                        `;
                    } else if (data.games[i].status.detailedState.includes("Warmup") == true) {
                        gamesList.innerHTML += `   
                        <h5><span style="color: orange">${data.games[i].status.detailedState}</span><br>
                        <i>Game begins at ${dateToTime(localDate)}</i></h5>;
                        `;
                    } else if (data.games[i].status.detailedState.includes("In Progress") == true) {
                        gamesList.innerHTML += `   
                        <h5><span style="color: green">${data.games[i].status.detailedState}</span><br>
                        <i>${json.dates[0].games[i].teams.home.team.name} - ${json.dates[0].games[i].teams.home.score}, ${json.dates[0].games[i].teams.away.team.name} - ${json.dates[0].games[i].teams.away.score}<i></h5>
                        `;
                    } else if (data.games[i].status.detailedState.includes("Game Over") == true) {
                        gamesList.innerHTML += `   
                        <h5>Game Status: <span style="color: blue">${data.games[i].status.detailedState}</span><br>
                        <i>${json.dates[0].games[i].teams.home.team.name} - ${json.dates[0].games[i].teams.home.score}, ${json.dates[0].games[i].teams.away.team.name} - ${json.dates[0].games[i].teams.away.score}<i></h5>
                        `;
                    } else if (data.games[i].status.detailedState.includes("Final") == true) {
                        gamesList.innerHTML += `   
                        <h5>Game Status: <span style="color: purple">${data.games[i].status.detailedState}</span><br>
                        <i>${json.dates[0].games[i].teams.home.team.name} - ${json.dates[0].games[i].teams.home.score}, ${json.dates[0].games[i].teams.away.team.name} - ${json.dates[0].games[i].teams.away.score}<i></h5>
                        `;
                    };
                };  
            });
        });
    });