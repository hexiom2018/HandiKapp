import React from 'react';
import { Header } from 'react-native-elements';
import { View, StyleSheet } from 'react-native';


export default class AppHeader extends React.Component {
    constructor(props) {
        super(props);

    }

    menu() {
<<<<<<< HEAD
  const { headerTitle, back } = this.props
        if (headerTitle === 'Parkering') {
            this.props.navigation.openDrawer();
        } else {
            back('Parkering')
        }
         if (back) {
            this.props.goBack()
        } else {
            this.props.openDrawer()
        }
    }

    render() {
        const { children, headerTitle } = this.props

        return (
            <View style={{ flex: 1 }}>
                <View>
                    <Header
                        placement='center'
                        centerComponent={{
                            text: headerTitle,
                            style: { color: '#fff', fontSize: 18, fontWeight: '400' }
                        }}

                        leftComponent={{
                            icon: headerTitle === 'Parkering' ? 'menu' : 'arrow-back',
                            color: '#fff',
                            onPress: () => this.menu()
                        }}
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