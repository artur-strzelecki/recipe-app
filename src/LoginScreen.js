import React, {Component} from 'react';
import { StyleSheet, TextInput, View, Text, TouchableOpacity,ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import Spinner from '../components/Spinner';
import { connect } from 'react-redux';
import { emailChanged, passwordChanged, loginUser, resetVar,createResetVar } from '../actions/actions';


const mapStateToProps = state => {
    return {
        email: state.AuthReducer.email,
        password: state.AuthReducer.password,
        error: state.AuthReducer.error,
        loading: state.AuthReducer.loading,
    };
};


class LoginScreen extends Component  {

    onChangeEmail(text)
    {
        this.props.emailChanged(text);
    }

    onChangePassword(text)
    {
        this.props.passwordChanged(text);
    }

    onPressButton()
    {    
        const {email, password} = this.props;
        this.props.loginUser({email,password});    
    }

    onCreateAccount()
    {
        this.props.resetVar(); // reset state
        this.props.createResetVar(); // reset state (areate account)
        this.props.navigation.navigate('Stwórz konto');
    }
    createAccount()
    {
        const {loading} = this.props;

        if (loading)
        {
            return null; 
        }
        else
        {
            return(
                <TouchableOpacity onPress={this.onCreateAccount.bind(this)}>
                    <Text style = {styles.createAccountText}>Nie posiadasz konta? Załóż je!</Text>
                </TouchableOpacity>
            )
        }        
    }

    signInButton()
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
                <Text style = {styles.signInText}>Zaloguj się</Text>
                </TouchableOpacity>
            )
        }
    }

    render() {
    return (
        <ScrollView style = {styles.mainView} >
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
            <Text> {this.props.error}</Text>
            <View style = {styles.buttons}>
                {this.signInButton()}
                {this.createAccount()}
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
        paddingBottom: 30,
        alignSelf: 'center'
    },
    signInText: {
        marginTop: 10,
        fontSize:24,   
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

export default connect(mapStateToProps, {emailChanged, passwordChanged, loginUser, resetVar,createResetVar}) (LoginScreen);
