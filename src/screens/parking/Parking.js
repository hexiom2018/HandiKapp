import React from 'react';
import { View, Text, TextInput, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import AppHeader from '../../components/header/Header';
import Map from '../../components/map/Map';


class Parking extends React.Component {
    constructor() {
        super()
        this.setState = {

        }
    }
    // static navigationOptions = { header: null }

    openMenu() {
        this.props.navigation.openDrawer()
    }

    render() {
        return (
            <AppHeader openDrawer={() => this.openMenu()}>
                <Map />
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

export default connect(mapStateToProps, mapDispatchToProps)(Parking);