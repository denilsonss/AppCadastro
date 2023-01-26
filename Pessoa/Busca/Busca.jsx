import React from "react";
import { ScrollView, View, FlatList } from "react-native";
import { ListItem, Button, Input, Sear, Text } from "@rneui/themed";

import { useGoToTelaInicial } from "../../Utils/Navegacao";
import { callApiPessoas } from "../../Utils/api";

//@rneui/themed
export default function Busca() {
  
  const [cpf, setCpf] = React.useState("");
  const [resultadoBusca, setResultadoBusca] = React.useState([]);

  const onClickBuscar = () => {
    callApiPessoas({
      path: `/${cpf}`
    })
      .then((values) => setResultadoBusca(values))
      .catch((err) =>
        // alert("Nao foi possivel buscar pessoas. Tente novamente mais tarde!" + err)
        alert(err)
      );
  };

  /*const onClickEditar = () => {
    callApiPessoas({
      method: "PUT",
      path: `/${cpf}`
    })
      .then((values) => setResultadoBusca(values))
      .catch((err) =>
        // alert("Nao foi possivel buscar pessoas. Tente novamente mais tarde!" + err)
        alert(err)
      );
  };*/

  /*const onClickDeletar = () => {
    callApiPessoas({
      method: "DELETE",
      path: `/${cpf}`
    })
      .then((values) => setResultadoBusca(values))
      .catch((err) =>
        // alert("Nao foi possivel buscar pessoas. Tente novamente mais tarde!" + err)
        alert(err)
      );
  };*/

  const goToTelaInicial = useGoToTelaInicial();

  return (
    <ScrollView>
      <View>
        <Input label="CPF" onChangeText={(value) => setCpf(value)}/>
        <Button title="Busca" onPress={onClickBuscar} disabled={cpf === '' || cpf == null}/>
        <Button title="Voltar" onPress={goToTelaInicial}/>
      </View>
      <View>
        {resultadoBusca.map((pessoa, index) => (
          <ListItem>
            <ListItem.Content key={index}>
              <ListItem.Title>{`${pessoa.nome}`}</ListItem.Title>
              <Text>{`Email: ${pessoa.email}` }</Text>
              <Text>{`CPF: ${pessoa.cpf}`}</Text>
              <Text>{`Logradouro: ${pessoa.logradouro}, ${pessoa.numero} - CEP: ${pessoa.cep}`}</Text>
            </ListItem.Content>
          </ListItem>
        ))}
      </View>
    </ScrollView>
  );
}
