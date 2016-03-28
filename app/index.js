var React = require('react');
var ReactDOM = require('react-dom');
var routes = require('./config/routes');



ReactDOM.render(
    routes,
    document.getElementById('app')
);

/*

var Avatar = React.createClass({
    render: function () {
        return (
            <div>
                <ProfilePic imageUrl={this.props.user.image} />
                <ProfileName name={this.props.user.name} />
                <ProfileLink username={this.props.user.username} />

            </div>
        )
    }
});

var Link = React.createClass({
    changeURL: function () {
        window.location.replace(this.props.href)
    },
    render: function () {
        return (
        <span
            style={{color: 'blue', cursor: 'pointer'}}
            onClick={this.changeURL}>
            {this.props.children}
        </span>
        )

    }
});

var ProfilePic = React.createClass({
    render: function () {
        return <img src={this.props.imageUrl} style={{height: 100, width: 100}} />
    }
});

var ProfileLink = React.createClass({
    render: function () {
        return (
            <Link href={'https://github.com/' + this.props.username}>
                {this.props.username}
            </Link>
        )
    }
});

var ProfileName = React.createClass({
    render: function () {
        return <div>{this.props.name}</div>
    }
});

*/