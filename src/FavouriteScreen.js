import React,{Component} from 'react';
import { StyleSheet, Text, View, TextInput,TouchableOpacity,FlatList } from 'react-native';
import firebase from 'firebase';
import Spinner from '../components/Spinner';
import {Image} from 'react-native-elements';


class Favourite extends Component {
  constructor(props){
    super(props);
    this.state={ 
    foods:[],
    loaded: false,
    }}

  
    componentDidMount () {
      this.downloadData();
   }

   downloadData = async () =>
   {
       firebase.database().ref('/foods').on('value', (snapshot) =>{
          let li = [];
          snapshot.forEach((snap) => {
          let item = snap.val();
          item.key = snap.key;
          li.push(item);
      })
      this.setState({foods:li, loaded: true});
    })
  }

  rednerScreen()
  {
    if (this.state.loaded)
    {
      return (  <FlatList 
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
   _renderItem ({item})  { 
    return (
      <TouchableOpacity>
      <Image style={{height: 200, width: 200,resizeMode: 'contain'}} source={{uri:item.url}}/>
        <Text> {item.title}</Text>
      </TouchableOpacity>
      )
  }
  
  render() {
    return (
      <View style={{flex: 1}}>
        {this.rednerScreen()}
      </View>
    );
  }
}

  
const styles = StyleSheet.create({
  input: {
      borderColor: 'black',
      borderWidth: 1,
      margin: 15,
  },
  mainView: {
    flex: 1,
    backgroundColor: '#f5f6fa',
  }
});

export default Favourite;