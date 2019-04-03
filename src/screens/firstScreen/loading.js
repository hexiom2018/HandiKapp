import React from 'react';
import { View, ImageBackground } from 'react-native';
import { connect } from 'react-redux';
import firebase from 'firebase';
import Splashh from '../../../assets/Splashh.jpg';
import { StackActions, NavigationActions } from 'react-navigation';
import { bindActionCreators } from 'redux';
import { current_User, userAuth } from '../../Store/actions/authAction';


class FirstScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    componentDidMount() {
        const { userAuth } = this.props.actions

        userAuth().then(() => {
            const resetAction = StackActions.reset({
                index: 0,
                actions: [
                    NavigationActions.navigate({ routeName: 'Parking' }),
                ]
            })
            this.props.navigation.dispatch(resetAction)
        })
            .catch(() => {
                const resetAction = StackActions.reset({
                    index: 0,
                    actions: [
                        NavigationActions.navigate({ routeName: 'LogIn' }),
                    ]
                })
                this.props.navigation.dispatch(resetAction)
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
        user: (currentUser) => {
            dispatch(current_User(currentUser))
        },
        actions: bindActionCreators({
            userAuth
        }, dispatch)
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(FirstScreen);