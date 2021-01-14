import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import MapView, {MapEvent, Marker} from 'react-native-maps'
import { RectButton } from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';

import mapMarker from '../../images/map-marker.png';

const PropertieSelectMap: React.FC = () =>{
    const navigation = useNavigation();

    const [position, setPosition]= useState({latitude:0, longitude:0});

    function handlerPropertieSelectMap(event:MapEvent){
        setPosition(event.nativeEvent.coordinate);
    };

    function  handleNextStep(){
        navigation.navigate('PropertieData',{position});
    }
    return( 
    <View style={styles.container}>
        <MapView
            initialRegion={{
                latitude:-6.6444749,
                longitude:-38.697702,
                latitudeDelta:0.008,
                longitudeDelta:0.008,
            }}
            style={styles.mapStyle}
            onPress={handlerPropertieSelectMap}
        >
            {position.latitude !== 0 && (
                <Marker
                icon={mapMarker}
                coordinate = {
                    {
                        latitude:position.latitude,
                        longitude:position.longitude,
                    }}
                    />
            )}
            
        </MapView>
        {position.latitude != 0 && (
        <RectButton style={styles.nextButton} onPress={handleNextStep}>
            <Text style={styles.nextButtonText}>Próximo</Text>
        </RectButton>
        )}
    </View>
    );
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        position:'relative'
    },
    mapStyle:{
        width:Dimensions.get('window').width,
        height:Dimensions.get('window').height,
    },
    nextButton:{
        backgroundColor:'#15c3d6',
        borderRadius:20,
        justifyContent:'center',
        alignItems:'center',
        height:56,

        position:'absolute',
        left:24,
        right:24,
        bottom:40,
    },
    nextButtonText:{
        fontFamily:'Nunito_800ExtraBold',
        fontSize:16,
        color:'#FFF'
    }

})

export default PropertieSelectMap;