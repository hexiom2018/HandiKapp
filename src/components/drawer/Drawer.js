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
import { Icon } from 'react-native-elements'
import ServiceIcon from '../../../assets/services.png'
import { LinearGradient } from 'expo';
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
        this.props.logout()

        const resetAction = StackActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({ routeName: 'Login' }),
            ]
        })
        this.props.navigation.dispatch(resetAction)
    }



    render() {
        const { data } = this.state
        return (
            <View style={styles.container}>
                <LinearGradient
                    colors={['#2fd3ce', '#008cdb']}
                    style={{ flex: 1 }}
                    
                >
                    <View style={{ justifyContent: 'flex-start', marginTop:20 }}>
                        <View style={styles.RouteName}>
                            <View style={{ alignSelf: 'center', marginRight: 10 }}>
                                <Icon
                                    size={25}
                                    style={styles.drawerIcons}
                                    name={'settings'}
                                />
                            </View>
                        </View>
                    </View>
                    <View style={styles.drawerRoutes}>

                        <TouchableOpacity onPress={() => this.addServices()}>
                            <View style={styles.RouteName}>
                                <View style={{ alignSelf: 'center', marginRight: 10 }}>
                                    <Icon
                                        size={25}
                                        style={styles.drawerIcons}
                                        name={'settings'}
                                    />
                                </View>
                                <View style={{ alignSelf: 'center' }}>
                                    <Text style={{ fontSize: 18, color: 'white' }}>
                                        Min Konto
                                </Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.MyProfile()}>
                            <View style={styles.RouteName}>
                                <View style={{ alignSelf: 'center', marginRight: 10 }}>
                                    <Icon
                                        size={25}
                                        style={styles.drawerIcons}
                                        name={'settings'}
                                    />
                                </View>
                                <View style={{ alignSelf: 'center' }}>
                                    <Text style={{ fontSize: 18, color: 'white' }}>
                                        Tilfo/fjern en P-plads
                                </Text>
                                </View>
                            </View>
                        </TouchableOpacity>


                        <TouchableOpacity onPress={() => this.messages()}>
                            <View style={styles.RouteName}>
                                <View style={{ alignSelf: 'center', marginRight: 10 }}>
                                    <Icon
                                        size={25}
                                        style={styles.drawerIcons}
                                        name={'chat'}
                                    />
                                </View>
                                <View style={{ alignSelf: 'center' }}>
                                    <Text style={{ fontSize: 18, color: 'white' }}>
                                        Om Handikapp
                                </Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                      
                    </View>
                    <View style={{ justifyContent: 'flex-end' }}>
                    <TouchableOpacity onPress={() => this.Logout()}>
                            <View style={styles.logout}>
                                <View style={{ alignSelf: 'center', marginRight: 10 }}>
                                    <Icon
                                        size={25}
                                        style={styles.drawerIcons}
                                        name={'lock'}
                                    />
                                </View>
                                <View style={{ alignSelf: 'center' }}>
                                    <Text style={{ fontSize: 18, color: 'white' }}>
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
    drawerIcons: {
        width: 30,
        height: 30,
    },
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
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    logout: {
        flexDirection: 'row',
        // borderWidth: 2,
        paddingVertical: 20,
        paddingHorizontal: 20,
        marginTop: 40,
        marginBottom:20
        
    }
    ,
    drawerRoutes: {
        flex: 1,
        width: '100%',
        paddingVertical: 10,
        // borderWidth: 2,
        // alignItems:'center'
        justifyContent: 'center'
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

    })
}


export default connect(mapStateToProps, mapDispatchToProps)(DrawerContent);