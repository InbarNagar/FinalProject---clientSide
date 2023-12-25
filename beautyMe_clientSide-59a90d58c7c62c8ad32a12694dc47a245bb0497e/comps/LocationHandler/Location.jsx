import { Alert, View, Text, Button } from 'react-native'
import React, { useState, useEffect } from 'react'
 import { PermissionStatus, getCurrentPositionAsync, useForegroundPermissions } from 'expo-location'

const Google_Api = "AIzaSyD4GfLv8lfVuLz_fEWCroPomInvTQlKez4";

function Location() {
    const [pickedLocation, setPickedLocation] = useState({  lat: 12.66576,
        lng: 22.1344});
    const [locationAddress, setLocationAddress] = useState();
    const [locationPermissionInformation, requestPermission] = useForegroundPermissions();

    useEffect(() => {
        getLocationHandler();
    }, []);

    async function verifyPermissions() {
        if (locationPermissionInformation.status === PermissionStatus.UNDETERMINED) {
            const permissionResponse = await requestPermission();
            return permissionResponse.granted;
        }
        if (locationPermissionInformation.status === PermissionStatus.DENIED) {
            Alert.alert('need permission for location!');
            return false;
        }
        return true;
    };
    async function getLocationHandler() {
        const hasPermission = await verifyPermissions();
        if (!hasPermission) {
            return;
        }

        const location = await getCurrentPositionAsync();
        setPickedLocation({
            lat: location.coords.latitude,
            lng: location.coords.longitude
        })

        setLocationAddress(getAdress(pickedLocation.lat, pickedLocation.lng, Google_Api));
        console.log(locationAddress);
    }

    async function getAdress(lat, lng, api) {
        const url = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}2&key=${api}';
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error('could not fetch location');
        }
        const data = await response.json();
        const address = data.results[0].address_components;
        return address;

    }



    function pickMapHandler() { }
    return (
        <View>
            <View>
                <Button title='GPS location' onPress={getLocationHandler}
                />
                <Text></Text>
            </View>
        </View>
    )
}
export default LocationPicker;