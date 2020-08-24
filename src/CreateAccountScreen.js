import React, {Component} from 'react';
import { StyleSheet, TextInput, View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import Spinner from '../components/Spinner';
import { connect } from 'react-redux';
import { createEmailChanged, createPasswordChanged, CreateUser } from '../actions/actions';

const mapStateToProps = state => {
    return {
        email: state.LoginReducer.email,
        password: state.LoginReducer.password,
        error: state.LoginReducer.error,
        loading: state.LoginReducer.loading,
    };
};

class createAccount extends Component  {

    onChangeEmail(text)
    {
        this.props.createEmailChanged(text);
    }

    onChangePassword(text)
    {
        this.props.createPasswordChanged(text);
    }

    onPressButton()
    {    
        const {email, password} = this.props;   
        this.props.CreateUser({email,password});    
    }

    createAcc()
    {
        const {loading} = this.props;

        if (loading)
        {
            return <Spinner size = 'large'/>
        }
        else
        {
            return(
                <TouchableOpacity onPress={this.onPressButton.bind(this)}>
                <Text style = {styles.signInText}>Stwórz konto</Text>
                </TouchableOpacity>
            )
        }
    }

    render() {
    return (
        <ScrollView style = {styles.mainView}>
            <MaterialCommunityIcons style = {styles.icon} name="chef-hat" size = {120} color = {'#636e72'} />
            <View style = {styles.authView}>
                <Text style = {styles.authText}>Email</Text>
                <TextInput style = {styles.authTextInput}
                autoCapitalize = 'none'
                autoCorrect= {false}
                value = {this.props.email}
                onChangeText = {this.onChangeEmail.bind(this)}
                placeholder = 'user@gmail.com'
                />
            </View>
            <View style = {styles.authView}>
                <Text style = {styles.authText}>Hasło</Text>
                <TextInput style = {styles.authTextInput}
                secureTextEntry = {true}
                value = {this.props.password}
                onChangeText = {this.onChangePassword.bind(this)}
                />
            </View>
            <Text style={{textAlign: 'center'}}> {this.props.error}</Text>
            <View style = {styles.buttons}>
                {this.createAcc()}
            </View>    
        </ScrollView>
    );
    }
}

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        backgroundColor: '#f5f6fa',
    },
    authView: {
        flexDirection: 'row',
        height: 50,
        alignItems: 'center',
        padding: 10,
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 10,
        borderRadius: 20,
        backgroundColor: '#81ecec',
    },
    authText: {
        flex: 0.4,
        color: '#636e72',
        marginLeft: 10,
    },
    authTextInput: {
        flex: 2,
        height: 30,
        marginBottom: 2,
        color: '#636e72',
    },
    icon: {
        paddingTop: 50,
        paddingBottom: 20,
        alignSelf: 'center',
    },
    signInText: {
        marginTop: 10,
        fontSize:18,   
        color: '#2d3436'
    },
    createAccountText: {
        marginTop: 15,
        fontSize:11,   
    },
    buttons: {
        alignItems: 'center',
    },    

  });

export default connect(mapStateToProps, {createEmailChanged, createPasswordChanged, CreateUser}) (createAccount);