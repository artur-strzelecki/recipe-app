import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, Button, ScrollView, FlatList, TouchableOpacity} from 'react-native';
import firebase from 'firebase';
import Spinner from '../components/Spinner';
import SearchBar from './SearchBar';

export const DATA = [
  {
    id: "1",
    title: "pizza",
    img: require('../photo/pizza.jpg'), 
  },
  {
    id: "2",
    title: "pasta",
    img: require('../photo/pizza.jpg'), 
  },
  {
    id: "3",
    title: "burger",
    img: require('../photo/pizza.jpg'), 
  },
  {
    id: "4",
    title: "chinese",
    img: require('../photo/pizza.jpg'),  
  },
  {
    id: "5",
    title: "italy",
    img: require('../photo/pizza.jpg'), 
  },
  {
    id: "6",
    title: "italy",
    img: require('../photo/pizza.jpg'), 
  },
  {
    id: "7",
    title: "italy",
    img: require('../photo/pizza.jpg'), 
  },
  {
    id: "8",
    title: "italy",
    img: require('../photo/pizza.jpg'), 
  },
  {
    id: "9",
    title: "italy",
    img: require('../photo/pizza.jpg'), 
  },
  {
    id: "10",
    title: "italy",
    img: require('../photo/pizza.jpg'), 
  },
  {
    id: "11",
    title: "italy",
    img: require('../photo/pizza.jpg'), 
  },
  {
    id: "12",
    title: "italy",
    img: require('../photo/pizza.jpg'), 
  },
];

class RecipeScreen extends Component {

  state = {loading: true, search: ''};

  updateSearch = (search) => {
    const lowerText = search.toLowerCase();
    this.setState({ search });
  };

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
        <FlatList 
        ListHeaderComponent = {this.headerComponent()}
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
        backgroundColor: '#f5f6fa',
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
  searchBar: {
    marginTop: 8,
    borderRadius: 10,
  },    
  });  
export default RecipeScreen;