import React, { Component } from 'react';
import { StyleSheet, Text, View,Button} from 'react-native';
import firebase from 'firebase';

class ProfileScreen extends Component {

  onOutPress() 
  {
    firebase.auth().signOut();
  }

  render()
  {
    return (
      <View style={styles.mainView}>
        <Text> Profile Screen</Text>
        <Button title="Wyloguj" onPress={this.onOutPress.bind(this)} ></Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: '#f5f6fa',
    alignItems: 'center', 
    justifyContent: 'center'
  },
  
});
  
export default ProfileScreen;