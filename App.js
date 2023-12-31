import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import React from "react";
import Home from "./screens/Home/Home";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import Map from "./screens/Map/Map";
import Login from "./screens/Login/Login";
import { MaterialIcons } from "@expo/vector-icons";
import Register from "./screens/SignUp/Register";
import SignUpPage from "./screens/SignUp/SignUpPage";
import logo from "./assets/images/up.png";
import MapStackNavitagor from "./navigation/mapStack";
import { StripeProvider } from "@stripe/stripe-react-native";
import { BookingProvider } from "./services/bookingContext";
const Tab = createBottomTabNavigator();

export default function App({ navigation }) {
  return (
    <BookingProvider>
      <StripeProvider publishableKey="pk_test_51OU24BKcfxYg7Jb7byNS6O1QeLExiifWgXrxhM2h8rQSXMl6qYI7xotbo5DsJspkBGuFuTllLj4Ofv9QMqXCAhsA00bz0tGYBE">
        <GestureHandlerRootView style={{ flex: 1 }}>
          <NavigationContainer>
            <Tab.Navigator
              screenOptions={({ navigation }) => ({
                tabBarActiveTintColor: "tomato",
                tabBarInactiveTintColor: "gray",
                headerStyle: {
                  backgroundColor: "#437f97",
                },
                headerLeft: () => (
                  <TouchableOpacity onPress={() => navigation.navigate("Home")}>
                    <Image source={logo} style={styles.logo} />
                  </TouchableOpacity>
                ),
              })}
            >
              <Tab.Screen
                name="Home"
                component={Home}
                options={{
                  title: "",
                  tabBarLabel: "Home",
                  tabBarIcon: ({ color, size }) => (
                    <MaterialIcons name="home" color={color} size={size} />
                  ),
                }}
              />
              <Tab.Screen
                name="MapTab"
                component={MapStackNavitagor}
                options={{
                  title: "",
                  tabBarLabel: "Map",

                  tabBarIcon: ({ color, size }) => (
                    <MaterialIcons name="map" color={color} size={size} />
                  ),
                }}
              />
              <Tab.Screen
                name="Account"
                component={SignUpPage}
                options={{
                  title: "",
                  tabBarLabel: "Account",
                  tabBarIcon: ({ color, size }) => (
                    <MaterialIcons name="book" color={color} size={size} />
                  ),
                }}
              />
            </Tab.Navigator>
          </NavigationContainer>
        </GestureHandlerRootView>
      </StripeProvider>
    </BookingProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: 60,
    height: 60,
    marginLeft: 20,
  },
});
