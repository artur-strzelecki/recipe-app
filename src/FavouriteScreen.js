import React,{Component} from 'react';
import { StyleSheet, Text, View,TouchableOpacity,FlatList,Image } from 'react-native';
import Spinner from '../components/Spinner';
import {Montserrat_300Light,} from '@expo-google-fonts/montserrat';
import * as Font from 'expo-font';
import {connect} from 'react-redux';
import {ResetFav} from '../actions/actions';
import {favData} from '../actions/actionsData';
import {ListItem} from 'react-native-elements';

const mapStateToProps = state => {
  return {
      changeFav: state.FavReducer.changeFav,
      dataFav: state.DataReducer.dataFav,
      loadedFav: state.DataReducer.loadedFav,
  };
};

let customFonts = {
  Montserrat_300Light
};

class Favourite extends Component {
  constructor(props){ 
    super(props);
    this.state={ 
    fontsLoaded: false,
    }}

    _isMounted = false;

    _loadFontsAsync = async () =>
    {
        await Font.loadAsync(customFonts);
        this.setState({ fontsLoaded: true });
    }  
 
    componentDidMount () 
    {
      this._isMounted = true;
      this._loadFontsAsync();
      this.props.favData();     
    }

    componentDidUpdate ()
   {
     if (this._isMounted)
     {
        if (this.props.changeFav !== null)
        {
          this.props.ResetFav();
          this.props.favData();                     
        }
     }
   }

 goToRecipe(item)
 {
   this.props.navigation.navigate('Przepis',{item: item});
 }

   _renderItem ({item})  { 
    return (
      <View style={{borderBottomWidth: 0.8, borderColor: '#cccccc'}}>
        <ListItem
        title={item.title}
        onPress={() => this.goToRecipe(item)}
        titleStyle={{fontSize: 23, fontFamily: 'Montserrat_300Light' }}
        leftElement={<Image style={{height: 70, width: 90, borderRadius: 7,}} source={{uri:item.url}}/>}
        chevron
        />
      </View>  
      )
  }

  rednerScreen()
  {
    if (this.props.loadedFav)
    {
      if (this.props.dataFav.length === 0)
      {
        return  <Text style={styles.errorText}> Brak ulubionych przepisów!</Text> //<Text style={styles.errorText}> Brak ulubionych przepisów!</Text>
      }
      return ( <FlatList 
        data = {this.props.dataFav}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
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

export default connect(mapStateToProps, {ResetFav,favData}) (Favourite);