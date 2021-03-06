import React, {Component} from 'react';
import { StyleSheet, TextInput, View} from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; 
import { connect } from 'react-redux';
import { searchChange, resertSearch} from '../actions/actions';
import { NavigationContext } from '@react-navigation/native';

const mapStateToProps = state => {
    return {
        search: state.SearchReducer.search,
    };
};

class Search extends Component {
    static contextType = NavigationContext;
    state = {focus: false};

    onEndSearch()
    {
        if (this.props.search !== '')
        {
            const navigation = this.context;
            navigation.navigate('Lista przepisów',{type: 1, id: 0});
        }
    }

    onChangeSearch(text)
    {
        this.props.searchChange(text);
    }
    
    onFocus()
    {
        this.props.resertSearch();
    }

    render(){
        return(
            <View style={styles.searchBar}>
                <FontAwesome style={styles.icon} name="search"/>
                <TextInput style={styles.inputText}
                    placeholder = "Szukaj"
                    onSubmitEditing = {() => this.onEndSearch()}
                    onChangeText ={this.onChangeSearch.bind(this)}
                    value = {this.props.search} 
                    onFocus={()=>{this.onFocus()}}
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
        marginHorizontal: 17,
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
