import React from 'react';
import { StackActions, NavigationActions } from 'react-navigation';
import { Header, Icon } from 'react-native-elements';
import {
    View, Text, TextInput, StyleSheet, StatusBar, TouchableOpacity,
    Image, ScrollView, KeyboardAvoidingView
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// import { UserSignUp } from '../../Store/actions/authAction'
// import BackIcon from '../../../assets/back.png'
// import StepIndicator from 'react-native-step-indicator';
// import Button from '../../components/button/Button';
// import RadioGroup from 'react-native-custom-radio-group';
import InputField from '../../components/inputField/InputField';
// import { Snackbar } from 'react-native-paper'
import AppHeader from '../../components/header/Header';
import Button from '../../components/button/Button';
import RadioGroup from 'react-native-custom-radio-group';
import { Snackbar } from 'react-native-paper'


const radioGroupList = [{
    value: 'ordinary'
}, {
    value: 'side luggage'
}, {
    value: 'luggage'
}];


class Profile extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            fields: [
                {
                    label: 'Mobilnummer',
                    name: 'smartphone',
                    type: 'number-pad',
                    placeholder: 'Dit mobilnummer...',
                    value: 'number',
                    secure: false,
                    fontAwesome: false
                },
                {
                    label: 'Registreringsnummer',
                    name: 'credit-card',
                    type: 'number-pad',
                    placeholder: 'Bilens reg.nr...',
                    value: 'register',
                    secure: false,
                    fontAwesome: false
                },
                {
                    label: 'Handicapparkeringskortnr',
                    name: 'wheelchair',
                    type: 'default',
                    placeholder: 'Dit kortnr...',
                    value: 'disabledPark',
                    secure: false,
                    fontAwesome: true
                }
            ],
        }

    }

    componentWillMount() {
        const { user, vehicle } = this.props

        if (user) {
            if (vehicle) {
                this.setState({
                    number: user.mobile,
                    register: vehicle.reg,
                    disabledPark: vehicle.disabled,
                    radio: vehicle.type
                })
            }
        }

    }

    componentWillReceiveProps(props) {
        const { user, vehicle } = props

        if (user) {
            if (vehicle) {
                this.setState({
                    number: user.mobile,
                    register: vehicle.reg,
                    disabledPark: vehicle.disabled,
                    radio: vehicle.type
                })
            }
        }
    }

    onChange(value, text) {
        this.setState({
            [text]: value
        })
    }

    goBack() {
        this.props.navigation.dispatch(NavigationActions.back())
    }

    update() {
        const { number, register, disabledPark, radio } = this.state

        if (number && register && disabledPark && radio) {
            var obj = {
                number,
                register,
                disabledPark,
                radio
            }
            console.log(obj, 'obj')
        }
    }

    render() {
        const { fields, text } = this.state
        return (
            <AppHeader
                icon={true}
                IconName={'person'}
                headerTitle={'Min konto'}
                back={() => this.goBack()}
            >
                <KeyboardAvoidingView style={{ flexGrow: 1 }} behavior={'padding'} enabled>
                    <ScrollView style={{ flex: 1 }}>
                        <View style={styles.profile}>
                            <View style={{ width: '100%', alignItems: 'center' }}>
                                {
                                    fields &&
                                    fields.map((items, index) => {
                                        return (
                                            <InputField
                                                key={index}
                                                label={items.label}
                                                name={items.name}
                                                type={items.type}
                                                value={this.state[items.value]}
                                                secure={items.secure}
                                                fontAwesome={items.fontAwesome}
                                                placeholder={items.placeholder}
                                                PlaceholderColor={'black'}
                                                iconColor={'grey'}
                                                change={(value) => this.onChange(value, items.value)}
                                            />
                                        )
                                    })
                                }
                            </View>
                            <View style={styles.form}>
                                <View style={styles.label}>
                                    <View style={{ paddingLeft: 20, paddingRight: 10 }}>
                                        <Icon
                                            color={'grey'}
                                            size={25}
                                            name={'directions-bus'}
                                        />
                                    </View>
                                    <View style={{ alignSelf: 'center' }}>
                                        <Text style={{ fontSize: 17, fontWeight: '500' }}>
                                            {'Biltype'}
                                        </Text>
                                    </View>
                                </View>
                                <View style={{ width: '90%', paddingHorizontal: 10, flexDirection: 'row' }}>
                                    <View>
                                        <RadioGroup
                                            containerStyle={{ flexDirection: 'column' }}
                                            radioGroupList={radioGroupList}

                                            onChange={(radio) => this.setState({ radio })}
                                            buttonContainerActiveStyle={{ backgroundColor: '#2089dc', borderWidth: 2, borderColor: 'lightgrey' }}
                                            buttonContainerStyle={{ width: 35, marginVertical: 5 }}
                                            buttonContainerInactiveStyle={{ borderWidth: 2, borderColor: 'lightgrey' }}
                                        />
                                    </View>
                                    <View style={{ flexGrow: 1, justifyContent: 'space-around', paddingHorizontal: 5 }}>
                                        <View>
                                            <Text style={{ fontSize: 16 }}>
                                                {'Almindelig personbil'}
                                            </Text>
                                        </View>
                                        <View>
                                            <Text style={{ fontSize: 16 }}>
                                                {'Bus med sideudlæs'}
                                            </Text>
                                        </View>
                                        <View>
                                            <Text style={{ fontSize: 16 }}>
                                                {'Bus med bagudlæs'}
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.button}>
                                <Button
                                    color={true}
                                    border={true}
                                    name={'Gem ændringer'}
                                    background={true}
                                    buttonAction={() => this.update()}
                                    textColor={'white'}
                                />
                            </View>
                        </View>
                        {
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
                        }
                    </ScrollView>
                </KeyboardAvoidingView>
            </AppHeader>
        )
    }
}

const styles = StyleSheet.create({
    header: {
        // borderWidth: 1,
        paddingVertical: 30,
        flexDirection: 'row'
    },
    profile: {
        // borderWidth: 1,
        paddingVertical: 18
    },
    form: {
        // borderWidth: 1,
        width: '100%',
        paddingVertical: 5,
        alignItems: 'center'
    },
    button: {
        width: '100%',
        alignItems: 'center',
        paddingVertical: 15
    },
    label: {
        width: '100%',
        flexDirection: 'row',
        paddingVertical: 10,
        paddingHorizontal: 10
    },
})


function mapStateToProps(states) {
    return ({
        user: states.authReducers.USER,
        vehicle: states.authReducers.VEHICLE,
    })
}

function mapDispatchToProps(dispatch) {
    return ({
        actions: bindActionCreators({
            // UserSignUp
        }, dispatch)
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);