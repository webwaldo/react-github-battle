var axios = require('axios');

// get these and update if we don't want rate limiting
var id = 'YOUR_CLI_ID';
var sec = 'YOUR_SECRET_ID';
var param = "?client_id=" + id + "&client_secret=" + sec;

function getUserInfo (username) {
    return axios.get('https://api.github.com/users/' + username + param);
}

function getRepos (username) {
    // fetch username repos
    return axios.get('https://api.github.com/users/' + username + "/repos" +  param + "per_page=100");
}

function getTotalStars (repos) {
    // calculate all the stars the user has
    return repos.data.reduce( function(prev,current) {
        return prev + current.stargazers_count;
    }, 0)
}

function getPlayersData (player) {
    // get repos
    return getRepos(player.login)
        // getTotalStars
        .then(getTotalStars)
        .then( function(totalStars ) { // totalStars is the result from getTotalStars
            // return an object
            return { 
                followers: player.followers,
                totalStars: totalStars
            }
        })
}

function calculateScores (players) {
    // return an array after doing some fancy algorithms to determine a winner
    console.log('calculating scores',players[0].followers * 3 + players[0].totalStars);
    return [
        players[0].followers * 3 + players[0].totalStars,
        players[1].followers * 3 + players[1].totalStars
    ]
}

var helpers = {
    getPlayersInfo: function (players) {
        // Fetch some data from github using a bunch of promises
        return axios.all(players.map( function(username){
            return getUserInfo(username)
        }))
        .then( function (info) {
            console.log(info);
            return info.map( function (user) {
                return user.data;
            })
        })
        .catch( function (err) {
            console.warn("Error getting playerInfo " + err);
        })
    },
    battle: function(players){
        var playerOneData = getPlayersData(players[0]);
        var playerTwoData = getPlayersData(players[1]);

        return axios.all([playerOneData, playerTwoData])
            .then( calculateScores )
            .catch( function(err) {
                console.warn('Error in getPlayersInfo ', err)
            })
    }
};

module.exports = helpers;