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
  LayoutAnimation,
  UIManager,
  Platform,
} from "react-native";
import Collapsible from "react-native-collapsible";
import { FlatList } from "react-native-gesture-handler";

import { useNavigation } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
// import { isLoaded, useFonts } from "expo-font";

import UseIcons from "../../middleware/tools/useIcons";

// import data dummy
import dataObat from "../../../dummyData/dataObat.json";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;


// Component for Medicine Entry Item
const MedicineEntryItem = ({ item, action }) => (
  <View style={[styles.medicineEntry]}>
    <View style={{ flex: 1 }}>
      <Text style={[styles.medText, { fontSize: 18 }]}>{item.namaObat}</Text>
      <View style={[{ flexDirection: "row", alignItems: "center" }]}>
        <Text style={[styles.normalText, { fontSize: 16 }]}>
          {item.bentukFisikObat}
        </Text>
        <Text style={{ fontSize: 20, marginInline: 3.5 }}>•</Text>
        <Text style={[styles.normalText, { fontSize: 16 }]}>
          {item.jenisKhasiatObat}
        </Text>
      </View>
    </View>
    <View style={{ flex: 1, alignItems: "center" }}>
      <Text style={[styles.normalText, { fontSize: 16 }]}>Tersedia</Text>
      <Text style={[styles.medText, { fontSize: 18 }]}>
        {item.jumlahObat} PCs
      </Text>
    </View>
    <Pressable
      onPress={() => {
        alert(JSON.stringify(item));
        action(true);
      }}
    >
      <UseIcons name="add-button" set="Custom" size={20} stroke="#4ACDD1" />
    </Pressable>
  </View>
);

// Default export
export default function MedicinePicker({ route }) {
  const navigation = useNavigation();

  const [searchQuery, setSearchQuery] = useState("");
  const filteredDataObat = dataObat.filter(
    (obat) =>
      obat.namaObat.toLowerCase().includes(searchQuery.toLowerCase()) ||
      obat.bentukFisikObat.toLowerCase().includes(searchQuery.toLowerCase()) ||
      obat.jenisKhasiatObat.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const [isMedicineHasBeenChoosen, setIsMedicineHasBeenChoosen] = useState(false);

  const renderMedicineEntry = ({ item }) => {
    return <MedicineEntryItem item={item} action={setIsMedicineHasBeenChoosen}/>;
  };

  return (
    <SafeAreaView style={{ backgroundColor: "#F7F9FC" }}>
      <View style={styles.container}>
        <View style={[styles.upperContent]}>
          <View style={styles.headerContainer}>
            <Pressable
              style={[
                styles.actionCircleButtonContainer,
                { transform: [{ rotateZ: "80deg" }] },
              ]}
              onPress={() => navigation.goBack()}
            >
              <LinearGradient
                colors={["gray", "#FFFFFF"]}
                start={{ x: 0, y: 2 }}
                end={{ x: 1, y: 1 }}
                style={styles.actionCircleButton}
              >
                <UseIcons
                  name="angle-left"
                  set="FontAwesome6"
                  size={20}
                  color="#4ACDD1"
                  style={[{ transform: [{ rotateZ: "-80deg" }] }]}
                />
              </LinearGradient>
            </Pressable>
            <View style={{ flex: 0.85, alignItems: "center" }}>
              <Text style={[styles.headerTitle]}>Pilih Obat</Text>
            </View>
          </View>
        </View>

        <View style={[styles.lowerContent]}>
            <View style={[styles.medicineListWrapper, {flex: 1, gap: 20, paddingInline: 16 }]}>
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

                <FlatList
                data={filteredDataObat}
                renderItem={renderMedicineEntry}
                keyExtractor={(item) => item.id}
                showsVerticalScrollIndicator={true}
                contentContainerStyle={{ gap: 8, paddingBlockEnd: 8, }}
                />
            </View>
            <View style={[styles.medicineCartWrapper,{flexGrow: 0, paddingBlock: 16, paddingInline: 16, borderTopWidth: 1, borderTopColor: "#00000026",backgroundColor: "#FFFFFF"}]}>
              {isMedicineHasBeenChoosen && 
              <Text>Test</Text>}
              <Text>Test</Text>
              <Text>Test</Text>
              <Text>Test</Text>
            </View>
        </View>

        <StatusBar style="auto" />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    // alignItems: "center",
    // justifyContent: "center",
    height: windowHeight,
    paddingTop: 19,
    backgroundColor: "#F7F9FC",
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  actionCircleButtonContainer: {
    width: 45,
    height: 45,
    borderRadius: 45 / 2,
    overflow: "hidden",

    shadowColor: "#000",
    elevation: 2,
  },
  actionCircleButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    color: "#4ACDD1",
    fontFamily: "HelveticaNeue-Medium",
    fontSize: 20,
  },
  headerDesc: {
    color: "#fff",
    fontSize: 16,
    lineHeight: 20,

    marginBlockStart: 8,
    paddingInlineEnd: 100,
  },
  formTextTitle: {
    fontFamily: "HelveticaNeue-Light",
    fontSize: 14,
    color: "#616161",
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
  upperContent: {
    flexDirection: "column",
    justifyContent: "space-between",
    marginBlockEnd: 38,
    paddingInline: 16,
  },
  lowerContent: {
    flex: 1,
  },
  searchBox: {
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

  medicineEntry: {
    borderRadius: 14,
    paddingInline: 24,
    paddingBlock: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#FFF",
  },
});
