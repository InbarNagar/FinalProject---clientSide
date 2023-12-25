import {Alert ,View, Text, Button } from 'react-native'
import { useState,useEffect} from 'react'
import * as Location from 'expo-location'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import MapView, { Callout, Circle, Marker } from 'react-native-maps'



const Google_Api="AIzaSyAgA8mGnBu_JITCAShQvinA3jmFrvM1pck ";

 function LocationPicker() {
const[pickedLocation,setPickedLocation] = useState({lat:'',lng:''});
const [location,setLocation]=useState();
// const [locationPermissionInformation, requestPermission]= useForegroundPermissions();
const [pin, setPin] = useState({
    latitude: 32.34245547297243,
    longitude: 34.911549397360595
  })

  const [region, setRegion] = useState({
    latitude: '',
    longitude: '',
    latitudeDelta: 0.0125,
    longitudeDelta: 0.0121,
  })

useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        alert('Go to setting and turn on access location for using this page')
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location)
      setRegion({
        latitude: Number(location.coords.latitude),
        longitude: Number(location.coords.longitude),
        latitudeDelta: 0.0125,
        longitudeDelta: 0.0121,
      });
      setPin({
        latitude: location&&Number(location.coords.latitude),
        longitude: location&&Number(location.coords.longitude)
      })
    })
      ();
  }, []);

//     async function verifyPermissions(){
// if(locationPermissionInformation.status===PermissionStatus.GRANTED){
//     const permissionResponse = await requestPermission();
//     return permissionResponse.granted;
// }
// if(locationPermissionInformation.status===PermissionStatus.DENIED){
//     Alert.alert('need permission for location!');
//     return false;
// }
// return true;
//  };
async function getLocationHandler(){
    
        const hasPermission =await verifyPermissions();
        console.log(hasPermission);
        if(!hasPermission){
            return;
        }
        
        let location =await getCurrentPositionAsync();
        console.log(location);
        setPickedLocation({
            lat:location.coords.latitude,
            lng:location.coords.longitude,
        });
        console.log([pickedLocation.pickedLocation.lng]);
        
        // const address= await getAdress(pickedLocation.lat,pickedLocation.lng,Google_Api);
        // setLocationAddress(address);
        // console.log(locationAddress);
}

// async function getAdress(lat,lng,api){ 
//     const url=`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}2&key=${api}`;
//     const response = await fetch(url);
    
//     if(!response.ok){
//     throw new Error('could not fetch location');    
//     }
//     const data = await response.json();
//     const address=data.results[0].address_components;
//     return address;

// }
  return (
    <View>
<View>
    <Button title='GPS location' onPress={getLocationHandler}
/>
<GooglePlacesAutocomplete
        placeholder='Search...'
        autoFocus={true}
        fetchDetails={true}
        // listViewDisplayed='auto'    // true/false/undefined
        GooglePlacesSearchQuery={{
          // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
          rankby: 'distance',
          types: 'gym',//'food',
        }}
        onPress={(data, details = null) => {
          // 'details' is provided when fetchDetails = true
          console.log(data, details);
          setPin({
            latitude: details.geometry.location.lat,
            longitude: details.geometry.location.lng,
          })
        }}
        query={{
          key: Google_Api,
          language: 'en',
          components: "country:il",
          //	types:"establishment",
          radius: 10000,
          location: `${Number(region.latitude)}, ${Number(region.longitude)}`
        }}
        styles={{ container: { flex: 1, position: 'absolute', top: '6.4%', width: '100%', zIndex: 1 } }}
       // currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list
      //currentLocationLabel="Current location"
     //nearbyPlacesAPI="GooglePlacesSearch"

      />
      <View style={{position:'relative'}}>
     {location ||1==1&& <>
     <MapView
        loadingEnabled={true}
        style={{ flex: 12,top:'1%'}}
        initialRegion={{
          latitude: Number(location.coords.latitude),//32.166313,
          longitude: Number(location.coords.longitude),//34.843311,
          latitudeDelta: 0.0125,
          longitudeDelta: 0.0121,
        }}

        // *** if turn on the location will return every secend.
        // onUserLocationChange={(e)=>{console.log("onUserLocationChange",e.nativeEvent)
        // setRegion({  latitude: e.nativeEvent.coordinate.latitude,
        //   longitude: e.nativeEvent.coordinate.longitude,
        //   latitudeDelta:  0.0125,
        //   longitudeDelta: 0.0121})
        // }}

        showsUserLocation={true}
        showsMyLocationButton={true}
        //nearbyPlacesAPI="GooglePlacesSearch"
        //onRegionChangeComplete={(region)=>{setRegion(region)}}
        provider='google'  //--> By delete this line, the maps provider will be Apple
      >


        <Marker
          coordinate={region}
          title="I'm Here !" />
        <Marker
          coordinate={pin}
          pinColor='blue'
          draggable={true}
          onDragStart={(e) => { console.log("Drag start:", Number(e.nativeEvent.coordinate)); }}
          onDragEnd={(e) => {
            setPin({
              latitude: Number(e.nativeEvent.coordinate.latitude),
              longitude: Number(e.nativeEvent.coordinate.longitude)
            })
          }}>

          <Callout>
            <Text>I Want to be Here!</Text>
          </Callout>

        </Marker>
        <Circle
          center={region}
           radius={1}
        />
      

      </MapView>
</>
      }
</View>
<Text></Text>
</View>
    </View>
  )
  }
  export default LocationPicker;