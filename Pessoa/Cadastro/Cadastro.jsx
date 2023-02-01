import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Input, Button } from "@rneui/themed";
import { useFormik } from "formik";
import { mask } from "react-native-mask-text";
import * as Yup from "yup";

import { useGoToTelaInicial } from "../../utils/Navegacao";
import { callApiPessoas } from "../../utils/api";
import { CEP_MASK, CPF_MASK } from "../../utils/masks";

Yup.addMethod(Yup.BaseSchema, "cpf", function validaCpf(message) {
  return this.test("cpf", message, function (cpf) {
    if (!cpf) return false;

    cpf = cpf.replace(/[^\d]+/g, ""); //tira os tracos e pontos
    if (cpf == "") return false;

    const cpfValoresUnicos = new Set(cpf);
    if (cpfValoresUnicos.size < 1) return false;

    // Valida 1o digito
    let add = 0;
    for (let i = 0; i < 9; i++) add += parseInt(cpf.charAt(i)) * (10 - i);
    let rev = 11 - (add % 11);
    if (rev == 10 || rev == 11) rev = 0;
    if (rev != parseInt(cpf.charAt(9))) return false;
    // Valida 2o digito
    add = 0;
    for (let i = 0; i < 10; i++) add += parseInt(cpf.charAt(i)) * (11 - i);
    rev = 11 - (add % 11);
    if (rev == 10 || rev == 11) rev = 0;
    if (rev != parseInt(cpf.charAt(10))) return false;
    return true;
  });
});

const style = StyleSheet.create({
  form: {
    marginBottom: 16,
  },
});

export default function Cadastro() {
  const cadastroSchema = Yup.object().shape({
    nome: Yup.string()
      .min(2, "O nome deve ter pelo menos 2 letras")
      .required("O nome é obrigatorio"),
    email: Yup.string()
      .email("Email invalido")
      .required("O email é obrigatorio"),
    cpf: Yup.string()
      .matches(/\d{3}\.\d{3}\.\d{3}\-\d{2}/, "CPF inválido")
      .cpf("CPF inválido")
      .required("Cpf é obrigatório"),
    logradouro: Yup.string().required("Logradouro"),
    numero: Yup.string(),
    complemento: Yup.string(),
    cep: Yup.string()
      .matches(/\d{5}\-\d{3}/, "CEP é invalido")
      .required("CEP é obrigatório"),
  });

  const {
    handleChange,
    handleSubmit,
    setFieldValue,
    values,
    handleReset,
    errors,
    touched,
  } = useFormik({
    initialValues: {
      nome: "",
      email: "",
      cpf: "",
      logradouro: "",
      numero: "",
      complemento: "",
      cep: "",
    },
    validationSchema: cadastroSchema,
    onSubmit: ({ nome, email, cpf, logradouro, numero, complemento, cep }) => {
      callApiPessoas({
        method: "POST",
        body: {
          nome,
          cpf,
          email,
          logradouro,
          numero,
          complemento,
          cep,
        },
      })
        .then(() => {
          alert(`${nome} salvo com sucesso!`);
          handleReset();
        })
        .catch(() => {
          alert("Ocorreu um erro, tente novamente mais tarde!");
        });
    },
  });

  const goToTelaInicial = useGoToTelaInicial();
  return (
    <ScrollView>
      <View style={style.form}>
        <Input
          label="Nome"
          placeholder="Nome"
          value={values.nome}
          onChangeText={handleChange("nome")}
          errorMessage={touched.nome && errors.nome}
        />

        <Input
          placeholder="Email"
          label="Email"
          value={values.email}
          onChangeText={handleChange("email")}
          errorMessage={touched.email && errors.email}
          keyboardType="email-address"
        />

        <Input
          label="CPF"
          value={values.cpf}
          onChangeText={(value) => {
            const maskedValue = mask(value, CPF_MASK);
            setFieldValue("cpf", maskedValue);
          }}
          errorMessage={touched.cpf && errors.cpf}
          maxLength={14}
          keyboardType="number-pad"
        />

        <Input
          label="Logradouro"
          value={values.logradouro}
          onChangeText={handleChange("logradouro")}
          errorMessage={touched.logradouro && errors.logradouro}
        />

        <Input
          label="Numero"
          value={values.numero}
          onChangeText={handleChange("numero")}
          errorMessage={touched.numero && errors.numero}
        />

        <Input
          label="Complemento"
          value={values.complemento}
          onChangeText={handleChange("complemento")}
          errorMessage={touched.complemento && errors.complemento}
        />

        <Input
          label="CEP"
          value={values.cep}
          onChangeText={(value) => {
            const maskedValue = mask(value, CEP_MASK);
            setFieldValue("cep", maskedValue);
          }}
          errorMessage={touched.cep && errors.cep}
          maxLength={9}
          keyboardType="number-pad"
        />
      </View>

      <Button title="Salvar" onPress={handleSubmit} />
      <Button title="Voltar" onPress={goToTelaInicial} />
    </ScrollView>
  );
}
