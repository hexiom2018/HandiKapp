import React from 'react';
import {
    View, ImageBackground, ActivityIndicator, Image, AppState, Linking,
    Button, Platform, TouchableOpacity,Text
} from 'react-native';
import { connect } from 'react-redux';
import firebase from 'firebase';
import Splashh from '../../../assets/splash-screen/splash-image.png';
import { StackActions, NavigationActions } from 'react-navigation';
import { bindActionCreators } from 'redux';
import { current_User, userAuth } from '../../Store/actions/authAction';
import { LinearGradient } from 'expo';
import { FetchPlaces } from '../../Store/actions/FetchData';
import logo from '../../../assets/splash-screen/logo.png'
import Modal from 'react-native-modal'
import {
    Constants, Location, Permissions,
    Contacts, Notifications, IntentLauncherAndroid
} from 'expo';

class FirstScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            isLocationModalVisible: false,
            appState: AppState.currentState
        }
    }


    _getLocationAsync = async () => {

        try {
            let { status } = await Permissions.askAsync(Permissions.LOCATION);
            let location = await Location.getCurrentPositionAsync({});
            let address = Promise.resolve(Expo.Location.reverseGeocodeAsync(location.coords));
            console.log('ff', "function run ")
            this.checkLogin()

            if (status !== 'granted') {
                console.log("permission not granted ")
            }


        } catch (error) {
            let statuss = Location.getProviderStatusAsync()
            if (!statuss.LocationServicesEnabled) {
                this.setState({ isLocationModalVisible: true })
            }
        }

    };
    openSetting = () => {
        if (Platform.OS === 'ios') {
            Linking.openURL('app-settings:')
        } else {
            IntentLauncherAndroid.startActivityAsync(
                IntentLauncherAndroid.ACTION_LOCATION_SOURCE_SETTINGS
            )
        }
        this.setState({
            openSetting: false
        })
    }
    _handleAppStateChange = (nextAppState) => {
        if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
            console.log('App has come to the foreground!')
            this._getLocationAsync();
        }
        this.setState({ appState: nextAppState });
    }

    componentWillUnmount() {
        AppState.removeEventListener('change', this._handleAppStateChange);
    }
    componentWillMount() {
        AppState.addEventListener('change', this._handleAppStateChange);
    }
    componentDidMount() {
        // this.checkLogin()
        this._getLocationAsync();


    }
    checkLogin = () => {
        const { userAuth } = this.props.actions

        userAuth().then(() => {

            const resetAction = StackActions.reset({
                index: 0,
                actions: [
                    NavigationActions.navigate({ routeName: 'Parking' }),
                ]
            })
            this.props.navigation.dispatch(resetAction)

        })
            .catch(() => {
                const resetAction = StackActions.reset({
                    index: 0,
                    actions: [
                        NavigationActions.navigate({ routeName: 'LogIn' }),
                    ]
                })
                this.props.navigation.dispatch(resetAction)
            })
    }

    static navigationOptions = { header: null }

    render() {
        const { openSetting } = this.state
        return (
            <View style={{ flex: 1, position: 'relative' }}>
                <Modal
                    onModalHide={openSetting ? this.openSetting : undefined}
                    isVisible={this.state.isLocationModalVisible}>
                    <View style={{ flex: 1, justifyContent: 'center' }}>
                        <TouchableOpacity onPress={() => this.setState({
                            isLocationModalVisible: false, openSetting: true
                        })}>
                            <View style={{ backgroundColor: 'blue', alignItems: 'center' ,height:40,color:'white',justifyContent:'center'}}>
                                <Text style={{color:'white'}}>
                                    'Enabel Location Services'
                                </Text>
                            </View></TouchableOpacity>
                        {/* <Button title='Enabel Location Services' onPress={() => this.setState({
                            isLocationModalVisible: false, openSetting: true
                        })}>

                        </Button> */}
                    </View>
                </Modal>
                <ImageBackground
                    source={Splashh}
                    style={{ width: '100%', height: '100%' }}>
                    <LinearGradient
                        colors={['#83E2DA', '#7ACED2', '#0199B0', '#0093d0']}
                        style={{ flex: 1 }}
                        opacity={0.7}

                    >
                        <View style={{ flex: 1, justifyContent: 'center' }}>
                            <ActivityIndicator size="large" color="#ffffff" />
                        </View>
                    </LinearGradient>
                    <View style={{ position: 'absolute', top: '35%', right: '10%', left: '10%' }}>
                        <Image
                            // style={{ width: 100, height: 100 }}
                            source={logo}
                        />
                    </View>
                </ImageBackground>
            </View>
        );
    }
}
function mapStateToProps(states) {
    return ({

    })
}

function mapDispatchToProps(dispatch) {
    return ({
        actions: bindActionCreators({
            userAuth
        }, dispatch)
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(FirstScreen);