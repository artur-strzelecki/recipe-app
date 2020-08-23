import React, {Component} from 'react';
import { StyleSheet, Text, View,Dimensions, Image } from 'react-native';
import HeaderImageScrollView, { TriggeringView } from 'react-native-image-header-scroll-view';
import * as Animatable  from 'react-native-animatable';
import Spinner from '../components/Spinner';
import {Montserrat_300Light,Montserrat_500Medium } from '@expo-google-fonts/montserrat';
import { MaterialIcons,Entypo,Fontisto,MaterialCommunityIcons } from '@expo/vector-icons'; 
import * as Font from 'expo-font';
import firebase from 'firebase';
import {AddFav, DelFav,ResetFav} from '../actions/actions';
import {connect} from 'react-redux';
import { ScrollView } from 'react-native-gesture-handler';

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
        this.state={fontsLoaded: false, fav: false, loaded: false, mainKey: null };
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
            let check,mainKey;
            check = snapshot.exists();

            if (check)
            {
                snapshot.forEach((snapItem) => {
                    mainKey = snapItem.key;
                    })

                this.setState({fav: true, loaded: true, mainKey: mainKey});
            } else 
            {
                this.setState({loaded: true});
            }           
        })
    }

    ThenAddFav(key)
    {
        this.props.AddFav();  
        this.setState({fav: true, mainKey: key});
    }

    ThenDelFav()
    {
        this.props.DelFav();  
        this.setState({fav: false, mainKey: null});  
    }

    AddFav()
    {
        const item = this.props.route.params.item;
        let user = firebase.auth().currentUser.uid;
        if (!this.state.fav)
        {
            let myRef = firebase.database().ref(`/favourite/${user}`).push();
            let key = myRef.key;
            const data = {
                id: item.key,
            }
            myRef.set(data).then(() => this.ThenAddFav(key));

        }
        else // delete fav
        {
            const {mainKey} = this.state;
            let myRef = firebase.database().ref(`/favourite/${user}/${mainKey}`);

            myRef.remove()
            .then(() => this.ThenDelFav());
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
            ScrollViewComponent={ScrollView}
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
            <ScrollView style={styles.ScrollView}
                  onScroll={event => { 
                    console.log(event.nativeEvent.contentOffset.y + 'on');
                  }}
                onScrollBeginDrag={event => { 
                    console.log(event.nativeEvent.contentOffset.y + 'begin');
                  }}
                onScrollEndDrag={event => { 
                    console.log(event.nativeEvent.contentOffset.y + 'end');
                  }} >

    
                <View style={styles.timeView}>
                    <Entypo name="time-slot" size={22} style={{marginTop: 2,}} color="black" />
                    <Text style={styles.headerText}> Czas: {item.content} min</Text>
                    {this.renderIcon()}
                </View>
                <View style={styles.headerView}>
                    <Fontisto name="prescription" size={22} color="black" />
                    <Text style={styles.headerText}> Składniki </Text>
                </View>
                <View style={styles.contentView}>
                    <Text style={styles.contentText}>{item.ingredients}</Text>
                </View>
                <View style={styles.headerView}>
                    <MaterialCommunityIcons name="silverware-fork-knife" size={22} color="black" />
                    <Text style={styles.headerText}> Przygotowanie </Text>
                </View>
                <View style={styles.contentView}>
                    <Text style={styles.contentText}>{item.content}</Text>
                </View>
    
            </ScrollView>
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
        paddingTop: 10,
        borderBottomWidth:1, 
        borderTopWidth: 1,
        borderColor: '#cccccc',
        flexDirection: 'row',
        justifyContent: 'center',

    },
    contentView: {
        paddingTop: 3,
        paddingLeft: 5,
        paddingBottom: 15,
    }, 
    timeView: {
        paddingLeft: 5,
        paddingRight: 10,
      //  borderBottomWidth:1, 
      // borderColor: '#cccccc',
        flexDirection: 'row',
      //  justifyContent: 'space-between',
      justifyContent: 'center'


    },      
    test: {
        borderRadius: 30,
        backgroundColor: 'red',
        position: 'absolute',


    },  
  });

  export default connect(mapStateToProps, {AddFav, DelFav,ResetFav}) (RecipeScreen);


