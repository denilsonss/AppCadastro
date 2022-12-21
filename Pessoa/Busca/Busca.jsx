import React from "react";
import { SafeAreaView, View, FlatList } from "react-native";
import { ListItem, Button, Input, Sear } from "@rneui/themed";

//@rneui/themed
export default function Busca() {
  const pessoas = [
    { id: "1", nome: "Nome 1", email: "email1@email.com", cpf: "12345-611" },
    { id: "2", nome: "Nome 2", email: "email2@email.com", cpf: "22222-612" },
    { id: "3", nome: "Nome 3", email: "email3@email.com", cpf: "33333-613" },
    { id: "4", nome: "Nome 4", email: "email4@email.com", cpf: "44444-614" },
    { id: "5", nome: "Nome 5", email: "email5@email.com", cpf: "98765-615" },
    { id: "6", nome: "Nome 6", email: "email6@email.com", cpf: "32454-616" },
    { id: "7", nome: "Nome 7", email: "email7@email.com", cpf: "12313-617" },
  ];

  const [cpf, setCpf] = React.useState("");
  const [resultadoBusca, setResultadoBusca] = React.useState([]);

  const onClickBuscar = () => {
    setResultadoBusca(pessoas.filter((pessoa) => pessoa.cpf.includes(cpf)));
  };

  return (
    <SafeAreaView>
      <View>
        <Input label="CPF" onChangeText={(value) => setCpf(value)} />
         <Button title="Busca" onPress={onClickBuscar} />
      </View>
      <View>
        {resultadoBusca.map((pessoa, index) => (
          <ListItem>
            <ListItem.Content key={index}>
              <ListItem.Title>{pessoa.nome}</ListItem.Title>
              <ListItem.Subtitle>{pessoa.email}</ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        ))}
      </View>
    </SafeAreaView>
  );
}
