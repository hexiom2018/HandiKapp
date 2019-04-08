import React from 'react';
import { View, Text, TextInput, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import AppHeader from '../../components/header/Header';
import Map from '../../components/map/Map';
import { bindActionCreators } from 'redux';
import { GetParkingSpace, IncreaseParking, DecreaseParking } from '../../Store/actions/authAction';
import { Snackbar } from 'react-native-paper'



class Parking extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            title: 'Parkering'
        }
    }

    componentWillMount() {
        const { user } = this.props
        const { GetParkingSpace } = this.props.actions
        if (user) {
            GetParkingSpace(user.userUid)
        }
    }

    componentWillReceiveProps(props) {
        const { user } = props
        const { GetParkingSpace } = this.props.actions

        if (user) {
            GetParkingSpace(user.userUid)
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


    addParking(vehicle, user) {
        const { IncreaseParking } = this.props.actions

        IncreaseParking(vehicle, user).then(() => {
            this.setState({
                navigate: {
                    exitParking: true,
                    selectPlace: false,
                    searchInput: false,
                    selectPlaceConfirm: false,
                }
            })
        }).catch(() => {
            this.setState({
                alert: true,
                alertText: 'Not Avail Parkering til plads'
            })
        })
    }

    ExitParking(vehicle, user) {

        const { DecreaseParking } = this.props.actions

        DecreaseParking(vehicle, user).then(() => {
            this.setState({
                exitParking: {
                    searchInput: true,
                    exitParking: false,
                    item: null,
                    markers: false,
                    search: ''
                }
            })
        })
    }

    render() {
        const { title, alert, alertText, navigate, exitParking } = this.state
        return (
            <AppHeader
                headerTitle={title}
                openDrawer={() => this.openMenu()}
                back={(back) => this.titleHeader(back)}
            >
                <Map
                    backBtn={title}
                    title={(title) => this.titleHeader(title)}
                    addParking={(vehicle, userUid) => this.addParking(vehicle, userUid)}
                    ExitParking={(vehicle, userUid) => this.ExitParking(vehicle, userUid)}
                    navigate={navigate}
                    parkExit={exitParking}
                />
                <Snackbar
                    visible={alert}
                    onDismiss={() => this.setState({ alert: false })}
                    action={{
                        label: 'Ok',
                        onPress: () => {
                            // Do something
                        },
                    }}
                >
                    {alertText}
                </Snackbar>
            </AppHeader>
        )
    }
}

function mapStateToProps(states) {
    return ({
        user: states.authReducers.USER,
    })
}

function mapDispatchToProps(dispatch) {
    return ({
        actions: bindActionCreators({
            GetParkingSpace, IncreaseParking, DecreaseParking
        }, dispatch)
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(Parking);