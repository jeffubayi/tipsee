import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./app/home";
import DetailsScreen from "./app/detail";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="home">
        <Stack.Screen
          options={{
            headerShadowVisible: false,
            title: "Tipsee",
            headerLargeTitle: true,
            headerTransparent: true,
            headerBlurEffect: "regular",
            headerStyle: {
              backgroundColor: "#fff",
            },
            headerSearchBarOptions: {
              placeholder: "Search"
            },
          }}
          name="home"
          component={HomeScreen}
        />
        <Stack.Screen
          options={{ headerShadowVisible: false, headerBackTitle: "Back" }}
          name="detail"
          component={DetailsScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
