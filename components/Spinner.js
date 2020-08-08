import React from 'react';
import {View, ActivityIndicator,StyleSheet} from 'react-native';

const Spinner = ({size}) => {

    return(
        <View style = {styles.mainView}>
            <ActivityIndicator size = {size || 'medium'}/>
        </View>
    )


}

const styles = StyleSheet.create({
    mainView: {
        color: '#2d3436',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
    },
  });


export default Spinner;