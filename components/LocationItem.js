var React = require('react'),
    moment = require('moment');

var LocationItem = react.createClass({
    handleClick() {
        this.props.onClick(this.props.address);
    },

    render(){
        var cn = 'list-group-item';

        if(this.props.active) {
            cn += 'active-location';
        }

        return (
            <a className={cn} onClock={this.handleClick}>
                {this.props.address}
                <span className='createdAt'>{moment(this.timestamp).fromNow()}</span>
                <span className='glyphicon glyphicon-menu-right'></span>
            </a>
        )
    }

});

module.exports = LocationItem;
