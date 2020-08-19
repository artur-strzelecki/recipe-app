import React,{Component} from 'react';
import { StyleSheet, Text, View,TouchableOpacity,FlatList,Image } from 'react-native';
import firebase from 'firebase';
import Spinner from '../components/Spinner';
import {Montserrat_300Light,} from '@expo-google-fonts/montserrat';
import * as Font from 'expo-font';
import {connect} from 'react-redux';
import {ResetFav} from '../actions/actions';

const mapStateToProps = state => {
  return {
      changeFav: state.FavReducer.changeFav,
  };
};

let customFonts = {
  Montserrat_300Light
};

class Favourite extends Component {
  constructor(props){ 
    super(props);
    this.state={ 
    foods:[],
    loaded: false,
    fontsLoaded: false,
    isMounted: true,
    update: false,
    }}

    _loadFontsAsync = async () =>
    {
        await Font.loadAsync(customFonts);
        this.setState({ fontsLoaded: true });
    }  
 
    componentDidMount () 
    {
      this._loadFontsAsync();
      this.downloadData(); 
    }

   async componentDidUpdate()
   {
     if (this.props.changeFav !== null)
     {
       this.setState({loaded: false,foods: []});
       this.updateData();
     }
   }

   updateData = async () =>
   {   
      let user = firebase.auth().currentUser.uid;
      let li = [];
      this.props.ResetFav(); 
      firebase.database().ref().child(`favourite/${user}/`).on('value', (snapshot) =>{
        let check = snapshot.exists();
        if (check)
        {
            snapshot.forEach((snap) => {
              firebase.database().ref().child('foods').orderByKey().equalTo(snap.val().id).on('value', (snapshot) =>{
                snapshot.forEach((snapItem) => {
                  let item = snapItem.val();
                  item.key = snapItem.key;
                  li.push(item);      
                }) 
                this.setState({foods: li, loaded: true});
            })
          })
        } else
        {
          this.setState({loaded: true});
        }
    })
  }

  downloadData = async () =>
  {   
     let user = firebase.auth().currentUser.uid;
     let li = [];
     firebase.database().ref().child(`favourite/${user}/`).on('value', (snapshot) =>{
       let check = snapshot.exists();
       if (check)
       {      
            snapshot.forEach((snap) => {
              firebase.database().ref().child('foods').orderByKey().equalTo(snap.val().id).on('value', (snapshot) =>{
                snapshot.forEach((snapItem) => {
                  let item = snapItem.val();
                  item.key = snapItem.key;
                  li.push(item);      
                }) 
                this.setState({foods: li, loaded: true});
            })
          })
       } else
       {
        this.setState({loaded: true}); 
       } 
   })
 }

   _renderItem ({item})  { 
    return (
      <TouchableOpacity>
      <Image style={{height: 200, width: 200,resizeMode: 'contain'}} source={{uri:item.url}}/>
        <Text> {item.title}</Text>
      </TouchableOpacity>
      )
  }

  rednerScreen()
  {
    if (this.state.loaded)
    {
      if (this.state.foods.length === 0)
      {
        return  <Text style={styles.errorText}> Brak ulubionych przepisów!</Text> //<Text style={styles.errorText}> Brak ulubionych przepisów!</Text>
      }
      return ( <FlatList 
        data = {this.state.foods}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        numColumns={2}
        renderItem = {({item})=> this._renderItem({item})}
        keyExtractor = {(item) => item.key}
      /> )
    }
    return <Spinner size='large' />
  }
  
  render() {
    if (this.props.changeFav !== null)
    {
      return null;
    }
    if (!this.state.fontsLoaded)
    {
      return <Spinner size='large' />
    }
    return (
      <View style={{flex: 1,backgroundColor: '#f5f6fa',}}>
        {this.rednerScreen()}
      </View>
    );
  }
}

  
const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: '#f5f6fa',
  },
  errorText: {
    fontFamily: 'Montserrat_300Light',
    fontSize: 22,
    marginTop: 20,
    alignSelf: 'center',
  }
});

export default connect(mapStateToProps, {ResetFav}) (Favourite);