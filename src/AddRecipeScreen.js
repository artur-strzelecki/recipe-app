import React, {Component} from 'react';
import { StyleSheet, Text, View, Button,TextInput,TouchableOpacity,ScrollView, Image, Platform, CheckBox } from 'react-native';
import {Input} from 'react-native-elements';
import firebase from 'firebase';
import { Ionicons } from '@expo/vector-icons'; 
import {AddTitle,AddIngredients,AddContent,AddReset} from '../actions/actions';
import {connect} from 'react-redux';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';

const mapStateToProps = state => {
  return {
      title: state.AddRecipeReducer.title,
      ingredients: state.AddRecipeReducer.ingredients,
      content: state.AddRecipeReducer.content,
  };
};


class AddRecipe extends Component {
  state = { error_title: '', 
            error_ingredients: '', 
            error_content: '',
            error_photo: '', 
            photo: '', };

  componentDidMount() {
    this.getPermissionAsync();
    this.props.AddReset();
  }

  getPermissionAsync = async () => {
    const { status } = await Permissions.getAsync(Permissions.CAMERA_ROLL);
    if (status !== 'granted') {
      const { statusNew } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    }
  };

  addPhoto = async () => {
    const { status } = await Permissions.getAsync(Permissions.CAMERA_ROLL);
    if (status !== 'granted') 
    {
      alert("Potrzebujemy dostępu do zdjęć");
    } else 
    {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.cancelled) {
        this.setState({ photo: result.uri });
      }
    }
  };

  reloadPhoto()
  {
    const {photo} = this.state;
    if (photo === '')
    {
      return <Ionicons name="ios-add" size={60} color="black" />
    }
    return <Image source={{uri: photo}} style={{height: 160, width: 160}} />
  }

  onChangeTitle(text)
  {
    const {error_title} = this.state;
    this.setState({error_title: ''});
    this.props.AddTitle(text);
  }

  onChangeIngredients(text)
  {
    const {error_ingredients} = this.state;
    this.setState({error_ingredients: ''});
    this.props.AddIngredients(text);
  }

  onChangeContent(text)
  {
    const {error_content} = this.state;
    this.setState({error_content: ''});
    this.props.AddContent(text);
  }

  Add()
  { 
    const{title,ingredients,content} = this.props;
    const{error_title,error_ingredients,error_content,photo,error_photo} = this.state;

    if (title==='')
    {
      this.setState({error_title: 'Nie uzupełniono!'});
    }
    if (ingredients==='')
    {
      this.setState({error_ingredients: 'Nie uzupełniono!'});
    }
    if (content==='')
    {
      this.setState({error_content: 'Nie uzupełniono!'});
    }
    if (photo === '')
    {
      this.setState({error_photo: 'Nie dodano zdjęcia!'});
    }

    if ((error_title === '') && (error_ingredients ==='') && (error_content === '') && (error_photo==='')) 
    {
      this.addDataFire(title,ingredients,content,photo);
      this.props.AddReset();
      this.setState({photo: ''});
    }
  }

  addDataFire = async (title,ingredients,content,photo) =>
  {
    // catch key push
    let myRef = firebase.database().ref('/foods').push();
    let key = myRef.key;
    const veryf = 0;
    const contentT = {contentType:'image/jpg'};
      
    // add to storage 
    const response = await fetch(photo);
    const blob = await response.blob();
    var ref = firebase.storage().ref().child(key);

    await ref.put(blob,contentT)
    .then (snapshot => {
       return snapshot.ref.getDownloadURL(); 
    }) 
    .then (downloadUrl => {
      let newData={
        title: title,
        ingredients: ingredients,
        content : content,
        veryf: veryf, 
        url: downloadUrl,
        }
    
        myRef.set(newData);
    })
    .catch(error => {
      alert("Nie udało się dodać przepisu. Spróbuj ponowanie poźniej");
    })

    return null; 
  }

  render () {
  return (
      <ScrollView style={styles.mainView} showsHorizontalScrollIndicator={false} showsVerticalScrollIndicator={false}>
        <Text style = {styles.addText}>Nazwa</Text>
        <View style={styles.inputView}>
          <TextInput style = {styles.TextInput}
            value = {this.props.title}
            onChangeText = {this.onChangeTitle.bind(this)}
          />
          <Text style={styles.error}>{this.state.error_title}</Text>
        </View>
        <Text style = {styles.addText}>Zadjęcie</Text>  
        <TouchableOpacity style={styles.touch} onPress={this.addPhoto} >
          {this.reloadPhoto()}
        </TouchableOpacity>
        <Text style = {styles.addText}>Kategoria</Text>
        <Text style = {styles.addText}>Składniki</Text>  
        <View style={styles.sklView}>
          <TextInput style = {styles.sklInput}
            value = {this.props.ingredients}
            onChangeText = {this.onChangeIngredients.bind(this)}
          />
          <Text style={styles.error}>{this.state.error_ingredients}</Text>
        </View>  
        <Text style = {styles.addText}>Przygotowanie</Text>  
        <View style={styles.sklView}>
          <TextInput style = {styles.sklInput}
            value = {this.props.content}
            onChangeText = {this.onChangeContent.bind(this)}
          />
          <Text style={styles.error}>{this.state.error_content}</Text>
        </View>
        <TouchableOpacity style={styles.add} onPress={this.Add.bind(this)}>
                <Text style={styles.addT} >DODAJ</Text>
        </TouchableOpacity>      
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
    mainView: { 
      backgroundColor:'#f5f6fa',
      flex: 1,
      paddingTop: 10,
      paddingLeft: 15,
      paddingRight: 15,
    },
    inputView: {
      marginBottom: 20,
      height: 40,
      borderRadius: 20,
      backgroundColor: '#81ecec',
  },
  addText: {
    paddingBottom: 10,
    fontSize: 17,
    color: '#485460',
    
  },
  TextInput: {
      marginLeft: 20,
      height: 40,
      color: '#636e72',
  },
  touch: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 160,
    width: 160,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#485460',
    marginBottom: 20,
    },
    sklView: {
      marginBottom: 20,
      height: 40,
      borderRadius: 20,
      backgroundColor: '#81ecec',
  },
  sklInput: {
    marginLeft: 20,
    height: 40,
    color: '#636e72',
},
error: {
  color: 'red',
  fontSize: 14,
},
add: {
  padding: 15,
  borderRadius: 10,
  backgroundColor: '#FF6347',
  alignItems: 'center'
},
addT: {
  fontSize: 17,
  fontWeight: 'bold',
  color: 'white',
},

  });
  
  export default connect(mapStateToProps, {AddTitle,AddIngredients,AddContent,AddReset}) (AddRecipe);
