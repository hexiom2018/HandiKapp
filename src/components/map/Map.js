import React from 'react';
import { View, TextInput, Text, Image, StyleSheet, ActivityIndicator, Dimensions } from 'react-native';
import { connect } from 'react-redux'
import { Marker } from 'react-native-maps';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { Constants, Location, Permissions, Expo } from 'expo';
import Icon from 'react-native-vector-icons/FontAwesome';
// import MapViewDirections from 'react-native-maps-directions';  // ye install krna hai
const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

class Map extends React.Component {
    constructor() {
        super()
        this.state = {
            currentLocation: { lat: null, lng: null },
            userLocation: { lat: null, lng: null },
            get: false,
            sellerLocation: false,
            search: '',
        }
    }

    componentDidMount() {
        if (!Constants.isDevice) {
            this.setState({
                errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
            });
        } else {
            this._getLocationAsync();
        }

    }

    _getLocationAsync = async () => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            this.setState({
                errorMessage: 'Permission to access location was denied',
            });
        }

        let location = await Location.getCurrentPositionAsync({});
        console.log('currentLocation==>', location);
        this.setState({
            currentLocation: { lat: location.coords.latitude, lng: location.coords.longitude },
            get: true,
        });
    };


    render() {
        const { currentLocation, get, errorMessage, userLocation, search } = this.state
        const coordinates = [
            {
                latitude: currentLocation.lat,
                longitude: currentLocation.lng,
            },
            {
                latitude: userLocation.lat,
                longitude: userLocation.lng,
            },
        ]
        // const GOOGLE_MAPS_APIKEY = ''
        return (
            <View style={{ flex: 1 }}>
                {get ?

                    < MapView
                        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                        style={styles.map}
                        region={{
                            latitude: currentLocation.lat,
                            longitude: currentLocation.lng,
                            latitudeDelta: LATITUDE_DELTA,
                            longitudeDelta: LONGITUDE_DELTA,
                        }}
                    >

                        <View style={{ alignItems: 'center', marginTop: 16 }}>
                            <View style={styles.container}>
                                <Icon name='search' size={20} color='#0291d3' style={styles.searchIcon} />
                                <TextInput
                                    value={search}
                                    placeholderTextColor='rgba(13, 13, 13 , 0.7)'
                                    style={styles.input}
                                    placeholder="Søg efter destination..."
                                    onChangeText={(search) => this.setState({ search })}
                                />
                            </View>
                        </View>


                        <MapView.Marker
                            coordinate={{
                                latitude: currentLocation.lat,
                                longitude: currentLocation.lng,
                            }}
                        />

                        {/* <MapView.Marker
                            coordinate={{
                                latitude: userLocation.lat,
                                longitude: userLocation.lng,
                            }}
                        /> */}

                        {/* <MapViewDirections
                            origin={coordinates[0]}
                            destination={coordinates[coordinates.length - 1]}
                            apikey={GOOGLE_MAPS_APIKEY}
                            strokeWidth={3}
                            strokeColor="hotpink"
                        />  */}

                    </MapView >
                    :
                    <View style={{ flex: 1, backgroundColor: '#f2f6f9', alignItems: 'center' }}>
                        {/* <View style={styles.container}>
                            <Icon name='search' size={20} color='#0291d3' style={styles.searchIcon} />
                            <TextInput
                                value={search}
                                placeholderTextColor='rgba(13, 13, 13 , 0.7)'
                                style={styles.input}
                                placeholder="Søg efter destination..."
                                onChangeText={(search) => this.setState({ search })}
                            />
                        </View> */}
                    </View>
                }
            </View>
        );
    }

}
const styles = StyleSheet.create({
    container: {
        // flex: 1,

        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        backgroundColor: 'white',
        borderRadius: 4,
        width: '90%'
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    input: {
        color: 'black',
        height: 70,
        width: '82%',
        fontSize: 18
    },
    searchIcon: {
        paddingHorizontal: 18,
        height: 70,
        paddingTop: 22
    }

});


function mapStateToProps(states) {
    return ({
        UID: states.authReducers.UID,
        CurrentUser: states.authReducers.USER,
        alluser: states.authReducers.ALLUSER,

    })
}

function mapDispatchToProps(dispatch) {
    return ({

    })
}

export default connect(mapStateToProps, mapDispatchToProps)(Map);