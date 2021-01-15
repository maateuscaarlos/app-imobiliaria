import React,{createContext,useState,useEffect,useContext} from 'react';
import api from '../service/api';
import  AsyncStorage from '@react-native-async-storage/async-storage';

interface ResponseData{
  user:UserProprietor;
  token:string
}
interface UserProprietor{
  id:number;
  name:string;
  telephone:string;
  email:string;
  password:string;
}
interface ContextAuth{
  login(email:string,password:string):Promise<void>;
  user:UserProprietor |null;
  signed:boolean;
}
const AuthContext = createContext<ContextAuth>({} as ContextAuth);

const AuthenticateContext: React.FC = ({children}) => {
  const [user,setUser] =useState<UserProprietor | null>(null);

  useEffect(()=>{
    async function loadStorage(){
      const userStorage = await AsyncStorage.getItem('Auth:User');
      const tokenStorage = await AsyncStorage.getItem('Auth:Token');
      
      if(userStorage &&tokenStorage ){
        api.defaults.headers.common.Authorization = `Bearer ${tokenStorage}`;
        setUser(JSON.parse(userStorage));
      }
    }
    loadStorage();
    
  });

  async function login(email:string, password:string){
    console.log(email,password);
    const userAuth = {
      email,password
    }
    const response = await api.post('auth', userAuth);
    const {user, token} = response.data as ResponseData;
    api.defaults.headers.common.Authorization = `Bearer ${token}`;
    await AsyncStorage.setItem('Auth:User',JSON.stringify(user));
    await AsyncStorage.setItem('Auth:Token',token);
  }
  function logout(){
    AsyncStorage.clear().then(()=>{
      setUser(null);
    });
  }
  return (
      <AuthContext.Provider
        value={{signed: !!user, login,user}}
      >
        {children}
      </AuthContext.Provider>
    );
}

export default AuthenticateContext;

export function useAuth(){
  const context = useContext(AuthContext);
  return context;
}