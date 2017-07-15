var React = require('react'),
    Search = require('./Search'),
    Map = require('./Map'),
    CurrentLocation = require('./CurrentLocation'),
    LocationList = require('./LocationList');

var App = React.createClass({
    getInitialState(){
        //Extract favorite locations from local storage

        var favorites = [];

        if(localStorage.favorites) {
            favorites = JSON.parse(localStorage.favorites);
        }

        return {
            favorites: favorites,
            currentAddress: 'London, UK',
            mapCoordinates: {
                lat: 51.5074,
                long: 0.1278
            }
        }
    },

    toggleFavorite(address) {
        if(this.isAddressInFavorites(address)){
            this.removeFromFavorites(address);
        } else {
            this.addToFavorites(address);
        }
    },

    addToFavorites(address) {
        var favorites = this.state.favorites;

        favorites.push({
            address: address,
            timestamp: Date.now()
        });

        this.state({
            favorites: favorites
        });

        localStorage.favorites = JSON.stringify(favorites);
    },

    removeFromFavorites(address) {
        var favorites = this.state.favorites,
        index = -1;

        for(var i = 0; i < favorites.length; i++) {
            if(favorites[i].address = address) {
                index = i;
                break;
            }
        }

        if(index !== -1) {
            favorites.splice(index, 1);

            this.setState({
                favorites: favorites
            });

            localStorage.favorites = JSON.stringify(favorites);
        }
    },

    isAddressInFavorites(address) {
        var favorites = this.state.favorites;
        for(var i = 0; i < favorites.length; i++) {
            if(favorites[i].address == address) {
                return true;
            }
        }

        return false;
    },

    searchForAddress(address) {
        var self = this;

        //GMaps geocode functionality built on top of the Google Maps API

        Gmaps.geocode({
            address: address,
            callback: function(results, status) {
                if(status !== 'OK') return;

                var latlng = results[0].geometry.location;

                self.state({
                    currentAddress: results[0].formatted_address,
                    mapCoordinates: {
                        lat: latlng.lat(),
                        lng: latlng.lng()
                    }
                });
            }
        });
    },

    render() {
        return(
            <div>
                <h1>Your Google Maps Locations</h1>

                <Search onSearch={this.searchForAddress} />

                <Map lat={this.state.mapCoordinates.lat}
                     lng={this.state.mapCoordinates.lng} />

                <CurrentLocation address={this.state.currentAddress}
                                 favorite={this.isAddressInFavorites(this.state.currentAddress)}
                                 onFavoriteToggle={this.toggleFavorite} />
                <LocationList locations={this.state.favorites}
                              activeLocationAddress={this.state.currentAddress}
                              onClick={this.searchForAddress} />

            </div>
        )
    }
});

module.exports = App;
