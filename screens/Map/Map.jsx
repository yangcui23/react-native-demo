import { React, useEffect, useState } from "react";
import { FlatList, SafeAreaView, StyleSheet, Text, View } from "react-native";
import useCurrentLocation from "../../hooks/useCurrentLocation";
import MapView, { Marker } from "react-native-maps";
import VenueList from "./VenueList";
import { db, getDocs, collection } from "../../services/config";
import { ActivityIndicator } from "react-native";
// import { calculateDistance } from "../..utils/calculateDistance";
// import venues from "../../constants/venues";
function calculateDistance(coords1, coords2) {
  const toRadian = (angle) => (Math.PI / 180) * angle;
  const distance = (a, b) => (Math.PI / 180) * (b - a);
  const RADIUS_OF_EARTH_IN_MILES = 3958.8;

  const dLatitude = distance(coords1.latitude, coords2.latitude);
  const dLongitude = distance(coords1.longitude, coords2.longitude);

  const a =
    Math.sin(dLatitude / 2) * Math.sin(dLatitude / 2) +
    Math.cos(toRadian(coords1.latitude)) *
      Math.cos(toRadian(coords2.latitude)) *
      Math.sin(dLongitude / 2) *
      Math.sin(dLongitude / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return RADIUS_OF_EARTH_IN_MILES * c;
}

const Map = ({}) => {
  const [location, errorMsg] = useCurrentLocation();
  const [nearbyVenues, setNearbyVenues] = useState([]);

  // useEffect(() => {
  //   if (location) {
  //     const filteredVenues = venues
  //       .map((venue) => ({
  //         ...venue,
  //         distance: calculateDistance(location.coords, {
  //           latitude: venue.latitude,
  //           longitude: venue.longitude,
  //         }),
  //       }))
  //       .filter((venue) => venue.distance <= 50); // Distance in miles

  //     setNearbyVenues(filteredVenues);
  //   }
  // }, [location]);
  const getVenueList = async () => {
    const querySnapshot = await getDocs(collection(db, "venues"));
    const venuesArray = [];
    querySnapshot.forEach((doc) => {
      console.log(doc.data());
      venuesArray.push({
        ...doc.data(),
        id: doc.id,
      });
    });
    setNearbyVenues(venuesArray);
  };
  useEffect(() => {
    getVenueList();
  }, []);
  if (errorMsg) {
    return (
      <View style={styles.container}>
        <Text>Error: {errorMsg}</Text>
      </View>
    );
  }

  if (!location) {
    return (
      <View style={styles.container}>
        <Text>Fetching location...</Text>
      </View>
    );
  }

  const userLocation = {
    latitude: location.coords.latitude,
    longitude: location.coords.longitude,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };
  return (
    <SafeAreaView style={styles.container}>
      <MapView style={{ flex: 1 }} initialRegion={userLocation}>
        <Marker coordinate={userLocation} title="Your Location" />
      </MapView>
      {nearbyVenues.length > 0 ? (
        <FlatList
          data={nearbyVenues}
          renderItem={({ item }) => (
            <VenueList
              title={item.name}
              image={item.image}
              location={item.location}
              keyExtractor={(item) => item.id}
            />
          )}
        />
      ) : (
        <ActivityIndicator />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  // map: {
  //   width: Dimensions.get("window").width,
  //   height: Dimensions.get("window").height / 2,
  // },
});
export default Map;
