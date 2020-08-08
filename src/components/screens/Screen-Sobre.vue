<template>
  <v-container fluid style="padding: 0;">
    <v-row justify="start" style="padding: 10px 100px;">
      <div style="margin-bottom: 50px;">Conhece alguem que ainda usa planilhas? Compartilhe o G.F.P.</div>
    </v-row>
    <v-row justify="start" style="padding: 10px 100px;">
      <a @click="abrirNavegador()" rel="nofollow">
        <img
          src="https://c1.staticflickr.com/9/8570/27842258044_e9bff0d0fe_o.png"
          border="0"
          width="728"
          height="90"
        />
      </a>
    </v-row>
  </v-container>
</template>

<script>
const { ipcRenderer } = window.require("electron");
export default {
  methods: {
    abrirNavegador() {
      ipcRenderer.send("abrir-publicidade");
    },
  },
  created(){
    this.$store.commit("SET_BTN_ADICIONAR", {
      nome: "",
      icone: "",
      comando: "",
    });
  }
};
</script>

<style>
</style>