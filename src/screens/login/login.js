import React from 'react';
import {
    View, ImageBackground, Text, StyleSheet, StatusBar, TouchableOpacity, ScrollView
    , KeyboardAvoidingView,
} from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import Splashh from '../../../assets/splash-screen/splash-image.png'
import { connect } from 'react-redux';
import { Action } from '../../Store/actions/authAction'
import { bindActionCreators } from 'redux';
import InputField from '../../components/inputField/InputField';
import Button from '../../components/button/Button';
import { Snackbar } from 'react-native-paper'
import { LinearGradient } from 'expo';

class LogIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fields: [
                {
                    label: 'E-mail',
                    name: 'email',
                    type: 'email-address',
                    placeholder: 'Din e-mail...',
                    value: 'email',
                    fontAwesome: false,
                    secure: false,
                },
                {
                    label: 'Password',
                    name: 'key',
                    type: 'ascii-capable',
                    placeholder: 'Dit password...',
                    value: 'password',
                    secure: true,
                    fontAwesome: true
                }

            ],
        };
    }

    onChange(value, text) {
        this.setState({
            [text]: value
        })
    }
    function = () => {
        this.props.navigation.navigate('ForgetPassword')
    }
    function2 = () => {
        this.props.navigation.navigate('SignUp')
    }
    Login() {
        const { email, password, } = this.state

        if (email && password) {
            const { Action } = this.props.actions

            Action(email, password).then(() => {
                this.setState({
                    alert: true,
                    text: 'Log ind med succes'
                })
                const resetAction = StackActions.reset({
                    index: 0,
                    actions: [
                        NavigationActions.navigate({ routeName: 'Parking' }),
                    ]
                })
                this.props.navigation.dispatch(resetAction)
            }).catch(() => {
                this.setState({
                    alert: true,
                    text: 'Forkert kodeord'
                })
            })
        } else {
            this.setState({
                alert: true,
                text: 'Udfyld venligst alle felter'
            })
        }
    }

    static navigationOptions = { header: null }
    render() {
        const { fields, text } = this.state

        return (
            <ImageBackground source={Splashh} style={{ width: '100%', height: '100%' }}>
                <LinearGradient
                        colors={['#83E2DA', '#7ACED2', '#0199B0', '#0093d0']}
                        style={{ flex: 1 }}
                        opacity={0.8}

                    >
                <KeyboardAvoidingView style={{ flex: 1 }}  behavior={'padding'} enabled>
                    <ScrollView style={{ flex: 1 }}>

                        <View style={{ flex: 1 }}>
                            <StatusBar hidden={true} />
                            <View style={styles.Heading}><Text style={styles.headingText} onPress={() => this.logIn()}>Log ind</Text></View>
                            <View style={styles.body}>
                                <View style={styles.form}>
                                    {
                                        fields &&
                                        fields.map((items, index) => {
                                            return (
                                                <InputField
                                                    key={index}
                                                    label={items.label}
                                                    name={items.name}
                                                    type={items.type}
                                                    PlaceholderColor={'black'}
                                                    secure={items.secure}
                                                    TextColor={'white'}
                                                    fontAwesome={items.fontAwesome}
                                                    placeholder={items.placeholder}
                                                    change={(value) => this.onChange(value, items.value)}
                                                    InputBackgroundColor={'white'}
                                                    iconColor={'white'}
                                                />
                                            )
                                        })
                                    }
                                </View>
                                <View style={styles.button}>
                                    <Button
                                        color={true}
                                        border={true}
                                        name={'Log ind'}
                                        background={true}
                                        buttonAction={() => this.Login()}
                                        textColor={'white'}
                                    />
                                </View>

                                <View>
                                    <TouchableOpacity
                                        onPress={this.function}
                                        activeOpacity={0.7}
                                        style={[styles.button,
                                        ]}>
                                        <View style={{ alignItems: 'flex-end', paddingHorizontal: 3, }}>
                                            <Text style={{ fontSize: 15, color: 'white', borderBottomColor: 'white', borderBottomWidth: 1 }
                                            }>
                                                {'Glemt dit password?'}
                                            </Text>
                                        </View>

                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={this.function2}
                                        activeOpacity={0.7}
                                        style={[styles.button,
                                        ]}>
                                        <View style={{ alignItems: 'flex-end', paddingHorizontal: 3 }}>
                                            <Text style={{ fontSize: 16, color: 'white', fontWeight: '500' }}>
                                                {'+Opret ny bruger her'}
                                            </Text>
                                        </View>

                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        <Snackbar
                            visible={this.state.alert}
                            onDismiss={() => this.setState({ alert: false })}
                            action={{
                                label: 'Ok',
                                onPress: () => {
                                    // Do something
                                },
                            }}
                        >
                            {text}
                        </Snackbar>
                    </ScrollView>
                </KeyboardAvoidingView>
                </LinearGradient>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    headingText: {
        alignItems: "center",
        color: '#ffffff',
        fontWeight: '200',
        fontSize: 20,
        marginTop: 18
    },

    Heading: {
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 5,
        paddingHorizontal: 5
    },
    input: {
        backgroundColor: '#ffffff',
        marginBottom: 20,
        height: 45,
        width: 300,
        paddingHorizontal: 10,
        fontSize: 18
    },
    button: {
        width: '100%',
        alignItems: 'center',
        paddingVertical: 15,
        opacity:1
    },
    form: {
        // borderWidth: 1,
        width: '100%',
        paddingVertical: 10,
        alignItems: 'center',
        opacity:1
        
    },
    body: {
        // flex: 1,
        alignItems: "center",
        justifyContent: "center",
        marginTop:70

    },
});
function mapStateToProps(states) {
    return ({
    })
}

function mapDispatchToProps(dispatch) {
    return ({
        actions: bindActionCreators({
            Action
        }, dispatch)
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(LogIn);