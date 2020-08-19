import React,{Component} from 'react';
import { StyleSheet, Text, View,TouchableOpacity,FlatList, Image,ScrollView, SafeAreaView } from 'react-native';
import firebase from 'firebase';
import Spinner from '../components/Spinner';
import { connect } from 'react-redux';
import {
  Montserrat_300Light,
} from '@expo-google-fonts/montserrat';
import * as Font from 'expo-font';

const mapStateToProps = state => {
    return {
        search: state.SearchReducer.search,
    };
};

let customFonts = {
  Montserrat_300Light
};

class RecipeList extends Component {   
    constructor(props){
        super(props);
        this.state={ 
        foods:[],
        loaded: false,
        fontsLoaded: false,
        }}

    _loadFontsAsync = async () => {
      await Font.loadAsync(customFonts);
      this.setState({ fontsLoaded: true });
    }

    componentDidMount () {
      this.downloadData(); 
      this._loadFontsAsync(); 
   }

   downloadData = async () =>
   {
      const categID = this.props.route.params.categID;

      firebase.database().ref().child('foods').orderByChild('category').equalTo(categID).on('value', (snapshot) =>{
          let li = [];
          snapshot.forEach((snap) => {
          let item = snap.val();
          item.key = snap.key;
          li.push(item);
      })
      this.setState({foods: li, loaded: true});
    })
  }

  rednerScreen()
  {
    if ((this.state.loaded) && (this.state.foods.length > 0)) 
    {
      return (
          <FlatList 
            data = {this.state.foods}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            numColumns={2}
            renderItem = {({item})=> this._renderItem({item})}
            keyExtractor = {(item) => item.key}
          /> 
      )
    } else if ((this.state.loaded) && (this.state.foods.length === 0))
    {
      return (<Text style={styles.emptyText}>Brak przepisów w tej kategorii!</Text>)
    }
    return <Spinner size='large' />
  }

  goToRecipe(item)
  {
    this.props.navigation.navigate('Przepis',{item: item});
  }

   _renderItem ({item})  { 
    return (
      <TouchableOpacity style = {styles.TouchList} onPress={() => this.goToRecipe(item)}>
      <Image style={{height: 140, width: 180, borderRadius: 8,}} source={{uri:item.url}}/>
        <Text style={styles.textTitle}> {item.title}</Text>
      </TouchableOpacity>
      )
  }
  
  render() {
    if (!this.state.fontsLoaded)
    {
      return <Spinner size='large' />
    }
    return (
      <View style={styles.mainView}>
        {this.rednerScreen()}
      </View>
    );
  }
}

  
const styles = StyleSheet.create({
  mainView: {
    backgroundColor: '#f5f6fa',
    alignItems: 'center',
  },
  TouchList: {
    marginHorizontal: 5,
    marginTop: 15,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#D6D9E8',
  },
  textTitle: {
    fontFamily: 'Montserrat_300Light',
    fontSize: 18,
    marginLeft: 5,
    marginBottom: 5,
  },
  emptyText: {
    fontFamily: 'Montserrat_300Light',
    fontSize: 22,
    marginTop: 20,
  }
});

export default connect(mapStateToProps,null) (RecipeList);