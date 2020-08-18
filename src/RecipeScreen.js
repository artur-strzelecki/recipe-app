import React, {Component} from 'react';
import { StyleSheet, Text, View,Dimensions, Image } from 'react-native';
import HeaderImageScrollView, { TriggeringView } from 'react-native-image-header-scroll-view';
import * as Animatable  from 'react-native-animatable';
import Spinner from '../components/Spinner';
import {Montserrat_300Light,Montserrat_500Medium } from '@expo-google-fonts/montserrat';
import { MaterialIcons } from '@expo/vector-icons'; 
import * as Font from 'expo-font';
import firebase from 'firebase';
import {AddFav, DelFav} from '../actions/actions';
import {connect} from 'react-redux';

const mapStateToProps = state => {
    return {
        changeFav: state.FavReducer.changeFav,
    };
};

let customFonts = {
    Montserrat_300Light,Montserrat_500Medium
};
  
class RecipeScreen extends Component {
    constructor(props) {
        super(props);
        this.titleRef = React.createRef();
        this.state={fontsLoaded: false, fav: false, loaded: false, mainKey: ''};
      }

    _loadFontsAsync = async () => 
    {
        await Font.loadAsync(customFonts);
        this.setState({ fontsLoaded: true });
    }  

    componentDidMount()
    {
        this._loadFontsAsync();    
        this.checkFav();    
    }    

    checkFav = async () =>
    {
        const item = this.props.route.params.item;
        let user = firebase.auth().currentUser.uid;
        firebase.database().ref().child(`/favourite/${user}`).orderByChild('id').equalTo(item.key).on('value', (snapshot) =>{   
            let fav, key;           
            snapshot.forEach((snap) => {
                fav = snap.val().id;
                key = snap.key;
            })

            if (item.key === fav)
            {
               this.setState({fav: true, mainKey: key});
            }
            this.setState({loaded: true});
        })
    }

    AddFav()
    {
        const item = this.props.route.params.item;
        let user = firebase.auth().currentUser.uid;
        if (!this.state.fav)
        {
            let myRef = firebase.database().ref(`/favourite/${user}`).push();
            const data = {
                id: item.key,
            }
            myRef.set(data);
            this.props.AddFav();
        }
        else // delete fav
        {
            const {mainKey} = this.state;

            let myRef = firebase.database().ref(`/favourite/${user}/${mainKey}`);

            myRef.remove()
            .then(() => this.setState({fav: false}));

            this.props.DelFav();
        }

        
    }

    renderIcon()
    {
        if (!this.state.fav)
        {
            return <MaterialIcons name="favorite-border" onPress={() => this.AddFav()} size={27} color='black'/>
        }
        else // if favourite
        {
            return <MaterialIcons name="favorite" onPress={() => this.AddFav()} size={27} color="#485460" />
        }
    }

    render()
    {
        const item = this.props.route.params.item;

        if ((!this.state.fontsLoaded) || (!this.state.loaded))
        {
            return <Spinner size='large' />
        }
        return (
            <HeaderImageScrollView
            maxHeight={220}
            minHeight={80}
            renderForeground={() => (
                <View style={styles.titleView}>
                    <Text style={styles.titleText}>{item.title}</Text>
                </View>)}
    
            renderFixedForeground={() => (
                <Animatable.View style={styles.animatedTitle} ref={this.titleRef}>
                    <Text style={styles.titleText}>{item.title}</Text>
                </Animatable.View>)}  
    
            renderHeader={() => (<Image source={{uri: item.url}} style={{ height: 220, width: Dimensions.get('window').width }} />)}
        >
            <TriggeringView style={styles.ScrollView}
                onBeginHidden={() => this.titleRef.current.fadeInUp(200)}
                onDisplay={() => this.titleRef.current.fadeOut(100)}>
    
                <View style={styles.timeView}>
                    <Text style={styles.headerText}> Czas przygotowania(min): {item.content} </Text>
                    {this.renderIcon()}
                </View>
                <View style={styles.headerView}>
                    <Text style={styles.headerText}> Składniki </Text>
                </View>
                <View style={styles.contentView}>
                    <Text style={styles.contentText}>{item.ingredients}</Text>
                </View>
                <View style={styles.headerView}>
                    <Text style={styles.headerText}> Przygotowanie </Text>
                </View>
                <View style={styles.contentView}>
                    <Text style={styles.contentText}>{item.content}</Text>
                </View>
    
            </TriggeringView>
        </HeaderImageScrollView>  
        );
    }  
}

const styles = StyleSheet.create({
    titleView: {
        flex: 1,
        alignSelf: 'stretch',
        justifyContent: 'center',
        alignItems: 'center'
    },
    animatedTitle: {
        height: 80,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 16,
        opacity: 0,
    },
    titleText: {
        color: 'white',
        fontSize: 30,
        backgroundColor: 'transparent',
        fontFamily: 'Montserrat_300Light',
    },
    ScrollView: {
        paddingTop: 5,
    },
    headerText: {
        paddingBottom: 10,
        fontSize: 18,
        fontFamily: 'Montserrat_500Medium',
    },
    contentText: {
        fontSize: 18,
        fontFamily: 'Montserrat_300Light',
    },
    headerView: {
        paddingHorizontal: 5,
        borderBottomWidth:1, 
        borderColor: '#cccccc',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    contentView: {
        paddingTop: 3,
        paddingLeft: 5,
        paddingBottom: 15,
    }, 
    timeView: {
        paddingLeft: 5,
        paddingRight: 10,
        borderBottomWidth:1, 
        borderColor: 'black',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,

    },     
  });

  export default connect(mapStateToProps, {AddFav, DelFav}) (RecipeScreen);


