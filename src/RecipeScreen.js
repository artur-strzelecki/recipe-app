import React, {Component, useRef} from 'react';
import { StyleSheet, Text, View,Dimensions, Image } from 'react-native';
import HeaderImageScrollView, { TriggeringView } from 'react-native-image-header-scroll-view';
import * as Animatable  from 'react-native-animatable';
import Spinner from '../components/Spinner';
import {useFonts,Montserrat_300Light,Montserrat_500Medium } from '@expo-google-fonts/montserrat';
import { MaterialIcons } from '@expo/vector-icons'; 


const RecipeScreen = ({route}) => {
    let [fontsLoaded] = useFonts({
        Montserrat_300Light , Montserrat_500Medium
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
        <TriggeringView style={styles.ScrollView}
            onBeginHidden={() => titleRef.current.fadeInUp(200)}
            onDisplay={() => titleRef.current.fadeOut(100)}>

            <View style={styles.headerView}>
                <Text style={styles.headerText}> Składniki </Text>
                <MaterialIcons name="favorite-border" size={27} color="black" />
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
        justifyContent: 'space-between'
    },
    contentView: {
        paddingTop: 3,
        paddingLeft: 5,
        paddingBottom: 15,
    },   
  });

export default RecipeScreen;

