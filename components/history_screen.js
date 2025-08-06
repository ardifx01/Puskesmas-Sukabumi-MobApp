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
import { useNavigation } from "expo-router";

import { StatusBar } from "expo-status-bar";
// import { isLoaded, useFonts } from "expo-font";

import UseIcons from "./middleware/tools/useIcons";
import fontNormalize from "./middleware/tools/fontNormalize";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const filterData = [
  { id: "0", filterName: "equalizer" },
  { id: "1", filterName: "Semua" },
  { id: "2", filterName: "Terbaru" },
  { id: "3", filterName: "Laki-laki" },
  { id: "4", filterName: "Perempuan" },
];

const diseaseName = "TBC";
// component for filterData item
const FilterDataItem = ({ item, onPress, backgroundColor, textColor }) => (
  item.filterName === "equalizer" ? (
    <Pressable
      onPress={onPress}
      style={[styles.filterButton, { backgroundColor: backgroundColor }]}
    >
      <UseIcons
        name="equalizer"
        set="SimpleLineIcons"
        size={15}
        color={textColor}
      />
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
  )
);

  // Component for PatientDataItem
const PatientDataItem = ({ item, onPress, }) => (
  <Pressable style={[styles.patientDataButton]} onPress={onPress}>
    <View>
      <Text style={[styles.normalText, { fontSize: 16 }]}>
        item.id.name
      </Text>
      <View
        style={[{ flexDirection: "row", alignItems: "center" }]}
      >
        <Text style={[styles.normalText, {fontSize: 12}]}>Laki-laki</Text>
        <Text style={{ fontSize: 16, marginInline: 7 }}>
          •
        </Text>
        <Text style={[styles.normalText, {fontSize: 12}]}>20th</Text>
      </View>
    </View>

    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        marginBlockStart: 12,
      }}
    >
      <View
        style={[{ flexDirection: "row", alignItems: "center" }]}
      >
        <Text style={[styles.italicText, {fontSize: 14, color: "#606060"}]}>Diagnosa: {diseaseName}</Text>
      </View>

      <View
        style={{ flexDirection: "row", alignItems: "center" }}
      >
        <View style={{ marginInlineEnd: 10 }}>
          <UseIcons
            name="calendar-alt"
            set="FontAwesome5"
            size={12}
            color="#BBBBBB" 
          />
        </View>
        <View>
          <Text style={[styles.normalText, {fontSize: 12}]}>21 Juli 2025</Text>
        </View>
      </View>
      
    </View>
  </Pressable>
);



export default function HistoryScreen({ route }) {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  const dummyArray = Array(10).fill(null).map((_, index) => ({ id: `${index + 1}` }));
  console.log(windowHeight, windowWidth);

  const [searchQuery, setSearchQuery] = useState("");

  const [selectedFilter, setSelectedFilter] = useState("Semua");
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
        onPress={() => {
          navigation.navigate("detail-patient");
        }}
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
              <Text style={[styles.headerTitle]}>
                Riwayat Pemeriksaan Pasien
              </Text>
              <Text style={[styles.normalText, styles.headerDesc]}>
                Data kunjungan pasien untuk analisis diagnosis dan tindakan
                lanjut.
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
                ListFooterComponent={<View style={{ paddingRight: fontNormalize(11) }} />} // Add padding to the right
                contentContainerStyle={{ gap: fontNormalize(6), paddingBlockEnd: fontNormalize(13.93) }}
              />
            </View>
          </View>

          <View style={[styles.contentContainer, styles.lowerContent]}>
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
                style={{ paddingInlineEnd: "10%"}}
              />
            </View>

            <View
              style={{
                flexDirection: "column",paddingBlockStart: 24,
              }}
            >
              <FlatList
                data={dummyArray}
                renderItem={renderPatientDataItem}
                keyExtractor={(item) => item.id}
                extraData={selectedFilter}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ gap: 12, paddingBlockEnd: 380}}
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
    height: fontNormalize(210),
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

    marginBlockStart: fontNormalize(8),
    paddingInlineEnd: 33,
  },
  normalText: {
    fontFamily: "HelveticaNeue-Light",
  },
  italicText: {
    fontFamily: "HelveticaNeue-Italic",},
  medText: {
    fontFamily: "HelveticaNeue-Medium",
  },
  boldText: {
    fontFamily: "HelveticaNeue-Bold"
  },
  filterButton: {
    paddingInline: fontNormalize(16),
    paddingBlock: fontNormalize(10),
    justifyContent: "center",
    // marginInlineEnd: 6,

    borderRadius: 16,
  },
  upperContent: {
    gap: fontNormalize(30),
    flexDirection: "column",
    justifyContent: "space-between",
  },
  lowerContent: {
    paddingBlockStart: fontNormalize(18.14),
  },
  searchBox: {
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
    paddingInline: fontNormalize(24),
    paddingBlock: fontNormalize(20),
  },
});
