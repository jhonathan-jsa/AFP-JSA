<template>
  <v-app>
    <v-navigation-drawer
      app
      v-model="drawer"
      color="background"
      :expand-on-hover="expandOnHover"
      :permanent="permanent"
    >
      <Drawer></Drawer>
    </v-navigation-drawer>
    <v-app-bar color="background" elevation="0" app>
      <AppBar></AppBar>
    </v-app-bar>
    <v-main>
      <v-container fluid class="fill-height" style="padding: 0;">
        <v-card
          color="background"
          elevation="0"
          class="fill-height"
          style="border-radius: 0; width: -webkit-fill-available; padding: 10px;"
        >
          <router-view></router-view>
          <ModalLancamento></ModalLancamento>
          <ModalCategoria></ModalCategoria>
          <ModalPerfil></ModalPerfil>
          <ModalFonte></ModalFonte>
          <ModalConfirmar></ModalConfirmar>
          <ModalFeedback></ModalFeedback>
        </v-card>
      </v-container>
    </v-main>
    <v-footer app color="background">
      <v-spacer></v-spacer>
      <v-btn
        v-if="btnAdicionar.comando.length > 0"
        text
        :elevation="0"
        color="primary"
        style="margin: 0 50px"
        @click="comandoAbrirModal(btnAdicionar.comando)"
      >
        <v-icon style="margin-right: 10px;text-shadow: 0 0 0.5px;">{{btnAdicionar.icone}}</v-icon>
        {{btnAdicionar.nome}}
      </v-btn>
      <v-switch
        style="margin: 10px;"
        v-model="$vuetify.theme.dark"
        v-on:change="salvarTema($vuetify.theme.isDark)"
        hide-details
        color="primary"
        append-icon="mdi-theme-light-dark"
      ></v-switch>
    </v-footer>
  </v-app>
</template>

<script>
import ModalConfirmar from "./components/modals/Modal-Confirmar";
import ModalFeedback from "./components/modals/Modal-Feedback";
import ModalLancamento from "./components/modals/Modal-Lancamento";
import ModalCategoria from "./components/modals/Modal-Categoria";
import ModalPerfil from "./components/modals/Modal-Perfil";
import ModalFonte from "./components/modals/Modal-Fonte";
import AppBar from "./components/layout/Layout-App-Bar";
import Drawer from "./components/layout/Layout-Drawer";
import { mapState } from "vuex";
const { ipcRenderer } = window.require("electron");
export default {
  name: "App",
  components: {
    ModalConfirmar,
    ModalFeedback,
    ModalLancamento,
    ModalCategoria,
    ModalFonte,
    ModalPerfil,
    Drawer,
    AppBar,
  },
  data() {
    return {
      drawer: false,
      permanent: true,
      expandOnHover: true,
    };
  },
  methods: {
    comandoAbrirModal(comando) {
      ipcRenderer.send(comando);
    },
    salvarTema(valor){
      ipcRenderer.send("configuracao-dark-alterar",{chave:"dark",valor: valor? "SIM":"NÃO"});
    }
  },
  computed: {
    ...mapState({
      btnAdicionar: (state) => state.btnAdicionar,
      perfil: (state) => state.perfil,
    }),
  },
  created: function () {
    ipcRenderer.send("banco-inicializar");
    ipcRenderer.send("configuracao-dark-obter");
    ipcRenderer.on("configuracao-dark-obter", (event, resp) => {
      this.$vuetify.theme.dark = resp.valor == "SIM"? true:false;
    });

    ipcRenderer.send("perfil-ativo");
    ipcRenderer.on("perfil-ativo", (event, resp) => {
      this.$store.commit("SET_PERFIL", resp);
    });
    ipcRenderer.on("perfil-editar", (event, resp) => {
      resp;
      ipcRenderer.send("perfil-ativo");
    });
    ipcRenderer.on("perfil-alterar", (event, resp) => {
      resp;
      ipcRenderer.send("perfil-ativo");
    });
  },
};
</script>
<style>
@import "./assets/estilo.css";
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

@font-face {
  font-family: champagne;
  src: url("./assets/Champagne & Limousines.ttf");
}
@font-face {
  font-family: champagne-bold;
  src: url("./assets/Champagne & Limousines Bold.ttf");
}
* {
  letter-spacing: 1px;
}

/* width */
.dark-app {
  border: 4px solid #1e1e1e;
}
.light-app {
  border: 4px solid #f0f0f0;
}
.conteudo {
  margin-radius: 7px;
}
.noselect {
  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Old versions of Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none; /* Non-prefixed version, currently
  supported by Chrome, Edge, Opera and Firefox */
}
* {
  text-shadow: 0 0 0.3px;
}

/* INICIO SCROLL BAR */
::-webkit-scrollbar {
  background: #33333330;
  width: 10px;
  height: 10px;
}

::-webkit-scrollbar-track {
  border-radius: 0 0 3.5px 0;
}

::-webkit-scrollbar-thumb {
  background: #33333370;
  border-radius: 7px;
}

::-webkit-scrollbar-thumb:hover {
  background: #353535;
}

html > ::-webkit-scrollbar {
  display: none;
}

/* FIM SCROLL BAR */
</style>