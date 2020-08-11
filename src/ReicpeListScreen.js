import React,{Component} from 'react';
import { StyleSheet, Text, View,TouchableOpacity,FlatList, Image } from 'react-native';
import firebase from 'firebase';
import Spinner from '../components/Spinner';
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
     // type 1 click on categories; type 2 search bar
      const type = this.props.route.params.type;
      const idCateg = this.props.route.params.id;

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
          <FlatList 
            data = {this.state.foods}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            numColumns={2}
            renderItem = {({item})=> this._renderItem({item})}
            keyExtractor = {(item) => item.key}
          /> 
      )
    }
    return <Spinner size='large' />
  }
   _renderItem ({item})  { 
    return (
      <TouchableOpacity style = {styles.TouchList}>
      <Image style={{height: 140, width: 180, borderRadius: 8,}} source={{uri:item.url}}/>
        <Text> {item.title}</Text>
      </TouchableOpacity>
      )
  }
  
  render() {
    return (
      <View style={styles.mainView}>
        <Search />
        {this.rednerScreen()}
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
  TouchList: {
    marginHorizontal: 5,
    marginBottom: 5,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#D6D9E8',
  }
});

export default connect(mapStateToProps,null) (RecipeList);