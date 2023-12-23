import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import Register from "./Register";
import Login from "../Login/Login";
import useAuth from "../../hooks/useAuth";
import Account from "../Account/Account";

const SignUpPageStack = createStackNavigator();

const SignUpPage = () => {
  const { user } = useAuth();

  if (user) {
    return (
      <SignUpPageStack.Navigator screenOptions={{ headerShown: false }}>
        <SignUpPageStack.Screen name="Account" component={Account} />
      </SignUpPageStack.Navigator>
    );
  } else {
    return (
      <SignUpPageStack.Navigator screenOptions={{ headerShown: false }}>
        <SignUpPageStack.Screen name="Register" component={Register} />
        <SignUpPageStack.Screen name="Login" component={Login} />
      </SignUpPageStack.Navigator>
    );
  }
};

export default SignUpPage;
