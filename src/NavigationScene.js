// nawigacja do logowania i tworzenia konta
import React from 'react';
import {StyleSheet, Platform} from 'react-native';
import CreateAccountScreen from './CreateAccountScreen';
import LoginScreen from './LoginScreen';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createStackNavigator();

function MyStack() {
  return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName = 'Logowanie'>
        <Stack.Screen name="Logowanie" component={LoginScreen} options={{
            headerStyle: { backgroundColor: '#f5f6fa', height: Platform.OS === 'ios' ? 80 : 59  },
            headerTitleStyle: { fontSize: 18},
            headerTitleAlign: 'center',  
            headerTintColor: '#485460',            
            }} />
        <Stack.Screen name="Stwórz konto" component={CreateAccountScreen} options={{
            headerStyle: { backgroundColor: '#f5f6fa', height: Platform.OS === 'ios' ? 80 : 59  },
            headerTitleStyle: { fontSize: 18},
            headerTitleAlign: 'center',  
            headerTintColor: '#485460',            
            }} />        
        </Stack.Navigator>
        </NavigationContainer>    
  );
}
// OLD NAVIGATE
/*const RouterComponent = () => {
    return (
        <Router navigationBarStyle={styles.navBar}>
            <Scene key='root' hideNavBar headerLayoutPreset = 'center' titleStyle={styles.title}>
                <Scene key ='auth'>
                    <Scene key = 'loginScreen' component={LoginScreen} title='Logowanie' initial />
                    <Scene key = 'createAccountScreen' component={CreateAccountScreen} title='Stwórz konto'  />
                </Scene>
                <Scene key = 'main' hideNavBar>
                    <Scene key = 'navigationScreen' component={MyTabs} />
                </Scene>    
            </Scene>
        </Router>
    );
};

const styles = StyleSheet.create({
    navBar: {
        backgroundColor: '#f5f6fa',
        height: Platform.OS === 'ios' ? 40 : 35
    },  
    title: {
        color: '#485460',
        fontSize: 18,
    },
  });*/

//export default RouterComponent;
export default MyStack;