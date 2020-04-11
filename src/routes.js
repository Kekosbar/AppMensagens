import React from 'react'
import { View, Image, Text, Dimensions } from 'react-native'
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import StartApp from './pages/startapp'
import Login from './pages/login'
import Logado from './pages/logado'
import Cadastro from './pages/cadastro'
import Chat from './pages/chat'

const Routes = createAppContainer(
    createStackNavigator({
      StartApp, Login, Logado, Cadastro, Chat
    },
    {
      defaultNavigationOptions: {
        headerStyle: {
          backgroundColor: '#444148',
        },
        headerTitle: props => <LogoTitle {...props} />
      },
    }
    )
);

function LogoTitle() {
  return (
    <View style={{flex: 1, flexDirection: 'row', width: Dimensions.get('window').width - 35, justifyContent: 'center', alignItems: 'center'}}>
          <Image
            style={{ width: 40, height: 40 }}
            source={require('./images/iconMessage.png')}
          />
          <Text style={{color: 'white', marginLeft: 25, fontSize: 20, }}>App de Mensagens</Text>
    </View>
  );
}

export default Routes;
