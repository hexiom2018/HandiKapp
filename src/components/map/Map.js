import React from 'react';
import { View, TextInput, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { connect } from 'react-redux';
import { Marker } from 'react-native-maps';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { Constants, Location, Permissions, Expo } from 'expo';
import Icon from 'react-native-vector-icons/EvilIcons';
import imgHandi from '../../../assets/splash-screen/handi.png';
import navigationIcon from '../../../assets/navigationIcon.png'
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
            selectPlace: false
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
    select(item) {
        this.setState({ item, selectPlace: true })
    }


    render() {
        const { currentLocation, get, selectPlace, userLocation, search , item } = this.state
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

        const arr = [{ name: 'talha' }, { name: 'nabeel' }, { name: 'uzair' }]
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
                                <Icon name='search' size={30} color='#0291d3' style={styles.searchIcon} />
                                <TextInput
                                    value={search}
                                    placeholderTextColor='rgba(13, 13, 13 , 0.7)'
                                    style={styles.input}
                                    placeholder="Søg efter destination..."
                                    onChangeText={(search) => this.setState({ search })}
                                />
                            </View>
                            {arr &&
                                arr.map((item, index) => {
                                    return (
                                        <View key={index} style={styles.view}>
                                            <View style={styles.border}></View>
                                            <TouchableOpacity
                                                style={{ paddingTop: 15, paddingBottom: 15, }}
                                                onPress={() => this.select(item)}
                                            >
                                                <View style={styles.searchListItem}>
                                                    <View>
                                                        <Text style={{ fontSize: 18, color: 'rgba(13, 13, 13 , 0.8)' }} >{item.name}</Text>
                                                        <Text style={{ fontSize: 10, color: '#0291d3' }} >karachi</Text>
                                                    </View>
                                                    <Text style={{ paddingRight: 8 }} ><Icon name='chevron-right' size={36} color='#0291d3' /></Text>
                                                </View>
                                            </TouchableOpacity>
                                        </View>
                                    )
                                })
                            }
                        </View>
                        {selectPlace &&
                            <View style={{ alignItems: 'center', bottom: 26, position: 'absolute' }}>
                                <View style={{ flex: 1, backgroundColor: 'white', borderRadius: 4, width: '100%' }}>
                                    <View style={{ flex: 1, alignItems: 'flex-end', marginTop: 4, marginRight: 4 }}>
                                        <Text onPress={() => this.setState({ selectPlace: false })}><Icon name='close' size={30} color='gray' /></Text>
                                    </View>
                                    <View style={{ marginBottom: 14, marginLeft: 20 }}>
                                        <Text style={{ color: 'black', paddingLeft: 16, fontSize: 15, }}>{item.name}</Text>
                                        <Text style={{ color: '#0291d3', paddingLeft: 16, fontSize: 16, }}>pakistan</Text>
                                        <Text style={{ color: 'gray', paddingLeft: 16, fontSize: 12, }}>Talha</Text>
                                    </View>
                                    <TouchableOpacity
                                        style={{ flex: 1, width: 280, backgroundColor: '#6819e7', alignItems: 'center', marginBottom: 20, marginHorizontal: 30, paddingVertical: 12, borderRadius: 6, flexDirection: 'row', }}
                                    >
                                        <View style={{ marginHorizontal: 40, flexDirection: 'row' }}>
                                            <View >
                                                <Image
                                                    source={navigationIcon}
                                                    style={{ width: 30, height: 30 }}
                                                />
                                            </View>
                                            <View >
                                                <Text style={{ fontSize: 20, fontWeight: '500', color: 'white' }} > {'  Naviger til plads'}</Text>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        }
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
        flex: 1,
        width: '95%',
        backgroundColor: 'white',
        paddingLeft: 16,
    },
    border: {
        borderColor: '#e6e6e6',
        borderTopWidth: 1,
        width: '95%',
    },
    searchListItem: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    btnDirection: {
        overflow: 'hidden',
        marginTop: 5,
        marginBottom: 5,
        // marginRight:30,
        borderWidth: 1,
        paddingHorizontal: 30,
        paddingVertical: 12,
        borderRadius: 6,
        borderColor: '#ffffff',
        backgroundColor: '#3498db',
        fontSize: 14,
        fontWeight: '700',
        // textDecorationLine: 'underline',
        color: '#ffffff',
    },

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