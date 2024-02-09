import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Weather from './components/Weather';
import Login from './components/Login';
// import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

const Stack = createNativeStackNavigator();
// const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Weather" component={Weather} />
      </Stack.Navigator>
      {/* <Tab.Navigator>
          <Tab.Screen name="Login" component={Login} />
          <Tab.Screen name="Weather" component={Weather} />
        </Tab.Navigator> */}
    </NavigationContainer>
  );
};

export default App;
