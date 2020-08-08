<template>
  <v-container fluid style="padding: 0;">
    <v-row>
      <v-col cols="12" sm="12" md="12" lg="12" xl="6" v-for="(item, index) in perfis" :key="index">
        <CardPerfil :id="item.id" :nome="item.nome" :saldo="item.saldo" :status="item.status"></CardPerfil>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import CardPerfil from "./../cards/Card-Perfil";
const { ipcRenderer } = window.require("electron");

export default {
  components: {
    CardPerfil,
  },
  data: () => ({
    perfis: [],
  }),
  methods: {
    perfisObtidos(perfis) {
      this.perfis = [];
      setTimeout(() => {
        this.perfis = perfis;
      }, 300);
    },
  },
  created: function () {
    this.$store.commit("SET_BTN_ADICIONAR", {
      nome: "Novo Perfil",
      icone: "mdi-account-plus",
      comando: "modal-perfil-criar",
    });
    ipcRenderer.send("perfil-obter-todos");
    ipcRenderer.on("perfil-obter-todos", (event, resp) => {
      this.perfisObtidos(resp);
    });
    ipcRenderer.on("perfil-criar", () => {
      ipcRenderer.send("perfil-obter-todos");
    });
    ipcRenderer.on("perfil-editar", () => {
      ipcRenderer.send("perfil-obter-todos");
    });
    ipcRenderer.on("perfil-deletar", () => {
      ipcRenderer.send("perfil-obter-todos");
    });
    ipcRenderer.on("perfil-selecionar", () => {
      ipcRenderer.send("perfil-obter-todos");
    });
  },
};
</script>

<style>
</style>