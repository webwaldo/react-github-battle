var React = require('react');

var Prompt = require('../components/prompt');

var PromptContainer = React.createClass({
    contextTypes: {
      router: React.PropTypes.object.isRequired
    },
    getInitialState: function () {
        return ({
            username: ''
        })
    },
    handleUpdateUser: function (e) {
        this.setState({
            username: e.target.value
        })
    },
    handleSubmitUser: function (e) {
        e.preventDefault();
        var username = this.state.username;
        this.setState({
            username: ''
        });

        console.log(this.context);

        if (this.props.routeParams.playerOne) {
            // Go to player 1
            console.log(this.context);
            this.context.router.push({
                pathname: '/battle',
                query: {
                    playerOne: this.props.routeParams.playerOne,
                    playerTwo: this.state.username
                }
            });
        } else {
            // Go to player 2
            console.log(this.context);
            this.context.router.push('/playerTwo/' + this.state.username);
        }
    },
    render: function () {
        return (
            <Prompt
                onSubmitUser={this.handleSubmitUser}
                onUpdateUser={this.handleUpdateUser}
                header={this.props.route.header}
                username={this.state.username}
                 />
        )
    }
});

module.exports = PromptContainer;