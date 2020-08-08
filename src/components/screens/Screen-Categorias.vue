<template>
  <v-container fluid style="padding: 0;">
    <v-row>
      <v-col
        cols="12"
        sm="12"
        md="12"
        lg="12"
        xl="6"
        v-for="(item, index) in categorias"
        :key="index"
      >
        <CardCategoria
          :id="item.id"
          :nome="item.nome"
          :icone="item.icone"
          :pefil_id="item.perfil_id"
        ></CardCategoria>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import CardCategoria from "./../cards/Card-Categoria";
const { ipcRenderer } = window.require("electron");
export default {
  components: {
    CardCategoria,
  },
  data: () => ({
    categorias: [],
  }),
  methods: {
    categoriaObtidas(categorias) {
      this.categorias = [];
      setTimeout(() => {
        this.categorias = categorias;
      }, 300);
    },
  },
  created: function () {
    this.$store.commit("SET_BTN_ADICIONAR", {
      nome: "NOVA CATEGORIA",
      icone: "mdi-credit-card-plus",
      comando: "modal-categoria-criar",
    });
    ipcRenderer.send("categoria-obter-todas");
    ipcRenderer.on("categoria-obter-todas", (event, resp) => {
      this.categoriaObtidas(resp);
    });
    ipcRenderer.on("categoria-deletar", () => {
      ipcRenderer.send("categoria-obter-todas");
    });
    ipcRenderer.on("categoria-criar", () => {
      ipcRenderer.send("categoria-obter-todas");
    });
    ipcRenderer.on("categoria-editar", () => {
      ipcRenderer.send("categoria-obter-todas");
    });
  },
};
</script>

<style>
</style>