import React from 'react';
import { StackActions, NavigationActions } from 'react-navigation';
import { Header, Icon } from 'react-native-elements';
import {
    View, Text, TextInput, StyleSheet, StatusBar, TouchableOpacity,
    Image, ScrollView, KeyboardAvoidingView
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { AddParkingSpace } from '../../Store/actions/authAction'
import InputField from '../../components/inputField/InputField';
import AppHeader from '../../components/header/Header';
import Button from '../../components/button/Button';
import { Snackbar } from 'react-native-paper'
import Label from '../../components/label/Label';


class AddParking extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            fields: [
                {
                    name: 'Normal',
                    icon: false,
                    type: 'number-pad',
                    borderColor: 'lightgrey',
                    value: 'normal'
                },
                {
                    name: 'Sideudlæs',
                    icon: false,
                    type: 'number-pad',
                    borderColor: 'lightgrey',
                    value: 'sideLoad'
                },
                {
                    name: 'Bagudlæs',
                    icon: false,
                    type: 'number-pad',
                    borderColor: 'lightgrey',
                    value: 'backLoad'
                }
            ],
            toilet: {
                name: 'Antal handicap toiletter',
                icon: true,
                iconName: 'person',
                iconColor: 'grey',
                type: 'number-pad',
                borderColor: 'lightgrey',
                value: 'toylet'
            }
        }

    }

    componentDidMount() {
        const { currentAddress } = this.props
        console.log(currentAddress, 'Line no 60 Add parking');

        this.setState({ currentAddress })

    }


    goBack() {
        this.props.navigation.dispatch(NavigationActions.back())
    }

    onChange(value, text) {
        this.setState({
            [text]: value
        })
    }

    formField(item, index) {
        return (
            <View key={index} style={styles.form}>
                <View style={{ alignSelf: 'center', width: 55 }}>
                    {
                        item.icon ?
                            <Icon
                                name={item.iconName}
                                color={item.iconColor}
                            />
                            :
                            null
                    }
                </View>
                <View style={{ alignSelf: 'center', flexGrow: 1 }}>
                    <Text>
                        {item.name}
                    </Text>
                </View>
                <View>
                    <TextInput
                        style={{
                            borderWidth: 1,
                            borderColor: item.borderColor,
                            width: 60,
                            height: 55,
                            textAlign: 'center',
                            borderRadius: 5
                        }}
                        value={this.state[item.value]}
                        keyboardType={item.type}
                        onChangeText={(text) => this.onChange(text, item.value)}
                    />
                </View>
            </View>
        )
    }

    addParking() {
        const { address, normal, sideLoad, backLoad, toylet, comments, currentAddress } = this.state
        const { AddParkingSpace } = this.props.actions
        const { user } = this.props
        var obj = {
            address: {
                ...currentAddress
            },
            coordinates,
            created: {
                ...user,
                timeStamp: Date.now()
            },
            parking: {
                normal: normal ? normal : 0,
                sideLoad: sideLoad ? sideLoad : 0,
                backLoad: backLoad ? backLoad : 0,
            },
            toilet: toylet,
            parkingComment: comments
        }

        AddParkingSpace(obj).then(() => {

        })

    }

    render() {
        const { fields, toilet, address, comments } = this.state
        return (
            <AppHeader
                icon={true}
                fontAwesome={true}
                IconName={'map-marker'}
                headerTitle={'tilføj plads'}
                back={() => this.goBack()}
            >
                <KeyboardAvoidingView style={{ flex: 1, paddingVertical: 5 }} behavior={'padding'} enabled>
                    <View>
                        <ScrollView>
                            <View>
                                <View style={{ width: '100%', alignItems: 'center' }}>
                                    <InputField
                                        label={'Din placering'}
                                        name={'wheelchair'}
                                        type={'default'}
                                        placeholder={'Dit kortnr...'}
                                        value={address}
                                        fontAwesome={true}
                                        PlaceholderColor={'black'}
                                        iconColor={'grey'}
                                        change={(value) => this.onChange(value, 'address')}
                                    />
                                </View>
                                <View style={{ width: '100%', alignItems: 'center' }}>
                                    <Label
                                        label={'Antal handicap p-pladser'}
                                        name={'wheelchair'}
                                        fontAwesome={true}
                                        iconColor={'grey'}
                                    />
                                </View>
                                <View style={{ width: '100%', paddingVertical: 3, alignItems: 'center' }}>
                                    {
                                        fields &&
                                        fields.map((items, index) => {
                                            return (
                                                this.formField(items, index)
                                            )
                                        })
                                    }
                                </View>
                                <View style={{ width: '100%', paddingVertical: 3, alignItems: 'center' }}>
                                    {
                                        toilet &&
                                        this.formField(toilet, 0)
                                    }
                                </View>
                                <View style={{ width: '100%', alignItems: 'center' }}>
                                    <Label
                                        label={'Kommentar til pladsen'}
                                        name={'wheelchair'}
                                        fontAwesome={true}
                                        iconColor={'grey'}
                                    />
                                </View>
                                <View style={{ width: '90%', alignItems: 'flex-end' }}>
                                    <TextInput
                                        multiline={true}
                                        style={{
                                            borderWidth: 1,
                                            width: '80%',
                                            paddingHorizontal: 15,
                                            borderColor: 'lightgrey',
                                            borderRadius: 5,
                                            height: 70
                                        }}
                                        value={comments}
                                        onChangeText={(text) => this.onChange(text, 'comments')}
                                    />
                                </View>
                                <View style={styles.button}>
                                    <Button
                                        color={true}
                                        border={true}
                                        name={'Gem ændringer'}
                                        background={true}
                                        buttonAction={() => this.addParking()}
                                        textColor={'white'}
                                    />
                                </View>
                            </View>
                        </ScrollView>
                    </View>
                </KeyboardAvoidingView>
            </AppHeader>
        )
    }
}

const styles = StyleSheet.create({
    form: {
        // borderWidth: 1,
        width: '90%',
        flexDirection: 'row',
        paddingVertical: 3
    },
    button: {
        width: '100%',
        alignItems: 'center',
        paddingVertical: 15
    },
})


function mapStateToProps(states) {
    return ({
        user: states.authReducers.USER,
        vehicle: states.authReducers.VEHICLE,
        currentAddress: states.authReducers.CURRENTADDRESS,
    })
}

function mapDispatchToProps(dispatch) {
    return ({
        actions: bindActionCreators({
            AddParkingSpace
        }, dispatch)
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(AddParking);