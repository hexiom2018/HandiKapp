import { createStackNavigator, createAppContainer, createDrawerNavigator } from 'react-navigation';
import Drawer from '../src/components/drawer/Drawer'
import FirstScreen from '../src/screens/firstScreen/loading'
import LogIn from '../src/screens/login/login'
const StackNavigator = createStackNavigator({
    FirstScreen: {
        screen: FirstScreen
    },
    LogIn:{
        screen:LogIn
    },
    

},{
    navigationOptions:{
        drawerLockMode:'locked-closed'
    }

}
);

const DrawerNavigation = createDrawerNavigator(
    {
        Initial: {
            screen: StackNavigator
        },
    },
    {
        drawerWidth: 300,
        initialRouteName: 'Initial',
        contentComponent: Drawer
    }
)





const Navigation = createAppContainer(DrawerNavigation)
export default Navigation;