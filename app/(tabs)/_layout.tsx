import { StyleSheet, Text, View } from "react-native";
import { Tabs, Redirect } from "expo-router";
import "../../global.css";

const TabsLayout = () => {
  return (
    <>
      <Tabs>
        <Tabs.Screen name="home" options={{ headerShown: false }} />
      </Tabs>
    </>
  );
};

export default TabsLayout;
