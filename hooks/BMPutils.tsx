import { decode as decodeBase64 } from "react-native-fast-base64";

export const decodeB64ToUint8 = (b64: string): Uint8Array => {
  const raw = decodeBase64(b64);
  const arr = new Uint8Array(raw.length);
  for (let i = 0; i < raw.length; i++) {
    arr[i] = raw.charCodeAt(i);
  }
  return arr;
};

export const getRowSize = (width: number): number => {
  const bytesPerRow = width * 3;
  const padding = (4 - (bytesPerRow % 4)) % 4;
  return bytesPerRow + padding;
};

export const getPixel = (
  bmpData: Uint8Array,
  dataOffset: number,
  rowSize: number,
  col: number,
  row: number
): string => {
  const offset = dataOffset + row * rowSize + col * 3;
  const b = bmpData[offset];
  const g = bmpData[offset + 1];
  const r = bmpData[offset + 2];
  const toHex = (n: number) => n.toString(16).padStart(2, "0");
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
};
////////////////////////////
export const printHexSnippet = (bmpData: Uint8Array, length = 50) => {
  const snippet = Array.from(bmpData.slice(0, length))
    .map((x) => x.toString(16).padStart(2, "0"))
    .join(" ");
  console.log(`First ${length} bytes (hex): ${snippet}`);
  console.log(`Total BMP data length: ${bmpData.length}`);
};
////////////////////////////////

export const seatToIndex = (seat: string) => {
  return seat.toUpperCase().charCodeAt(0) - 65;
};
export const posToIndex = (pos: string) => {
  return parseInt(pos, 10) - 1;
};

export const colorToNameX1 = (hex: string | null) => {
  if (!hex) return "Not found";
  hex.toLowerCase().slice(1);
  switch (hex) {
    case "ffffff":
      return "ขาว";
    case "000000":
      return "ดำ";
    case "e70000":
      return "แดง";
    case "e2e200":
      return "เหลือง";
    case "43b85c":
      return "เขียว";
    case "da4327":
      return "ส้ม";
    case "398bec":
      return "ฟ้า";
    case "ef4f84":
      return "ชมพู";
    case "491d74":
      return "ม่วง";
    case "7b1703":
      return "น้ำตาล";
    default:
      return "Not found";
  }
};

export const colorToNameX20 = (hex: string | null) => {};
