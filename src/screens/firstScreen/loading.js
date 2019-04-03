import React from 'react';
import { View, ImageBackground } from 'react-native';
import { connect } from 'react-redux';
import firebase from 'firebase';
import Splashh from '../../../assets/Splashh.jpg';
import { StackActions, NavigationActions } from 'react-navigation';
import { FetchPlaces } from '../../Store/actions/FetchData';
class FirstScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    componentDidMount() {
        firebase.auth().onAuthStateChanged((user) => {
            if (user != null) {
                // console.log(user, '======');
                const currentUser = user
                // this.props.user(currentUser)
                this.props.places()
                const resetAction = StackActions.reset({
                    index: 0,
                    actions: [
                        NavigationActions.navigate({ routeName: 'Parking' }),
                    ]
                })
                this.props.navigation.dispatch(resetAction)
            } else {
                const resetAction = StackActions.reset({
                    index: 0,
                    actions: [
                        NavigationActions.navigate({ routeName: 'LogIn' }),
                    ]
                })
                this.props.navigation.dispatch(resetAction)
            }
        })
    }

    static navigationOptions = { header: null }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <ImageBackground
                    source={Splashh}
                    style={{ width: '100%', height: '100%' }}>
                </ImageBackground>
            </View>
        );
    }
}
function mapStateToProps(states) {
    return ({

    })
}

function mapDispatchToProps(dispatch) {
    return ({
        places: () => {
            dispatch(FetchPlaces())
        },
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(FirstScreen);