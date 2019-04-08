import React from 'react';
import { View, Text, TextInput, StyleSheet, Image, ScrollView, KeyboardAvoidingView } from 'react-native';
import { connect } from 'react-redux';
import { StackActions, NavigationActions } from 'react-navigation';
import AppHeader from '../../components/header/Header';
import logoBlack from '../../../assets/logoBlack.png'


class About extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            title: ' Om Handikapp',
            text: ''
        }
    }

    static navigationOptions = { header: null }

    goBack() {
        this.props.navigation.dispatch(NavigationActions.back())
    }

    render() {
        const { title } = this.state
        return (
            <AppHeader
                icon={true}
                fontAwesome={true}
                IconName={'briefcase'}
                headerTitle={'Om Handikapp'}
                back={() => this.goBack()}
            >
                <KeyboardAvoidingView style={{ flex: 1 }} behavior={'padding'}>
                    <ScrollView style={{ flex: 1 }}>
                        <View style={{ alignItems: 'center', marginTop: 20 }}>
                            <Image
                                source={logoBlack}
                            // style={{ width: 200 , height: 200 }}
                            />
                            <View style={{ width: '90%', marginTop: 20, alignItems: 'center' }}>
                                <Text style={{ color: 'gray', fontSize: 16 }}>Nem tilgængelighedsapp til handicappede med gangbesvær og folk med inkontinens og mave- tarmsygdomme.</Text>
                            </View>
                            <View style={{ width: '100%', marginTop: 20, flexDirection: 'row', justifyContent: 'space-evenly', borderWidth: 0.5, paddingVertical: 10, borderColor: 'gray' }}>
                                <Text style={styles.btns}>FORSIDE</Text>
                                <Text style={styles.btns}>AMBASSADØRER</Text>
                                <Text style={styles.btns}>NYHEDER</Text>
                                <Text style={styles.btns}>OM APP'EN</Text>
                            </View>
                            <View style={{ width: '80%', alignItems: 'center', marginTop: 20, }}>
                                <Text style={{ color: 'gray', fontSize: 30, fontWeight: '600' }}>Ups! Siden kan ikke findes.</Text>
                            </View>
                            <View style={{ width: '80%', alignItems: 'center', marginTop: 30, }}>
                                <Text style={{ color: 'gray', fontSize: 16 }}>It looks like nothing was found at this location. Maybe try one of the links below or a search?</Text>
                            </View>
                            <View style={styles.container}>
                                <TextInput
                                    value={this.state.text}
                                    onChangeText={e => this.setState({ text: e })}
                                    style={styles.input}
                                />
                            </View>
                            <View style={{ width: '90%', marginTop: 20, }}>
                                <Text style={styles.btns}>søg</Text>
                            </View>
                            <View style={{ width: '90%', marginTop: 30, }}>
                                <Text style={{ color: 'gray', fontSize: 16 }}>Arkiver</Text>
                            </View>
                            <View style={{ width: '90%', marginTop: 12, }}>
                                <Text style={{ color: 'gray', fontSize: 16 }}>Try looking in the monthly archives. :)</Text>
                            </View>
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </AppHeader>
        )
    }
}

const styles = StyleSheet.create({
    btns: {
        color: 'gray',
        fontSize: 14
    },
    container: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'white',
        borderRadius: 4,
        width: '90%',
        shadowOffset: {
            width: 3,
            height: 3,
        },
        shadowOpacity: 0.51,
        shadowRadius: 4.16,
        elevation: 5,
        shadowColor: 'grey',
        marginTop: 20
    },
    input: {
        color: 'black',
        height: 40,
        width: '84%',
        fontSize: 18,
        paddingVertical: 10
    },
})

function mapStateToProps(states) {
    return ({
    })
}

function mapDispatchToProps(dispatch) {
    return ({

    })
}

export default connect(mapStateToProps, mapDispatchToProps)(About);