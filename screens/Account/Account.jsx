import React from "react";
import { View, Text } from "react-native";
import useAuth from "../../hooks/useAuth";
const Account = () => {
  const {user} = useAuth();
  if (user) {
    return (
      <View>
        <Text>Hello, {user.displayName}</Text>
        {/* other user info */}
      </View>
    );
  }
};

export default Account;
