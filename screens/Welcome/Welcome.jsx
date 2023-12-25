import React from "react";
import {
  Text,
  View,
  ImageBackground,
  StyleSheet,
  Button as RNButton,
  Pressable,
} from "react-native";
import { Button, InputField, ErrorMessage } from "../../components/index";
import images from "../../constants/images.js";
import { useNavigation } from "@react-navigation/native";
const Welcome = () => {
  const navigation = useNavigation();

  const onPressFunction = () => {
    navigation.navigate("Register");
  };
  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Let's Get Started</Text>
      <ImageBackground
        source={images.welcome}
        resizeMode="cover"
        style={styles.backgroundImage}
      />
      <Pressable onPress={onPressFunction} style={styles.signUpPressable}>
        <Text style={styles.buttonText}>Sign Up Here</Text>
      </Pressable>
      <View style={styles.textContainer}>
        <Text style={styles.text}>Already have an account?</Text>
        <RNButton
          onPress={() => navigation.navigate("Login")}
          title="Login here"
          color="green"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#c8b6ff",
    alignItems: "center",
  },
  welcomeText: {
    fontSize: 30,
    marginTop: 50,
  },
  textContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 18,
  },
  backgroundImage: {
    width: 400,
    height: 400,
    alignItems: "center",
  },
  signUpPressable: {
    backgroundColor: "#fe7f2d",
    padding: 10,
    margin: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#123524",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 20,
  },
});
export default Welcome;
