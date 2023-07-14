/* eslint-disable react-native/no-inline-styles */
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Text, View, StyleSheet } from "react-native";
import MapView from "react-native-maps";
import CurrentLocation from "./currentLocation";
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
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const getMovies = async () => {
    try {
      const response = await hi();
      setData(response);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMovies();
  }, []);

  return (
    <View style={styles.container}>
      {/* {JSON.stringify(data)} */}
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <React.Fragment>
          <MapView
            style={styles.map}
            //specify our coordinates.
            initialRegion={{
              latitude: 40.5008,
              longitude: -74.4474,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          />
          <Text style="font-size: 150px">{<CurrentLocation />}</Text>
        </React.Fragment>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1, //the container will fill the whole screen.
    justifyContent: "flex-end",
    alignItems: "center",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

// Hi
