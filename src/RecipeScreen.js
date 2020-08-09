import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, Button, ScrollView, FlatList, TouchableOpacity} from 'react-native';
import firebase from 'firebase';
import Spinner from '../components/Spinner';
import SearchBar from './SearchBar';
import {DATA} from '../components/categories';

class RecipeScreen extends Component {

  state = {loading: true};

  _renderItem(item)
  {
    return(
      <TouchableOpacity style = {styles.touch} >
        <Image 
          style = {{width:180,height:140,borderRadius:15}}
          source = {item.img} /> 
        <Text> {item.title}</Text>
      </TouchableOpacity>
    )
  }

  footercomponent = () =>
  {
    if (!this.state.loading) return null;
    return (
      <View style={styles.loadingView} >
        <Spinner size='large' />
      </View>
    );
  }

  headerComponent()
  {
    return (
        <SearchBar />
    );
  }

  render () {
    return (
      <View style={styles.mainView}>
          <SearchBar />
        <FlatList 
      //  ListHeaderComponent = {this.headerComponent()}
         // ListFooterComponent = {this.footercomponent}
          data = {DATA}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          renderItem = {({item})=> this._renderItem(item)}
          keyExtractor = {(item) => item.id}
        />
      </View>
    );
    }
  }
 
  
  const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        //backgroundColor: '#f5f6fa',
        alignItems: 'center',
    },  
    touch: {
      marginLeft: 5,
      padding: 5,
      alignItems: 'center'
  }, 
  loadingView: {
    flex: 1,
    alignItems: 'center',
    alignContent: 'center',
  },  
  searchBarStyle: {
    flex: 1,
  },    
  });  
export default RecipeScreen;