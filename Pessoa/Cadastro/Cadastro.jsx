import React from "react";
import { SafeAreaView } from "react-native";
import { Input, Button } from "@rneui/themed";
import { useFormik } from "formik";
import * as Yup from "yup";
import { addMethod, AnySchema } from "yup";
import { useGoToTelaInicial } from "../../Utils/Navegacao";


Yup.addMethod(Yup.BaseSchema, "cpf", function validaCpf(message) {
  return this.test("cpf", message, function (cpf) {
    if(!cpf) return false;

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

export default function Cadastro() {
  const cadastroSchema = Yup.object().shape({
    nome: Yup.string()
      .min(2, "O nome deve ter pelo menos 2 letras")
      .required("O nome é obrigatorio"),      
    email: Yup.string()
      .email("Email invalido")
      .required("O email é obrigatorio"),
    cpf: Yup.string()
      .matches(/\d{3}\.\d{3}\.\d{3}\-\d{2}/, "CPF inválido").cpf("CPF inválido")
      .required("Cpf é obrigatório"),
    logradouro: Yup.string().required("Logradouro"),
    numero: Yup.string(),
    complemento: Yup.string(),
    cep: Yup.string()
      .matches(/\d{5}\-\d{3}/, "CEP é invalido")
      .required("CEP é obrigatório"),
  });

  const { handleChange, handleSubmit, errors, touched, resetForm } = useFormik({
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
    onSubmit: ({ nome, email, cpf, logradouro, numero, complemento, cep }) =>
    alert(
      `${nome} ${email} ${cpf} ${logradouro} ${numero} ${complemento} ${cep} `
    ),
    
  });

  const goToTelaInicial = useGoToTelaInicial();

  return (
    <SafeAreaView>
      <Input
        label="Nome"
        onChangeText={handleChange("nome")}
        errorMessage={touched.nome && errors.nome}
      />
      <Input
        label="Email"
        onChangeText={handleChange("email")}
        errorMessage={touched.email && errors.email}
        keyboardType="email-address"
      />
      <Input
        label="CPF"
        onChangeText={handleChange("cpf")}
        errorMessage={touched.cpf && errors.cpf}
        maxLength={14}
      />
      <Input
        label="Logradouro"
        onChangeText={handleChange("logradouro")}
        errorMessage={touched.logradouro && errors.logradouro}
      />
      <Input
        label="Numero"
        onChangeText={handleChange("numero")}
        errorMessage={touched.numero && errors.numero}
      />
      <Input
        label="Complemento"
        onChangeText={handleChange("complemento")}
        errorMessage={touched.complemento && errors.complemento}
      />
      <Input
        label="CEP"
        onChangeText={handleChange("cep")}
        errorMessage={touched.cep && errors.cep}
        maxLength={9}
      />
      <Button title="Salvar" onPress={() => alert(handleSubmit())} />
      <Button title="Voltar" onPress={goToTelaInicial} />
    </SafeAreaView>
  );
}
