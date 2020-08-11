import React, {Component} from 'react';
import { StyleSheet, Text,TextInput,TouchableOpacity,ScrollView, Image, Picker } from 'react-native';
import firebase from 'firebase';
import { Ionicons } from '@expo/vector-icons'; 
import {AddTitle,AddIngredients,AddContent,AddReset,AddCategories,AddPhoto} from '../actions/actions';
import {connect} from 'react-redux';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';


const mapStateToProps = state => {
  return {
      title: state.AddRecipeReducer.title,
      ingredients: state.AddRecipeReducer.ingredients,
      content: state.AddRecipeReducer.content,
      categories: state.AddRecipeReducer.categories,
      photo: state.AddRecipeReducer.photo,
  };
};


class AddRecipe extends Component {
  // errors state
  state = { error_title: '', 
            error_ingredients: '', 
            error_content: '',
            error_photo: '', 
          };

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

  changePhoto = async () => {
    const { status } = await Permissions.getAsync(Permissions.CAMERA_ROLL);
    if (status !== 'granted') 
    {
      alert("Potrzebujemy dostępu do zdjęć");
    } else 
    {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        aspect: [4, 3],
        allowsEditing: true,
        quality: 1,
      });
      if (!result.cancelled) {
        this.props.AddPhoto(result.uri);
        this.setState({error_photo: ''});
      }
    }
  };

  reloadPhoto()
  {
    const {photo} = this.props;

    if (photo === '')
    {
      return <Ionicons name="ios-add" size={60} color="black" />
    }
    return <Image source={{uri: photo}} style={{height: 160, width: 160, borderRadius: 5,}} />
  }

  onChangeTitle(text)
  {
    this.setState({error_title: ''});
    this.props.AddTitle(text);
  }

  onChangeIngredients(text)
  {
    this.setState({error_ingredients: ''});
    this.props.AddIngredients(text);
  }

  onChangeContent(text)
  {
    this.setState({error_content: ''});
    this.props.AddContent(text);
  }

  Add()
  { 
    const{title,ingredients,content,categories,photo} = this.props;
    const{error_title,error_ingredients,error_content,error_photo} = this.state; // errors

    if (title === '')
    {
      this.setState({error_title: 'Nie uzupełniono!'});
    }
    if (ingredients === '')
    {
      this.setState({error_ingredients: 'Nie uzupełniono!'});
    }
    if (content === '')
    {
      this.setState({error_content: 'Nie uzupełniono!'});
    }
    if (photo === '')
    {
      this.setState({error_photo: 'Nie dodano zdjęcia!'});
    }

    // categories default 1
    if ((title !== '') && (ingredients !== '') && (content !== '') && (photo !== ''))
    {
      this.addDataFire(title,ingredients,content,photo,categories);
      this.props.AddReset();
    }
  }

  addDataFire = async (title,ingredients,content,photo,categories) =>
  {
    // catch key push
    let myRef = firebase.database().ref('/foods').push();
    let key = myRef.key;
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
        category: categories,
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

        <Text style = {styles.textStyle}>Nazwa</Text>
        <TextInput style = {styles.TextInput}
            value = {this.props.title}
            onChangeText = {this.onChangeTitle.bind(this)}/>                
        <Text style={styles.error}>{this.state.error_title}</Text>

        <Text style = {styles.textStyle}>Zdjęcie</Text>  
        <TouchableOpacity style={styles.photo} onPress={this.changePhoto} >
          {this.reloadPhoto()}
        </TouchableOpacity>
        <Text style={styles.error}>{this.state.error_photo}</Text>

        <Text style = {{fontSize: 17, color: '#485460', }}>Kategoria</Text>
        <Picker
        selectedValue={this.props.categories}
        style={{ height: 50, width: 170, marginBottom: 10, marginLeft: -7, }}
        onValueChange={(itemValue, itemIndex) => this.props.AddCategories(itemValue)}>
        <Picker.Item label="Pizza" value="1" />
        <Picker.Item label="Włoskie" value="2" />
        <Picker.Item label="Burger" value="3" />
        <Picker.Item label="Chińskie" value="4" />
        <Picker.Item label="Sushi" value="5" />
        <Picker.Item label="Amerykańskie" value="6" />
      </Picker>

        <Text style = {styles.textStyle}>Składniki</Text>  
          <TextInput style = {styles.TextInputArea}
            value = {this.props.ingredients}
            multiline = {true}
            numberOfLines = {3}
            onChangeText = {this.onChangeIngredients.bind(this)} />
        <Text style={styles.error}>{this.state.error_ingredients}</Text>

        <Text style = {styles.textStyle}>Przygotowanie</Text>  
          <TextInput style = {styles.TextInputArea}
            value = {this.props.content}
            onChangeText = {this.onChangeContent.bind(this)}
          />
          <Text style={styles.error}>{this.state.error_content}</Text>

        <TouchableOpacity style={styles.submit} onPress={this.Add.bind(this)}>
                <Text style={styles.submitText} >DODAJ</Text>
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
  textStyle: {
    paddingBottom: 10,
    fontSize: 17,
    color: '#485460',   
  },
  TextInput: {
      paddingLeft: 5,
      height: 40,
      fontSize: 15,
      borderRadius: 5,
      backgroundColor: '#81ecec',
  },
  TextInputArea: {
    textAlignVertical: 'top',
    paddingLeft: 5,
    height: 180,
    fontSize: 18,
    borderRadius: 5,
    backgroundColor: '#81ecec',
},
  photo: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 160,
    width: 160,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#485460',
    },
  error: {
    color: 'red',
    fontSize: 14,
    marginBottom: 10,
  },
  submit: {
    padding: 15,
    marginBottom: 30,
    marginTop: 10,
    borderRadius: 10,
    backgroundColor: '#FF6347',
    alignItems: 'center'
  },
  submitText: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
  },

  });
  
  export default connect(mapStateToProps, {AddTitle,AddIngredients,AddContent,AddReset,AddCategories,AddPhoto}) (AddRecipe);
