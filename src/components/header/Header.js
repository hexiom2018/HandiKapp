import React from 'react';
import { Header, Icon } from 'react-native-elements';
import { View, StyleSheet, Text, TouchableOpacity, StatusBar } from 'react-native';
import IconFont from 'react-native-vector-icons/FontAwesome'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { LinearGradient, Constants } from 'expo';

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
                <LinearGradient
                    colors={['#0093d0', '#03b8b7']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                >
                    <View style={styles.statusBar} />
                    <View style={styles.customHeader}>
                        <TouchableOpacity style={{ marginLeft: 12 }} onPress={() => this.menu()}>
                            {
                                headerTitle === 'Parkering' ?
                                    <Ionicons
                                        color={'#fff'}
                                        name={'md-menu'}
                                        size={30}
                                    />
                                    :
                                    <Ionicons
                                        color={'#fff'}
                                        name={'ios-arrow-back'}
                                        size={30}
                                    />
                            }
                        </TouchableOpacity>
                        <View>
                            {
                                icon ?
                                    this.centerComponent(headerTitle, IconName)
                                    :
                                    <Text style={{ color: '#fff', fontSize: 18, fontWeight: '400' }}>{headerTitle}</Text>
                            }
                        </View>
                        <View style={{ marginRight: 20 }}>

                        </View>
                    </View>
                </LinearGradient>
                {/* <View>
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
                {/* <View style={{ flexGrow: 1 }}> */}
                    {
                        children
                    }
                {/* </View> */}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row'
    },
    customHeader: {
        width: '100%',
        height: 60,
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: 'space-between'
    },
    statusBar: {
        opacity: 0.2,
        height: Constants.statusBarHeight,
    },
})