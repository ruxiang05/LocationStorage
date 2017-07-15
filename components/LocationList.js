var React = require('react'),
    LocationItem = require('./LocationItem');

var LocationList = React.createClass({

    render() {
        let self = this;

        let locations = this.props.locations.map(function(l) {
            let active = self.props.activateLocationAddress == l.address;

            return <LocationItem address={l.address}
                                 timestamp={l.timestamp}
                                 active={active}
                                 onClick={self.props.onClick} />
        });

        if(!locations.length){
            return null;
        }

        return (
            <div className='list-group col-xs-12 col-md-6 col-md-offset-3'>
                <span className='list-group-item active'>Saved Locations</span>
            </div>
        )
    }
});

module.exports = LocationList;
