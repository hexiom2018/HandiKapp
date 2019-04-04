import React from 'react';
import { Header, Icon } from 'react-native-elements';
import { View, StyleSheet, Text } from 'react-native';
import IconFont from 'react-native-vector-icons/FontAwesome'


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
    }

    centerComponent(title, iconName) {
        const { fontAwesome } = this.props
        return (
            <View style={styles.header}>
                <View style={{ marginRight: 5, alignSelf: 'center' }}>
                    {
                        fontAwesome ?
                            <IconFont
                                color={'#fff'}
                                name={iconName}
                                size={20}
                            />
                            :
                            <Icon
                                color={'#fff'}
                                name={iconName}
                                size={24}
                            />
                    }
                </View>
                <View>
                    <Text style={{ fontSize: 18, color: '#fff' }}>
                        {title}
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
                        containerStyle={{ height: 80 }}
                        centerComponent={
                            icon ?
                                this.centerComponent(headerTitle, IconName)
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