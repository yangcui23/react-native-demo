import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, SafeAreaView, View, Image } from "react-native";
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
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: "tomato",
          tabBarInactiveTintColor: "gray",
          headerLeft: () => <Image source={logo} style={styles.logo} />,
          headerStyle: {
            backgroundColor: "#437f97",
          },
        }}
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
          name="Map"
          component={Map}
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
