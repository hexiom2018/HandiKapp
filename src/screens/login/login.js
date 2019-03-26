import React from 'react';
import { View, ImageBackground, Text, TextInput, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import Splashh from '../../../assets/Splashh.jpg'
import { connect } from 'react-redux';
import { Action } from '../../Store/actions/authAction'

class LogIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Email: '',
            Password: '',
        };
    }

    logIn() {
        const { Email, Password } = this.state
        this.props.AuthUser(Email, Password)
    }

    static navigationOptions = { header: null }
    render() {
        const { Email, Password } = this.state
        return (
            <ImageBackground source={Splashh} style={{ width: '100%', height: '100%' }}>
                <View style={{ flex: 1 }}>
                    <StatusBar hidden={true} />
                    <View style={styles.Heading}><Text style={styles.headingText} onPress={() => this.logIn()}>LogIn</Text></View>
                    <View>
                        <View>
                            <View style={{ padding: 2 }}>
                                <Text style={{ color: 'black', fontSize: 20 }}>Enter Your Email</Text>
                            </View>
                            <View style={{ padding: 2 }}>
                                <TextInput
                                    value={Email}
                                    placeholderTextColor='rgba(255,255,255,0.7)'
                                    style={styles.input}
                                    style={{ height: 40 }}
                                    placeholder="email here"
                                    onChangeText={(Email) => this.setState({ Email })}
                                />
                            </View>
                        </View>
                        <View>
                            <View style={{ padding: 2 }}>
                                <Text style={{ color: 'black', fontSize: 20 }}>Password:</Text>
                            </View>
                            <View style={{ padding: 2 }}>
                                <TextInput
                                    placeholderTextColor='rgba(255,255,255,0.7)'
                                    secureTextEntry={true}
                                    style={styles.input}
                                    placeholder="email here"
                                    value={Password}
                                    onChangeText={(Password) => this.setState({ Password })}
                                />
                            </View>
                        </View>
                    </View>
                </View>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    headingText: {
        alignItems: "center",
        color: '#ffffff',
        margin: 10,
        fontWeight: '600',
        fontSize: 20
    },

    Heading: {
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 5,
        paddingHorizontal: 5
    },
    input: {
        backgroundColor: 'rgba(255,255,255,0.3)',
        marginBottom: 20,
        color: '#fff',
        height: 40,
        width: 300,
        paddingHorizontal: 10,
        fontSize: 18
    },
    buton: {
        alignItems: 'center',
        backgroundColor: '#0055ff',
        paddingVertical: 10,
        marginBottom: 20,
        width: 220,
        // justifyContent: 'space-between',
    },
    google: {
        alignItems: 'center',
        backgroundColor: '#00b3b3',
        paddingVertical: 10,
        marginBottom: 20,
        width: 220,
        // justifyContent: 'space-between',
    },
    ButtonText: {
        fontWeight: 'bold',
        color: "#ffff",
        // alignItems:'center'
        fontSize: 20
    },
});
function mapStateToProps(states) {
    return ({
    })
}

function mapDispatchToProps(dispatch) {
    return ({
        AuthUser: (Email, Password) => {
            dispatch(Action(Email, Password));
        },
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(LogIn);