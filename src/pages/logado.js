import React, {useEffect, useState} from 'react'
import { StyleSheet, View, Text, Buttom, FlatList, Image, TouchableNativeFeedback, BackHandler, ActivityIndicator } from 'react-native'
import firebase from '../services/firebase'

let navigation;

const Logado = (props) => {

    const [users, setUsers] = useState([])
    const [state, setState] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        navigation = props.navigation
        getUserBDonline()
    },[])

    useEffect(() => {
        BackHandler.addEventListener("hardwareBackPress", backButtonHandler);
        return () => {
            BackHandler.removeEventListener("hardwareBackPress", backButtonHandler);
        };
      }, [backButtonHandler]);
  
    function backButtonHandler() {
        if (props.navigation.isFocused()) {
            BackHandler.exitApp()
            return true;
        } else
            return false
    }

    async function getUserBDonline(){
        setLoading(true)
        let array = []
        setUsers(array)
        let index = 0;
        firebase.database().ref('users')
        .orderByChild('name')
        .on('child_added', (snapshot) => {
            console.log(snapshot.val().name)
            array.push({
                uid: snapshot.key,
                ...snapshot.val(),
            })
            index++;
            if(snapshot.numChildren() == index)
                setLoading(false)
            setState({...state})
        })
    }

    function enterChat(item){
        props.navigation.navigate('Chat', {
            contact: item,       
        })
    }

    const renderItem = ({item, index}) => {
        if(firebase.auth().currentUser.uid != item.uid)
        return(
            <TouchableNativeFeedback
                onPress={() => enterChat(item)}>
                <View style={styles.containerUser}>
                    <Image
                        style={styles.imgIconUser}
                        source={require('../images/userIcon.png')}
                    />
                    <Text style={styles.txtName}>{item.name}</Text>
                </View>
            </TouchableNativeFeedback>
        );
    }

    return(
        <View style={styles.container}>
            {loading ? (
                <ActivityIndicator size={50} color="white" />
            ) : (
                <FlatList
                    data={users}
                    renderItem={renderItem}
                    keyExtractor={index => index.toString()}
                />
            )}
        </View>
    );
}

const onPressLogout = () => {
    firebase.auth().signOut()
        .then(() => navigation.navigate('Login'))
}

Logado.navigationOptions = screenProps => ({
    headerLeft: null,
    headerRight: () => (
        <TouchableNativeFeedback
            onPress={onPressLogout}>
            <Image
                style={{height: 30, width: 30, marginRight: 20}}
                source={require('../images/exit.png')}
            />
        </TouchableNativeFeedback>
    )
});

export default Logado

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: '#444148'
    },

    input: {
        borderWidth: 1,
        padding: 5,
    },

    containerUser: {
        flexDirection: 'row',
        alignSelf: 'stretch',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: 'white',
        padding: 15,
    },

    txtName: {
        color: 'white',
        marginLeft: 20,
    },
    imgIconUser: {
        height: 35,
        width: 35,
        borderRadius: 50,
        backgroundColor: 'white'
    },
})