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
  Alert,
  Keyboard,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import Modal from "react-native-modal";
import ExtraDimensions from 'react-native-extra-dimensions-android';
import { useForm, Controller, useFieldArray } from 'react-hook-form';
import {Picker} from '@react-native-picker/picker';
import { KeyboardAwareFlatList } from 'react-native-keyboard-aware-scroll-view';
import axios from "axios";

import { useNavigation } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
// import { isLoaded, useFonts } from "expo-font";

import UseIcons from "../../middleware/tools/useIcons";
import { useAuth, API_URL } from "../../middleware/context/authContext";

// import data dummy
import dataObat from "../../../dummyData/dataObat.json";


const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;


const windowWidthED = ExtraDimensions.getRealWindowWidth();
const windowHeightED = ExtraDimensions.getRealWindowHeight();

const ENDPOINT_URL = "medkit/stockView";

const dummyPatientData = {
  "alamat": "Tokyo",
  "created_at": "2025-08-29T08:43:19.000000Z",
  "diagnosa": "Demam",
  "email": "koyuki.soryu@mail.com",
  "gol_darah": "AB",
  "hubungan_kk": "Istri",
  "id": 125,
  "jenis_kelamin": "P",
  "keluhan": "Badan Panas",
  "nama_kk": "Hakuji",
  "nama_lengkap": "Koyuki Keizo",
  "nik": "1201456700",
  "no_hp": "0897654321",
  "nomor_rm": "RM777777",
  "pekerjaan": "Ibu Rumah Tangga",
  "status_nikah": "Menikah",
  "tanggal_lahir": "2010-08-25",
  "tempat_lahir": "Tokyo",
  "umur": 15,
  "updated_at": "2025-08-29T08:43:19.000000Z"
};

// Component for Medicine Entry Item
const MedicineEntryItem = ({ item, index, action, isCartList, addToMedList, formController, handleQuantity }) => (
  <View style={[isCartList === true ? styles.medicineCartEntry : styles.medicineEntry,]}>
    <View style={{ flex: 1 }}>
      <Text style={[styles.medText, { fontSize: 14 }]}>{item.obat}</Text>
      <View style={[{ flexDirection: "row", alignItems: "center" }]}>
        <Text style={[styles.normalText, { fontSize: 12 }]}>
          {item.satuan_obat}
        </Text>
        <Text style={{ fontSize: 20, marginInline: 3.5 }}>•</Text>
        <Text style={[styles.normalText, { fontSize: 12 }]}>
          {item.jenis_obat}
        </Text>
      </View>
    </View>
    {isCartList === true ? ( // Untuk Cart system list
        <>
      <Controller
        control={formController}
        name={`selectedMedicines.${index}.selectedQuantity`}
        rules={{
          required: "Wajib",
          min: { value: 0, message: "Min. 0" }, // Ubah min ke 0 agar bisa dihapus
          max: { value: item.stok, message: `Max. ${item.stok}` },
          pattern: {
            value: /^[0-9]+$/,
            message: "Angka"
          }
        }}
        render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
          <View style={[styles.quantityControl, {flex: 1, flexDirection: "row", justifyContent: "flex-end", alignItems: "center"}]}>
            {/* Tombol Kurang */}
            <Pressable
              style={[styles.quantityMinusButton, {marginInlineEnd: 25}]}
              onPress={() => handleQuantity(index, 'decrement', value, item.stok)}
              disabled={value <= 0} // Nonaktifkan jika 0
            >
              <UseIcons
                name="minus"
                set="Entypo"
                size={13}
                color="black"
              />
            </Pressable>

            {/* Input Manual */}
            <TextInput
              style={[styles.medText, styles.quantityInput, {fontSize: 20},error && styles.inputError]}
              onBlur={onBlur}
              // Saat input manual, panggil handleQuantityChange dengan tipe 'manual'
              onChangeText={(text) => handleQuantity(index, 'manual', text, item.stok)}
              value={value ? String(value) : ''} // Konversi ke string untuk TextInput
              keyboardType="numeric"
              textAlign="center" // Rata tengah teks input
            />

            {/* Tombol Tambah */}
            <Pressable
              style={[styles.quantityPlusButton, {marginInlineStart: 25}]}
              onPress={() => handleQuantity(index, 'increment', value, item.stok)}
              disabled={value >= item.stok} // Nonaktifkan jika sudah mencapai stok maksimal
            >
              <UseIcons
                name="plus"
                set="Octicons"
                size={13}
                color={value >= item.stok ? "#888888" : "Black"}
              />
            </Pressable>

            {/* Pesan Error */}
            {error && <Text style={styles.errorMessage}>{error.message}</Text>}
          </View>
        )}
      />
        </>    
      ) : ( // List obat
        <>
          <View style={{ flex: 1, alignItems: "center" }}>
            <Text style={[styles.normalText, { fontSize: 12 }]}>{item.stok > 0 ? "Tersedia" : "Tidak Tersedia"}</Text>
            <Text style={[styles.medText, { fontSize: 14 }]}>
              {item.stok} Pcs
            </Text>
          </View>
          <Pressable
            onPress={() => {addToMedList(item)}}
          >
            <UseIcons name="add-button" set="Custom" size={20} stroke="#4ACDD1" />
          </Pressable>
        </>   
      )
    }

  </View>
);

// Component for Confirmation Modal
const ComfirmationModal = ({isVisible, setVisibility, 
                            thisModalFor, setThisModalFor, 
                            medkitData, 
                            selectedMedkit, setSelectedMedkit,
                            action}) => (
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
      <View style={
                    [
                      styles.modalContentContainer, 
                      {
                        alignItems:"center",
                        justifyContent:"center"
                      }
                    ]
                  }
      >
        {
          thisModalFor === "confirmation" ? (  // Modal for Submission Confirmation
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
                    style={[styles.button, styles.negativeButton, {borderRadius: 10, height: 28, paddingBlock: 0}]}
                    onPress={() => {setVisibility(false)}}
                  >
                    <Text style={[styles.medText,{fontSize: 12, color:"#4ACDD1"}]}>Batal</Text>
                  </Pressable>
                  <Pressable
                    style={[styles.button, styles.positiveButton, {borderRadius: 10, height: 28, paddingBlock: 0}]}
                    onPress={()=> {
                      action();
                      setVisibility(false);
                    }}
                  >
                    <Text style={[styles.medText,{fontSize: 12, color:"#FFF"}]}>Konfirmasi</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          ) : ( // Modal for choosing Emergency Kits Source
            <View style={[styles.modalContentWrapper, {paddingInline: 20, paddingBlock: 31, borderRadius: 16,backgroundColor: "#FFF"}]}> 
              <View style={[styles.modalContent,{alignItems:"center", justifyContent:"center", gap: 20, paddingInline: 12}]}>
                <View style={{alignItems: "center", gap: 8}}>
                  <Text style={[styles.medText, {fontSize: 16,}]}>Mau ambil obat dari mana?</Text>
                  <Text style={[styles.normalText, {fontSize: 14, textAlign: "center", lineHeight: 14.4}]}>Pilih dari Emergency Kit yang mana, anda akan mengambil obat untuk pasien</Text>
                </View>

                <View style={[styles.medkitSelection, {flexDirection: "row", alignItems: "center", borderWidth: 1, borderColor: "#4ACDD1", borderRadius: 15, overflow: "hidden"}]}>
                  <Picker
                    selectedValue={selectedMedkit}
                    onValueChange={(itemValue, itemIndex) => setSelectedMedkit(itemValue)}
                    style={{ flex: 1 }}
                    mode="dropdown"
                  >
                    <Picker.Item label="-- Pilih Medkit --" value="" />
                    {medkitData.map((item) => (
                      <Picker.Item key={item.id} label={item.nama} value={item.id}/>
                    ))}
                  </Picker>
                  <Pressable
                    style={[styles.button, styles.positiveButton, {backgroundColor: selectedMedkit === "" || selectedMedkit === undefined ? "#888888" : "#4ACDD1"}]}
                    onPress={()=> {
                      setVisibility(false);
                      setThisModalFor("confirmation");
                    }}
                    disabled={selectedMedkit === undefined || selectedMedkit === ""}
                  >
                      <UseIcons name="arrow-right" set="FontAwesome6" 
                                size={14} color="white"
                      />
                  </Pressable>
                </View>
              </View>
            </View>
          )
        }
      </View>
    </Modal>
);

// Default export
export default function MedicinePicker({ route }) {
  const {authData} = useAuth();
  const userData =  authData.userData;
  const [isKeyboardAppear, setIsKeyboardAppear] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  useEffect(() => {
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', (k) => {
      setIsKeyboardAppear(false);
      setKeyboardHeight(k.endCoordinates.height);
    });

    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', (k) => {
      setIsKeyboardAppear(true);
      setKeyboardHeight(k.endCoordinates.height);
    });
    return () => {
      keyboardDidHideListener.remove(); // Membersihkan event listener saat komponen dilepas
      keyboardDidShowListener.remove();
    };
  }, []);
  // useEffect(() => { // Debugging keyboard
  //   console.log("Is Keyboard Appear? ", isKeyboardAppear);
  //   if(isKeyboardAppear) {
  //     console.log("Keyboard Height: ", keyboardHeight);
  //   };
  // }, [isKeyboardAppear])

  const [requestRefresh, setRequestRefresh] = useState(false);
  const [medkitData, setMedkitData] = useState();
  const [selectedMedkit, setSelectedMedkit] = useState();
  const [medicineData, setMedicineData] = useState();
  useEffect(() => {
    const fetchMedkitData = async() => {
      try {
        // console.log("Fetching medkit data for unit_layanan_id: ");
        const response = await axios.get(`${API_URL}/medkit/show`);
        // console.log("Adding to medkitData state......");
        //console.log("Medkit Data: ", response.data.medkitData);
        const filteredMedkitData = response.data.medkitData.filter(
          (item) => item.unit_layanan_id === userData.unit_layanan_id
        );
        //console.log("Filtered Medkit Data: ", filteredMedkitData);
        setMedkitData(filteredMedkitData);
      } catch (error) {
        console.error("Error fetching medkit data:", error);
      }
    };
    fetchMedkitData();
  }, []); 

  const [searchQuery, setSearchQuery] = useState("");
  useEffect(() => { // Fetching Medicine Data by Emergency Kit ID
    console.log("Selected Medkit ID: ", selectedMedkit);
    if(selectedMedkit) {
      const fetchMedicineData = async() => {
        
        try {
          const response = await axios.get(`${API_URL}/${ENDPOINT_URL}`,
                          {
                            params: {medkitId: selectedMedkit}
                          }
          );
          //console.log("Medicine RAW data: ", response.data.data)
          const filteredData= response.data.data.filter(
            (data) =>
              data.obat.toLowerCase().includes(searchQuery.toLowerCase()) ||
              data.satuan_obat.toLowerCase().includes(searchQuery.toLowerCase()) ||
              data.jenis_obat.toLowerCase().includes(searchQuery.toLowerCase())
          );
          // console.log("Medicine Filtered by Search Keyword: ", filteredData);
          setMedicineData(filteredData);
          if(requestRefresh) {
            setRequestRefresh(false);
          }
        } catch (error) { 
          console.log("There is an Error, Please Check Your Phone!");
        }
      };
      fetchMedicineData();
    }
  }, [selectedMedkit, searchQuery, requestRefresh]);

  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
  console.log("Window Width: ", windowWidth, ",Window Height: ", windowHeight, " from Dimension");
  console.log("Window Width: ", windowWidthED, ",Window Height: ", windowHeightED, " from ExtraDimension");
  

  const { control, handleSubmit, setValue, getValues } = useForm({
    defaultValues: {
      selectedMedicines: []
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "selectedMedicines",
    keyName: "formId"
  });

  const addToMedList = (obat) => {
    const existingIndex = fields.findIndex(item => item.obat_id === obat.obat_id); // Checking is Medicine already on list or not

    if (existingIndex > -1) {
      const currentQuantity = getValues(`selectedMedicines.${existingIndex}.selectedQuantity`);
      const newQuantity = currentQuantity + 1;

      if (newQuantity > obat.stok) {
        Alert.alert("Stok Habis", `Maaf, stok ${obat.obat} hanya tersedia ${obat.stok} PCs.`);
        return;
      }
      setValue(`selectedMedicines.${existingIndex}.selectedQuantity`, newQuantity);
    } else {
      if (obat.stok <= 0) {
        Alert.alert("Maaf", `${obat.obat} tidak tersedia saat ini.`);
        return;
      }
      append({
        ...obat,
        selectedQuantity: 1
      });
    }
  };

  const medicineQuantityChange = (index, type, currentValue, maxStock) => {
    let newQuantity = parseInt(currentValue) || 0;

    if (type === 'increment') {
      newQuantity += 1;
    } else if (type === 'decrement') {
      newQuantity -= 1;
    }
    
    if (newQuantity > maxStock) {
      Alert.alert("Stok Habis", `Kuantitas maksimal adalah ${maxStock} PCs.`);
      newQuantity = maxStock;
    }
    console.log("Kuantitas obat sekarang: ", newQuantity);


    if (newQuantity <= 0) {
      remove(index);
    } else {
      setValue(`selectedMedicines.${index}.selectedQuantity`, newQuantity);
    }
  };

  const onSubmitCart = async(data) => {
    try {
      const createRetrieval = await axios.post(`${API_URL}/medicine/createRetrieval`,
                              {
                                emergency_kit_id: selectedMedkit,
                                pasien_id: dummyPatientData.id,
                                keterangan: `Pengambilan Obat untuk Pasien ${dummyPatientData.nama_lengkap}`
                              }
      );
      console.log("Creating Retrival Medicine Success !, data: ",createRetrieval.data);
      for(const item of data.selectedMedicines) {
        try {
          console.log("Obat Id, ", item.obat_id);
          const getMedicine = await axios.put(`${API_URL}/medkit/getMedicine`,
                          {
                            pengambilan_id: createRetrieval.data.data.id,
                            jumlah: item.selectedQuantity,
                            keterangan: `Pengambilan Obat untuk Pasien ${dummyPatientData.nama_lengkap}`,
                            obatId: item.obat_id,
                          }
          );
          console.log(`Submitting Data for ${item.obat} success !, detail: `, getMedicine.data);
        } catch(error) {
          console.log(`There is an Error while Submitting Data for ${item.obat}, Check your phone or console log !`, error);
        }
      };
      Alert.alert(
        "Berhasil Upload!", // Title
        "Data telah terunggah ke server dan database", // isi pesan, jan sampe kosong -> memicu error ReactNativeReadableArray
        [
          {
            text: "OK",
            onPress: () => {
              setValue('selectedMedicines', []);
              setRequestRefresh(true);
            }
          }
        ]
      );
    } catch (error) {
      console.log("There is an Error while Creating Medicine Retrieval, Check your phone or console log !")
    }
  };

  const [isModalVisible, setModalVisible] = useState(true);
  const [modalMode, setModalMode] = useState("choose-medkitId");

  const filteredDataObat = dataObat.filter(
    (obat) =>
      obat.namaObat.toLowerCase().includes(searchQuery.toLowerCase()) ||
      obat.bentukFisikObat.toLowerCase().includes(searchQuery.toLowerCase()) ||
      obat.jenisKhasiatObat.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const [isMedicineHasBeenChoosen, setIsMedicineHasBeenChoosen] = useState(false);

  const renderMedicineEntry = ({ item }) => {
    return (
      <MedicineEntryItem item={item} action={setIsMedicineHasBeenChoosen} isCartList={false} addToMedList={addToMedList}/>
    );
  };

  const renderMedicineCartEntry = ({ item, index }) => {
    return (
      <MedicineEntryItem item={item} index={index} isCartList={true} formController={control} handleQuantity={medicineQuantityChange}/>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#F7F9FC", }}>
    
    {
    medkitData && 
      <ComfirmationModal isVisible={isModalVisible} 
                          setVisibility={setModalVisible}
                          thisModalFor={modalMode} 
                          setThisModalFor={setModalMode} 
                          action={handleSubmit(onSubmitCart)}
                          medkitData={medkitData}
                          selectedMedkit={selectedMedkit}
                          setSelectedMedkit={setSelectedMedkit}
      />
    }

      <View style={[{flex: 1},styles.container]}>
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
              { flex: 1, gap: 10, paddingInline: 16 },
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
            {(medkitData && modalMode === "confirmation") && 
              <View style={{ gap: 20, }}>
                <View style={{borderRadius: 10, backgroundColor: "#4ACDD1" }}>
                  <Picker
                    selectedValue={selectedMedkit}
                    onValueChange={(itemValue, itemIndex) => {setSelectedMedkit(itemValue); setRequestRefresh(true);}}
                    style={{ width: "100%", color: "white"}}
                    mode="dropdown"
                  >
                    {medkitData.map((item) => (
                      <Picker.Item key={item.id} label={item.nama} value={item.id}/>
                    ))}
                  </Picker>
                </View>
                {!requestRefresh && 
                <FlatList
                  data={medicineData}
                  renderItem={renderMedicineEntry}
                  keyExtractor={(item) => item.obat_id}
                  showsVerticalScrollIndicator={true}
                  contentContainerStyle={{ gap: 8, paddingBlockEnd: 8}}
                />
                }

              </View>
            }

          </View>
          <View style={[styles.medicineCartWrapper, {marginBottom: keyboardHeight}]}>
            <View>
              <Text style={[styles.normalText, {fontSize: 14}]}>Daftar Resep Obat</Text>
              {fields.length > 0 && (
              <View style={[styles.medicineSelectedListWrapper, {maxHeight: 180, paddingBlockStart: 20}]}>
                <FlatList
                  data={fields}
                  renderItem={renderMedicineCartEntry}
                  keyExtractor={(item) => item.formId}
                  showsVerticalScrollIndicator={true}
                />
              </View>
              )}
            </View>
            <Pressable 
              style={[styles.saveButton]}
              onPress={() => {setModalVisible(true)}}
            >
              <Text style={[styles.medText, { fontSize: 14, color: "#fff" }]}>
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
    fontSize: 16,
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
  medicineCartEntry: {
    paddingInline: 10,
    paddingBlock: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    borderBottomWidth: 1,
    borderBottomColor: "#EDEDED",
  },
  medicineCartWrapper: {
    gap: 20,
    maxHeight: "50%",
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
    paddingInline: 12,
    paddingBlock: 17, 
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
  formInput: {
    borderWidth: 1,
    borderColor: "#EDEDED",
    borderRadius: 12,
    justifyContent: "center",
    paddingLeft: 10,
  }
});
