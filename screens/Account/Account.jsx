import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Button,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useFonts } from "expo-font";
import { FontAwesome } from "@expo/vector-icons";
import useAuth from "../../hooks/useAuth";
import { useNavigation } from "@react-navigation/native";
// import { db, collection, where, query, getDocs } from "../../services/config";
import { useBookings } from "../../services/bookingContext";
const Account = () => {
  const navigation = useNavigation();
  const [orders, setOrders] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [pastEvents, setPastEvents] = useState([]);
  const { bookings, fetchBookings } = useBookings();
  const [fontsLoaded] = useFonts({
    Anton: require("../../assets/fonts/Anton-Regular.ttf"),
    Chakra: require("../../assets/fonts/ChakraPetch-Medium.ttf"),
  });
  if (!fontsLoaded) {
    return null;
  }
  const navigateToMap = () => {
    navigation.navigate("MapTab");
  };

  const { user } = useAuth();
  useEffect(() => {
    if (user) {
      fetchBookings(); // Fetch bookings using the context
    }
  }, [user, fetchBookings]);
  useEffect(() => {
    const now = new Date();
    const upcoming = bookings.filter(
      (order) => new Date(order.eventDate) > now
    );
    const past = bookings.filter((order) => new Date(order.eventDate) <= now);

    setUpcomingEvents(upcoming);
    setPastEvents(past);
  }, [bookings]);
  if (user) {
    return (
      <ScrollView style={style.container}>
        <View style={style.userContainer}>
          <FontAwesome name="user-circle" size={24} color="grey" />
          <Text style={style.text}>Hello, {user.displayName}</Text>
        </View>
        <View style={style.orderContainer}>
          <Text style={style.text}>Upcoming Events:</Text>
          {upcomingEvents.length > 0 ? (
            upcomingEvents.map((order) => (
              <View key={order.id} style={style.orderItem}>
                <Text>{order.venueName}</Text>
                <Text>{new Date(order.eventDate).toLocaleDateString()}</Text>
                <Image source={{ uri: order.image }} style={style.orderImage} />
                <Text>${order.price}</Text>
              </View>
            ))
          ) : (
            <View style={style.orderItem}>
              <Text style={style.noEventText}>No upcoming events</Text>
              <Button title="Book a Venue" onPress={navigateToMap} />
            </View>
          )}
          <Text style={style.text}>Past Events:</Text>
          {pastEvents.length > 0 ? (
            pastEvents.map((order) => (
              <TouchableOpacity
                key={order.id}
                style={style.orderItem}
                onPress={() =>
                  navigation.navigate("ReviewScreen", { order: order })
                }
              >
                <Text>{order.venueName}</Text>
                <Text>{order.location}</Text>
                <Text>{new Date(order.eventDate).toLocaleDateString()}</Text>
                <Image source={{ uri: order.image }} style={style.orderImage} />
                <Text>${order.price}</Text>
              </TouchableOpacity>
            ))
          ) : (
            <View style={style.orderItem}>
              <Text style={style.noEventText}>No past events</Text>
            </View>
          )}
        </View>
      </ScrollView>
    );
  }
};
const style = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    fontFamily: "Chakra",
    fontSize: 20,
    marginLeft: 10,
  },
  orderContainer: {
    marginTop: 80,
  },
  userContainer: {
    flexDirection: "row",
    alignContent: "center",
    padding: 10,
  },
  orderImage: {
    width: 150,
    height: 100,
    resizeMode: "contain",
  },
  orderItem: {
    padding: 10,
  },
  noEventText: {
    textAlign: "center",
  },
});
export default Account;
