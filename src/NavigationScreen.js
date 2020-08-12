// nawigacja po zalogowaniu
import React from 'react';
import { StyleSheet, Text, Platform,TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator,HeaderBackButton } from '@react-navigation/stack';
import { MaterialCommunityIcons,Ionicons } from '@expo/vector-icons'; 
import Favourite from './FavouriteScreen';
import HomeScreen from './HomeScreen';
import ProfileScreen from './ProfileScreen';
import CategoriesScreen from './CategoriesScreen';
import AddRecipe from './AddRecipeScreen';
import RecipeList from './ReicpeListScreen';
import RecipeScreen from './RecipeScreen';


const HomeStack = createStackNavigator();

function StackHomeScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Główna" component={HomeScreen} options={{
          headerStyle: { backgroundColor: '#f5f6fa', height: Platform.OS === 'ios' ? 80 : 59  },
          headerTitleStyle: { fontSize: 18},
          headerTitleAlign: 'center',  
          headerTintColor: '#485460',            
        }} />
    </HomeStack.Navigator>
  );
}

const RecipeStack = createStackNavigator();

function StackRecipeScreen({navigation: {navigate}}) {
  return (
    <RecipeStack.Navigator initialRouteName="Przepisy">
      <RecipeStack.Screen name="Przepisy" component={CategoriesScreen} options={{
          headerStyle: { backgroundColor: '#f5f6fa', height: Platform.OS === 'ios' ? 90 : 59 },
          headerTitleStyle: { fontSize: 18, },
          headerTitleAlign: 'center',  
          headerTintColor: '#485460', 
          headerRight: (props) => (
          <TouchableOpacity onPress={() => navigate('Dodaj')}>
            <Ionicons iconStyle={{size: 40,}} name="ios-add-circle" size={Platform.OS === 'ios' ? 30 : 28} color="#485460" />
          </TouchableOpacity>
          ),   
          headerRightContainerStyle: { margin: Platform.OS === 'android' ? 15 : 9 },      
        }}/>
      <RecipeStack.Screen name="Dodaj" component={AddRecipe} options={{
          headerStyle: { backgroundColor: '#f5f6fa', height: Platform.OS === 'ios' ? 80 : 59 },
          headerTitleStyle: { fontSize: 18, },
          headerTitleAlign: 'center',  
          headerTintColor: '#485460',      
        }}/>
      <RecipeStack.Screen name="Lista przepisów" component={RecipeList} options={{
          headerStyle: { backgroundColor: '#f5f6fa', height: Platform.OS === 'ios' ? 80 : 59 },
          headerTitleStyle: { fontSize: 18, },
          headerTitleAlign: 'center',  
          headerTintColor: '#485460',      
        }}/>    
      <RecipeStack.Screen name="Przepis" component={RecipeScreen} options={{
        headerTransparent: true,
        headerTitle: false,
        }}/>            

    </RecipeStack.Navigator>
  );
}

const FavStack = createStackNavigator();

function StackFavScreen() {
  return (
    <FavStack.Navigator>
      <FavStack.Screen name="Ulubione" component={Favourite} options={{
          headerStyle: { backgroundColor: '#f5f6fa', height: Platform.OS === 'ios' ? 80 : 59 },
          headerTitleStyle: { fontSize: 18},
          headerTitleAlign: 'center',
          headerTintColor: '#485460',     
        }}/>
    </FavStack.Navigator>
  );
}

const ProfileStack = createStackNavigator();

function StackProfileScreen() {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen name="Profil" component={ProfileScreen}  options={{
          headerStyle: { backgroundColor: '#f5f6fa', height: Platform.OS === 'ios' ? 80 : 59 },
          headerTitleStyle: { fontSize: 18},
          headerTitleAlign: 'center',    
          headerTintColor: '#485460',     
        }}/>
    </ProfileStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

function MyTabs () {

  return (
      <NavigationContainer>
        <Tab.Navigator initialRouteName="HomeScreen" tabBarOptions={{activeTintColor: '#485460', showLabel: false, keyboardHidesTabBar: true, }} > 
          <Tab.Screen name="HomeScreen" component={StackHomeScreen} 
          options={{          
            tabBarLabel: ({focused}) => 
            {switch (focused) {case true: return <Text style = {styles.label}>Home</Text>; case false: return null}},
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="home" color={color} size={size + 5} />
              ),
          }}/>
          <Tab.Screen name="RecipeScreen" component={StackRecipeScreen} 
          options={{
            tabBarLabel: ({focused}) => 
            {switch (focused) {case true: return <Text style = {styles.label}>Recipe</Text>; case false: return null}},
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="chef-hat" color={color} size={size + 5} /> ),
          }}/>
          <Tab.Screen name="InputTextScreen" component={StackFavScreen} 
          options={{
            tabBarLabel: ({focused}) => 
            {switch (focused) {case true: return <Text style = {styles.label}>Settings</Text>; case false: return null}},
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="cards-heart" color={color} size={size + 5} /> ),
          }}/>
          <Tab.Screen name="ProfileScreen" component={StackProfileScreen} 
          options={{
            tabBarLabel: ({focused}) => 
            {switch (focused) {case true: return <Text style = {styles.label}>Profile</Text>; case false: return null}},
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="account-circle" color={color} size={size + 5} /> ),
          }}/>

        </Tab.Navigator>
      </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  label: {
  fontSize: 11,
  color: '#485460',
  paddingBottom: 4,    
  },
  rightButton: {
    marginLeft: 5,
    }
});

export default MyTabs;
