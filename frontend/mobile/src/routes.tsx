import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';


import Header from './components/Header';
import PropertieMap from './pages/PropertieMap';
import PropertieDetails from './pages/PropertieDetails';
import PropertieData from './pages/createPoster/PropertieData';
import PropertieSelectMap from './pages/createPoster/PropertieSelectMap';



const {Navigator, Screen} = createStackNavigator();
const Routes: React.FC = () =>{
    return (
        <NavigationContainer>
            <Navigator screenOptions={{headerShown:false, cardStyle:{backgroundColor:'#FFF'}}}>
                <Screen 
                name="PropertieMap" 
                component={PropertieMap}
                />
                <Screen 
                name="PropertieDetails" 
                component={PropertieDetails}
                options={{
                    headerShown:true,
                    header:()=> <Header title='Propertie' showX={false} />
                }}
                />
                <Screen 
                name="PropertieData" 
                component={PropertieData}
                options={{
                    headerShown:true,
                    header:()=><Header title='Informe os dados'/>
                }}
                />
                <Screen 
                name="PropertieSelectMap" 
                component={PropertieSelectMap}
                options={{
                    headerShown:true,
                    header:()=><Header title='Selecione a posição do mapa'/>
                }}
                />          
            </Navigator>
        </NavigationContainer>
    );
}

export default Routes;