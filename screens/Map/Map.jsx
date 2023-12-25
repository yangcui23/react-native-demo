import { React, useEffect, useState, useRef } from "react";
import {
  FlatList,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  ScrollView,
} from "react-native";
import useCurrentLocation from "../../hooks/useCurrentLocation";
import MapView, { Marker, Callout } from "react-native-maps";
import VenueList from "./VenueList";
import { db, getDocs, collection } from "../../services/config";
import { ActivityIndicator } from "react-native";
import SlidingUpPanel from "rn-sliding-up-panel";
import { MaterialIcons } from "@expo/vector-icons";

import { Modalize } from "react-native-modalize";
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
const screenHeight = Dimensions.get("window").height;
const panelHeights = {
  small: screenHeight * 0.3,
  medium: screenHeight * 0.5,
  large: screenHeight,
};
const Map = ({}) => {
  const [location, errorMsg] = useCurrentLocation();
  const [nearbyVenues, setNearbyVenues] = useState([]);
  const [panelHeight, setPanelHeight] = useState(panelHeights.small);
  const [selectedVenue, setSelectedVenue] = useState(null);
  const modalizeRef = useRef(null);
  const screenHeight = Dimensions.get("window").height;
  console.log(screenHeight);
  const snappingPoints = [
    screenHeight * 0.3,
    screenHeight * 0.5,
    screenHeight * 0.8,
  ];
  const minimumHeight = screenHeight * 0.3;
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
  const handleMarkerPress = (venue) => {
    setSelectedVenue(venue);
    modalizeRef.current?.open();
  };
  const renderContent = () => (
    <View style={styles.modalContent}>
      <Text style={styles.venueName}>{selectedVenue?.name}</Text>
      {/* Render more venue details here */}
    </View>
  );
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
  console.log("User Location:", userLocation);
  return (
    <SafeAreaView style={styles.container}>
      <MapView style={{ flex: 1 }} initialRegion={userLocation}>
        <Marker coordinate={userLocation} title="Your Location" />
        {nearbyVenues.map((venue) => (
          <Marker
            key={venue.id}
            coordinate={{
              latitude: venue.latitude,
              longitude: venue.longitude,
            }}
            title={venue.name}
            onPress={() => handleMarkerPress(venue)}
          ></Marker>
        ))}
      </MapView>
      <Modalize ref={modalizeRef} snapPoint={300} modalHeight={600}>
        {renderContent()}
      </Modalize>
      {nearbyVenues.length > 0 ? (
        <SlidingUpPanel
          draggableRange={{ top: 680, bottom: 200 }}
          minimumVelocityThreshold={0.1}
          minimumDistanceThreshold={0.24}
          snappingPoints={snappingPoints}
          visible={true}
          backdropOpacity={0}
          friction={2}
          style={styles.container}
        >
          {(dragHandler) => (
            <View style={styles.container}>
              <View style={styles.dragHandler} {...dragHandler}>
                <MaterialIcons name="drag-handle" color="grey" />
              </View>
              <ScrollView style={styles.panelContainer}>
                <Text>Nearby Venues</Text>
                {nearbyVenues.map((item) => (
                  <VenueList
                    key={item.id}
                    title={item.name}
                    image={item.image}
                    location={item.location}
                  />
                ))}
              </ScrollView>
            </View>
          )}
        </SlidingUpPanel>
      ) : (
        <ActivityIndicator />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // zIndex: 1,
    flex: 1,
  },
  imageContainer: {
    marginBottom: 200,
  },
  slidingPanel: {
    backgroundColor: "white",
  },

  panelContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: "white",
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    marginBottom: 100,
  },
  panelHandle: {
    alignItems: "center",
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "#EDEDED",
  },
  dragHandler: {
    alignSelf: "stretch",
    height: 30,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ccc",
  },
  calloutView: {
    borderRadius: 10,
    padding: 10,
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "grey",
  },
  calloutTitle: {
    fontWeight: "bold",
  },
  venueInfo: {
    position: "absolute",
    bottom: 10,
    left: 10,
    right: 10,
    backgroundColor: "white",
    padding: 10,
    borderRadius: 10,
    elevation: 3, // for Android shadow
    shadowColor: "#000", // for iOS shadow
    shadowOpacity: 0.3,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
});
export default Map;
