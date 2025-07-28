import React from 'react';

import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Octicons from '@expo/vector-icons/Octicons';
import FontAwesome from '@expo/vector-icons/FontAwesome';

// Local SVG Assets
import datePickerIco from "../../../assets/icons/datePicker_ico.svg";
import historyIco from "../../../assets/icons/history_ico.svg";
import patientIco from "../../../assets/icons/patientCount_ico.svg";
import stetoscopIco from "../../../assets/icons/stetoscop_ico.svg";

const CUSTOM_SVG_URI_MAP = {
  'history': '../../../assets/history_ico.svg',
};

const ICON_SETS = {
  FontAwesome6: FontAwesome6,
  FontAwesome: FontAwesome,
  Octicons: Octicons,
  
};

const CUSTOM_SVG = {
  'datePicker': datePickerIco,
  'history': historyIco,
  'patientCount': patientIco,
  'stetoscop': stetoscopIco,
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

const UseIcons = ({ name, set, size = 24, color = "black", style, ...rest }) => {
    
//   if (set === 'Custom') { STILL NOT WORKING
//     const svgUri = CUSTOM_SVG_URI_MAP[name];
//     console.log(svgUri)

//     if (svgUri) {
//       return (
//         console.log("Cihuyy")
//       );
//     } else {
//       console.warn(`Icon '${name}' dengan set 'CustomSVG' tidak ditemukan.`);
//       return null;
//     }
//   }

  if (set === 'Custom') {
    const CustomIcoComponent = CUSTOM_SVG[name];
    if (CustomIcoComponent) {
      return <CustomIcoComponent width={size} height={size} stroke={color} style={style} {...rest} />;
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