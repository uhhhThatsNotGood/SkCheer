import React, { useState } from "react";
import { SafeAreaView, View, Text, Button } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AuthIn from "../components/AuthIn";
const App = () => {
  const [Seat, setSeat] = useState("");
  const [numSt, setnumSt] = useState("");
  // const saveInfo = async () => {
  //   try {
  //     await AsyncStorage.setItem("Seat", Seat);
  //     await AsyncStorage.setItem("numSt", numSt);
  //     console.log("data written successfully");
  //   } catch (e) {
  //     console.error("hahaFailed", e);
  //   }
  // };
  // const loadInfo = async () => {
  //   try {
  //     const valSeat = await AsyncStorage.getItem("Seat");
  //     const valnumSt = await AsyncStorage.getItem("numSt");
  //     console.log("loadedEZ");
  //   } catch (e) {
  //     console.error("fuck", e);
  //   }
  // };

  return (
    <SafeAreaView className="flex-1">
      <LinearGradient
        colors={["#0d3d6b", "#1a1a1a", "#800852"]}
        locations={[0, 0.6, 1]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        className="flex-1"
      >
        <View className="items-center mt-[35%]">
          <Text className="text-7xl color-white font-bold">Authenticate</Text>
        </View>
        <View className="items-center color-white">
          <AuthIn label="Seat" states={Seat} setStates={setSeat} />
          <AuthIn label="Seat No." states={numSt} setStates={setnumSt} />
        </View>
        <View className="p-5">
          <Button onPress={() => null} title="Sign InA" />
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default App;
