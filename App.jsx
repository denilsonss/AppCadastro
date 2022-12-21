import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native";
import { ThemeProvider } from '@rneui/themed';
import {StyleSheet} from "react-native";

import Cadastro from "./Pessoa/Cadastro/Cadastro";
import TelaInicial from "./Pessoa/TelaInicial/TelaInicial";
import Busca from "./Pessoa/Busca/Busca";
export default function App() {  
  return (
    <ThemeProvider>
      <SafeAreaView style = {style.container}>
        <Cadastro/>
        <StatusBar style="auto" />
      </SafeAreaView>
    </ThemeProvider>
  );
}



const style = StyleSheet.create({
  container: {
    padding: 16
  }
});