import {
  View,
  SafeAreaView,
  ScrollView,
  Alert,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useEffect } from "react";
import { Asset } from "expo-asset";

import "../../global.css";

import { toHexString, getPixel24, colorToNameX1 } from "../../hooks/BMPutils";

const seatToIndex = (seat: string) => {
  return seat.toUpperCase().charCodeAt(0) - 65;
};
const posToIndex = (pos: string) => {
  return parseInt(pos, 10) - 1;
};

const imageMapX1: { [key: string]: any } = {
  "1": require("../../assets/x1/image1.bmp"),
  "2": require("../../assets/x1/image2.bmp"),
  "3": require("../../assets/x1/image3.bmp"),
};

const X1display = () => {
  const { id } = useLocalSearchParams() as { id: string };
  const router = useRouter();
  const [seat, setSeat] = useState<string>("");
  const [position, setPosition] = useState<string>("");
  const [pixelColor, setPixelColor] = useState<string | null>(null);

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

  const LoadPixelAndCache = async (id: string, s: string, p: string) => {
    if (!id || !s || !p) return;
    const cachedKeys = `x1-${id}-${s}-${p}`;
    try {
      const cachedColors = await AsyncStorage.getItem(cachedKeys);
      if (cachedColors) {
        setPixelColor(cachedColors);
        return;
      }
      const asset = Asset.fromModule(imageMapX1[id]);
      await asset.downloadAsync();
      const b64Data = await fetch(asset.localUri!);
      const buffer = await b64Data.arrayBuffer();
      const Uint8Arr = new Uint8Array(buffer);
      const bmpData = toHexString(Uint8Arr).slice(72);
      const width = 50;
      console.log(bmpData.slice(0, 200));
      const data = getPixel24(
        bmpData,
        50 * 6 + 4,
        posToIndex(position),
        seatToIndex(seat)
      );
      if (!data) return;
      setPixelColor(data);

      if (data) {
        await AsyncStorage.setItem(cachedKeys, pixelColor ?? "");
      }
    } catch (e) {
      console.log(e, "ErrorFetchingData");
      Alert.alert("Error", "Failed to decode BMP.");
    }
  };

  useEffect(() => {
    LoadSeatPosition();
  }, []);
  useEffect(() => {
    if (id && seat && position) {
      LoadPixelAndCache(String(id), seat, position);
    }
  }, [id, seat, position]);

  return (
    <LinearGradient
      colors={["#0d3d6b", "#1a1a1a", "#800852"]}
      locations={[0, 0.6, 1]}
      className="h-full items-center"
    >
      <ScrollView>
        <SafeAreaView>
          <View className="items-center mt-[10%]">
            <Text className="text-4xl text-white font-SpGtskSMBold items-center mb-4">
              {" "}
              X1{"-"}
              {id} {"\n\n "}( {seat}
              {posToIndex(position) + 1} )
            </Text>
          </View>
          <View className="items-center mt-4">
            <View
              style={{ backgroundColor: pixelColor ?? "" }}
              className="h-96 w-96 items-center justify-center rounded-xl border border-white"
            ></View>
            <Text className="text-5xl text-white font-SpGtskMid mt-6">
              {pixelColor ? colorToNameX1(pixelColor) : "Loading hex data..."}
            </Text>
          </View>
          <View className="items-center mt-2">
            <Text className="text-3xl text-white font-SpGtskMid p-2">
              Current Image{" "}
            </Text>
            {id ? (
              <Image source={imageMapX1[id]} className="w-80 h-40" />
            ) : (
              <Text className="text-xl items-center text-white">
                Loading...
              </Text>
            )}
          </View>
        </SafeAreaView>
      </ScrollView>
      <TouchableOpacity
        onPress={() => router.back()}
        className="absolute bottom-3 left-3 m-7 rounded-xl"
      >
        <Text className="text-3xl text-white">{"<"}Back</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

export default X1display;
