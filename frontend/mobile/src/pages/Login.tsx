import React,{useState} from 'react';
import { View,StyleSheet, Text, TextInput } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import {useAuth} from '../context/AuthenticateContext';

const Login: React.FC = () => {
    const navigation = useNavigation();
    const {login} = useAuth();
  
    const [email, setEmail]= useState('');
    const [password, setPassword]= useState('');
    
    function handlerLogin(email:string, password:string){
      login(email,password);
    }
    return (
      <View style={styles.container}>
          <View style={styles.containerMeio}>
            <Text style={styles.label}>Email</Text>
            <TextInput
                style={styles.input}
                value={email}
                placeholder="email"
                onChangeText={setEmail}
            />
            <Text style={styles.label}>Password</Text>
            <TextInput
                style={styles.input}
                value={password}
                secureTextEntry={true}
                placeholder="password"
                onChangeText={setPassword}
            />
            <RectButton style={styles.sigInButton} onPress={()=>{handlerLogin(email, password)}}>
            <Text style={styles.sigInText}>Login</Text>
            </RectButton>
        </View>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container:{

    },
    containerMeio:{
    
    },
    label:{

    },
    input:{

    },
    sigInButton:{

    },
    sigInText:{

    }
  })
  export default Login;