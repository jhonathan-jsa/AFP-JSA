<template>
  <v-row justify="center">
    <v-dialog v-model="modalFeedback" persistent max-width="500px">
      <v-alert :type="this.tipo" style="margin: 0;filter: brightness(0.75);">
        <span class="headline noselect">{{this.titulo}}</span>
        <v-container>
          {{this.mensagem}}
          <v-row>
            <v-spacer></v-spacer>
            <v-btn text color="white" @click="modalFeedback = false"><v-icon style="margin-right: 5px;">mdi-check</v-icon> Ok</v-btn>
          </v-row>
        </v-container>
      </v-alert>
    </v-dialog>
  </v-row>
</template>

<script>
const { ipcRenderer } = window.require("electron");

export default {
  data: () => ({
    modalFeedback: false,
    titulo: "",
    mensagem: "",
    tipo: ""
  }),
  methods: {
    abrirModal(resp) {
      this.titulo = resp.titulo;
      this.mensagem = resp.mensagem;
      this.tipo = resp.tipo;
      this.modalFeedback = true;
    }
  },
  created: function() {
    ipcRenderer.on("modal-feedback", (event, resp) => {
      this.abrirModal(resp);
    });
  }
};
</script>

<style>
</style>