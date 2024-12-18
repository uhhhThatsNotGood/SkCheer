import React from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TextInput,
  Button,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const App = () => {
  return (
    <SafeAreaView className="flex-1">
      <LinearGradient
        colors={["#0b2034", "#040508", "#460327"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="flex-1"
      />
      <ScrollView className="items-center justify-center">
        <View className=" items-center border-2 border-blue-950 rounded-lg w-36 h-24">
          <Button onPress={() => null} title="1:1" />
        </View>
        <View className=" items-center border-2 border-blue-950 rounded-lg w-36 h-24">
          <Button onPress={() => null} title="1:20" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default App;
