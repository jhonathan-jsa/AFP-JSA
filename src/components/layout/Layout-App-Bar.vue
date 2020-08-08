<template>
  <v-row justify="end">
    <v-spacer style="webkit-app-region: drag;"></v-spacer>
    <v-chip class="noselect" style="webkit-app-region: drag;font-size: 11px; margin: 3px 20px;" color="background">
        G.F.P: JSA v.1.0.0
        <v-icon style="margin: 0 5px 0 25px;" size="14">mdi-account-circle</v-icon>
        {{perfil}}
    </v-chip>
    <v-spacer style="webkit-app-region: drag;"></v-spacer>
    <v-btn icon height="30px" width="30px">
      <v-icon x-small>mdi-window-minimize</v-icon>
    </v-btn>
    <v-btn icon height="30px" width="30px">
      <v-icon x-small>mdi-window-maximize</v-icon>
    </v-btn>
    <v-btn icon height="30px" width="30px" style="margin-right: 10px;">
      <v-icon x-small>mdi-window-close</v-icon>
    </v-btn>
  </v-row>
</template>

<script>
const { ipcRenderer } = window.require("electron");
import { mapState } from "vuex";
export default {
  methods: {
    comandoAbrirModal(comando) {
      ipcRenderer.send(comando);
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