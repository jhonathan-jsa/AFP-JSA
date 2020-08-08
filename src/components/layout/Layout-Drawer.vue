<template>
<div>
  <v-spacer style="padding: 5px 0 25px 10px;"></v-spacer>
      <v-list dense nav class="py-0" rounded>
        <v-list-item
          v-for="item in items"
          :key="item.title"
          @click="mudarPagina(item)"
          color="primary"
        >
          <v-list-item-icon>
            <v-icon color="icon">{{ item.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title class="text--text">{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
</div>
</template>

<script>
// const { ipcRenderer } = window.require("electron");
import { links } from "./../../backend/utils/U-Navegacao";
export default {
  data() {
    return {
      items: links
    };
  },
  methods: {
    mudarPagina(item){
      this.$router.push({ path: item.path })
    },
  },
};
</script>

<style>
aside .v-navigation-drawer__border {
  display: none;
}
</style>