import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen';
import BookingScreen from './src/screens/BookingScreen';
import ServiceDetails from './src/screens/ServiceDetails';
import LoginScreen from './src/screens/LoginScreen'; 
import SignUpScreen from './src/screens/SignUpScreen'; 
import CenterDetails from './src/screens/CenterDetails';
import SearchScreen from './src/screens/SearchScreen';
import ServiceDetailSreen from './src/screens/ServiceDetailScreen';
import CenterDetailScreen  from './src/screens/CenterDetailScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Đăng nhập' }} /> 
        <Stack.Screen name="SignUp" component={SignUpScreen} options={{ title: 'Đăng ký' }} /> 
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Search" component={SearchScreen} />
        <Stack.Screen name="ServiceDetailSreen" component={ServiceDetailSreen} />
        <Stack.Screen name="CenterDetailScreen" component={CenterDetailScreen} /> 
        <Stack.Screen name="Booking" component={BookingScreen} />
        <Stack.Screen name="ServiceDetails" component={ServiceDetails} options={{ title: 'Chi tiết dịch vụ' }} />
        <Stack.Screen name="CenterDetails" component={CenterDetails} options={{ title: 'Chi tiết trung tâm' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
