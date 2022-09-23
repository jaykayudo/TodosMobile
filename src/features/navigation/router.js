import React from 'react';
import {createStackNavigator} from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../home/screens/Home.screen';
import CreateEvent from '../addTodos/screen/CreateEvent.screen';
import ViewTodos from '../viewTodos/screens/ViewTodos';

const Stack = createStackNavigator();

const AppRoutes = ()=>{
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{
                headerShown:false
                }}>
                <Stack.Screen name='home' component={HomeScreen} />
                <Stack.Screen name='createEvent' component={CreateEvent} />
                <Stack.Screen name='viewTodos' component={ViewTodos} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
export default AppRoutes;