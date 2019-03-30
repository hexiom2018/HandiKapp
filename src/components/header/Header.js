import React from 'react';
import { StackActions, NavigationActions } from 'react-navigation';
import { Header } from 'react-native-elements';
import { View, Text, TextInput, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';



export default class AppHeader extends React.Component {
    constructor(props) {
        super(props);


    }

    menu() {
        console.log('********');
    }

    render() {
        const { children } = this.props
        return (
            <View style={{ flex: 1 }}>
                <View>
                    <Header
                        containerStyle={styles.header}
                        placement='center'
                        // rightComponent={{ text: 'LogOut', color: '#fff', onPress: () => this.LogOut() }}
                        centerComponent={{ text: 'Parkering', style: { color: '#fff' } }}
                        leftComponent={{ icon: 'menu', color: '#fff', onPress: () => this.menu() }}

                    />
                </View>
                <View style={{ flexGrow: 1 }}>
                    {
                        children
                    }
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    header: {
        // backgroundColor: '#060606'
        // justifyContent: 'space-around',
    }
})