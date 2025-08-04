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
  LayoutAnimation,
  UIManager,
  Platform,
} from "react-native";
import Collapsible from "react-native-collapsible";
import { FlatList } from "react-native-gesture-handler";
import Modal from "react-native-modal";
import ExtraDimensions from 'react-native-extra-dimensions-android';

import { useNavigation } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
// import { isLoaded, useFonts } from "expo-font";

import UseIcons from "../../middleware/tools/useIcons";

// import data dummy
import dataObat from "../../../dummyData/dataObat.json";
import { Use } from "react-native-svg";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const windowWidthED = ExtraDimensions.getRealWindowWidth();
const windowHeightED = ExtraDimensions.getRealWindowHeight();

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

// Component for Confirmation Modal
const ComfirmationModal = ({isVisible, setVisibility, actionYes}) => (
    <Modal
      isVisible={isVisible}
      statusBarTranslucent={true}
      onBackdropPress={() => {setVisibility(false)}}
      onBackButtonPress={() => {setVisibility(false)}}
      animationIn ="tada"
      animationInTiming={600}
      animationOut ="fadeOutDown"
      animationOutTiming={500}
      backdropOpacity={0.3}
    >
      <View style={[styles.modalContentContainer, {alignItems:"center", justifyContent:"center"}]}>
        <View style={[styles.modalContentWrapper, {paddingInline: 20, paddingBlock: 31, borderRadius: 16,backgroundColor: "#FFF"}]}> 
          <View style={[styles.modalContent,{alignItems:"center", justifyContent:"center", gap: 20}]}>
            <UseIcons
              name="check-circle-fill"
              set="Octicons"
              size={40}
              color="#ACE8EA"
            />
            <View style={{alignItems: "center", gap: 8}}>
              <Text style={[styles.medText, {fontSize: 16,}]}>Konfirmasi Pemberian Obat?</Text>
              <Text style={[styles.normalText, {fontSize: 14, textAlign: "center", lineHeight: 14.4}]}>Pastikan obat yang diberikan sudah sesuai sebelum melanjutkan</Text>
            </View>

            <View style={{flexDirection: "row", gap: 10}}>
              <Pressable
                style={[styles.button, styles.negativeButton]}
                onPress={() => {setVisibility(false)}}
              >
                <Text style={[styles.medText,{fontSize: 12, color:"#4ACDD1"}]}>Batal</Text>
              </Pressable>
              <Pressable style={[styles.button, styles.positiveButton]}>
                <Text style={[styles.medText,{fontSize: 12, color:"#FFF"}]}>Konfirmasi</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    </Modal>
);

// Default export
export default function MedicinePicker({ route }) {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  console.log("Window Width: ", windowWidth, ",Window Height: ", windowHeight, " from Dimension");
  console.log("Window Width: ", windowWidthED, ",Window Height: ", windowHeightED, " from ExtraDimension");


  const [isModalVisible, setModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const filteredDataObat = dataObat.filter(
    (obat) =>
      obat.namaObat.toLowerCase().includes(searchQuery.toLowerCase()) ||
      obat.bentukFisikObat.toLowerCase().includes(searchQuery.toLowerCase()) ||
      obat.jenisKhasiatObat.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const [isMedicineHasBeenChoosen, setIsMedicineHasBeenChoosen] =
    useState(false);

  const renderMedicineEntry = ({ item }) => {
    return (
      <MedicineEntryItem item={item} action={setIsMedicineHasBeenChoosen} />
    );
  };

  return (
    <SafeAreaView style={{ backgroundColor: "#F7F9FC" }}>
    
      <ComfirmationModal isVisible={isModalVisible} setVisibility={setModalVisible}/>
      <View style={[styles.container]}>
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
          <View
            style={[
              styles.medicineListWrapper,
              { flex: 1, gap: 20, paddingInline: 16 },
            ]}
          >
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
              contentContainerStyle={{ gap: 8, paddingBlockEnd: 8 }}
            />
          </View>
          <View style={[styles.medicineCartWrapper, {paddingBlockEnd: (insets.bottom + 45),}]}>
            <Text style={[styles.normalText, {fontSize: 1}]}>Daftar Resep Obat</Text>
            <Pressable 
              style={[styles.saveButton]}
              onPress={() => {setModalVisible(true)}}
            >
              <Text style={[styles.medText, { fontSize: 18, color: "#fff" }]}>
                Simpan
              </Text>
            </Pressable>
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
  medicineCartWrapper: {
    gap: 20,
    flexGrow: 0,
    paddingBlock: 16,
    paddingInline: 16,
    borderTopWidth: 1,
    borderTopColor: "#00000026",
    backgroundColor: "#fff",
  },
  saveButton: {
    paddingBlock: 14,
    borderRadius: 14,
    alignItems: "center",
    backgroundColor: "#4ACDD1",
  },
  button: {
    height: 28, 
    paddingInline: 12, 
    borderRadius: 8, 
    justifyContent:"center",
    alignItems: "center"
  },
  negativeButton: {
    borderWidth: 1, 
    borderColor: "#4ACDD1",
  },
  positiveButton: {
    borderWidth: 1,
    borderColor: "#4ACDD1", 
    backgroundColor: "#4ACDD1"
  },
});
