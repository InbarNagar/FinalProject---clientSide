import { useState,useEffect } from "react";
import { View } from "react-native";
import MapView, {PROVIDER_GOOGLE,Marker } from 'react-native-maps'
import * as Location from 'expo-location';
import { UserContext } from "./UserDietails";

export default function SearchTest(props){
  const { navigation, route } = props
  if(route.params.results!==null){
  const locations=route.params.results?route.params.results:"";
  console.log({locations});
  const [apiKey,setApiKey]=useState();
  const [location, setLocation] = useState();
  const [region, setRegion] = useState({
    latitude:32.34245547297243,
    longitude: 34.911549397360595,
    latitudeDelta: 0.0125,
    longitudeDelta: 0.0121,
  })
  const [pin, setPin] = useState({
    latitude: 32.34245547297243,
    longitude: 34.911549397360595
  })
    const markers = [
      {num:1,latitude: 32.35245547297250,longitude: 34.911549397360595},
      {num:2,latitude: 32.36245547297260,longitude: 34.911549397360595},
      {num:3,latitude: 32.372455472972470,longitude: 34.911549397360595},
      {num:4,latitude: 32.38245547297280,longitude: 34.911549397360595}
    ];
  useEffect(() => {
    ( async () => {
      console.log(region);
      let { status } = Location.requestForegroundPermissionsAsync();
      console.log(status);
      if (status === 'granted') {
        console.log('Permission to access location was denied');
        alert('Go to setting and turn on access location for using this page')
        return;
      }
      let temp_location = Location.getCurrentPositionAsync();
      // let apiKey="AIzaSyAgA8mGnBu_JITCAShQvinA3jmFrvM1pck" ;
      // setApiKey(apiKey)
      console.log(location)
      setLocation(temp_location)
      console.log("location: " +location);
      // setPin({
      //   latitude:Number(location.coords.latitude),
      //   longitude:Number(location.coords.longitude)
      // })
      // setRegion({
      //   latitude: Number(location.coords.latitude),
      //   longitude: Number(location.coords.longitude),
      //   latitudeDelta: 0.013,
      //   longitudeDelta: 0.03,
      // });
      console.log(region);
      console.log(pins);
      // setPin({
      //   latitude: location&&Number(location.coords.latitude),
      //   longitude: location&&Number(location.coords.longitude)
      // })
    })
      ();
  }, []);

return(
<View>
<MapView
provider={PROVIDER_GOOGLE}
style={{height:'100%'}}
initialRegion={{
  latitude:region.latitude,
  longitude:region.longitude,
  latitudeDelta:0.013,
  longitudeDelta:0.03
}}>
{markers.map((m) => {
              return (
                <Marker coordinate={{latitude:m.latitude,longitude:m.longitude}}
                title={`${m.num}`}></Marker>
              );
            })}
</MapView>
</View>

);
};}