import {Alert, SafeAreaView, ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import { Formik } from 'formik';
import { Input , Button, Toggle } from '@ui-kitten/components';
import * as Yup from 'yup';

const FormikYup = () => {

    // Doğrulama şeması
    const registerSchema = Yup.object().shape({
        name: Yup.string().required("Zorunlu Alan"),
        surname: Yup.string().required("Zorunlu Alan"),
        email: Yup.string().email("Geçerli bir e-mail adresi giriniz").required("Zorunlu Alan"),
        phone: Yup.string().matches(/^[0-9]{10}$/, "Geçerli bir telefon numarası giriniz").required("Zorunlu Alan"),
        password: Yup.string().min(6, "Şifre en az 6 karakter olmalıdır").required("Zorunlu Alan"),
        passwordConfirmation: Yup.string()
            .oneOf([Yup.ref('password'), null], "Şifreler uyuşmuyor")
            .required("Zorunlu Alan"),
        agrementConfirm: Yup.bool().oneOf([true], "Kayıt için sözleşmeyi onaylamanız gerekmektedir").required("Zorunlu Alan"),
    });

    return (
        <View style={styles.container}>
            <SafeAreaView>
                <View style={{padding: 20, backgroundColor: "#00e096", minHeight: 125, justifyContent: "flex-end", alignItems: "center"}}>
                    <Text style={{fontSize: 20, fontWeight: "bold", color: "white"}}>KAYIT OLUŞTUR</Text>
                </View>
            </SafeAreaView>

            <View style={{flex: 1, padding: 10}}>
                <ScrollView>
                    <Formik
                        initialValues={{ email: '', name: '', surname: '', phone: '', password: '', passwordConfirmation: '', agrementConfirm: false }}
                        validationSchema={registerSchema}
                        onSubmit={values => Alert.alert("Form Değerleri", JSON.stringify(values, null, 2))}
                    >
                        {({handleChange, handleSubmit, values, errors, setFieldValue}) => (
                            <View>
                                <Input
                                    size='large'
                                    style={{marginVertical: 10}}
                                    value={values.name}
                                    label={"İsim"}
                                    placeholder='İsim giriniz...'
                                    onChangeText={handleChange("name")}
                                    status={errors.name ? "danger" : "basic"}
                                    caption={errors.name}
                                />
                                <Input
                                    size='large'
                                    style={{marginVertical: 10}}
                                    value={values.surname}
                                    label={"Soyad"}
                                    placeholder='Soyad giriniz...'
                                    onChangeText={handleChange("surname")}
                                    status={errors.surname ? "danger" : "basic"}
                                    caption={errors.surname}
                                />
                                <Input
                                    size='large'
                                    style={{marginVertical: 10}}
                                    value={values.email}
                                    label={"E-mail"}
                                    placeholder='E-mail giriniz...'
                                    onChangeText={handleChange("email")}
                                    status={errors.email ? "danger" : "basic"}
                                    caption={errors.email}
                                />
                                <Input
                                    size='large'
                                    style={{marginVertical: 10}}
                                    value={values.phone}
                                    label={"Tel"}
                                    placeholder='Telefon numarası giriniz...'
                                    onChangeText={handleChange("phone")}
                                    status={errors.phone ? "danger" : "basic"}
                                    caption={errors.phone}
                                />
                                <Input
                                    size='large'
                                    style={{marginVertical: 10}}
                                    value={values.password}
                                    label={"Şifre"}
                                    placeholder='Şifre giriniz...'
                                    onChangeText={handleChange("password")}
                                    status={errors.password ? "danger" : "basic"}
                                    caption={errors.password}
                                    secureTextEntry
                                />
                                <Input
                                    size='large'
                                    style={{marginVertical: 10}}
                                    value={values.passwordConfirmation}
                                    label={"Şifre Tekrar"}
                                    placeholder='Şifre tekrarını giriniz...'
                                    onChangeText={handleChange("passwordConfirmation")}
                                    status={errors.passwordConfirmation ? "danger" : "basic"}
                                    caption={errors.passwordConfirmation}
                                    secureTextEntry
                                />

                               
                                    <Toggle style={{marginHorizontal:5}}
                                        checked={values.agrementConfirm}
                                        onChange={(value) => setFieldValue("agrementConfirm", value)}
                                    >
                                   Kullanıcı sözleşmesini ve gizlilik anlaşmasını kabul ediyorum.
                                    </Toggle>
                                    {errors.agrementConfirm && <Text style={{color: 'red'}}>{errors.agrementConfirm}</Text>}
                               

                                <Button
                                    style={{marginTop: 30}}
                                    onPress={handleSubmit}
                                    status='success'
                                >
                                    KAYDET
                                </Button>
                            </View>
                        )}
                    </Formik>
                </ScrollView>
            </View>
        </View>
    );
};

export default FormikYup;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
