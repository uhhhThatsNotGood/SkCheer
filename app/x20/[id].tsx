import {
  View,
  SafeAreaView,
  ScrollView,
  Alert,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useEffect } from "react";
import { Asset } from "expo-asset";

import "../../global.css";

import { toHexString, getPixel32, colorToNameX20 } from "../../hooks/BMPutils";

const seatToIndex = (seat: string) => {
  return 4 * (seat.toUpperCase().charCodeAt(0) - 65);
};
const posToIndex = (pos: string) => {
  return 5 * (parseInt(pos, 10) - 1);
};

const getContrast = (hex: string) => {
  const color = hex.replace(/^#/, "");

  const r = parseInt(color.substring(0, 2), 16);
  const g = parseInt(color.substring(2, 4), 16);
  const b = parseInt(color.substring(4, 6), 16);
  const brightness = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return brightness > 0.5 ? "#000000" : "#FFFFFF";
};

const getRegion = (
  bmpData: string | null,
  rowSize: number,
  startRow: number,
  startCol: number,
  regionHeight: number,
  regionWidth: number
) => {
  const region: string[][] = [];
  for (let r = 0; r < regionHeight; r++) {
    const rowPixel: string[] = [];
    for (let c = 0; c < regionWidth; c++) {
      const color = getPixel32(bmpData, rowSize, startCol + c, startRow + r);
      rowPixel.push(color);
    }
    region.push(rowPixel);
  }
  return region;
};

const imageMapX20: { [key: string]: any } = {
  "1": require("../../assets/x20/image1.bmp"),
  "2": require("../../assets/x20/image2.bmp"),
  "3": require("../../assets/x20/image3.bmp"),
};

const X20display = () => {
  const { id } = useLocalSearchParams() as { id: string };
  const router = useRouter();
  const [seat, setSeat] = useState<string>("");
  const [position, setPosition] = useState<string>("");
  const [regionColor, setRegionColor] = useState<string[][] | null>(null);

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
  const LoadRegionAndCache = async (id: string, s: string, p: string) => {
    if (!id || !s || !p) return;
    const cachedKeys = `x20-${id}-${s}-${p}`;
    try {
      const cachedColors = await AsyncStorage.getItem(cachedKeys);
      if (cachedColors) {
        setRegionColor(JSON.parse(cachedColors));
        return;
      }

      const asset = Asset.fromModule(imageMapX20[id]);
      await asset.downloadAsync();
      const b64Data = await fetch(asset.localUri!);
      const buffer = await b64Data.arrayBuffer();
      const Uint8Arr = new Uint8Array(buffer);
      const bmpData = toHexString(Uint8Arr).slice(108);
      const width = 250;
      const data = getRegion(
        bmpData,
        250 * 8,
        seatToIndex(seat),
        posToIndex(position),
        4,
        5
      );
      if (!data) return;
      setRegionColor(data);
      if (data) {
        await AsyncStorage.setItem(cachedKeys, JSON.stringify(data));
      }
    } catch (e) {
      console.log(e, "ErrorFetchingGrid");
      Alert.alert("Error", "Error loading/decoding BMP.");
    }
  };

  useEffect(() => {
    LoadSeatPosition();
  }, []);

  useEffect(() => {
    if (id && seat && position) {
      LoadRegionAndCache(String(id), seat, position);
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
              X20{"["}
              {id}
              {"]\n\n   "} {seat}
              {posToIndex(position) / 5 + 1}
            </Text>
          </View>
          <View className="items-center mt-4">
            {regionColor ? (
              <View>
                {regionColor.reverse().map((row, rowIndex) => (
                  <View key={rowIndex} className="flex flex-row">
                    {row.map((color, colIndex) => {
                      const contrasted = getContrast(color);
                      return (
                        <View
                          key={colIndex}
                          className="w-20 h-20 m-1 border-2 border-gray-200 items-center justify-center rounded-lg"
                          style={{ backgroundColor: color }}
                        >
                          <Text
                            style={{ color: contrasted }}
                            className="text-3xl items-center justify-center font-SpGtskSMBold"
                          >
                            {color
                              ? colorToNameX20(color)
                              : "Loading hex data..."}
                          </Text>
                        </View>
                      );
                    })}
                  </View>
                ))}
              </View>
            ) : (
              <Text className="text-white text-5xl">Loading pixel grid...</Text>
            )}
          </View>
          <View className="items-center mt-2">
            <Text className="text-3xl text-white font-SpGtskMid p-2">
              Current Image{" "}
            </Text>
            {id ? (
              <Image source={imageMapX20[id]} className="w-80 h-40" />
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

export default X20display;
