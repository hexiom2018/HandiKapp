import React from 'react';
import { View, TextInput, Text, Image, StyleSheet, TouchableOpacity, Dimensions, KeyboardAvoidingView, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { Marker } from 'react-native-maps';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { Constants, Location, Permissions, Expo } from 'expo';
import Icon from 'react-native-vector-icons/EvilIcons';
import geolib from 'geolib'
import imgHandi from '../../../assets/splash-screen/handi.png';
import navigationIcon from '../../../assets/navigationIcon.png';
import flagIcon from '../../../assets/flagIcon.png';
import minusIcon from '../../../assets/minusIcon.png';
import checkIcon from '../../../assets/checkIcon.png';
import { currentAddress } from '../../Store/actions/FetchData'


const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

class Map extends React.Component {
    constructor() {
        super()
        this.state = {
            currentLocation: { lat: null, long: null },
            get: false,
            sellerLocation: false,
            search: '',
            selectPlace: false,
            selectPlaceConfirm: false,
            exitParking: false,
            searchInput: true,
            suggestion: false,
            marker: false
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

    componentWillReceiveProps(props) {
        const { Places, backBtn } = props
        if (Places && Places.length) {
            this.setState({ Places: Places, marker: true })
        }
        if (backBtn === 'Parkering') {
            this.setState({
                selectPlace: false,
                searchInput: true,
                suggestion: false
            })
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
        let address = Promise.resolve(Location.reverseGeocodeAsync(location.coords));
        var that = this
        address.then(function (value) {
            let array = value.map(val => {
                // console.log('currentLocation==>', val);
                var obj = {
                    address: {
                        country: val.country,
                        city: val.city,
                        streetName: val.name,
                        zipCode: val.postalCode,
                        streetNr: val.street,
                    },
                    coordinates: {
                        lat: location.coords.latitude,
                        long: location.coords.longitude
                    }
                }
                that.props._address(obj)
            })
        })
        this.setState({
            currentLocation: { lat: location.coords.latitude, long: location.coords.longitude },
            get: true,
        });
    };

    getDistance = async (ParkingLocation, currentLocation) => {
        const direction = await geolib.getDistanceSimple(
            ParkingLocation,
            currentLocation,
        )
        return direction
    }

    markerSelect(item) {
        this.setState({
            item,
            selectPlace: true,
            suggestion: false
        })
    }

    select(item) {
        const { title } = this.props
        const { currentLocation } = this.state
        const parkLocation = { latitude: item.coordinates.lat, longitude: item.coordinates.long }
        const myLocation = { latitude: currentLocation.lat, longitude: currentLocation.long }
        title('Søgning')
        this.getDistance(myLocation, parkLocation).then((res) => {
            let km = res / 1000
            let distanceKm = km.toFixed(1)
            this.setState({ distanceKm })
        })
        this.setState({
            item,
            selectPlace: true,
            suggestion: false,
            selectPlaceConfirm: false,
            exitParking: false
        })
    }
    place() {
        const { title } = this.props
        this.setState({
            selectPlaceConfirm: true,
            selectPlace: false,
            searchInput: false,
            suggestion: false
        })
        title('Parkering')
    }

    closeDetail() {
        const { title } = this.props
        title('Parkering')
        this.setState({ selectPlace: false })
    }

    confirm() {
        this.setState({
            exitParking: true,
            selectPlace: false,
            searchInput: false,
            selectPlaceConfirm: false
        })
    }

    render() {
        const {
            currentLocation, get, selectPlace,  search, item, exitParking,
            searchInput, suggestion, selectPlaceConfirm, Places, marker, distanceKm
        } = this.state

        return (
            <View style={{ flex: 1 }}>
                {get ?
                    <View style={{ flex: 1, alignItems: 'center' }}>
                        < MapView
                            provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                            style={styles.map}
                            region={{
                                latitude: currentLocation.lat,
                                longitude: currentLocation.long,
                                latitudeDelta: LATITUDE_DELTA,
                                longitudeDelta: LONGITUDE_DELTA,
                            }}
                        >
                            {
                                Places ?
                                    Places.map((item, index) => {

                                        return (
                                            <MapView.Marker
                                                key={index}
                                                onPress={() => this.select(item)}
                                                coordinate={{
                                                    latitude: item.coordinates.lat,
                                                    longitude: item.coordinates.long,
                                                }}

                                            >
                                                <Image
                                                    source={imgHandi}
                                                    style={{ width: 55, height: 78 }}
                                                />
                                            </MapView.Marker>
                                        )
                                    })
                                    :
                                    <MapView.Marker
                                        coordinate={{
                                            latitude: currentLocation.lat,
                                            longitude: currentLocation.long,
                                        }}
                                    >
                                        <Image
                                            source={imgHandi}
                                            style={{ width: 55, height: 78 }}
                                        />
                                    </MapView.Marker>
                            }

                        </MapView >

                        <View style={{ alignItems: 'center', marginTop: 14, position: 'absolute' }}>
                            {searchInput &&
                                <View style={styles.container}>
                                    <Icon name='search' size={30} color='#0291d3' style={styles.searchIcon} />
                                    <TextInput
                                        value={search}
                                        placeholderTextColor='rgba(13, 13, 13 , 0.7)'
                                        style={styles.input}
                                        placeholder="Søg efter destination..."
                                        onChangeText={(search) => this.setState({ search, suggestion: true })}
                                    />
                                </View>
                            }
                            <View style={styles.dropDown}>
                                {    // search DropDown
                                    suggestion && marker &&
                                    Places.map((item, index) => {
                                        console.log(item, '****Places****');
                                        return (
                                            <ScrollView key={index} style={styles.view} scrollEnabled={false}>
                                                <View style={styles.border}></View>
                                                <TouchableOpacity
                                                    style={{ paddingTop: 15, paddingBottom: 15, }}
                                                    onPress={() => this.select(item)}
                                                >
                                                    <View style={styles.searchListItem}>
                                                        <View>
                                                            <Text style={{ fontSize: 18, color: 'rgba(13, 13, 13 , 0.8)', width: 270 }} >{item.address.streetName}</Text>
                                                            <Text style={{ fontSize: 10, color: '#0291d3', width: 270 }} >{`${item.address.zipCode === undefined ? '' : item.address.zipCode} ${item.address.streetName}, ${item.address.city}`}</Text>
                                                        </View>
                                                        <Text style={{ paddingRight: 6 }} ><Icon name='chevron-right' size={36} color='#0291d3' /></Text>
                                                    </View>
                                                </TouchableOpacity>
                                            </ScrollView>
                                        )
                                    })
                                }
                            </View>
                        </View>

                        {   // place detail view with sogning header
                            selectPlace &&
                            <View style={styles.bottomView}>
                                <View style={styles.bottomDiv}>
                                    <View style={styles.closeBtn}>
                                        <Text onPress={() => this.closeDetail()}><Icon name='close' size={30} color='gray' /></Text>
                                    </View>
                                    <View style={{ marginBottom: 14, marginLeft: 20 }}>
                                        <Text style={{ color: 'black', paddingLeft: 16, fontSize: 16, }}>{'Valgt Iokalitet:'}</Text>
                                        <Text style={{ color: '#0291d3', paddingLeft: 16, fontSize: 18, width: 275 }}>{`${item.address.streetName}, ${item.address.zipCode === undefined ? '' : item.address.zipCode} ${item.address.city}`}</Text>
                                        <Text style={{ color: 'gray', paddingLeft: 16, fontSize: 12, }}>{`${distanceKm} km, til destination`}</Text>
                                    </View>
                                    <TouchableOpacity
                                        onPress={() => this.place()}
                                        style={styles.bottomViewBtn}
                                    >
                                        <View style={{ marginHorizontal: 40, flexDirection: 'row' }}>
                                            <View >
                                                <Image
                                                    source={navigationIcon}
                                                    style={{ width: 30, height: 30 }}
                                                />
                                            </View>
                                            <View >
                                                <Text style={styles.btnText} > {'  Naviger til plads'}</Text>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        }

                        {   // confirm Parking View
                            selectPlaceConfirm &&
                            <View style={styles.bottomView}>
                                <View style={styles.bottomDiv}>
                                    <View style={styles.closeBtn}>
                                        <Text onPress={() => this.setState({ selectPlaceConfirm: false, searchInput: true })}><Icon name='close' size={30} color='gray' /></Text>
                                    </View>
                                    <View style={{ marginBottom: 14, marginLeft: 20 }}>
                                        <Text style={{ color: 'black', paddingLeft: 16, fontSize: 16, }}>{'PARKPARK A/S:'}</Text>
                                        <Text style={{ color: '#0291d3', paddingLeft: 16, fontSize: 18, width: 275 }}>{`${item.address.streetName}, ${item.address.zipCode === undefined ? '' : item.address.zipCode} ${item.address.city}`}</Text>
                                    </View>
                                    <TouchableOpacity
                                        onPress={() => this.confirm()}
                                        style={styles.bottomViewBtn}
                                    >
                                        <View style={{ marginHorizontal: 40, flexDirection: 'row' }}>
                                            <View >
                                                <Image
                                                    source={navigationIcon}
                                                    style={{ width: 30, height: 30 }}
                                                />
                                            </View>
                                            <View >
                                                <Text style={styles.btnText} > {'  Naviger til plads'}</Text>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        }
                        <View style={styles.bottomView}>
                            { // Exit Parking View
                                exitParking &&
                                <View style={{ width: '100%' }}>
                                    <View style={styles.bottomDiv}>
                                        <View style={styles.closeBtn}>
                                            <Text onPress={() => this.setState({ exitParking: false, selectPlaceConfirm: true })}><Icon name='close' size={30} color='gray' /></Text>
                                        </View>
                                        <View style={{ marginBottom: 16, marginLeft: 20 }}>
                                            <View style={{ marginLeft: 10, flexDirection: "row", marginBottom: 10 }}>
                                                <View style={{ marginTop: 4 }}>
                                                    <Image
                                                        source={flagIcon}
                                                        style={{ width: 20, height: 20 }}
                                                    />
                                                </View>
                                                <View>
                                                    <Text style={{ color: 'black', paddingLeft: 10, fontSize: 18, }}>{'Destination  Nået'}</Text>
                                                    <Text style={{ color: 'gray', paddingLeft: 10, fontSize: 18, width: 260 }}>{`${item.address.streetName}, ${item.address.zipCode === undefined ? '' : item.address.zipCode} ${item.address.city}`}</Text>
                                                </View>
                                            </View>
                                            <View style={{ marginLeft: 20, flexDirection: "row" }}>
                                                <View style={{ marginTop: 2 }}>
                                                    <Image
                                                        source={minusIcon}
                                                        style={{ width: 20, height: 20 }}
                                                    />
                                                </View>
                                                <View>
                                                    <Text style={{ color: 'black', paddingLeft: 10, fontSize: 18, }}>{'Er pladsen optaget?'}</Text>
                                                    <Text style={{ color: '#0291d3', paddingLeft: 10, fontSize: 18, textDecorationLine: 'underline' }}>Vis Nærmeste plads ></Text>
                                                </View>
                                            </View>
                                        </View>
                                        <TouchableOpacity
                                            style={styles.bottomViewBtn}
                                        >
                                            <View style={{ marginHorizontal: 40, flexDirection: 'row' }}>
                                                <View >
                                                    <Image
                                                        source={checkIcon}
                                                        style={{ width: 30, height: 30 }}
                                                    />
                                                </View>
                                                <View >
                                                    <Text style={styles.btnText} > {'  Afslut Parkering'}</Text>
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            }
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
    dropDown: {
        backgroundColor: 'white',
        width: '95%'
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
        width: '100%',
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
    bottomView: {
        alignItems: 'center',
        bottom: 26,
        position: 'absolute',
        marginHorizontal: 2,
    },
    bottomDiv: {
        flex: 1,
        backgroundColor: 'white',
        borderRadius: 4,
        width: '100%'
    },
    closeBtn: {
        flex: 1,
        alignItems: 'flex-end',
        marginTop: 4,
        marginRight: 4
    },
    bottomViewBtn: {
        flex: 1,
        width: '82%',
        backgroundColor: '#6819e7',
        alignItems: 'center',
        marginBottom: 20,
        marginHorizontal: 30,
        paddingVertical: 14,
        borderRadius: 6,
        flexDirection: 'row'
    },
    btnText: {
        fontSize: 20,
        fontWeight: '500',
        color: 'white'
    }

});


function mapStateToProps(states) {
    return ({
        UID: states.authReducers.UID,
        Places: states.authReducers.PLACES,
        alluser: states.authReducers.ALLUSER,

    })
}

function mapDispatchToProps(dispatch) {
    return ({
        _address: (obj) => {
            dispatch(currentAddress(obj))
        },
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(Map);