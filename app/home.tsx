import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import "../global.css";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { SafeAreaView } from "react-native-safe-area-context";

const Home = () => {
  const router = useRouter();
  const [seat, setSeat] = useState<string>("");
  const [position, setPosition] = useState<string>("");

  const LoadSeatPosition = async () => {
    try {
      const s = await AsyncStorage.getItem("seat");
      const p = await AsyncStorage.getItem("position");
      if (s) setSeat(s);
      if (p) setPosition(p);
    } catch (e) {
      console.log(e, "ErrorLoadingSeatPosition");
    }
  };

  useEffect(() => {
    LoadSeatPosition();
  }, []);
  return (
    <LinearGradient
      colors={["#0d3d6b", "#1a1a1a", "#800852"]}
      locations={[0, 0.6, 1]}
      className="flex-1 h-full items-center"
    >
      <SafeAreaView>
        <View className="items-center mt-[20%]">
          <Text className="text-5xl color-white p-5 font-SpGtskSMBold">
            Welcome, {seat}
            {parseInt(position, 10)}
          </Text>
        </View>
        <View className="pt-12 items-center">
          <TouchableOpacity
            className="bg-[#552ba4] rounded-lg 
          items-center w-80 h-64 justify-center"
            onPress={() => router.push("x1/choose")}
          >
            <Text className="text-7xl color-white font-SpGtskReg pt-2">
              1 : 1
            </Text>
          </TouchableOpacity>
        </View>
        <View className="pt-12 items-center">
          <TouchableOpacity
            className="bg-[#552ba4] rounded-lg 
          items-center  w-80 h-64 justify-center"
            onPress={() => router.push("x20/choose")}
          >
            <Text className="text-7xl color-white font-SpGtskReg pt-2">
              1 : 20
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      <TouchableOpacity
        onPress={() => router.back()}
        className="absolute bottom-3 left-3 m-2 p-5 rounded-xl"
      >
        <Text className="text-3xl text-white">{"<"}Back</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

export default Home;
