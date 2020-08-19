<template>
  <v-row justify="end">
    <v-spacer style="webkit-app-region: drag;"></v-spacer>
    <v-chip
      class="noselect text--text"
      style="webkit-app-region: drag;font-size: 14px; margin: 3px 20px;font-family: champagne-bold; text-shadow: 0 0 0.3px;"
      color="background"
    >
      G.F.P v.1.0.0
      <v-icon style="margin: 0 5px 0 25px;" size="14">mdi-account-circle</v-icon>
      {{perfil}}
    </v-chip>
    <v-spacer style="webkit-app-region: drag;"></v-spacer>
    <v-btn icon height="30px" width="30px" @click="minimizar()">
      <v-icon x-small>mdi-window-minimize</v-icon>
    </v-btn>
    <v-btn icon height="30px" width="30px" @click="maximizar()">
      <v-icon x-small>mdi-window-maximize</v-icon>
    </v-btn>
    <v-btn icon height="30px" width="30px" style="margin-right: 10px;"  @click="fechar()">
      <v-icon x-small>mdi-window-close</v-icon>
    </v-btn>
  </v-row>
</template>

<script>
const { ipcRenderer } = window.require("electron");
const remote = require("electron").remote;
import { mapState } from "vuex";
export default {
  data: () => ({
    maximizado: false
  }),
  methods: {
    comandoAbrirModal(comando) {
      ipcRenderer.send(comando);
    },
    minimizar() {
      var window = remote.getCurrentWindow();
      window.minimize();
    },
    maximizar() {
      var window = remote.getCurrentWindow();
      console.log(this.maximizado)
      if (!this.maximizado) {
        window.maximize();
        this.maximizado = true;
      } else {
        window.unmaximize();
        this.maximizado = false;
      }
    },
    fechar() {
      var window = remote.getCurrentWindow();
      window.destroy();
    },
  },
  computed: {
    ...mapState({
      btnAdicionar: (state) => state.btnAdicionar,
      perfil: (state) => state.perfil,
    }),
  },
};
</script>

<style>
</style>