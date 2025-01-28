import React from "react";
import { SafeAreaView, View, Text, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import "../../global.css";

const Home = () => {
  const router = useRouter();
  return (
    <LinearGradient
      colors={["#0d3d6b", "#1a1a1a", "#800852"]}
      locations={[0, 0.6, 1]}
      className="flex-1 h-full items-center"
    >
      <SafeAreaView>
        <View className="items-center mt-[20%]">
          <Text className="text-7xl color-white p-5 font-SpGtskSMBold">
            Welcome
          </Text>
        </View>
        <View className="pt-12 items-center">
          <TouchableOpacity
            className="bg-[#552ba4] rounded-lg 
          items-center w-80 h-64 justify-center"
            onPress={() => router.push("../x1/choose")}
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
            onPress={() => router.push("../x20/choose")}
          >
            <Text className="text-7xl color-white font-SpGtskReg pt-2">
              1 : 20
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default Home;
