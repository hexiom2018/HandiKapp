import { createStackNavigator, createAppContainer, createDrawerNavigator } from 'react-navigation';
import Drawer from '../src/components/drawer/Drawer'
import FirstScreen from '../src/screens/firstScreen/loading'
import LogIn from '../src/screens/login/login'
import Parking from '../src/screens/parking/Parking';
import SignUp from '../src/screens/signUp/SignUp';
import Profile from '../src/screens/profile/Profile';
import AddParking from '../src/screens/addParking/AddParking';
import ForgetPassword from '../src/screens/forgetPassword/ForgetPassword';
import About from '../src/screens/about/About'

const StackNavigator = createStackNavigator({
    
    FirstScreen: {
        screen: FirstScreen
    },
    AddParking: {
        screen: AddParking
    },
    SignUp: {
        screen: SignUp
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
    ForgetPassword: {
        screen: ForgetPassword
    },
    About:{
        screen:About
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