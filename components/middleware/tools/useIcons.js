import React from 'react';

// Expo vector icons
import FontAwesome from '@expo/vector-icons/FontAwesome';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Octicons from '@expo/vector-icons/Octicons';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';

// Local SVG Assets
import datePickerIco from "../../../assets/icons/datePicker_ico.svg";
import historyIco from "../../../assets/icons/history_ico.svg";
import patientIco from "../../../assets/icons/patientCount_ico.svg";
import stetoscopIco from "../../../assets/icons/stetoscop_ico.svg";
import calendarDate from "../../../assets/icons/calendarDate_ico.svg";
import userId from "../../../assets/icons/user-id.svg";
import mapMarker from "../../../assets/icons/map-marker-outline.svg";

const ICON_SETS = {
  FontAwesome: FontAwesome,
  FontAwesome6: FontAwesome6,
  FontAwesome5: FontAwesome5,
  Octicons: Octicons,
  SimpleLineIcons: SimpleLineIcons,
};

const CUSTOM_SVG = {
  'datePicker': datePickerIco,
  'history': historyIco,
  'patientCount': patientIco,
  'stetoscop': stetoscopIco,
  'calendarDate': calendarDate,
  'userId': userId,
  "map-marker": mapMarker
};

/**
 * Komponen kustom untuk merender ikon dari berbagai set (termasuk SVG kustom via URI).
 *
 * @param {object} props - Properti komponen.
 * @param {string} props.name - Nama ikon yang ingin ditampilkan (contoh: "home", "my-home").
 * @param {string} props.set - Nama set ikon (contoh: "Octicons", "CustomSVG").
 * @param {number} props.size - Ukuran ikon.
 * @param {string} props.color - Warna ikon.
 * @param {object} props.style - Gaya tambahan untuk ikon.
 */

const UseIcons = ({ name, set, size = 24, color = "black", fillColor = "none", style, ...rest }) => {

  if (set === 'Custom') {
    const CustomIcoComponent = CUSTOM_SVG[name];
    if (CustomIcoComponent) {
      return <CustomIcoComponent width={size} height={size} stroke={color} fill={fillColor} style={style}  {...rest} />;
    } else {
      console.warn(`Ikon SVG kustom '${name}' tidak ditemukan.`);
      return null;
    };
  };


  const IconComponent = ICON_SETS[set];

  if (!IconComponent) {
    console.warn(`Set ikon '${set}' tidak ditemukan atau tidak didukung.`);
    return null;
  }

  return (
    <IconComponent name={name} size={size} color={color} style={style} {...rest} />
  );
};

export default UseIcons;