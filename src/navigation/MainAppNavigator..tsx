import { NavigationContainer } from "@react-navigation/native";
import FeedScreen from "../screens/main/FeedScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import BottomTabBar from "../components/BottomTabBar";
import MyProfileScreen from "../screens/main/MyProfileScreen";


const Tab = createBottomTabNavigator()

const FeedStack = createStackNavigator()

function FeedStackScreen() {
    return (
        <FeedStack.Navigator screenOptions={{ headerShown: false }}>
            <FeedStack.Screen name="Feed" component={FeedScreen} />
            <FeedStack.Screen name="PostDetails" component={FeedScreen} />
            <FeedStack.Screen name="PostOwnerProfile" component={FeedScreen} />
        </FeedStack.Navigator>
    )
}



export default function MainAppNavigator() {
    return (
        <Tab.Navigator screenOptions={{ headerShown: false }} tabBar={props => <BottomTabBar {...props} />}>
            <Tab.Screen name="Feed" component={FeedStackScreen} />
            <Tab.Screen name="Search" component={FeedScreen} />
            <Tab.Screen name="AddPost" component={FeedScreen} />
            <Tab.Screen name="MyProfile" component={MyProfileScreen} />
        </Tab.Navigator>
    )
}