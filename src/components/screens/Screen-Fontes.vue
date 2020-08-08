<template>
  <v-container fluid style="padding: 0;">
    <v-row>
      <v-col cols="12" sm="12" md="12" lg="12" xl="6" v-for="(item, index) in fontes" :key="index">
        <CardFonte :id="item.id" :nome="item.nome" :icone="item.icone" :pefil_id="item.perfil_id"></CardFonte>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import CardFonte from "./../cards/Card-Fonte";
const { ipcRenderer } = window.require("electron");
import { mapState } from "vuex";
export default {
  components: {
    CardFonte,
  },
  data: () => ({
    fontes: [],
  }),
  methods: {
    fontesObtidas(fontes) {
      this.fontes = [];
      setTimeout(() => {
        this.fontes = fontes;
      }, 300);
    },
  },
  computed: {
    ...mapState({ dark: (state) => state.dark }),
  },
  created: function () {
    this.$store.commit("SET_BTN_ADICIONAR", {
      nome: "Nova Fonte",
      icone: "mdi-wallet-plus",
      comando: "modal-fonte-criar",
    });
    ipcRenderer.send("fonte-obter-todas");
    ipcRenderer.on("fonte-obter-todas", (event, resp) => {
      this.fontesObtidas(resp);
    });
    ipcRenderer.on("fonte-criar", () => {
      ipcRenderer.send("fonte-obter-todas");
    });
    ipcRenderer.on("fonte-editar", () => {
      ipcRenderer.send("fonte-obter-todas");
    });
    ipcRenderer.on("fonte-deletar", () => {
      ipcRenderer.send("fonte-obter-todas");
    });
  },
};
</script>

<style>
</style>