import React, {Component} from 'react';
import { StyleSheet, View} from 'react-native';
import {Provider} from 'react-redux';
import ReduxThunk from 'redux-thunk';
import {createStore, applyMiddleware} from 'redux';
import AppFirebase from './src/AppFirebase';
import combineReducers from './reducers/reducer';


class App extends Component {
 
  render() {
    return (
      <Provider store={createStore(combineReducers,{}, applyMiddleware(ReduxThunk))}>
        <View style = {styles.mainView} >
        <AppFirebase/>
        </View>
      </Provider>

    );
  }
}

const styles = StyleSheet.create({
  mainView: {
      flex: 1,
  },
});

export default App;
