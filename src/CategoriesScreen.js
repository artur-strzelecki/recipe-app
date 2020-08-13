import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity,ScrollView, SafeAreaView} from 'react-native';
import {DATA} from '../components/categories';
import Spinner from '../components/Spinner';
import { connect } from 'react-redux';
import { searchChange, resertSearch } from '../actions/actions';
import {
  Montserrat_500Medium,
} from '@expo-google-fonts/montserrat';
import * as Font from 'expo-font';

let customFonts = {
  Montserrat_500Medium
};


class CategoriesScreen extends Component {
  state = {loading: true,fontsLoaded: false};

  componentDidMount()
  {
    this._loadFontsAsync();
  }

  async _loadFontsAsync() {
    await Font.loadAsync(customFonts);
    this.setState({ fontsLoaded: true });
  }

  onPressCateg(item)
  {
    this.props.resertSearch();
    this.props.searchChange(item.title);
    this.props.navigation.navigate('Lista przepisów', {title: item.title, categID: item.id});
  }

  _renderItem(item)
  {
    return(
      <TouchableOpacity style = {styles.touch} onPress = {() => this.onPressCateg(item)} >
        <Image 
          style = {{width:180,height:140,borderRadius:15,opacity:1}}
          source = {item.img} /> 
        <View style={styles.viewText}><Text style={{fontSize: 23, color: 'white', fontFamily: 'Montserrat_500Medium'}}> {item.title}</Text></View>
      </TouchableOpacity>
    )
  }

  render () {
    if (!this.state.fontsLoaded)
    {
      return <Spinner size='large' />
    }
    return (
      <View style={styles.mainView}>
        <FlatList 
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
        backgroundColor: '#f5f6fa',
        alignItems: 'center',
    },  
    touch: {
      marginHorizontal: 5,
      marginTop: 15,
      alignItems: 'center',
      justifyContent: 'center',
  }, 
  loadingView: {
    flex: 1,
    alignItems: 'center',
    alignContent: 'center',
  }, 
  viewText: {
    position: 'absolute',
    alignItems: 'center',
    alignContent: 'center',
  },   
  title: {
    fontSize: 27,
    color: 'white',
  },   
  searchBarStyle: {
    flex: 1,
  },    
  });  
  export default connect(null,{resertSearch,searchChange}) (CategoriesScreen);