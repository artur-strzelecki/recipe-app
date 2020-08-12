import React, {Component, useRef} from 'react';
import { StyleSheet, Text,TouchableOpacity, View,Dimensions, Image } from 'react-native';
import HeaderImageScrollView, { TriggeringView } from 'react-native-image-header-scroll-view';
import { NavigationContext } from '@react-navigation/native';
import * as Animatable  from 'react-native-animatable';
import Spinner from '../components/Spinner';
import {
    useFonts,
    Montserrat_300Light,
  } from '@expo-google-fonts/montserrat';


const RecipeScreen = ({route}) => {
    let [fontsLoaded] = useFonts({
        Montserrat_300Light ,
      });
    const item = route.params.item;
    const titleRef = useRef(null);
    if (!fontsLoaded)
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
            <Animatable.View style={styles.animatedTitle} ref={titleRef}>
                <Text style={styles.titleText}>{item.title}</Text>
            </Animatable.View>)}  

        renderHeader={() => (<Image source={{uri: item.url}} style={{ height: 220, width: Dimensions.get('window').width }} />)}
      >
        <TriggeringView style={{height: 1000}}
            onBeginHidden={() => titleRef.current.fadeInUp(200)}
            onDisplay={() => titleRef.current.fadeOut(100)}
        >
            <Text>Scroll Me!</Text>
        </TriggeringView>
      </HeaderImageScrollView>
    );
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
    }
  });

export default RecipeScreen;

