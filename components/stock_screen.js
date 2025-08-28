import React, { use, useEffect, useState } from "react";
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
import axios from "axios";
// import { isLoaded, useFonts } from "expo-font";

import UseIcons from "./middleware/tools/useIcons";
import { useAuth, API_URL } from "./middleware/context/authContext";



const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const FILTER_DATA = [
  { id: "0", filterName: "Semua" },
  { id: "sort-1", filterName: "Terbanyak" },
  { id: "sort-2", filterName: "Sedikit" },
  { id: "sort-3", filterName: "Expired" },
  // { id: "4", filterName: "Kategori" },
];
const ENDPOINT_URL = "medkit/stockView";

const createNewFilterData = (emergencyKitsData, unitLayananId) => {
  // console.log("Creating new filter data with emergencyKitsData: ");
  // console.log("Filtering emergencyKitsData with unit_layanan_id:", unitLayananId);
  const filteredData = emergencyKitsData.filter(
    (item) => item.unit_layanan_id === unitLayananId
  );
  // console.log("Filtered Data: ", filteredData);

  // console.log("Mapping filtered data to emergencyFilters...");
  const emergencyFilters = filteredData.map((item) => ({
    id: item.id,
    filterName: item.nama,
  }));
  // console.log("Filtered Emergency Filters: ", emergencyFilters);

  // console.log("Combining with existing FILTER_DATA...");
  const newFilterData = [
    FILTER_DATA[0],
    ...emergencyFilters,
    ...FILTER_DATA.slice(1)
  ];
  return newFilterData;
};

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
      <Text style={[styles.normalText, { fontSize: 16 }]}>{item.obat}</Text>
      <Text style={[styles.normalText, { fontSize: 12 }]}>
        {item.stok > 0 ? "Tersedia" : "Tidak Tersedia"}
      </Text>
    </View>

    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >

      <View style={[{ flexDirection: "row", alignItems: "center" }]}>
        <Text style={[styles.normalText, { fontSize: 12 }]}>{item.satuan_obat}</Text>
        <Text style={{ fontSize: 16, marginInline: 3.5 }}>•</Text>
        <Text style={[styles.normalText, { fontSize: 12 }]}>{item.jenis_obat}</Text>
      </View>

      <Text style={[styles.normalText, { fontSize: 14 }]}>{item.stok} Pcs</Text>

    </View>

  </Pressable>
);

export default function StockScreen({ route }) {
  const { authData } = useAuth();
  const [medkitData, setMedkitData] = useState();
  const [filterData, setFilterData] = useState(FILTER_DATA);

  useEffect(() => {
    const fetchMedkitData = async () => {
      try {
        // console.log("Fetching medkit data for unit_layanan_id: ");
        const response = JSON.stringify(await axios.get(`${API_URL}/medkit/show`));
        // console.log("Parsing Response......");
        const responseParsed = JSON.parse(response);
        // console.log("Adding to medkitData state......");
        setMedkitData(responseParsed.data.medkitData);
      } catch (error) {
        console.error("Error fetching medkit data:", error);
      }
    };
    fetchMedkitData();
  }, []);

  useEffect(() => {
    // console.log("Medkit Data: ", medkitData);
    if (medkitData) {
      // console.log("Medkit Data available, creating new filter data...");
      const newFilterData = createNewFilterData(medkitData, authData.userData.unit_layanan_id);
      setFilterData(newFilterData);
    };
  }, [medkitData]);

  // This use effect for debugging
  // useEffect(() => {
  //   console.log("Filter Data Updated: ", filterData);
  // }, [filterData]);

  // Used as Dummy for Front-end dev
  // const dummyArray = Array(10)
  //   .fill(null)
  //   .map((_, index) => ({ id: `${index + 1}` }));
  // console.log("Dummy Array: ",dummyArray);
  const insets = useSafeAreaInsets();

  const [searchQuery, setSearchQuery] = useState("");
  const [resultQuery, setResultQuery] = useState();
  const [selectedFilter, setSelectedFilter] = useState();
  useEffect(() => {
    setSelectedFilter("0");
  }, []);

  const fetchData = async(params = {}) => {
    try {
      // console.warn("Fetching medkit data for unit_layanan_id: ");
      const response = await axios.get(`${API_URL}/${ENDPOINT_URL}`, {
          params
        });

      // Add ID to use as Key Extractor on Flatlist
      const dataWithId = response.data.data.map((item, index) => ({
        id: String(index),
        ...item,
      }));
      return dataWithId;
    } catch (error) {
      console.log("There is error check your phone!")
    }
  };

  const getDateNow = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // +1 karena index bulan mulai dari 0
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };
  

  useEffect(() => {
    const applyFilter = async () => {
      if (selectedFilter != null) {
        // console.log("Selected Filter: ", selectedFilter);
        if (selectedFilter === "0") {
          const dataWithId = await fetchData({unitLayananId: authData.userData.unit_layanan_id});

          // Filter using Search Query
          const filteredData = dataWithId.filter(
            (data) =>
              data.obat.toLowerCase().includes(searchQuery.toLowerCase()) ||
              data.satuan_obat.toLowerCase().includes(searchQuery.toLowerCase()) ||
              data.jenis_obat.toLowerCase().includes(searchQuery.toLowerCase())
          );
          setResultQuery(filteredData);
          // console.log("Search Query: ", searchQuery);
        } else if(selectedFilter === "sort-1" || 
                  selectedFilter === "sort-2" || 
                  selectedFilter === "sort-3") {
                  const dataWithId = await fetchData(
                    {
                      unitLayananId: authData.userData.unit_layanan_id
                    }
                  );
                  const filteredData = dataWithId.filter(
                    (data) =>
                      data.obat.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      data.satuan_obat.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      data.jenis_obat.toLowerCase().includes(searchQuery.toLowerCase())
                  );
                  if(selectedFilter === "sort-1") {
                    const sortedData = [...filteredData].sort((a, b) => b.stok - a.stok);
                    setResultQuery(sortedData);
                  } else if(selectedFilter === "sort-2") {
                    const sortedData = [...filteredData].sort((a, b) => a.stok - b.stok);
                    setResultQuery(sortedData);
                  } else {
                    const sortedData = filteredData.filter(
                      (data) => new Date(data.expired) - new Date(getDateNow()) <= 0
                    );
                    setResultQuery(sortedData);
                  }
                  
        } else {
          const dataWithId = await fetchData({medkitId: selectedFilter});

          // Filter using Search Query
          const filteredData = dataWithId.filter(
            (data) =>
              data.obat.toLowerCase().includes(searchQuery.toLowerCase()) ||
              data.satuan_obat.toLowerCase().includes(searchQuery.toLowerCase()) ||
              data.jenis_obat.toLowerCase().includes(searchQuery.toLowerCase())
          );
          setResultQuery(filteredData);
        }
      }
    }
    applyFilter();
  }, [selectedFilter, searchQuery]);

  // This for debugging
  // useEffect(() => {
  //   console.log("Result: ", resultQuery);
  // }, [resultQuery]);

  // useEffect(() => {
  //   console.log("Search Query: ", searchQuery);
  // }, [searchQuery]);

  const renderFilterItem = ({ item }) => {
    const backgroundColor =
      item.id === selectedFilter ? "#4ACDD1" : "#fff";
    const color = item.id === selectedFilter ? "#fff" : "#4ACDD1";

    return (
      <FilterDataItem
        item={item}
        onPress={() => setSelectedFilter(item.id)}
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

          <View style={[styles.contentContainer, styles.lowerContent, { marginBlockEnd: insets.bottom + 40 }]}>
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
                data={resultQuery}
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
