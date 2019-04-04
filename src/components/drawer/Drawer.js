import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet,
    Button,
    Image,
    TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { StackActions, NavigationActions } from 'react-navigation';
import HomeIcon from '../../../assets/home-icon.png'
// import { Icon } from 'react-native-elements'
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import ServiceIcon from '../../../assets/services.png'
import { LinearGradient } from 'expo';
import { Log_Out } from '../../Store/actions/authAction'

class DrawerContent extends Component {
    constructor() {
        super()

        this.state = {
            data: null
        }
    }

    closeDrawer() {
        this.props.navigation.closeDrawer()

    }

    componentDidMount() {
        console.log('componentDid Mount')
        if (this.props.me) {
            this.setState({ data: this.props.me })
        }
    }



    Logout() {
        const { Log_Out } = this.props.actions

        Log_Out().then(() => {
        const resetAction = StackActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({ routeName: 'LogIn' }),
            ]
        })
        this.props.navigation.dispatch(resetAction)
    }).catch(() => {
      
    })
    }

    myProfile() {
        const { navigation } = this.props

        navigation.navigate('Profile')
    }

    addParking() {
        const { navigation } = this.props

        navigation.navigate('AddParking')
    }

    render() {
        const { data } = this.state
        return (
            <View style={styles.container}>
                <LinearGradient
                    colors={['#03b8b7', '#0093d0']}
                    style={{ flex: 1 }}

                >
                    <TouchableOpacity  onPress={() => this.closeDrawer()}>
                        <View style={{ justifyContent: 'flex-start', marginTop: 30 }}>
                            <View style={[styles.RouteName, { borderBottomWidth: 0 }]}>
                                <View style={{ alignItems: 'center', marginRight: 10 }}>
                                    <EvilIcons
                                        size={25}
                                        color={'#007e85'}
                                        style={styles.drawerIcons}
                                        name={'close'}
                                    />
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                    <View style={styles.drawerRoutes}>
                        <TouchableOpacity activeOpacity={0.7} onPress={() => this.myProfile()}>
                            <View style={[styles.RouteName, { borderTopWidth: 1, borderTopColor: '#00bac4' }]}>
                                <View style={{ alignSelf: 'center', marginRight: 20 }}>
                                    <FontAwesome
                                        color={'#007e85'}
                                        size={20}
                                        style={styles.drawerIcons}
                                        name={'user'}
                                    />
                                </View>
                                <View style={{ alignSelf: 'center' }}>
                                    <Text style={{ fontSize: 17, color: 'white' }}>
                                        Min Konto
                                </Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.7} onPress={() => this.addParking()}>
                            <View style={styles.RouteName}>
                                <View style={{ alignSelf: 'center', marginRight: 20 }}>
                                    <FontAwesome
                                        size={20}
                                        color={'#007e85'}
                                        style={styles.drawerIcons}
                                        name={'plus-circle'}
                                    />
                                </View>
                                <View style={{ alignSelf: 'center' }}>
                                    <Text style={{ fontSize: 17, color: 'white' }}>
                                        Tilfo/fjern en P-plads
                                </Text>
                                </View>
                            </View>
                        </TouchableOpacity>


                        <TouchableOpacity activeOpacity={0.7} onPress={() => this.messages()}>
                            <View style={styles.RouteName}>
                                <View style={{ alignSelf: 'center', marginRight: 20 }}>
                                    <FontAwesome
                                        size={20}
                                        color={'#007e85'}
                                        style={styles.drawerIcons}
                                        name={'briefcase'}
                                    />
                                </View>
                                <View style={{ alignSelf: 'center' }}>
                                    <Text style={{ fontSize: 17, color: 'white' }}>
                                        Om Handikapp
                                </Text>
                                </View>
                            </View>
                        </TouchableOpacity>

                    </View>
                    <View style={{ justifyContent: 'flex-end' }}>
                        <TouchableOpacity activeOpacity={0.7} onPress={() => this.Logout()}>
                            <View style={styles.logout}>
                                <View style={{ alignSelf: 'center', marginRight: 20 }}>
                                    <FontAwesome
                                        size={20}
                                        color={'#007e85'}
                                        style={styles.drawerIcons}
                                        name={'sign-out'}
                                    />
                                </View>
                                <View style={{ alignSelf: 'center' }}>
                                    <Text style={{ fontSize: 17, color: 'white' }}>
                                        Log ud
                                </Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    </View>
                </LinearGradient>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    avatar: {
        paddingTop: 5,
        width: '100%',
        backgroundColor: '#2089dc',
    },
    avtr: {
        // borderWidth: 1,
        width: 100,
        height: 100,
        marginLeft: 20,
        borderRadius: 50
    },
    RouteName: {
        flexDirection: 'row',
        // borderWidth: 2,
        paddingVertical: 18,
        paddingHorizontal: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#00bac4'
    },
    logout: {
        flexDirection: 'row',
        // borderWidth: 2,
        paddingVertical: 20,
        paddingHorizontal: 20,
        marginTop: 40,
        marginBottom: 20

    }
    ,
    drawerRoutes: {
        flex: 1,
        width: '100%',
        paddingVertical: 60,
        paddingHorizontal: 5
        // justifyContent: 'center'
    },
    name: {
        paddingVertical: 15,
        paddingHorizontal: 17,
        // borderWidth: 2,
        width: '100%',
        backgroundColor: '#2089dc',
    },
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        // alignItems: 'center',
    },
    ImageIcon: {
        width: 25,
        height: 40,
        marginRight: 20
    },
    backIcon: {
        width: '100%',
        // height: 40,
        backgroundColor: '#2089dc',
        alignItems: 'flex-end',
    }
});

function mapStateToProps(state) {
    return ({

    })
}

function mapDispatchToProps(dispatch) {
    return ({
        actions: bindActionCreators({
            Log_Out
        }, dispatch)
    })
}


export default connect(mapStateToProps, mapDispatchToProps)(DrawerContent);