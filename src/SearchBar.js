import React, {Component} from 'react';
import { StyleSheet, TextInput, View, Text,Platform} from 'react-native';
import { FontAwesome,Octicons } from '@expo/vector-icons'; 
import {Input,SearchBar} from 'react-native-elements';
import { connect } from 'react-redux';
import { searchChange, resertSearch} from '../actions/actions';

const mapStateToProps = state => {
    return {
        search: state.SearchReducer.search,
    };
};

class Search extends Component {
    state = {focus: false};

    clearSearch()
    {        
        this.props.resertSearch();
    }

    onChangeSearch(text)
    {
        this.props.searchChange(text);
    }

    render(){
        return(
            <View style={styles.searchBar}>
                <FontAwesome style={styles.icon} name="search"/>
                <TextInput style={styles.inputText}
                    placeholder = "Szukaj"
                    onChangeText ={this.onChangeSearch.bind(this)}
                    value = {this.props.search} 
                    //onFocus={()=>{this.setState({focus:true})}}
                   // onBlur={()=>{this.clearSearch()}}
                    />
            </View>
        );        
    };
}


const styles = StyleSheet.create({
    searchBar: {
        backgroundColor: '#E2E2E4',
        height: 50,
        borderRadius: 5,
        marginHorizontal: 7,
        marginTop: 8,
        marginBottom: 5,
        flexDirection: 'row'
    },
    inputText: {
        flex: 1,
        fontSize: 15,
    },
    icon: {
        fontSize: 20,
        alignSelf: 'center',
        marginHorizontal: 10,

    },
    cancel: {
        alignSelf: 'center',
        borderWidth: 1,
        borderColor: 'yellow'

    },
  });


  export default connect(mapStateToProps, {searchChange,resertSearch}) (Search);
