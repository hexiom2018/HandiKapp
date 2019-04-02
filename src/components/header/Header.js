import React from 'react';
import { Header, Icon } from 'react-native-elements';
import { View, StyleSheet, Text } from 'react-native';


export default class AppHeader extends React.Component {
    constructor(props) {
        super(props);

    }

    menu() {
        const { headerTitle, back } = this.props
        if (headerTitle === 'Parkering') {
            this.props.openDrawer()
        } else {
            back('Parkering')
        }
        // if (back) {
        //     this.props.goBack()
        // } else {
        // }
    }

    centerComponent() {
        return (
            <View style={styles.header}>
                <View style={{ marginRight: 5 }}>
                    <Icon
                        color={'#fff'}
                        name={'person'}
                        size={24}
                    />
                </View>
                <View>
                    <Text style={{ fontSize: 18, color: '#fff' }}>
                        Min konto
                </Text>
                </View>
            </View>
        )
    }

    render() {
        const { children, headerTitle, icon, IconName } = this.props

        return (
            <View style={{ flex: 1 }}>
                <View>
                    <Header
                        placement='center'
                        containerStyle={{ height: 100 }}
                        centerComponent={
                            icon ?
                                this.centerComponent()
                                :
                                {
                                    text: headerTitle,
                                    style: { color: '#fff', fontSize: 18, fontWeight: '400' }
                                }
                        }

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
        flexDirection: 'row'
    }
})