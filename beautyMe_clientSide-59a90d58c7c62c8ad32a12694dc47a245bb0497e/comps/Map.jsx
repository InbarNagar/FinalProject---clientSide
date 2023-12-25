import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, View, Button, TextInput } from "react-native";
import {
  useForegroundPermissions,
  PermissionStatus,
  getCurrentPositionAsync,
  geocodeAsync,
} from "expo-location";

export default function Map() {
  const [locationPermissionInformaion, requestPermission] =
    useForegroundPermissions();

  async function verifyPermission() {
    if (locationPermissionInformaion.status == PermissionStatus.GRANTED) {
      const permissionResponse = await requestPermission();
      return permissionResponse.granted;
    }
    if (locationPermissionInformaion.status == PermissionStatus.DENIED) {
      Alert.alert("permission denied!");
      return false;
    }
  }
  useEffect(() => {
    const hasPermission = verifyPermission();
    console.log(hasPermission);
    const location = getCurrentPositionAsync();
    console.log(location);

  }, []);
  function locationHandler() {
    const hasPermission = verifyPermission();
    console.log(hasPermission);
    const location = getCurrentPositionAsync();
    console.log(location);
  }
  const [address, setAddress] = useState("");

  async function getCoordsByAddress() {
    const geoCodeLocation = await geocodeAsync(address);
    console.log(geo);
  }

  return (
    <View>
      <Text>מפה</Text>
       <Button title="מיקום" onPress={locationHandler}/> 
      <TextInput
        placeholder="כתובת"
        value={address}
        onChangeText={setAddress}
      />
      <Button onPress={getCoordsByAddress} title="geocode" />
    </View>
  );
}
