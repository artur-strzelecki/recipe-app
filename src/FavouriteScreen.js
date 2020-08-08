import React,{Component} from 'react';
import { StyleSheet, Text, View, TextInput,TouchableOpacity,FlatList, Image } from 'react-native';
import firebase from 'firebase';
import Spinner from '../components/Spinner';


class Favourite extends Component {
  constructor(props){
    super(props);
    this.state={ 
    foods:[],
    imageUrl: null,
    loading: 1,
    }}

  
    componentDidMount () {
      this.downloadData();
   }

   downloadData = async () =>
   {
       firebase.database().ref('/foods').on('value', (snapshot) =>{
          var li = [];
          snapshot.forEach((snap) => {
          var item = snap.val();
          item.key = snap.key;
          item.url = '';
          li.push(item);
      })
      this.setState({foods:li, loading: 2});
      if (this.state.foods != [] && this.state.loading === 2)
      {
       this.state.foods.forEach(async (item) => {
          var item;
          var imageRef = firebase.storage().ref(item.key);
          await imageRef.getDownloadURL().then((url) => {
            this.setState({ imageUrl: url })
          })
          item.url = this.state.imageUrl;
          this.setState({loading: 3});    
        })
      }
    })
  }

  rednerScreen()
  {
    if (this.state.loading !== 3)
    {
      return <Spinner size = 'large'/>;  
    }
    return (<FlatList 
        data = {this.state.foods}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        numColumns={2}
        renderItem = {({item})=> this._renderItem({item})}
        keyExtractor = {(item) => item.key}
      />
    )
  }
   _renderItem ({item})  { 
     console.log(item.url);
    return (
      <TouchableOpacity>
        <Image 
          style = {{width:180,height:140,borderRadius:15}}
          source = {{uri: "https://firebasestorage.googleapis.com/v0/b/recipe-app-121b3.appspot.com/o/-MEEAu6QlfEbWXuw9Qfq?alt=media&token=e4f24d7f-b9da-42a8-89ef-7e5b136d8e11"}} /> 
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