import { ThemeProvider } from "@rneui/themed";
import { StyleSheet, SafeAreaView, StatusBar } from "react-native";
import { NativeRouter, Route, Routes } from "react-router-native";

import Cadastro from "./Pessoa/Cadastro/Cadastro.screen";
import TelaInicial from "./TelaInicial/TelaInicial.screen";
import Busca from "./Pessoa/Busca/Busca.screen";

export default function App() {
  return (
    <NativeRouter>
      <ThemeProvider>
        <SafeAreaView style={style.container}>
          <Routes>
            <Route exact path="/" element={<TelaInicial />} />
            <Route path="/cadastro" element={<Cadastro />} />
            <Route path="/busca" element={<Busca />} />
          </Routes>
          <StatusBar style="auto" />
        </SafeAreaView>
      </ThemeProvider>
    </NativeRouter>
  );
}

const style = StyleSheet.create({
  container: {
    padding: 16,
    marginTop: StatusBar.currentHeight,
  },
});
