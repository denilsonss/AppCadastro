import React from "react";
import { ScrollView, View } from "react-native";
import { ListItem, Button, Input, Text } from "@rneui/themed";

import { useGoToTelaInicial } from "../../utils/Navegacao";
import { callApiPessoas } from "../../utils/api";
import { mask } from "react-native-mask-text";
import { CPF_MASK } from "../../utils/masks";

export default function Busca() {
  const [cpf, setCpf] = React.useState("");
  const [nome, setNome] = React.useState("");
  const [resultadoBusca, setResultadoBusca] = React.useState([]);

  const onClickBuscar = () => {
    const params = { cpf, nome };

    callApiPessoas({
      path:
        "?" +
        Object.keys(params)
          .filter((key) => params[key])
          .map((key) => `${key}=${encodeURIComponent(params[key])}`)
          .join("&"),
    })
      .then((values) => setResultadoBusca(values))
      .catch((e) =>
        alert("Nao foi possivel buscar pessoas. Tente novamente mais tarde!")
      );
  };

  const goToTelaInicial = useGoToTelaInicial();

  return (
    <ScrollView>
      <View>
        <Input
          label="CPF"
          value={cpf}
          onChangeText={(value) => setCpf(mask(value, CPF_MASK))}
        />
        <Input label="Nome" onChangeText={(value) => setNome(value)} />
        <Button
          title="Busca"
          onPress={onClickBuscar}
          disabled={
            (cpf === "" || cpf === null) && (nome === "" || nome === null)
          }
        />
        <Button title="Voltar" onPress={goToTelaInicial} />
      </View>
      <View>
        {resultadoBusca.map((pessoa, index) => (
          <ListItem key={index}>
            <ListItem.Content>
              <ListItem.Title>{`${pessoa.nome}`}</ListItem.Title>
              <Text>{`Email: ${pessoa.email}`}</Text>
              <Text>{`CPF: ${pessoa.cpf}`}</Text>
              <Text>{`Logradouro: ${pessoa.logradouro}, ${pessoa.numero} - CEP: ${pessoa.cep}`}</Text>
            </ListItem.Content>
          </ListItem>
        ))}
      </View>
    </ScrollView>
  );
}
