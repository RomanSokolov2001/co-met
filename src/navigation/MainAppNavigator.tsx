import { NavigationContainer, useFocusEffect } from "@react-navigation/native";
import FeedScreen from "../screens/main/FeedScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import BottomTabBar from "../components/BottomTabBar";
import MyProfileScreen from "../screens/main/MyProfileScreen";
import SearchScreen from "../screens/main/SearchScreen";
import PostOwnerProfileScreen from "../screens/main/PostOwnerProfileScreen";
import EditProfileScreen from "../screens/main/EditProfileScreen";
import { useEffect } from "react";
import { useProfile } from "../wrappers/ProfileContext";
import { getUserProfile } from "../services/FirestoreService";
import AddPostScene from "../screens/main/AddPostScreen";


const FeedStack = createStackNavigator()

function FeedStackScreen() {
    return (
        <FeedStack.Navigator screenOptions={{ headerShown: false }}>
            <FeedStack.Screen name="Feed" component={FeedScreen} />
            <FeedStack.Screen name="PostDetails" component={FeedScreen} />
            <FeedStack.Screen name="PostOwnerProfile" component={PostOwnerProfileScreen} />
        </FeedStack.Navigator>
    )
}

const ProfileStack = createStackNavigator()

function ProfileStackScreen() {
    return (
        <ProfileStack.Navigator screenOptions={{ headerShown: false }}>
            <ProfileStack.Screen name="MyProfile" component={MyProfileScreen} />
            <ProfileStack.Screen name="EditProfile" component={EditProfileScreen} />
        </ProfileStack.Navigator>
    )
}


const Tab = createBottomTabNavigator()

export default function MainAppNavigator() {
    const { setUserProfile } = useProfile()

    useEffect(() => {
        async function loadUserProfile() {
            const { data } = await getUserProfile()
            setUserProfile(data)
        }
        loadUserProfile()
    }, [])

    return (
        <Tab.Navigator screenOptions={{ headerShown: false }} tabBar={props => <BottomTabBar {...props} />}>
            <Tab.Screen name="Feed" component={FeedStackScreen} />
            <Tab.Screen name="Search" component={SearchScreen} />
            <Tab.Screen name="AddPost" component={AddPostScene} />
            <Tab.Screen name="MyProfileStack" component={ProfileStackScreen} />
        </Tab.Navigator>
    )
}