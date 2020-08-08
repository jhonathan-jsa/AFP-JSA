<template>
  <v-container fluid>
    <v-card color="card" elevation="0">
      <GraficoAnual></GraficoAnual>
    </v-card>
    <div style="height: 20px;"></div>
    <Estatisticas></Estatisticas>
  </v-container>
</template>

<script>
import GraficoAnual from "./../charts/Grafico-Anual";
import Estatisticas from "./../general/Estatisticas";
import { mapState } from "vuex";

export default {
  name: "ScreenDashboard",
  components: {
    GraficoAnual,
    Estatisticas,
  },
  data: () => ({
    pasta: null,
  }),
  computed: {
    ...mapState({ dark: (state) => state.dark }),
  },
  created() {
    this.$store.commit("SET_BTN_ADICIONAR", {
      nome: "",
      icone: "",
      comando: "",
    });
  },
};
</script>

<style>
</style>