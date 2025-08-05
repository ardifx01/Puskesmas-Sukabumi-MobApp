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
} from "react-native";
import Collapsible from "react-native-collapsible";
import { FlatList } from "react-native-gesture-handler";
import Modal from "react-native-modal";
import ExtraDimensions from 'react-native-extra-dimensions-android';
import { useForm, Controller, useFieldArray } from 'react-hook-form';

import { useNavigation } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { LinearGradient } from "expo-linear-gradient";
// import { isLoaded, useFonts } from "expo-font";

import UseIcons from "../../middleware/tools/useIcons";

// import data dummy
import dataObat from "../../../dummyData/dataObat.json";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const windowWidthED = ExtraDimensions.getRealWindowWidth();
const windowHeightED = ExtraDimensions.getRealWindowHeight();

// Component for Medicine Entry Item
const MedicineEntryItem = ({ item, index, action, isCartList, addToMedList, formController, handleQuantity }) => (
  <View style={[isCartList === true ? styles.medicineCartEntry : styles.medicineEntry,]}>
    <View style={{ flex: 1 }}>
      <Text style={[styles.medText, { fontSize: 14 }]}>{item.namaObat}</Text>
      <View style={[{ flexDirection: "row", alignItems: "center" }]}>
        <Text style={[styles.normalText, { fontSize: 12 }]}>
          {item.bentukFisikObat}
        </Text>
        <Text style={{ fontSize: 20, marginInline: 3.5 }}>•</Text>
        <Text style={[styles.normalText, { fontSize: 12 }]}>
          {item.jenisKhasiatObat}
        </Text>
      </View>
    </View>
    {isCartList === true ? (
        <>
      <Controller
        control={formController}
        name={`selectedMedicines.${index}.selectedQuantity`}
        rules={{
          required: "Wajib",
          min: { value: 0, message: "Min. 0" }, // Ubah min ke 0 agar bisa dihapus
          max: { value: item.jumlahObat, message: `Max. ${item.jumlahObat}` },
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
              onPress={() => handleQuantity(index, 'decrement', value, item.jumlahObat)}
              disabled={value <= 0} // Nonaktifkan jika 0
            >
              <UseIcons
                name="minus"
                set="Entypo"
                size={13}
                color="#BBBBBB"
              />
            </Pressable>

            {/* Input Manual */}
            <TextInput
              style={[styles.medText, styles.quantityInput, {fontSize: 20},error && styles.inputError]}
              onBlur={onBlur}
              // Saat input manual, panggil handleQuantityChange dengan tipe 'manual'
              onChangeText={(text) => handleQuantity(index, 'manual', text, item.jumlahObat)}
              value={value ? String(value) : ''} // Konversi ke string untuk TextInput
              keyboardType="numeric"
              textAlign="center" // Rata tengah teks input
            />

            {/* Tombol Tambah */}
            <Pressable
              style={[styles.quantityPlusButton, {marginInlineStart: 25}]}
              onPress={() => handleQuantity(index, 'increment', value, item.jumlahObat)}
              disabled={value >= item.jumlahObat} // Nonaktifkan jika sudah mencapai stok maksimal
            >
              <UseIcons
                name="plus"
                set="Octicons"
                size={13}
                color="#BBBBBB"
              />
            </Pressable>

            {/* Pesan Error */}
            {error && <Text style={styles.errorMessage}>{error.message}</Text>}
          </View>
        )}
      />
        </>    
      ) : (
        <>
          <View style={{ flex: 1, alignItems: "center" }}>
            <Text style={[styles.normalText, { fontSize: 12 }]}>{item.jumlahObat > 0 ? "Tersedia" : "Tidak Tersedia"}</Text>
            <Text style={[styles.medText, { fontSize: 14 }]}>
              {item.jumlahObat} PCs
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
              <Pressable
                style={[styles.button, styles.positiveButton]}
                onPress={()=> {
                  actionYes();
                  setVisibility(false);
                }}
              >
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
    const existingIndex = fields.findIndex(item => item.id === obat.id); // Checking is Medicine already on list or not

    if (existingIndex > -1) {
      const currentQuantity = getValues(`selectedMedicines.${existingIndex}.selectedQuantity`);
      const newQuantity = currentQuantity + 1;

      // Validasi agar tidak melebihi stok asli
      if (newQuantity > obat.jumlahObat) {
        Alert.alert("Stok Habis", `Maaf, stok ${obat.namaObat} hanya tersedia ${obat.jumlahObat} PCs.`);
        return;
      }
      setValue(`selectedMedicines.${existingIndex}.selectedQuantity`, newQuantity);
    } else {
      if (obat.jumlahObat <= 0) {
        Alert.alert("Maaf", `${obat.namaObat} tidak tersedia saat ini.`);
        return;
      }
      append({
        ...obat,
        selectedQuantity: 1 // Kuantitas awal saat ditambahkan
      });
    }
  };

  const medicineQuantityChange = (index, type, currentValue, maxStock) => {
    let newQuantity = parseInt(currentValue) || 0; // Pastikan ini angka, default 0 jika input kosong/invalid

    if (type === 'increment') {
      newQuantity += 1;
    } else if (type === 'decrement') {
      newQuantity -= 1;
    }

    // Validasi: kuantitas tidak boleh melebihi stok
    if (newQuantity > maxStock) {
      Alert.alert("Stok Habis", `Kuantitas maksimal adalah ${maxStock} PCs.`);
      newQuantity = maxStock; // Kembalikan ke stok maksimal
    }

    // Jika kuantitas menjadi 0, hapus item dari keranjang
    if (newQuantity <= 0) { // Gunakan <= 0 untuk menangani input manual 0 juga
      remove(index);
    } else {
      // Perbarui nilai kuantitas di react-hook-form
      setValue(`selectedMedicines.${index}.selectedQuantity`, newQuantity);
    }
  };

  const onSubmitCart = (data) => {
    Alert.alert("Data Keranjang yang Disimpan:", JSON.stringify(data.selectedMedicines, null, 2), [
      {
        text: "OK",
        onPress: () => {
          // Lakukan sesuatu setelah menyimpan, misalnya reset keranjang
          setValue('selectedMedicines', []); // Mengosongkan keranjang
        }
      }
    ]);
    // Di sini Anda bisa mengirimkan data ke API atau database
  };

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
    
      <ComfirmationModal isVisible={isModalVisible} setVisibility={setModalVisible} actionYes={handleSubmit(onSubmitCart)}/>
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
              contentContainerStyle={{ gap: 8, paddingBlockEnd: 8}}
              
            />
          </View>
          <View style={[styles.medicineCartWrapper]}>
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
