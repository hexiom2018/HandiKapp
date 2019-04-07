import React from 'react';
import { StackActions, NavigationActions } from 'react-navigation';
import { Header, Icon } from 'react-native-elements';
import {
    View, Text, TextInput, StyleSheet, StatusBar, TouchableOpacity,
    Image, ScrollView, KeyboardAvoidingView
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { UserSignUp } from '../../Store/actions/authAction'
import BackIcon from '../../../assets/back.png'
import StepIndicator from 'react-native-step-indicator';
import InputField from '../../components/inputField/InputField';
import Button from '../../components/button/Button';
import RadioGroup from 'react-native-custom-radio-group';
import { Snackbar } from 'react-native-paper'

// const labels = ["Cart", "Delivery Address"];
const customStyles = {
    stepIndicatorSize: 30,
    currentStepIndicatorSize: 40,
    separatorStrokeWidth: 3,
    currentStepStrokeWidth: 5,
    stepStrokeWidth: 3,
    stepStrokeCurrentColor: '#4419e7',
    stepStrokeFinishedColor: '#4419e7',
    stepStrokeUnFinishedColor: '#4419e7',
    separatorFinishedColor: '#4419e7',
    separatorUnFinishedColor: '#4419e7',
    stepIndicatorFinishedColor: '#4419e7',
    stepIndicatorUnFinishedColor: '#ffffff',
    stepIndicatorCurrentColor: '#4419e7',
    stepIndicatorLabelFontSize: 15,
    currentStepIndicatorLabelFontSize: 15,
    stepIndicatorLabelCurrentColor: '#ffffff',
    stepIndicatorLabelFinishedColor: '#ffffff',
    stepIndicatorLabelUnFinishedColor: '#4419e7',
    labelColor: '#666666',
    labelSize: 12,
    currentStepLabelColor: '#4aae4f'
}

const radioGroupList = [{
    value: 'normal'
}, {
    value: 'sideLoad'
}, {
    value: 'backLoad'
}];

class SignUp extends React.Component {
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
                    secure: false,
                    fontAwesome: false
                },
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
                    label: 'Password',
                    name: 'key',
                    type: 'ascii-capable',
                    placeholder: 'Dit password...',
                    value: 'password',
                    secure: true,
                    fontAwesome: true
                },
                {
                    label: 'Bekræft password',
                    name: 'key',
                    type: 'ascii-capable',
                    placeholder: 'Gentag dit password...',
                    value: 'againPassword',
                    secure: true,
                    fontAwesome: true
                },
            ],
            currentPosition: 0,
            visible: false,
        }

    }

    goBack() {
        const { navigate } = this.props.navigation

        navigate('LogIn')
    }

    onChange(value, text) {
        this.setState({
            [text]: value
        })
    }

    nextPage() {
        const { email, number, password, againPassword } = this.state


        if (email && number && password && againPassword) {
            if (password !== againPassword) {
                this.setState({
                    alert: true,
                    text: 'adgangskoden passer ikke'
                })
            } else {
                const { currentPosition } = this.state
                this.setState({ currentPosition: currentPosition + 1 })
            }
        } else {
            this.setState({
                alert: true,
                text: 'Udfyld venligst alle felter'
            })
        }
    }

    signUp() {
        const { email, number, password, register, radio, disabledPark } = this.state
        var obj = {
            email,
            number,
            password,
            register,
            radio,
            disabledPark
        }
        if (register && radio && disabledPark) {
            const { UserSignUp } = this.props.actions

            UserSignUp(obj).then(() => {
                this.setState({
                    alert: true,
                    text: 'Registrering med succes'
                })
                const resetAction = StackActions.reset({
                    index: 0,
                    actions: [
                        NavigationActions.navigate({ routeName: 'LogIn' }),
                    ]
                })
                this.props.navigation.dispatch(resetAction)
            }).catch(() => {
                this.setState({
                    alert: true,
                    text: 'Bruger eksistere allerede'
                })
            })
        } else {
            this.setState({
                alert: true,
                text: 'Udfyld venligst alle felter'
            })
        }
    }

    render() {
        const { currentPosition, fields, register, text, disabledPark } = this.state
        return (
            <KeyboardAvoidingView style={{ flex: 1 }} behavior={'padding'} enabled>
                <View>
                    <View style={styles.header}>
                        <TouchableOpacity onPress={() => this.goBack()} activeOpacity={0.7}>
                            <View style={styles.Icon}>
                                <Image
                                    style={{ width: '100%', height: '100%' }}
                                    source={BackIcon}
                                />
                            </View>
                        </TouchableOpacity>
                        <View style={{ alignSelf: 'center', paddingRight: 20, flexGrow: 1, alignItems: 'center' }}>
                            <Text style={{ fontSize: 18, fontWeight: '400' }}>
                                Oprettelse af ny bruger
                            </Text>
                        </View>
                    </View>
                    <ScrollView>
                        <View style={styles.indicator}>
                            <StepIndicator
                                customStyles={customStyles}
                                currentPosition={currentPosition}
                                stepCount={2}
                            // onPress={(position) => this.renderStep(position)}
                            />
                        </View>
                        {
                            currentPosition === 0 &&
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
                        }
                        {
                            currentPosition === 1 &&
                            <View style={styles.form}>
                                <View style={{ width: '100%', alignItems: 'center' }}>
                                    <InputField
                                        label={'Registreringsnummer'}
                                        name={'credit-card'}
                                        type={'number-pad'}
                                        placeholder={'Bilens reg.nr...'}
                                        value={register}
                                        PlaceholderColor={'black'}
                                        iconColor={'grey'}
                                        change={(value) => this.onChange(value, 'register')}
                                    />
                                </View>
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
                                <View style={{ width: '100%', alignItems: 'center' }}>
                                    <InputField
                                        label={'Handicapparkeringskortnr'}
                                        name={'wheelchair'}
                                        type={'default'}
                                        placeholder={'Dit kortnr...'}
                                        value={disabledPark}
                                        fontAwesome={true}
                                        PlaceholderColor={'black'}
                                        iconColor={'grey'}
                                        change={(value) => this.onChange(value, 'disabledPark')}
                                    />
                                </View>
                            </View>
                        }
                        <View style={styles.button}>
                            {
                                currentPosition === 0 ?
                                    <Button
                                        color={true}
                                        border={true}
                                        name={'Næste'}
                                        icon={true}
                                        buttonAction={() => this.nextPage()}
                                        textColor={'#4419e7'}
                                    />
                                    :
                                    <Button
                                        color={true}
                                        border={true}
                                        icon={true}
                                        name={'Opret bruger'}
                                        background={true}
                                        buttonAction={() => this.signUp()}
                                        textColor={'white'}
                                    />
                            }
                        </View>
                    </ScrollView>
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
            </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
    header: {
        // borderWidth: 1,
        paddingVertical: 30,
        flexDirection: 'row'
    },
    Icon: {
        width: 40,
        height: 40,
        alignItems: 'center',
        // borderWidth: 1
    },
    indicator: {
        width: '50%',
        // borderWidth: 1,
        alignSelf: 'center',
        paddingVertical: 10
    },
    form: {
        // borderWidth: 1,
        width: '100%',
        paddingVertical: 10,
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
    })
}

function mapDispatchToProps(dispatch) {
    return ({
        actions: bindActionCreators({
            UserSignUp
        }, dispatch)
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);