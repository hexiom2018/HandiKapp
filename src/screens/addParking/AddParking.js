import React from 'react';
import { StackActions, NavigationActions } from 'react-navigation';
import { Header, Icon } from 'react-native-elements';
import {
    View, Text, TextInput, StyleSheet, StatusBar, TouchableOpacity,
    Image, ScrollView, KeyboardAvoidingView
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import AppHeader from '../../components/header/Header';
import Button from '../../components/button/Button';
import { Snackbar } from 'react-native-paper'


class AddParking extends React.Component {
    constructor(props) {
        super(props);

        this.state = {

        }

    }


    goBack() {
        this.props.navigation.dispatch(NavigationActions.back())
    }

    render() {
        return (
            <AppHeader
                icon={true}
                fontAwesome={true}
                IconName={'map-marker'}
                headerTitle={'tilføj plads'}
                back={() => this.goBack()}
            >
                <KeyboardAvoidingView style={{ flexGrow: 1 }} behavior={'padding'} enabled>
                    <ScrollView style={{ flex: 1 }}>
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

export default connect(mapStateToProps, mapDispatchToProps)(AddParking);