import React from "react";
import { SafeAreaView, View, Text, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";

const Home = () => {
  return (
    <LinearGradient
      colors={["#0d3d6b", "#1a1a1a", "#800852"]}
      locations={[0, 0.6, 1]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      className="flex-1 items-center"
    >
      <SafeAreaView>
        <View className="items-center mt-[20%]">
          <Text className="text-7xl color-white font-bold pb-10">Choose</Text>
        </View>
        <View className="p-10">
          <TouchableOpacity
            className="bg-[#160229] rounded-lg 
          items-center border-2 border-white w-72 h-64 justify-center"
            onPress={() => router.push("../display/x1")}
          >
            <Text className="text-8xl color-white">1:1</Text>
          </TouchableOpacity>
        </View>
        <View className="p-10">
          <TouchableOpacity
            className="bg-[#160229] rounded-lg 
          items-center border-2 border-white w-72 h-64 justify-center"
            onPress={() => router.push("../display/x20")}
          >
            <Text className="text-8xl color-white">1:20</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default Home;
