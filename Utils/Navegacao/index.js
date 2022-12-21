//hooks
//sao funcionalidades que ajudam a programar
import {
  useNavigate
} from "react-router-native";

function useGoToCadastro() {
  const navigate = useNavigate();

  return () => {
    navigate('/cadastro');
  };
}

function useGoToBusca() {
  const navigate = useNavigate();

  return () => {
    navigate('/busca');
  };
}

function useGoToTelaInicial() {
  const navigate = useNavigate();

  return () => {
    navigate('/');
  };
}

export {
  useGoToBusca,
  useGoToCadastro,
  useGoToTelaInicial
}