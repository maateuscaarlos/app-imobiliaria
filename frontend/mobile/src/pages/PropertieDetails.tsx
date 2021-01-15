import React, {useEffect, useState} from 'react';
import {
    Image,
    ScrollView,
    StyleSheet,
    Text,
    View,
    Dimensions,
    Linking
  } from "react-native";
  import MapView, { Marker } from "react-native-maps";
  import {TouchableOpacity } from "react-native-gesture-handler";
  import {useRoute} from '@react-navigation/native'

import mapMarker from '../images/map-marker.png'
import api from '../service/api';
import AppLoading from 'expo-app-loading';


interface ParamsId{
  id:number;
}
interface imageUrl{
  id:number;
  url:string;
}
interface Propertie {
    id:number;
    name:string;
    about:string;
    instructions:string;
    latitude:number;
    longitude:number;
    images: Array<imageUrl>;
}
const PropertiesDetails: React.FC = () =>{
const route = useRoute();
const paramsId =  route.params as ParamsId;

const [propertie, setPropertie] = useState<Propertie>();

useEffect(()=>{
  api.get(`Propertie/${paramsId.id}`).then(response =>{
    setPropertie(response.data);
  })
},[paramsId.id]);
if(!propertie){
  return <AppLoading/>
}
function handlerOpenGoogleMapsRoute(){
  Linking.openURL(`https://www.google.com/maps/dir/?api1&destination=${propertie?.latitude, propertie?.longitude}`)
}

    return(
        <ScrollView style={styles.container}>
           <View style={styles.imagesContainer}>
                <ScrollView horizontal pagingEnabled>
                    {propertie.images.map(image=>{
                      return(
                        <Image key={image.id} 
                        source={{uri:image.url}}
                        style={styles.image}
                        />
                      )
                    })}
                </ScrollView>
           </View>
           <Text style={styles.title}>{propertie.name}</Text>
          <Text style={styles.description}>{propertie.about}</Text>
           <View style={styles.mapContainer}>
                <View style={styles.mapContainer}>
               <MapView
                initialRegion={
                   {
                    latitude:propertie.latitude,
                    longitude:propertie.longitude,
                    latitudeDelta:0.008,
                    longitudeDelta:0.008,
                   }
                }
                zoomEnabled={false}
                pitchEnabled={false}
                scrollEnabled={false}
                rotateEnabled={false}
                style={styles.map}
            >
                <Marker
                  icon={mapMarker}
                  coordinate = {{
                    latitude:propertie.latitude,
                    longitude:propertie.longitude,
                      }}
                >
                </Marker>

            </MapView>
            <TouchableOpacity onPress={handlerOpenGoogleMapsRoute} style={styles.routesContainer}>
                <Text style={styles.routesText}>Ver rotas no google maps</Text>
            </TouchableOpacity>
           </View>
    </View>
           <View style={styles.separator}/>
           <Text style={styles.title}>Instruções para comprar ou alugar</Text>
            <Text style={styles.description}>{propertie.instructions}</Text>
    </ScrollView>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
      },
      imagesContainer: {
        height: 240,
      },
      image: {
        width: Dimensions.get("screen").width,
        height: 240,
        resizeMode: "cover",
      },
      title: {
        color: "#4d6f80",
        fontSize: 30,
        fontFamily: "Nunito_700Bold",
        textAlign:'left',
        left:20
        
      },
      description: {
        fontFamily: "Nunito_600SemiBold",
        color: "#5c8599",
        lineHeight: 24,
        marginTop: 16,
        textAlign:'left',
        left:20
      },
      mapContainer: {
        borderRadius: 20,
        overflow: "hidden",
        marginTop: 40,
      },
      map: {
        width: "100%",
        height: 150,
      },
      routesContainer: {
        padding: 16,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#b3dae2",
      },
      routesText: {
        fontFamily: "Nunito_700Bold",
        color: "#0089a5",
      },
      separator: {
        height: 0.8,
        width: "100%",
        backgroundColor: "#d3e2e6",
        marginVertical: 30,
      } 
    });

export default PropertiesDetails;