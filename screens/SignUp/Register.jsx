import React, { useState } from "react";
import {
  SafeAreaView,
  Text,
  StyleSheet,
  ScrollView,
  View,
  Button as RNButton,
  ImageBackground,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useNavigation } from "@react-navigation/native";
import Firebase from "../../services/config";
import { Button, InputField, ErrorMessage } from "../../components/index";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { sendEmailVerification } from "firebase/auth";
import { auth } from "../../services/config";
import images from "../../constants/images.js";

// const auth = Firebase.auth();
const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisibility, setPasswordVisibility] = useState(true);
  const [rightIcon, setRightIcon] = useState("eye");
  const [signupError, setSignupError] = useState("");
  const navigation = useNavigation();

  const handlePasswordVisibility = () => {
    if (rightIcon === "eye") {
      setRightIcon("eye-off");
      setPasswordVisibility(!passwordVisibility);
    } else if (rightIcon === "eye-off") {
      setRightIcon("eye");
      setPasswordVisibility(!passwordVisibility);
    }
  };
  // const onHandleSignup = async () => {
  //   try {
  //     if (email !== "" && password !== "") {
  //       await auth.createUserWithEmailAndPassword(email, password);
  //     }
  //   } catch (error) {
  //     setSignupError(error.message);
  //   }
  // };
  const handleSignup = async () => {
    if (email && password) {
      try {
        await createUserWithEmailAndPassword(auth, email, password);
        await sendEmailVerification();
      } catch (err) {
        console.log(err.message);
      }
    }
  };
  return (
    <View style={styles.container}>
      <StatusBar style="dark-content" />
      <Text style={styles.title}>Create new account</Text>
      <InputField
        inputStyle={{
          fontSize: 14,
        }}
        containerStyle={{
          backgroundColor: "#fff",
          marginBottom: 20,
        }}
        leftIcon="account"
        placeholder="First Name"
        autoCapitalize="none"
        autoCorrect={false}
        textContentType="name"
        value={firstName}
        onChangeText={(text) => setFirstName(text)}
      />
      <InputField
        inputStyle={{
          fontSize: 14,
        }}
        containerStyle={{
          backgroundColor: "#fff",
          marginBottom: 20,
        }}
        leftIcon="account"
        placeholder="Last Name"
        autoCapitalize="none"
        autoCorrect={false}
        textContentType="name"
        value={lastName}
        onChangeText={(text) => setLastName(text)}
      />
      <InputField
        inputStyle={{
          fontSize: 14,
        }}
        containerStyle={{
          backgroundColor: "#fff",
          marginBottom: 20,
        }}
        leftIcon="email"
        placeholder="Enter email"
        autoCapitalize="none"
        keyboardType="email-address"
        textContentType="emailAddress"
        autoFocus={false}
        value={email}
        onChangeText={(text) => setEmail(text)}
      />
      <InputField
        inputStyle={{
          fontSize: 14,
        }}
        containerStyle={{
          backgroundColor: "#fff",
          marginBottom: 20,
        }}
        leftIcon="lock"
        placeholder="Enter password"
        autoCapitalize="none"
        autoCorrect={false}
        secureTextEntry={passwordVisibility}
        textContentType="password"
        rightIcon={rightIcon}
        value={password}
        onChangeText={(text) => setPassword(text)}
        handlePasswordVisibility={handlePasswordVisibility}
      />

      {/* {signupError ? <ErrorMessage error={signupError} visible={true} /> : null} */}
      <Button
        onPress={handleSignup}
        backgroundColor="#f57c00"
        title="Signup"
        tileColor="#fff"
        titleSize={20}
        containerStyle={{
          marginBottom: 24,
        }}
      />
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
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    height: 20,
    width: 140,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  textContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 18,
  },
});

export default Register;
