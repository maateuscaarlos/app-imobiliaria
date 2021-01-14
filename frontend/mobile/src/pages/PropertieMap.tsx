import React, {useState} from 'react';
import { StyleSheet, View, Text, Dimensions } from 'react-native';
import MapView, {Marker,  Callout,PROVIDER_GOOGLE}  from 'react-native-maps';
import {useNavigation, useFocusEffect} from '@react-navigation/native'
import { RectButton } from 'react-native-gesture-handler';
import {Feather} from '@expo/vector-icons';

import api from '../service/api'

import mapMarker from '../images/map-marker.png';

interface Propertie{
    id:number;
    latitude:number;
    longitude:number;
    about:string;
}
const PropertieMap: React.FC = () =>{
    const navigation = useNavigation();
    
    const [properties, setProperties] =  useState<Propertie[]>([]);
    
    useFocusEffect(()=>{
        api.get('properties').then(response =>{
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
                        <Text style={styles.calloutText}>{propertie.about}</Text>
                      </View>
                    </Callout>
                  </Marker>
                ))}
              </MapView>
              <View style={styles.footer}>
                <Text style={styles.footerText}> {properties.length} Imóvel(s) </Text>
                <RectButton
                  style={styles.createPropertieButton}
                  onPress={handlerNavigateToCreatePropertie}
                >
                  <Feather name="plus" size={20} color="#fff" />
                </RectButton>
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
        left:24,
        right:24,
        bottom:32,

        backgroundColor:'#fff',
        borderRadius:28,
        height:46,
        paddingLeft:24,

        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',

        elevation:3,
    },
    footerText:{
        color:'#8fa7b3',
        fontFamily:'Nunito_700Bold'
    },
    createPropertieButton:{
        width:56,
        height:56,
        backgroundColor:'#15c3d6',
        borderRadius:28,

        justifyContent:'center',
        alignItems:'center'
    }
});
export default PropertieMap;