import React from 'react';
import { View, TextInput, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { Marker } from 'react-native-maps';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { Constants, Location, Permissions, Expo } from 'expo';
import Icon from 'react-native-vector-icons/FontAwesome';
import imgHandi from '../../../assets/splash-screen/handi.png';
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
                    <View style={{ flex: 1, alignItems: 'center' }}>
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

                            <MapView.Marker
                                coordinate={{
                                    latitude: currentLocation.lat,
                                    longitude: currentLocation.lng,
                                }}
                            >
                                <Image
                                    source={imgHandi}
                                    style={{ width: 55, height: 78 }}
                                />
                            </MapView.Marker>

                            {/* <MapViewDirections
                            origin={coordinates[0]}
                            destination={coordinates[coordinates.length - 1]}
                            apikey={GOOGLE_MAPS_APIKEY}
                            strokeWidth={3}
                            strokeColor="hotpink"
                        />  */}

                        </MapView >
                        <View style={{ alignItems: 'center', marginTop: 14, position: 'absolute' }}>
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
                            <TouchableOpacity
                                style={styles.view}
                            // key={index}
                            // onPress={() => this.views(users = item.data)}
                            >
                                <View style={styles.searchListItem}>
                                    <View>
                                        <Text style={{ fontSize: 18, paddingLeft: 8, color: 'rgba(13, 13, 13 , 0.8)' }} >Talha</Text>
                                        <Text style={{ fontSize: 10, paddingLeft: 8, color: '#0291d3' }} >karachi</Text>
                                    </View>
                                    <Text style={{ paddingRight: 8 }} ><Icon name='chevron-right' size={18} color='#0291d3' /></Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                    :
                    <View style={{ flex: 1, backgroundColor: '#f2f6f9', alignItems: 'center' }}>
                        <Text>Waiting . . .</Text>
                    </View>
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'white',
        borderRadius: 4,
        width: '95%'
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    input: {
        color: 'black',
        height: 70,
        width: '84%',
        fontSize: 18
    },
    searchIcon: {
        paddingHorizontal: 18,
        height: 70,
        paddingTop: 22
    },
    view: {
        paddingLeft: 6,
        paddingTop: 15,
        paddingBottom: 15,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        backgroundColor: 'white',
        borderTopWidth: 1,
        borderColor: 'gray',
        width: '95%',
    },
    searchListItem: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
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