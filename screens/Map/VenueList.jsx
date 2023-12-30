import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  FlatList,
  Image,
} from "react-native";
import { db, getDocs, collection } from "../../services/config";
const VenueList = (props) => {
  const [venues, setVenues] = useState([]);

  return (
    <View style={styles.container}>
      <Text style={styles.venueName}> {props.title}</Text>
      <Text>{props.location}</Text>
      <Image source={{ uri: props.image }} style={styles.venueImage} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    marginBottom: 20,
  },
  venueItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  venueName: {
    fontWeight: "bold",
  },
  venueImage: {
    width: 280,
    height: 180,
  },
});

export default VenueList;
