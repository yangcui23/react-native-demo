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
      <Image source={{ uri: props.image }} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  venueItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  venueName: {
    fontWeight: "bold",
  },
});

export default VenueList;
