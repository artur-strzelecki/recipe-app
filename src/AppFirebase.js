import React, {Component, useState} from 'react';
import { StyleSheet, View} from 'react-native';
import firebase from 'firebase';
import MyStack from './NavigationScene';
import MyTabs from './NavigationScreen';
import Spinner from '../components/Spinner';
import {config} from '../config';


class AppFirebase extends Component {
  state = {logged: null};  

  UNSAFE_componentWillMount(){
    if(!firebase.apps.length) {
      firebase.initializeApp(config);
    }

    firebase.auth().onAuthStateChanged((user) => {
        if (user)
        {
          this.setState({ logged: true});
        }
        else
        {
          this.setState({logged: false});
        }
    });
  }

  screen() 
  {
    switch (this.state.logged) {
      case true:
        return <MyTabs/>;
      case false:
        return <MyStack/>;
      default:
        return <Spinner size = 'large'/>;  

    }
  }
  render() {
    return (
      <View style = {styles.mainView}>       
        {this.screen()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainView: {
      flex: 1,
  },
});


export default AppFirebase;
