import React from "react";
import {
  SafeAreaView,
  Text,
  StyleSheet,
  View,
  ImageBackground,
} from "react-native";
import images from "../../constants/images";
const Login = () => {
  return (
    <View>
      <ImageBackground
        source={images.login}
        style={styles.backgroundImage}
        resizeMode="cover"
      />
      <Text>Login</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    width: 350,
    height: 350,
    alignItems: "center",
  },
});

export default Login;
