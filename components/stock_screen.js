import React, { useEffect, useState } from "react";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
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

import UseIcons from "./middleware/tools/useIcons";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const filterData = [
  { id: "0", filterName: "Semua" },
  { id: "1", filterName: "Terbanyak" },
  { id: "2", filterName: "Sedikit" },
  { id: "3", filterName: "Expired" },
  { id: "4", filterName: "Kategori" },
];

const diseaseName = "TBC";
// component for filterData item
const FilterDataItem = ({ item, onPress, backgroundColor, textColor }) =>
  item.filterName === "filter-alt" ? ( // will change to icon later
    <Pressable
      onPress={onPress}
      style={[styles.filterButton, { backgroundColor: backgroundColor }]}
    >
      <Text style={[styles.medText, { fontSize: 14 }, { color: textColor }]}>
        {item.filterName}
      </Text>
    </Pressable>
  ) : (
    <Pressable
      onPress={onPress}
      style={[styles.filterButton, { backgroundColor: backgroundColor }]}
    >
      <Text style={[styles.medText, { fontSize: 14 }, { color: textColor }]}>
        {item.filterName}
      </Text>
    </Pressable>
  );

// Component for PatientDataItem
const PatientDataItem = ({
  item,
  onPress,
  backgroundColor,
  textColor,
  iconColor,
}) => (
  <Pressable style={[styles.patientDataButton]} onPress={onPress}>
    
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <Text style={[styles.normalText, {fontSize: 16}]}>Paracetamol</Text>
      <Text style={[styles.normalText, { fontSize: 12 }]}> Tersedia </Text>
    </View>

    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >

        <View style={[{ flexDirection: "row", alignItems: "center" }]}>
          <Text style={[styles.normalText, {fontSize: 12}]}>Kapsul</Text>
          <Text style={{ fontSize: 16, marginInline: 3.5 }}>•</Text>
          <Text style={[styles.normalText, {fontSize: 12}]}>Antibiotik</Text>
        </View>

        <Text style={[styles.normalText, { fontSize: 14 }]}> 15 Pcs </Text>

    </View>

  </Pressable>
);

export default function StockScreen({ route }) {
  const dummyArray = Array(10)
    .fill(null)
    .map((_, index) => ({ id: `${index + 1}` }));
  console.log(route.name);
  const insets = useSafeAreaInsets();

  const [searchQuery, setSearchQuery] = useState("");

  const [selectedFilter, setSelectedFilter] = useState("Terbanyak");
  const renderFilterItem = ({ item }) => {
    const backgroundColor =
      item.filterName === selectedFilter ? "#4ACDD1" : "#fff";
    const color = item.filterName === selectedFilter ? "#fff" : "#4ACDD1";

    return (
      <FilterDataItem
        item={item}
        onPress={() => setSelectedFilter(item.filterName)}
        backgroundColor={backgroundColor}
        textColor={color}
      />
    );
  };

  const renderPatientDataItem = ({ item }) => {
    return (
      <PatientDataItem
        item={item}
        onPress={() => console.log("Pressed")}
        backgroundColor="#fff"
        textColor="#000"
        iconColor="#BBBBBB"
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
              <Text style={[styles.headerTitle]}>Data Stock Obat</Text>
              <Text style={[styles.normalText, styles.headerDesc]}>
                Pantau ketersediaan obat untuk mendukung layanan pasien.
              </Text>
            </View>

            <View
              style={[
                styles.contentContainer,
                { marginInlineStart: -6, marginInlineEnd: -17 },
              ]}
            >
              <FlatList
                data={filterData}
                renderItem={renderFilterItem}
                keyExtractor={(item) => item.id}
                extraData={selectedFilter}
                horizontal
                showsHorizontalScrollIndicator={false}
                ListHeaderComponent={<View style={{ paddingLeft: 0 }} />} // Add padding to the left
                ListFooterComponent={<View style={{ paddingRight: 11 }} />} // Add padding to the right
                contentContainerStyle={{ gap: 6, paddingBlockEnd: 13.93 }}
              />
            </View>
          </View>

          <View style={[styles.contentContainer, styles.lowerContent, {marginBlockEnd: insets.bottom + 40}]}>
            <View style={[styles.searchBox]}>
              <UseIcons
                name="search"
                set="FontAwesome"
                size={20}
                color="#BBBBBB"
              />
              <TextInput
                placeholder="Cari berdasarkan nama obat"
                onChangeText={setSearchQuery}
                value={searchQuery}
                style={{ paddingInlineEnd: "10%" }}
              />
            </View>

            <View
              style={{
                flexDirection: "column",
                paddingBlockStart: 24,
              }}
            >
              <FlatList
                data={dummyArray}
                renderItem={renderPatientDataItem}
                keyExtractor={(item) => item.id}
                extraData={selectedFilter}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ gap: 12, paddingBlockEnd: insets.bottom }}
              />
            </View>
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
    fontSize: 20,
  },
  headerDesc: {
    color: "#fff",
    fontSize: 14,
    lineHeight: 20,

    marginBlockStart: 8,
    paddingInlineEnd: 85,
  },
  normalText: {
    fontFamily: "HelveticaNeue-Light",
  },
  italicText: {
    fontFamily: "HelveticaNeue-Italic",
  },
  medText: {
    fontFamily: "HelveticaNeue-Medium",
  },
  filterButton: {
    paddingInline: 16,
    paddingBlock: 10,
    justifyContent: "center",
    // marginInlineEnd: 6,

    borderRadius: 16,
  },
  upperContent: {
    flex: 1.2,

    flexDirection: "column",
    justifyContent: "space-between",
  },
  lowerContent: {
    flex: 3.85,
    paddingBlockStart: 18.14,
    paddingBlockEnd: 120,
  },
  searchBox: {
    width: "100%",
    height: 52,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingInline: 14.5,

    borderWidth: 1,
    borderRadius: 12,
    borderColor: "#EDEDED",

    backgroundColor: "#FFFFFF",
  },
  patientDataButton: {
    backgroundColor: "#fff",
    borderRadius: 16,
    paddingInline: 24,
    paddingBlock: 20,
  },
});
