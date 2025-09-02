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
  Platform
} from "react-native";
import Collapsible from "react-native-collapsible";
import { FlatList } from "react-native-gesture-handler";
import axios from "axios";


import { useNavigation } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
// import { isLoaded, useFonts } from "expo-font";

import UseIcons from "../../middleware/tools/useIcons";
import { useAuth, API_URL } from "../../middleware/context/authContext";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;
const ENDPOINT_URL = "patient/getHistory";


// Component for Accordion
const AccordionItem = React.memo(({ title, initialCollapsed = true }) => {
  const dummyArray = Array(10).fill(null).map((_, index) => ({ id: `${index}` }));
  const [isCollapsed, setIsCollapsed] = useState(initialCollapsed);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const renderObatItem = ({item}) => {
    return (
    <View style={styles.obatItem}>
      <View>
        <Text style={[styles.normalText, { fontSize: 20 }]}>Paracetamol</Text>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Text style={{ fontSize: 20, marginInline: 3.5 }}>•</Text>
          <Text style={[styles.normalText, { fontSize: 16 }]}>Kapsul</Text>
          <Text style={{ fontSize: 20, marginInline: 3.5 }}>•</Text>
          <Text style={[styles.normalText, { fontSize: 16 }]}>
            Antibiotik
          </Text>
        </View>
      </View>

      <Text style={[styles.normalText, { fontSize: 20, color: "#616161" }]}>
        2
      </Text>
    </View>
    );
  };

  return (
    <View style={{ marginBlockStart: 4 }}>
      <Pressable
        onPress={toggleCollapse}
        style={{
          alignContent: "center",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text style={[styles.normalText, { fontSize: 18 }]}>{title}</Text>
        <UseIcons
          name={isCollapsed ? "arrow-right" : "arrow-drop-down"}
          set="MaterialIcons"
          color="#616161"
        />
      </Pressable>

      <Collapsible collapsed={isCollapsed}>
        <View style={[styles.itemContent]}>
          <FlatList
            data={dummyArray} // Data Source
            renderItem={renderObatItem}
            keyExtractor={(item) => item.id}
            // Properti untuk mengontrol performa FlatList
            initialNumToRender={3} // Jumlah item awal yang dirender
            showsVerticalScrollIndicator={true} // Sembunyikan scroll indicator jika tidak diinginkan
            contentContainerStyle={{gap: 12}}
          />
        </View>
      </Collapsible>
    </View>
  );
});

// Component for History List
const HistoryList = React.memo(({item}) => (
  <View style={[styles.detailData]}>
    <View
      style={{ flexDirection: "row", alignItems: "center", gap: 10 }}
    >
      <UseIcons
        name="calendar-alt"
        set="FontAwesome5"
        size={15}
        color="#4ACDD1"
      />

      <View>
        <Text style={[styles.normalText, { fontSize: 18 }]}>
          {item.tanggal}
        </Text>
      </View>
    </View>

    <FlatList
      data={item.riwayatPemeriksaan} // Data Source
      renderItem={({item: dataPemeriksaan}) => (
        <View style={{ borderTopWidth: 1, borderColor: "#EDEDED", paddingBlockStart: 10 }}>
          <Text style={[styles.italicText, { fontSize: 14, color: "#606060"}]}>Nomor Pemeriksaan : #{dataPemeriksaan.id}</Text>
          <View style={{ gap: 8 }}>
            <Text style={[styles.normalText, { fontSize: 18 }]}>
              Keluhan :<Text style={[styles.medText]}> {dataPemeriksaan.keluhan}</Text>
            </Text>
            <Text style={[styles.normalText, { fontSize: 18 }]}>
              Diagnosa :<Text style={[styles.medText]}> {dataPemeriksaan.diagnosa}</Text>
            </Text>
          </View>
          <AccordionItem
            title="Daftar Resep Obat"
          />
        </View>

      )}
      keyExtractor={(dataPemeriksaan) => dataPemeriksaan.id}
      // Properti untuk mengontrol performa FlatList
      initialNumToRender={3} // Jumlah item awal yang dirender
      showsVerticalScrollIndicator={true} // Sembunyikan scroll indicator jika tidak diinginkan
      contentContainerStyle={{gap: 35}}
    />
    {/* <View style={{ gap: 8 }}>
      <Text style={[styles.normalText, { fontSize: 18 }]}>
        Pemeriksa :<Text style={[styles.medText]}> Dr. Keqing</Text>
      </Text>
      <Text style={[styles.normalText, { fontSize: 18 }]}>
        Keluhan :<Text style={[styles.medText]}> Demam, Pilek</Text>
      </Text>
      <Text style={[styles.normalText, { fontSize: 18 }]}>
        Diagnosa :<Text style={[styles.medText]}> TBC</Text>
      </Text>
    </View> */}


  </View>
));

// Default export
export default function DetailPatientScreen({ route }) {
  const authData = useAuth();
  const patientData = route.params;
  console.log("Patient Data: ", patientData);
  const dummyArray = Array(10).fill(null).map((_, index) => ({ id: `${index}` }));
  const [patientHistory, setPatientHistory] = useState();

  const navigation = useNavigation();

  useEffect(() => {
    const fetchPatientHistoryData = async() => {
      try {
        const response = await axios.get(`${API_URL}/patient/show`)
        const getPatientData = response.data.data.filter(
          item => item.nama_lengkap.toLowerCase().includes(patientData.nama_lengkap.toLowerCase())
        );
        const groupPatientDataByDate = getPatientData.reduce((accumulator, item) => {
          const date = item.created_at.split("T")[0];
          if(!accumulator[date]) {
            accumulator[date] = [];
          }
          accumulator[date].push(item);
          return accumulator;
        }, {});
        const transformToArray = Object.keys(groupPatientDataByDate).map(tanggal => ({
          tanggal,
          riwayatPemeriksaan: groupPatientDataByDate[tanggal]
        }));
        console.log('Grouped Data by Date',transformToArray);
        setPatientHistory(transformToArray);
      } catch (error) {
        console.log ("There is an Error while fetching Patient History Data, ", error);
      }
    };
    fetchPatientHistoryData();
  }, []);

  useEffect(() => {
    console.log("Patient Data History: ", patientHistory);
  }, [patientHistory]);

  const renderDataHistory = ({item}) => {
    return (
      <HistoryList item={item}/>
    );
  };

  return (
    <SafeAreaView style={{ backgroundColor: "#F7F9FC" }}>
      <View style={styles.container}>
        <View style={[styles.upperContent]}>
          <View style={styles.headerContainer}>
            <Pressable
              style={[styles.actionCircleButtonContainer, {transform: [{ rotateZ: '80deg' }],}]}
              onPress={() => navigation.goBack()}
            >
              <LinearGradient colors={['gray', '#FFFFFF']}
                              start={{ x: 0, y: 2 }}
                              end={{ x: 1, y: 1 }}
                              style={styles.actionCircleButton}
              >
                <UseIcons
                  name="angle-left"
                  set="FontAwesome6"
                  size={20}
                  color="#4ACDD1"
                  style={[{transform: [{ rotateZ: '-80deg' }],}]}
                />
              </LinearGradient>
            </Pressable>
            <View style={{ flex: 0.85, alignItems: "center" }}>
              <Text style={[styles.headerTitle]}>Detail Pasien</Text>
            </View>
          </View>
        </View>

        <View style={[styles.lowerContent]}>
          <View style={{ marginBlockEnd: 16 }}>
            <Text style={[styles.medText, { fontSize: 24 }]}>
              {patientData.nama_lengkap}
            </Text>
            <View style={[{ flexDirection: "row", alignItems: "center" }]}>
              <Text style={[styles.normalText, { fontSize: 16 }]}>
                {patientData.jenis_kelamin === "L" ? "Laki-laki" : "Perempuan"}
              </Text>
              <Text style={{ fontSize: 20, marginInline: 3.5 }}>•</Text>
              <Text style={[styles.normalText, { fontSize: 16 }]}>{patientData.umur}th</Text>
            </View>
          </View>

          <View style={{flex: 1}}>
            <FlatList
              data={patientHistory}
              renderItem={renderDataHistory}
              keyExtractor={(item) => item.tanggal}
              showsVerticalScrollIndicator={true}
              initialNumToRender={10}
              maxToRenderPerBatch={15}
              updateCellsBatchingPeriod={7}
              windowSize={21}
            />

          </View>
        </View>

        <StatusBar style="auto" />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    // alignItems: "center",
    // justifyContent: "center",
    height: windowHeight,
    paddingTop: 19,
    paddingInline: 16,
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
    elevation: 2
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
  },
  lowerContent: {
    flex: 1,
    borderRadius: 18,

    paddingBlock: 32,
    paddingInline: 18,

    backgroundColor: "#FFF",
  },
  detailData: {
    flexDirection: "column",
    gap: 20,

    paddingBlock: 32,

    borderTopWidth: 1,
    borderColor: "#EDEDED",
  },
  itemContent: {
    marginBlockStart: 32,
    maxHeight: 200,
  },
  obatItem: {
    paddingInlineStart: 10,
    paddingInlineEnd: 12,
    paddingBlock: 6,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderBottomWidth: 0.5,
    borderBottomColor: "#78797A80",
  },
});
