import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  ImageBackground,
  Image,
  Dimensions,
  Pressable,
  TouchableOpacity,
  FlatList,
} from "react-native";

import { StatusBar } from "expo-status-bar";
// import { isLoaded, useFonts } from "expo-font";
import SvgUri from "expo-svg-uri";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const filterData = [
  { id: "0", filterName: "filter-alt" },
  { id: "1", filterName: "Semua" },
  { id: "2", filterName: "Terbaru" },
  { id: "3", filterName: "Laki-laki" },
  { id: "4", filterName: "Perempuan" },
];

// component for filterData item
const FilterDataItem = ({ item, onPress, backgroundColor, textColor }) =>
  item.filterName === "filter-alt" ? ( // will change to icon later
    <Pressable onPress={onPress} style={[styles.filterButton, { backgroundColor: backgroundColor }]}>
      <Text style={[styles.medText,{fontSize: 16}, { color: textColor }]}>{item.filterName}</Text>
    </Pressable>
  ) : (
    <Pressable onPress={onPress} style={[styles.filterButton, { backgroundColor: backgroundColor }]}>
      <Text style={[styles.medText,{fontSize: 16}, { color: textColor }]}>{item.filterName}</Text>
    </Pressable>
  );

export default function HistoryScreen({ route }) {
  const dummyArray = Array(10).fill(null);
  console.log(route.name);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("Semua");
  const renderFilterItem = ({item}) => {
    const backgroundColor = item.filterName === selectedFilter ? '#4ACDD1' : '#fff';
    const color = item.filterName === selectedFilter ? '#fff' : '#4ACDD1';

    return (
      <FilterDataItem
        item={item}
        onPress={() => setSelectedFilter(item.filterName)}
        backgroundColor={backgroundColor}
        textColor={color}
      />
    );
  };

  return (
    <ImageBackground
      source={require("../assets/img_bg.png")}
      style={styles.bgContainer}
    >
      <SafeAreaView>
        <View style={styles.container}>
          <View style={styles.upperContent}>

            <View style={styles.contentContainer}>
              <Text style={[styles.headerTitle, {}]}>
                Riwayat Pemeriksaan Pasien
              </Text>
              <Text style={[styles.normalText, styles.headerDesc]}>
                Data kunjungan pasien untuk analisis diagnosis dan tindakan
                lanjut.
              </Text>
            </View>

            <View style={[styles.contentContainer, {marginInlineStart: -6, marginInlineEnd: -17}]}>
              <FlatList
                data={filterData}
                renderItem={renderFilterItem}
                keyExtractor={(item) => item.id}
                extraData={selectedFilter}
                horizontal
                showsHorizontalScrollIndicator={false}
                ListHeaderComponent={<View style={{ paddingLeft: 0 }} />} // Add padding to the left
                ListFooterComponent={<View style={{ paddingRight: 11 }} />} // Add padding to the right
                contentContainerStyle={{gap: 6, paddingBlockEnd: 13.93}}
              />
            </View>

          </View>

          <View style={[styles.contentContainer, styles.lowerContent]}>

            <Text>Lower</Text>

          </View>

          <StatusBar style="auto" />
        </View>
      </SafeAreaView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bgContainer: {
    height: 210,
    width: windowWidth,
    resizeMode: "cover",
    // overflow: "hidden",
    flex: 1,
    backgroundColor: "#F7F9FC",
  },
  container: {
    // alignItems: "center",
    // justifyContent: "center",
    height: windowHeight,
    paddingTop: 19,
  },
  contentContainer: {
    paddingInline: 17,
  },
  headerTitle: {
    color: "#fff",
    fontFamily: "HelveticaNeue-Bold",
    fontSize: 22,
  },
  headerDesc: {
    color: "#fff",
    fontSize: 16,
    lineHeight: 20,

    marginBlockStart: 8,
    paddingInlineEnd: 33,
  },
  normalText: {
    fontFamily: "HelveticaNeue-Light",
  },
  medText: {
    fontFamily: "HelveticaNeue-Medium",
  },
  filterButton: {
    paddingInline: 16,
    paddingBlock: 10,
    // marginInlineEnd: 6,

    borderRadius: 16,
  },
  upperContent: {
    flex: 1,

    flexDirection: "column",
    justifyContent: "space-between",
  },
  lowerContent: {
    flex: 3.99,
    paddingBlockStart: 18.14,
    backgroundColor: "rgba(0, 0, 255, 0.5)",
  }

});
