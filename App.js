import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";

import * as Location from "expo-location";
import {
  Button,
  Dimensions,
  TextInput,
  StyleSheet,
  Text,
  View,
} from "react-native";
import MapView, { Callout, Circle, Marker } from "react-native-maps";

// It can be any of these: arrival-estimates, agencies, routes, segments, stops, vehicles
async function hi() {
  const url =
    "https://transloc-api-1-2.p.rapidapi.com/vehicles.json?agencies=1323";
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "2db6175e9bmsh7aab84ab1852e64p1da0cdjsnd0476b706254",
      "X-RapidAPI-Host": "transloc-api-1-2.p.rapidapi.com",
    },
  };
  return fetch(url, options)
    .then((response) => response.json())
    .catch((error) => {
      console.error(error);
    });
}

export default function App() {
  const [location, setLocation] = useState(null);
  const [address, setAddress] = useState();

  useEffect(() => {
    const getPermissions = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Please grant location permissions");
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);
      console.log("Location:");
      console.log(currentLocation);

      // let location = await Location.getCurrentPositionAsync({});
      let watchID = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 500,
          distanceInterval: 0,
        },
        (position) => {
          setLocation(position);
        }
      );
    };
    getPermissions();
  }, []);

  const geocode = async () => {
    const geocodedLocation = await Location.geocodeAsync(address);
    console.log("Geocoded Address:");
    console.log(geocodedLocation);
  };

  const getCurrentLocation = async () => {
    const getCurrentLocationdAddress = await Location.getCurrentLocationAsync({
      longitude: location.coords.longitude,
      latitude: location.coords.latitude,
    });

    console.log("Reverse Geocoded:");
    console.log(getCurrentLocationdAddress);
  };

  // const [isLoading, setLoading] = useState(true);
  // const [data, setData] = useState([]);

  // const getMovies = async () => {
  //   try {
  //     const response = await hi();
  //     setData(response);
  //   } catch (error) {
  //     console.error(error);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   getMovies();
  // }, []);

  return (
    <View style={{ marginTop: 50, flex: 1 }}>
      {location && (
        <>
          <Text style={styles.paragraph}>
            {"lat:" + location.coords.latitude}
          </Text>
          <Text style={styles.paragraph}>
            {"long:" + location.coords.longitude}
          </Text>
          <Text style={styles.paragraph}>
            {"acurracy:" + location.coords.accuracy}
          </Text>
          <Button title="Address Info" onPress={geocode} />
          <TextInput
            placeholder="Enter Address"
            value={address}
            onChangeText={setAddress}
          />
          <Button
            title="Click to Get Current Location"
            onPress={getCurrentLocation}
          />
          <StatusBar style="auto" />
        </>
      )}

      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 40.5008,
          longitude: -74.4474,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        // region={{
        //   latitude: location.coords.latitude,
        //   longitude: location.coords.longitude,
        //   latitudeDelta: 0.015,
        //   longitudeDelta: 0.0121,
        // }}
        provider="google"
        showsUserLocation={true}
        followsUserLocation={true}

        // scrollEnabled={false}
      >
        {/* {location && (
          <Marker
            coordinate={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }}
          ></Marker>
        )} */}
      </MapView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});

// return (
//   // <View style={styles.container}>
//   //   {/* {JSON.stringify(data)} */}
//   //   {isLoading ? (
//   //     <ActivityIndicator />
//   //   ) : (
//   //     <React.Fragment>
//   <MapView
//     style={styles.map}
//     //specify our coordinates.
//     initialRegion={{
//       latitude: 40.5008,
//       longitude: -74.4474,
//       latitudeDelta: 0.0922,
//       longitudeDelta: 0.0421,
//     }}
//   />
//   //       <Text style="font-size: 150px">{}</Text>
//   //       <CurrentLocation />
//   //     </React.Fragment>
//   //   )}
//   // </View>
// );
