import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  SafeAreaView,
  Image,
  ImageBackground,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { React, useState, useEffect } from "react";
import images from "../../constants/images.js";
import colors from "../../constants/colors.js";
import { useFonts } from "expo-font";
export default function Home({ navigation }) {
  const [fontsLoaded] = useFonts({
    Anton: require("../../assets/fonts/Anton-Regular.ttf"),
    Chakra: require("../../assets/fonts/ChakraPetch-Medium.ttf"),
  });
  if (!fontsLoaded) {
    return null;
  }
  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground
        source={images.city}
        resizeMode="cover"
        style={styles.backgroundImage}
      >
        <Image source={images.logo} style={styles.logo} />
        <Pressable
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? "gray" : "#a2d2ff",
              padding: 10,
              borderRadius: 5,
            },
            styles.button,
          ]}
          onPress={() => navigation.navigate("MapTab")}
        >
          <Text style={styles.text}> Rooftop Venues Near You</Text>
        </Pressable>
      </ImageBackground>
    </SafeAreaView>
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
    width: 200,
    height: 200,
    marginTop: 160,
  },

  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
    alignItems: "center",
  },
  text: {
    fontFamily: "Anton",
    fontSize: 20,
  },
});
