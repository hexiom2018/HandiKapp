import React from 'react';
import { StackActions, NavigationActions } from 'react-navigation';
import { Header, Icon } from 'react-native-elements';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, } from 'react-native';


class Button extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
        }

    }

    render() {
        const { name, textColor, color, buttonAction, background, border } = this.props
        return (
            <TouchableOpacity
                onPress={buttonAction}
                activeOpacity={0.7}
                style={[styles.button,
                border && { borderWidth: 1, borderColor: '#4419e7' },
                background && { backgroundColor: '#6719E7' }
                ]}>
                <View style={{ flexGrow: 1, alignItems: 'flex-end', paddingHorizontal: 3 }}>
                    <Text style={[{ fontSize: 18 },
                    color && { color: textColor }
                    ]}>
                        {name}
                    </Text>
                </View>
                <View style={{ flexGrow: 1, alignItems: 'flex-start', paddingHorizontal: 3 }}>
                    <Icon
                        size={25}
                        color={color && textColor}
                        name={'arrow-forward'}
                    />
                </View>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    button: {
        width: '90%',
        borderWidth: 1,
        borderRadius: 5,
        paddingVertical: 15,
        alignItems: 'center',
        flexDirection: 'row',
        alignContent: 'center'
    }
})

export default Button