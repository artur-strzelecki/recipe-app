import React from 'react';
import { StyleSheet, Text, View} from 'react-native';


const ProfileScreen = () => {
    return (
      <View style={styles.mainView}>
        <Text> Profile Screen</Text>
      </View>
    );
  }

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: '#f5f6fa',
    alignItems: 'center', 
    justifyContent: 'center'
  }
});
  
export default ProfileScreen;