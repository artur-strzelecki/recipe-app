import React, {Component} from 'react';
import { StyleSheet, Text, View,FlatList,TouchableOpacity,Image,ScrollView, Dimensions,TouchableWithoutFeedback } from 'react-native';
import firebase from 'firebase';
import { Montserrat_300Light,Montserrat_500Medium} from '@expo-google-fonts/montserrat';
import * as Font from 'expo-font';
import Spinner from '../components/Spinner';
import {RECOMMENDED} from '../components/categories';
import {homeData} from '../actions/actionsData';
import {connect} from 'react-redux';
import Swiper from 'react-native-swiper';

let customFonts = {
  Montserrat_300Light,Montserrat_500Medium
};

const mapStateToProps = state => {
  return {
    dataHome: state.DataReducer.dataHome,
    loadedHome: state.DataReducer.loadedHome,
  };
};

const {height, width} = Dimensions.get("window");


class HomeScreen extends Component {
  constructor(props){
    super(props);
    this.state={ 
      fontsLoaded: false,
    }}
  
  componentDidMount()
  {
    this._loadFontsAsync();
    this.props.homeData();
  }  

  _loadFontsAsync = async () => 
  {
      await Font.loadAsync(customFonts);
      this.setState({ fontsLoaded: true });
  }  

  _renderItemCateg (item)
  {
    return(
      <TouchableOpacity style = {styles.TouchListCateg} onPress = {() => this.onPressCateg(item)} >
        <Image 
          style = {{width:180,height:140,borderRadius:15}}
          source = {item.img} /> 
        <View style={styles.viewText}><Text style={{fontSize: 23, color: 'white', fontFamily: 'Montserrat_500Medium'}}> {item.title}</Text></View>
      </TouchableOpacity>
    )
  }

  onPressCateg(item)
  {
    this.props.navigation.navigate('Lista przepisów', {title: item.title, categID: item.id});
  }
  
  goToRecipe(item)
  {
    this.props.navigation.navigate('Przepis',{item: item});
  }

  renderSwiper()
  {
    return this.props.dataHome.map(item => (
      <TouchableWithoutFeedback key={item.key} onPress ={() => this.goToRecipe(item)}>
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <Image style={{height: width/2, width: width * 0.95 , borderRadius: 10}} source={{uri: item.url}} />
          <View style={styles.viewText}><Text style={{fontSize: 30, color: 'white', fontFamily: 'Montserrat_500Medium'}}> {item.title}</Text></View>
        </View>
      </TouchableWithoutFeedback>
    ));
  }

  renderScreen()
  {
    if (this.props.loadedHome)
    {
      return (
        <View>
          <Text style={styles.welcome}> Witaj!</Text>
          <Text style={styles.lastAddText}> Ostatnio dodane przepisy:</Text>   
            <Swiper style={{height: width/2,  marginBottom: 10,}} >
                {
                  this.renderSwiper()
                }
            </Swiper>                        
          <Text style={styles.lastAddText}> Polecane kategorie: </Text> 
          <FlatList 
            data = {RECOMMENDED}
            horizontal = {true}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            renderItem = {({item})=> this._renderItemCateg(item)}
            keyExtractor = {(item) => item.id}
        />
        </View>  
      )    
    } else 
    {
      return <Spinner size='large' />
    }
  }
  render () {
    if (!this.state.fontsLoaded)
    {
      return <Spinner size='large' />
    }
    return (
      <ScrollView style={styles.mainView}>
        {this.renderScreen()}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: '#f5f6fa',
    paddingTop: 10,
  },
  welcome: {
    fontSize: 22,
    fontWeight: 'bold',
    paddingBottom: 10,
    paddingLeft: 5,
  },
  lastAddText: {
    fontFamily: 'Montserrat_300Light',
    fontSize: 17,
    paddingLeft: 5,
    paddingBottom: 5,
  },
  TouchListRecipe: {
    marginHorizontal: 5,
    marginTop: 7,
    marginBottom: 25,
    borderRadius: 10,
    padding: 5,
  //  borderWidth: 2,
  //  borderColor: '#D6D9E8',
  backgroundColor: '#ecf0f1'
  },
  textTitle: {
    fontFamily: 'Montserrat_300Light',
    fontSize: 18,
  // marginLeft: 5,
    marginBottom: 5,
  },
  TouchListCateg: {
    marginHorizontal: 5,
    marginTop: 7,
    alignItems: 'center',
    justifyContent: 'center',
  }, 
  viewText: {
    position: 'absolute',
    alignItems: 'center',
    alignContent: 'center',
  }, 
});
  
export default connect(mapStateToProps, {homeData}) (HomeScreen);