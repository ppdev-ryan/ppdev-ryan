import {BlurView} from '@react-native-community/blur';
import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {
  Image,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import DashedLine from 'react-native-dashed-line';
import normalize from 'react-native-normalize';
import {ListHistory, Number} from '..';
import {IcHide, IcMerchantBlue, IcShow} from '../../../assets';
import {colors, useForm} from '../../../utils';
import {Button, Gap} from '../../atoms';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
import Toast, {BaseToast} from 'react-native-toast-message';

const SlidingUpPanel = ({
  productName,
  phone,
  name,
  bank,
  accountNumber,
  date,
  nominal,
  price,
  show,
  closePopup,
  type,
}) => {
  const navigation = useNavigation();

  const takePhoto = () => {
    launchCamera(
      {
        quality: 0.5,
        maxWidth: 200,
        maxHeight: 200,
      },
      response => {
        if (response.didCancel || response.error) {
          closePopup();
          Toast.show({
            text1: 'Anda tidak memilih photo',
            type: 'errorAlert',
            position: 'bottom',
          });
        } else {
          // closePopup();
          // const source = {uri: response.uri};
          // dispatch({type: 'SET_PHOTO', source});
        }
      },
    );
  };

  const chooseFromLibrary = () => {
    launchImageLibrary(
      {
        quality: 0.5,
        maxWidth: 200,
        maxHeight: 200,
      },
      response => {
        if (response.didCancel || response.error) {
          closePopup();
          Toast.show({
            text1: 'Anda tidak memilih photo',
            type: 'errorAlert',
            position: 'bottom',
          });
        } else {
          closePopup();
          // const source = {uri: response.uri};
          // dispatch({type: 'SET_PHOTO', source});
        }
      },
    );
  };

  const toastConfig = {
    success: ({text1, props, ...rest}) => (
      <BaseToast
        {...rest}
        style={styles.leftSuccess}
        contentContainerStyle={styles.padding}
        text1Style={styles.textAlert}
        text1={text1}
        text2={props.uuid}
      />
    ),

    errorAlert: ({text1, props, ...rest}) => (
      <View style={styles.alertError}>
        <Gap width={8} />
        <Text style={styles.textAlert}>{text1}</Text>
      </View>
    ),
    successAlert: ({text1, props, ...rest}) => (
      <View style={styles.alertSuccess}>
        <Gap width={8} />
        <Text style={styles.textAlert}>{text1}</Text>
      </View>
    ),
  };

  const [isHidden, setIsHidden] = React.useState(true);
  const [form, setForm] = useForm({
    password: '',
  });
  return (
    <>
      <Toast config={toastConfig} ref={ref => Toast.setRef(ref)} />
      {show && <BlurView blurType="dark" blurAmount={1} style={styles.blur} />}
      <Modal
        animationType="slide"
        transparent={true}
        visible={show}
        onRequestClose={() => {}}>
        <Pressable
          onPress={() => {
            if (!true) {
              return;
            }
            closePopup();
          }}
          style={styles.pressable}
        />
        {type === 'Pulsa' && (
          <View style={styles.modal}>
            <Text style={styles.title}>Detail Transaksi</Text>
            <Gap height={16} />
            <View style={styles.row}>
              <Text style={styles.label}>Nomor Ponsel</Text>
              <Text style={styles.value}>{phone}</Text>
            </View>
            <Gap height={8} />
            <View style={styles.row}>
              <Text style={styles.label}>Pulsa</Text>
              <Number number={price} style={styles.value} />
            </View>
            <Gap height={8} />
            <View style={styles.line} />
            <Gap height={24} />
            <Text style={styles.title}>Detail Pembayaran</Text>
            <Gap height={16} />
            <View style={styles.row}>
              <Text style={styles.label}>Harga</Text>
              <Number number={price} style={styles.value} />
            </View>
            <Gap height={8} />
            <View style={styles.row}>
              <Text style={styles.label}>Biaya Transaksi</Text>
              <Number number={1000} style={styles.value} />
            </View>
            <Gap height={8} />
            <DashedLine dashLength={15} dashGap={10} dashColor="#8B8B8B" />
            <Gap height={16} />
            <View style={styles.row}>
              <Text style={styles.totalLabel}>Total Transaksi</Text>
              <Number number={price + 1000} style={styles.total} />
            </View>
            <Gap height={24} />
            <View style={styles.rowButton}>
              <View style={styles.flexOne}>
                <Button
                  text="Ubah"
                  fontFamily="Poppins-Regular"
                  fontSize={14}
                  type="mirror"
                  color={colors.c1}
                />
              </View>
              <Gap width={16} />
              <View style={styles.flexOne}>
                <Button
                  text="Konfirmasi"
                  fontFamily="Poppins-Regular"
                  fontSize={14}
                />
              </View>
            </View>
            <Gap height={24} />
          </View>
        )}

        {type === 'PaketData' && (
          <View style={styles.modal}>
            <Text style={styles.title}>Detail Transaksi</Text>
            <Gap height={16} />
            <View style={styles.row}>
              <Text style={styles.label}>Nomor Ponsel</Text>
              <Text style={styles.value}>{phone}</Text>
            </View>
            <Gap height={8} />
            <View style={styles.line} />
            <Gap height={24} />
            <Text style={styles.title}>Detail Pembayaran</Text>
            <Gap height={16} />
            <View style={styles.row}>
              <Text style={styles.label}>{productName}</Text>
              <Number number={price} style={styles.value} />
            </View>
            <Gap height={8} />
            <View style={styles.row}>
              <Text style={styles.label}>Biaya Transaksi</Text>
              <Number number={1000} style={styles.value} />
            </View>
            <Gap height={8} />
            <DashedLine dashLength={15} dashGap={10} dashColor="#8B8B8B" />
            <Gap height={16} />
            <View style={styles.row}>
              <Text style={styles.totalLabel}>Total Transaksi</Text>
              <Number number={price + 1000} style={styles.total} />
            </View>
            <Gap height={24} />
            <View style={styles.rowButton}>
              <View style={styles.flexOne}>
                <Button
                  text="Ubah"
                  fontFamily="Poppins-Regular"
                  fontSize={14}
                  type="mirror"
                  color={colors.c1}
                />
              </View>
              <Gap width={16} />
              <View style={styles.flexOne}>
                <Button
                  text="Konfirmasi"
                  fontFamily="Poppins-Regular"
                  fontSize={14}
                />
              </View>
            </View>
            <Gap height={24} />
          </View>
        )}

        {type === 'PLN' && (
          <View style={styles.modal}>
            <Text style={styles.title}>Informasi Pelanggan</Text>
            <Gap height={16} />
            <View style={styles.row}>
              <Text style={styles.label}>Nomor Meter</Text>
              <Text style={styles.value}>14047618294</Text>
            </View>
            <Gap height={8} />
            <View style={styles.row}>
              <Text style={styles.label}>Id Pelanggan</Text>
              <Text style={styles.value}>{phone}</Text>
            </View>
            <Gap height={8} />
            <View style={styles.row}>
              <Text style={styles.label}>Nama Pelanggan</Text>
              <Text style={styles.value}>RIDXXX XXXXRTO</Text>
            </View>
            <Gap height={8} />
            <View style={styles.row}>
              <Text style={styles.label}>Tarif / Daya</Text>
              <Text style={styles.value}>R1M/900VA</Text>
            </View>
            <Gap height={8} />
            <View style={styles.line} />
            <Gap height={24} />
            <Text style={styles.title}>Detail Pembayaran</Text>
            <Gap height={16} />
            <View style={styles.row}>
              <Text style={styles.label}>Tagihan Listrik</Text>
              <Number number={200000} style={styles.value} />
            </View>
            <Gap height={8} />
            <View style={styles.row}>
              <Text style={styles.label}>Biaya Transaksi</Text>
              <Number number={2000} style={styles.value} />
            </View>
            <Gap height={8} />
            <DashedLine dashLength={15} dashGap={10} dashColor="#8B8B8B" />
            <Gap height={16} />
            <View style={styles.row}>
              <Text style={styles.totalLabel}>Total Transaksi</Text>
              <Number number={202000} style={styles.total} />
            </View>
            <Gap height={24} />
            <View style={styles.rowButton}>
              <View style={styles.flexOne}>
                <Button
                  text="Ubah"
                  fontFamily="Poppins-Regular"
                  fontSize={14}
                  type="mirror"
                  color={colors.c1}
                />
              </View>
              <Gap width={16} />
              <View style={styles.flexOne}>
                <Button
                  text="Konfirmasi"
                  fontFamily="Poppins-Regular"
                  fontSize={14}
                />
              </View>
            </View>
            <Gap height={24} />
          </View>
        )}

        {type === 'BPJS' && (
          <View style={styles.modal}>
            <Text style={styles.title}>Informasi Pelanggan</Text>
            <Gap height={16} />
            <View style={styles.row}>
              <Text style={styles.label}>Nomor BPJS</Text>
              <Text style={styles.value}>{phone}</Text>
            </View>
            <Gap height={8} />
            <View style={styles.row}>
              <Text style={styles.label}>Nama Pelanggan</Text>
              <Text style={styles.value}>RIDXXX XXXXRTO</Text>
            </View>
            <Gap height={8} />
            <View style={styles.row}>
              <Text style={styles.label}>Sampai dengan</Text>
              <Text style={styles.value}>{date}</Text>
            </View>
            <Gap height={8} />
            <View style={styles.line} />
            <Gap height={24} />
            <Text style={styles.title}>Detail Pembayaran</Text>
            <Gap height={16} />
            <View style={styles.row}>
              <Text style={styles.label}>Jumlah Tagihan</Text>
              <Number number={450000} style={styles.value} />
            </View>
            <Gap height={8} />
            <View style={styles.row}>
              <Text style={styles.label}>Biaya Transaksi</Text>
              <Number number={2000} style={styles.value} />
            </View>
            <Gap height={8} />
            <DashedLine dashLength={15} dashGap={10} dashColor="#8B8B8B" />
            <Gap height={16} />
            <View style={styles.row}>
              <Text style={styles.totalLabel}>Total Transaksi</Text>
              <Number number={452000} style={styles.total} />
            </View>
            <Gap height={24} />
            <View style={styles.rowButton}>
              <View style={styles.flexOne}>
                <Button
                  text="Ubah"
                  fontFamily="Poppins-Regular"
                  fontSize={14}
                  type="mirror"
                  color={colors.c1}
                />
              </View>
              <Gap width={16} />
              <View style={styles.flexOne}>
                <Button
                  text="Konfirmasi"
                  fontFamily="Poppins-Regular"
                  fontSize={14}
                />
              </View>
            </View>
            <Gap height={24} />
          </View>
        )}

        {type === 'Transfer' && (
          <View style={styles.modal}>
            <View style={styles.center}>
              <Text style={styles.title}>Konfirmasi Transfer</Text>
            </View>
            <Gap height={16} />
            <Text style={styles.title}>Penerima</Text>
            <ListHistory
              type="transferBank"
              name={name}
              bank={bank}
              accountNumber={accountNumber}
            />
            <Gap height={16} />
            <Text style={styles.title}>Sumber dana</Text>
            <Gap height={4} />
            <Text style={styles.dana}>
              Saldo <Text style={styles.danaBlue}>Paypas</Text>
            </Text>
            <Gap height={13} />
            <View style={styles.line} />
            <Gap height={16} />
            <Text style={styles.title}>Detail</Text>
            <Gap height={8} />
            <View style={styles.row}>
              <Text style={styles.label}>Nominal Transfer</Text>
              <Number number={nominal} style={styles.value} />
            </View>
            <Gap height={8} />
            <View style={styles.row}>
              <Text style={styles.label}>Biaya Transfer</Text>
              <Number number={2500} style={styles.value} />
            </View>
            <Gap height={8} />
            <DashedLine dashLength={15} dashGap={10} dashColor="#8B8B8B" />
            <Gap height={16} />
            <View style={styles.row}>
              <Text style={styles.totalLabel}>Total</Text>
              <Number number={nominal + 2500} style={styles.total} />
            </View>
            <Gap height={32} />
            <View style={styles.flexOne}>
              <Button
                text="Lanjutkan"
                fontFamily="Poppins-SemiBold"
                fontSize={16}
                borderRadius={12}
                onPress={() => navigation.navigate('Security')}
              />
              <Gap height={16} />
              <View style={styles.center}>
                <Text style={styles.cancel}>Batalkan</Text>
              </View>
            </View>
            <Gap height={44} />
          </View>
        )}

        {type === 'QRIS' && (
          <View style={styles.modal}>
            <View style={styles.center}>
              <Text style={styles.title}>Konfirmasi QRIS</Text>
            </View>
            <Gap height={16} />
            <Text style={styles.title}>Penerima</Text>
            <View style={styles.merchantContainer}>
              <IcMerchantBlue />
              <Gap width={16} />
              <Text style={styles.merchant}>Detacell Infomedia</Text>
            </View>
            <Gap height={16} />
            <Text style={styles.title}>Sumber dana</Text>
            <Gap height={4} />
            <Text style={styles.dana}>
              Saldo <Text style={styles.danaBlue}>Paypas</Text>
            </Text>
            <Gap height={13} />
            <View style={styles.line} />
            <Gap height={16} />
            <Text style={styles.title}>Detail</Text>
            <Gap height={8} />
            <View style={styles.row}>
              <Text style={styles.label}>Nominal Pembayaran</Text>
              <Number number={nominal} style={styles.value} />
            </View>
            <Gap height={8} />
            <View style={styles.row}>
              <Text style={styles.label}>Biaya Transaksi</Text>
              <Number number={2500} style={styles.value} />
            </View>
            <Gap height={8} />
            <DashedLine dashLength={15} dashGap={10} dashColor="#8B8B8B" />
            <Gap height={16} />
            <View style={styles.row}>
              <Text style={styles.totalLabel}>Total</Text>
              <Number number={nominal + 2500} style={styles.total} />
            </View>
            <Gap height={32} />
            <View style={styles.flexOne}>
              <Button
                text="Lanjutkan"
                fontFamily="Poppins-SemiBold"
                fontSize={16}
                borderRadius={12}
                onPress={() => navigation.navigate('PaymentSuccess')}
              />
              <Gap height={16} />
              <View style={styles.center}>
                <Text style={styles.cancel}>Batalkan</Text>
              </View>
            </View>
            <Gap height={44} />
          </View>
        )}

        {type === 'Photo' && (
          <View style={styles.modal}>
            <View style={styles.center}>
              <Text style={styles.title}>Choose Photo!</Text>
            </View>
            <Gap height={24} />
            <View style={styles.photoContainer}>
              <Button
                text="Take photo"
                fontFamily="Poppins-SemiBold"
                fontSize={16}
                onPress={takePhoto}
              />
              <Gap height={16} />
              <Button
                text="Choose from Gallery"
                type="mirror"
                fontFamily="Poppins-SemiBold"
                fontSize={16}
                color={colors.c1}
                onPress={chooseFromLibrary}
              />
            </View>
            <Gap height={24} />
          </View>
        )}
        {type === 'Password' && (
          <View style={styles.modal}>
            <View style={styles.center}>
              <Text style={styles.title}>Ubah kata sandi</Text>
            </View>
            <Gap height={16} />
            <View style={styles.inputContainer}>
              <TextInput
                placeholder="Kata sandi lama"
                style={styles.input}
                placeholderTextColor={colors.c4}
                secureTextEntry={isHidden}
                value={form.password}
                onChangeText={value => setForm('password', value)}
              />
              <Gap width={16} />
              <TouchableOpacity
                style={styles.hide}
                onPress={() => setIsHidden(!isHidden)}>
                {isHidden ? (
                  <Image source={IcShow} style={styles.icon} />
                ) : (
                  <Image source={IcHide} style={styles.icon} />
                )}
              </TouchableOpacity>
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                placeholder="Kata sandi baru"
                style={styles.input}
                placeholderTextColor={colors.c4}
                secureTextEntry={isHidden}
                value={form.password}
                onChangeText={value => setForm('password', value)}
              />
              <Gap width={16} />
              <TouchableOpacity
                style={styles.hide}
                onPress={() => setIsHidden(!isHidden)}>
                {isHidden ? (
                  <Image source={IcShow} style={styles.icon} />
                ) : (
                  <Image source={IcHide} style={styles.icon} />
                )}
              </TouchableOpacity>
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                placeholder="Konfirmasi kata sandi"
                style={styles.input}
                placeholderTextColor={colors.c4}
                secureTextEntry={isHidden}
                value={form.password}
                onChangeText={value => setForm('password', value)}
              />
              <Gap width={16} />
              <TouchableOpacity
                style={styles.hide}
                onPress={() => setIsHidden(!isHidden)}>
                {isHidden ? (
                  <Image source={IcShow} style={styles.icon} />
                ) : (
                  <Image source={IcHide} style={styles.icon} />
                )}
              </TouchableOpacity>
            </View>
            <Gap height={16} />
            <View style={styles.button}>
              <Button
                text="Ubah kata sandi"
                borderRadius={12}
                fontFamily="Poppins-SemiBold"
                fontSize={16}
              />
            </View>
            <Gap height={24} />
          </View>
        )}
      </Modal>
    </>
  );
};

export default SlidingUpPanel;

const styles = StyleSheet.create({
  pressable: {flex: 1},
  blur: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  modal: {
    flex: 1,
    width: '100%',
    position: 'absolute',
    bottom: 0,
    backgroundColor: colors.c3,
    borderTopLeftRadius: normalize(20),
    borderTopRightRadius: normalize(20),
    paddingHorizontal: normalize(15),
    paddingTop: normalize(24),
  },
  title: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: normalize(18),
    color: colors.c5,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rowButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: normalize(13),
  },
  label: {
    fontFamily: 'Poppins-Regular',
    fontSize: normalize(12),
    color: colors.c5,
  },
  value: {
    fontFamily: 'Poppins-Regular',
    fontSize: normalize(12),
    color: colors.c5,
  },
  line: {
    borderBottomWidth: 1,
    borderBottomColor: colors.c9,
  },
  totalLabel: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: normalize(14),
    color: colors.c5,
  },
  total: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: normalize(14),
    color: colors.c5,
  },
  flexOne: {
    flex: 1,
  },
  flexTwo: {
    flex: 2,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  dana: {
    fontFamily: 'Poppins-Regular',
    fontSize: normalize(14),
    color: colors.c6,
    marginLeft: normalize(8),
  },
  danaBlue: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: normalize(14),
    color: colors.c1,
  },
  cancel: {
    fontFamily: 'Poppins-Regular',
    fontSize: normalize(16),
    color: colors.c4,
  },
  merchantContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: normalize(12),
    borderBottomWidth: 0.5,
    borderBottomColor: colors.c9,
  },
  merchant: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: normalize(14),
    color: colors.c6,
  },
  leftSuccess: {
    borderLeftColor: '#C7DAFF',
  },
  padding: {
    paddingHorizontal: normalize(15),
  },
  textAlert: {
    fontFamily: 'Poppins-Regular',
    fontSize: normalize(12),
    color: colors.black,
  },
  alertError: {
    width: '90%',
    height: normalize(56),
    flexDirection: 'row',
    backgroundColor: '#FFE4E3',
    alignItems: 'center',
    paddingHorizontal: normalize(15),
    borderRadius: normalize(10),
  },
  alertSuccess: {
    width: '90%',
    height: normalize(56),
    flexDirection: 'row',
    backgroundColor: '#C7DAFF',
    alignItems: 'center',
    paddingHorizontal: normalize(15),
    borderRadius: normalize(10),
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: normalize(24),
    marginBottom: normalize(16),
    borderWidth: 1,
    borderColor: colors.c9,
    borderRadius: normalize(10),
  },
  input: {
    flex: 1,
    fontFamily: 'Poppins-Regular',
    fontSize: normalize(14),
    color: colors.c5,
    paddingBottom: normalize(12),
  },
  icon: {
    width: normalize(24),
    height: normalize(24),
  },
  button: {
    paddingHorizontal: normalize(42),
  },
});
