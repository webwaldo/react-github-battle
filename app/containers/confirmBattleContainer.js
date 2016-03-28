var React = require('react');
var ConfirmBattle = require('../components/ConfirmBattle');
var githubHelpers = require('../utils/githubHelpers');

var ConfirmBattleContainer = React.createClass({
    contextTypes: {
        router: React.PropTypes.object.isRequired
    },
    getInitialState: function () {
        return {
            isLoading: true,
            playersInfo: []
        }
    },
    componentDidMount: function () {
        var query = this.props.location.query;
        //console.log('QUERY', query);
        // Fetch info from gitHub then update state
        // Get a promise
        githubHelpers.getPlayersInfo([query.playerOne, query.playerTwo])
            .then( function (players) {
                console.log('Players', players);
                this.setState({
                    isLoading: false,
                    playersInfo: [players[0], players[1]]
                })
            }.bind(this))

    },
    handleIntiateBattle: function () {
        this.context.router.push({
            pathname: 'results/',
            state: {
                playersInfo: this.state.playersInfo
            }
        })
    },
    render: function (){
        return (
            <ConfirmBattle
                isLoading={this.state.isLoading}
                onInitiateBattle={this.handleIntiateBattle}
                playersInfo={this.state.playersInfo}
            />
        )
    }
});

module.exports = ConfirmBattleContainer;