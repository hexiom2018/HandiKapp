import { createStackNavigator, createAppContainer, createDrawerNavigator } from 'react-navigation';
import Drawer from '../src/components/drawer/Drawer'
import FirstScreen from '../src/screens/firstScreen/loading'
import LogIn from '../src/screens/login/login'
import Parking from '../src/screens/parking/Parking';
import SignUp from '../src/screens/signUp/SignUp';
import Profile from '../src/screens/profile/Profile';
import AddParking from '../src/screens/addParking/AddParking';


const StackNavigator = createStackNavigator({
    
    FirstScreen: {
        screen: FirstScreen
    },
    SignUp: {
        screen: SignUp
    },
    AddParking: {
        screen: AddParking
    },
    LogIn: {
        screen: LogIn
    },
    Profile: {
        screen: Profile
    },
    Parking: {
        screen: Parking
    },
},
    {
        headerMode: 'none',
        navigationOptions: {
            drawerLockMode: 'locked-closed'
        }
    });

const DrawerNavigation = createDrawerNavigator(
    {
        Parking: {
            screen: StackNavigator
        },
    },
    {
        drawerPosition: 'left',
        drawerWidth: 250,
        initialRouteName: 'Parking',
        contentComponent: Drawer
    }
)


const Navigation = createAppContainer(DrawerNavigation)

export default Navigation;