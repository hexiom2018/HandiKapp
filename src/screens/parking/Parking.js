import React from 'react';
import { View, Text, TextInput, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import AppHeader from '../../components/header/Header';
import Map from '../../components/map/Map';


class Parking extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            title: 'Parkering'
        }
    }


    titleHeader(title) {
        if (title === 'Søgning') {
            this.setState({ title: title })
        } else if (title === 'Parkering') {
            this.setState({ title: title })
        }
    }

    openMenu() {
        this.props.navigation.openDrawer()
    }

    static navigationOptions = { header: null }

    render() {
        const { title } = this.state
        return (
            <AppHeader
                headerTitle={title}
                openDrawer={() => this.openMenu()}
                back={(back) => this.titleHeader(back)}
            >
                <Map
                    backBtn={title}
                    title={(title) => this.titleHeader(title)}
                />
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