import React, {useState} from 'react';
import { StyleSheet, View, Text, Dimensions, FlatList } from 'react-native';
import MapView, {Marker,  Callout,PROVIDER_GOOGLE}  from 'react-native-maps';
import {useNavigation, useFocusEffect} from '@react-navigation/native'
import { RectButton } from 'react-native-gesture-handler';
import {Feather} from '@expo/vector-icons';

import api from '../service/api'

import mapMarker from '../images/map-marker.png';

interface Propertie{
    id:number;
    name:string;
    latitude:number;
    longitude:number;
    about:string;
}
const PropertieMap: React.FC = () =>{
    const navigation = useNavigation();
    
    const [properties, setProperties] =  useState<Propertie[]>([]);
    
    useFocusEffect(()=>{
        api.get('Propertie').then(response =>{
            setProperties(response.data);
        });
    });

    function handlerNavigateToPropertieDetails(id:number){
        navigation.navigate('PropertieDetails', {id});
}
    function handlerNavigateToCreatePropertie(){
        navigation.navigate('PropertieSelectMap')
    }
    return (
        <View style={styles.container}>
            <MapView
                provider = {PROVIDER_GOOGLE}
                style={styles.map}
                initialRegion={
                   {
                    latitude:-6.6444749,
                    longitude:-38.697702,
                    latitudeDelta:0.008,
                    longitudeDelta:0.008,
                   }
                }
                >
                {properties.map((propertie) => (
                  <Marker
                    key={propertie.id}
                    icon={mapMarker}
                    coordinate={{
                      latitude: propertie.latitude,
                      longitude: propertie.longitude,
                    }}
                    calloutAnchor={{
                      x: 2.7,
                      y: 0.8,
                    }}
                  >
                    <Callout tooltip={true} onPress={()=>{handlerNavigateToPropertieDetails(propertie.id)}}>
                      <View style={styles.calloutContainer}>
                        <Text style={styles.calloutText}>{propertie.name}</Text>
                      </View>
                    </Callout>
                  </Marker>
                ))}
              </MapView>
              <View style={styles.footer}>
              <View style={styles.containerList}>
              <Text style={styles.footerTextTitle}>Imóveis cadastrados:</Text>
              {
              properties.map(propertie=>
                <Text style={styles.footerText}>{propertie.name}</Text>
                  )
              }
              </View>
              <View style={styles.containerCadastrar}>
                <Text style={styles.textCadastrar}>Cadastrar Imóvel</Text>
                <RectButton
                  style={styles.createPropertieButton}
                  onPress={handlerNavigateToCreatePropertie}
                >
                  <Feather name="plus" size={20} color="#fff" />
                </RectButton>
              </View>
            </View>
          </View>
          );
        }
const styles = StyleSheet.create({
    container:{
        flex:1
    },
    map:{
        width:Dimensions.get('window').width,
        height:Dimensions.get('window').height
    },
    calloutContainer:{
        width:168,
        height:46,
        paddingHorizontal:16,
        backgroundColor:'rgba(255,255,255,0.8)',
        borderRadius:16,
        justifyContent:'center',
    },
    calloutText:{
        color:'#8889a5',
        fontSize:14,
        fontFamily:'Nunito_700Bold',
    },
    footer:{
        position:'absolute',
        left:0,
        right:0,
        bottom:32,
        width:'100%',

        backgroundColor:'#fff',
        height:'50%',
        paddingLeft:24,
        opacity:0.8,
    },
    containerList:{
      alignItems:'center',
      height:'50%',
      top:5
    },

    footerTextTitle:{ 
      fontSize:20,
      marginBottom:10,
      fontFamily:'Nunito_700Bold',
      lineHeight:24,
      
    },
    footerText:{   
      fontSize:20,
      fontFamily:'Nunito_600SemiBold',
      lineHeight:24,
    },
    containerCadastrar:{
      width:'100%',
    },
    
    textCadastrar:{
      width:'60%',
      fontFamily:'Nunito_700Bold',
      fontSize:24,
      color:'#000000',
      marginTop:80,
    },
    createPropertieButton:{
      height: '25%',
      width:'20%',
      borderRadius:20,
      backgroundColor:'#15c3d6',
      alignItems:'center',
      marginLeft:'70%',
      marginTop:'3%',
    }
});
export default PropertieMap;