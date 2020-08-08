import React,{Component} from 'react';
import { StyleSheet, Text, View, TextInput,TouchableOpacity,FlatList, Image } from 'react-native';
import firebase from 'firebase';


class Favourite extends Component {
  constructor(props){
    super(props);
    this.state={ 
    foods:[],
    } }
  
    componentDidMount(){
      firebase.database().ref('/foods').on('value', (snapshot) =>{
        var li = []
        snapshot.forEach((snap)=>{
          var item = snap.val();
          item.key = snap.key;
  
          li.push(item);
      })
     this.setState({foods:li})
    })
   }
  
  _renderItem({item}) {
    const uri = item.photo.replace('file://', 'file:/');
    console.log(uri);
    return (
      <TouchableOpacity>
        <Image 
          style = {{width:180,height:140,borderRadius:15}}
          source = {{uri: item.photo.replace('file://', '')}} /> 
        <Text> {item.title}</Text>
      </TouchableOpacity>
      )
  }
  
  render() {
    return (
      <View style={{flex: 1}}>
        <FlatList 
          data = {this.state.foods}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          numColumns={2}
          renderItem = {({item})=> this._renderItem({item})}
          keyExtractor = {(item) => item.key}
        />
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