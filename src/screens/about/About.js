import React from 'react';
import { View, Text, TextInput, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { StackActions, NavigationActions } from 'react-navigation';
import AppHeader from '../../components/header/Header';
import { bindActionCreators } from 'redux';



class About extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            title: ' Om Handikapp'
        }
    }

    static navigationOptions = { header: null }

    goBack() {
        this.props.navigation.dispatch(NavigationActions.back())
    }

    render() {
        const { title } = this.state
        return (
            <AppHeader
                icon={true}
                fontAwesome={true}
                IconName={'briefcase'}
                headerTitle={'Om Handikapp'}
                back={() => this.goBack()}
            >

            </AppHeader>
        )
    }
}

function mapStateToProps(states) {
    return ({
    })
}

function mapDispatchToProps(dispatch) {
    return ({

    })
}

export default connect(mapStateToProps, mapDispatchToProps)(About);