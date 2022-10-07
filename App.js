import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React, { useState, useEffect } from "react";
import { firebase } from "./config";
import { StatusBar } from "react-native";

import Login from "./screens/Login.js";
import Registration from "./screens/Registration";
import Dashboard from "./screens/Dashboard";
// import Header from "./components/Header";
import Highscore from "./screens/Highscore";
import Quiz from "./screens/Quiz";
import Results from "./screens/Results";

const Stack = createStackNavigator();

const App = () => {
  StatusBar.setBarStyle("light-content", true);
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  const onAuthStateChanged = (user) => {
    setUser(user);
    if (initializing) setInitializing(false);
  };

  useEffect(() => {
    const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  if (initializing) return null;

  if (!user) {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Registration" component={Registration} />
      </Stack.Navigator>
    );
  }

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Dashboard" component={Dashboard} />
      <Stack.Screen name="Quiz" component={Quiz} />
      <Stack.Screen name="Highscore" component={Highscore} />
      <Stack.Screen name="Results" component={Results} />
    </Stack.Navigator>
  );
};

export default () => {
  return (
    <NavigationContainer>
      <App />
    </NavigationContainer>
  );
};
