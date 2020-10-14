import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Index from './src/Index.js';
import User from './src/User.js';

const Stack = createStackNavigator();

const App = () => {
	return(
        <NavigationContainer>
			<Stack.Navigator initialRouteName='Index'>
				<Stack.Screen 
					name='Index'
					component={Index} 
					options={{
						title: 'Usuários',
						headerStyle: { backgroundColor: '#AA0000', height: 50 },
						headerTintColor: 'white',
						headerTitleStyle: { fontWeight: 'bold', alignSelf: 'center' },
						tabBarOptions: {
							style: { height: 55, backgroundColor: '#8e7e7e' }
						},
						headerBackTitle: ' ',
					}}
				/>
				<Stack.Screen 
					name='User'
					component={User} 
					options={{
						title: 'User',
						headerStyle: { backgroundColor: '#AA0000', height: 50 },
						headerTintColor: 'white',
						headerTitleStyle: { fontWeight: 'bold', alignSelf: 'center' },
						headerTitleContainerStyle: { left: 0 },
						tabBarOptions: {
							style: { height: 55, backgroundColor: '#8e7e7e' }
						},
						headerBackTitle: ' ',
					}}
				/>
			</Stack.Navigator>
        </NavigationContainer>
	)
}

export default App;
