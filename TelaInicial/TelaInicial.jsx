import React from "react";
import { SafeAreaView } from "react-native";
import { Button } from "@rneui/themed";

import { useGoToBusca, useGoToCadastro } from "../utils/Navegacao";

export default function TelaInicial() {
  const goToCadastro = useGoToCadastro();
  const goToBusca = useGoToBusca();

  return (
    <SafeAreaView>
      <Button title="Cadastrar" onPress={goToCadastro} />
      <Button title="Buscar" onPress={goToBusca} />
    </SafeAreaView>
  );
}
