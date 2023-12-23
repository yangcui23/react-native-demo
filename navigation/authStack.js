import { createStackNavigator } from "@react-navigation/stack";

import Login from "../screens/Login/Login";
import Register from "../screens/SignUp/Register";
const AuthStack = createStackNavigator();

const AuthStackNavigation = () => {
  return (
    <AuthStack.Navigator screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name="Login" component={Login} />
      <AuthStack.Screen name="SignUp" component={Register} />
    </AuthStack.Navigator>
  );
};
