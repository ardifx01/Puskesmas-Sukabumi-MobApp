import * as React from "react";
import {PixelRatio} from "react-native";
import ExtraDimensions from 'react-native-extra-dimensions-android';

const windowWidth = ExtraDimensions.getRealWindowWidth();
const windowHeight= ExtraDimensions.getRealWindowHeight();
const fontScale = windowWidth / 392.7272644042969; // 392.7272644042969 is my base width devices screen


const fontNormalize = (size) => {
  const newSize = size * fontScale;
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
};

export default fontNormalize;