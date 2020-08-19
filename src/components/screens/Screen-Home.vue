<template>
  <v-container>
    <v-row justify="center" style="padding: 20px 0 70px 0;">
      <h1 class="text--text">Bem vindo ao G.F.P.</h1>
    </v-row>
    <v-row>
      <v-col
        cols="12"
        sm="4"
        md="4"
        lg="4"
        xl="3"
        v-for="item in items"
        :key="item.title"
        @click="mudarPagina(item)"
      >
        <v-card flat color="card" style="cursor: pointer; padding: 20px;" class="fill-height">
          <v-card-title>
            <v-icon class="text--text" style="margin-right: 15px;">{{item.icon}}</v-icon>
            <span class="text--text">{{item.title}}</span>
          </v-card-title>
          <v-card-text>
            <span class="text--text" style="font-style: italic; opacity: 0.75;">{{item.description}}</span>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { links } from "./../../backend/utils/U-Navegacao";
export default {
  data() {
    return {
      items: links,
    };
  },
  methods: {
    mudarPagina(item) {
      this.$router.push({ path: item.path });
    },
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