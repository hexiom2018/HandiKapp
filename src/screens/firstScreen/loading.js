import React from 'react';
import { View, ImageBackground,  ActivityIndicator, } from 'react-native';
import { connect } from 'react-redux';
import firebase from 'firebase';
import Splashh from '../../../assets/splash-screen/splash-image.png';
import { StackActions, NavigationActions } from 'react-navigation';
import { bindActionCreators } from 'redux';
import { current_User, userAuth } from '../../Store/actions/authAction';
import { LinearGradient } from 'expo';
import { FetchPlaces } from '../../Store/actions/FetchData';

class FirstScreen extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    componentDidMount() {
        const { userAuth } = this.props.actions

        userAuth().then(() => {

        this.props.places()
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
                    <LinearGradient
                        colors={['#83E2DA','#7ACED2','#0199B0', '#0093d0']}
                        style={{ flex: 1 }}
                        opacity={0.7}

                    >
                        <View style={{ flex: 1, justifyContent:'center'  }}>
                        <ActivityIndicator size="large" color="#ffffff" />
                        </View>
                    </LinearGradient>
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
        actions: bindActionCreators({
            userAuth
        }, dispatch)
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(FirstScreen);