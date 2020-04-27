import React, { useEffect } from 'react'
import { StyleSheet, View, Image, Text, TouchableOpacity, FlatList } from 'react-native'
import { Dialog } from 'react-native-simple-dialogs';

export default function DialogListPhoto(props){

    const renderItem = ({item}) => 
        <TouchableOpacity 
            onPress={item.funcao}>
            <View style={styles.btListDialog}>
            <Image style={styles.imgItemListDialog}
                source={item.imagem}/>
                <Text style={styles.txtItemList}>{item.texto}</Text>
            </View>
        </TouchableOpacity>

    return(
        <Dialog
            visible={props.visible}
            onTouchOutside={props.onTouchOutside} 
            title={props.title}>
            <View>
                <FlatList
                    data={props.data}
                    renderItem={renderItem}
                />
            </View>
        </Dialog>
    )
    
}

const styles = StyleSheet.create({

    imgItemListDialog: {
        marginRight: 25,
        height: 40,
        width: 40
    },

    txtItemList: {
        fontSize: 16,
    },

    btListDialog: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 20,
        borderColor: 'black',
        borderBottomWidth: 1,
        borderTopWidth: 1
    },

    dialogTxtTitle: {
        fontSize: 25,
        fontWeight: 'bold',
        alignSelf: 'center',
        color: 'black'
    }
})