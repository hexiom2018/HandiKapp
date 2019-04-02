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
// import InputField from '../../components/inputField/InputField';
// import Button from '../../components/button/Button';
// import RadioGroup from 'react-native-custom-radio-group';
// import { Snackbar } from 'react-native-paper'
import AppHeader from '../../components/header/Header';



class Profile extends React.Component {
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
                iconName={'profile'}
                headerTitle={'Min konto'}
                back={() => this.goBack()}
            >
                <KeyboardAvoidingView style={{ flex: 1 }} behavior={'padding'} enabled>
                    <View style={styles.profile}>

                    </View>
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
        borderWidth: 1
    }
})


function mapStateToProps(states) {
    return ({
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