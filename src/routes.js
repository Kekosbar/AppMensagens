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
    })
);

export default Routes;
