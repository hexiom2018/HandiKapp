import React from 'react';
import { StyleSheet } from 'react-native'
import { StackActions, NavigationActions } from 'react-navigation';
import { Header } from 'react-native-elements';


export default class AppHeader extends React.Component {
    constructor(props) {
        super(props);


    }

    menu() {
        console.log('********');
    }

    render() {
        return (
                <Header
                    containerStyle={styles.header}
                    placement='center'
                    // rightComponent={{ text: 'LogOut', color: '#fff', onPress: () => this.LogOut() }}
                    centerComponent={{ text: 'Parkering', style: { color: '#fff' } }}
                    leftComponent={{ icon: 'menu', color: '#fff', onPress: () => this.menu() }}

                />
        )
    }
}

const styles = StyleSheet.create({
    header: {
        // backgroundColor: '#060606'
        // justifyContent: 'space-around',
    }
})