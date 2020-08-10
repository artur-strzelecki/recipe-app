import React,{Component} from 'react';
import { StyleSheet, Text, View, TextInput,TouchableOpacity,FlatList, Image } from 'react-native';
import firebase from 'firebase';
import Spinner from '../components/Spinner';
import { resertSearch} from '../actions/actions';
import { connect } from 'react-redux';
import Search from './SearchBar';

const mapStateToProps = state => {
    return {
        search: state.SearchReducer.search,
    };
};

class RecipeList extends Component {   
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
      return (
        <View>
          <Search />
          <FlatList 
            data = {this.state.foods}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            numColumns={2}
            renderItem = {({item})=> this._renderItem({item})}
            keyExtractor = {(item) => item.key}
          /> 
        </View> 
      )
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

export default connect(mapStateToProps,{resertSearch}) (RecipeList);