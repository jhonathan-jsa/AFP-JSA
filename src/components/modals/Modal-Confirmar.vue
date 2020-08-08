<template>
  <v-dialog v-model="modal" persistent max-width="600px">
    <v-card  color="modal">
      <v-card-title class="headline">
        {{titulo}}
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12">
              <span class="text-text">{{mensagem}}</span>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="cancel" text @click="modal = false">
          <v-icon style="margin-right: 5px;">mdi-close</v-icon>Cancelar
        </v-btn>
        <v-btn color="confirm" text @click="confirmar()">
          <v-icon style="margin-right: 5px;">mdi-check</v-icon>Confirmar
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
const { ipcRenderer } = window.require("electron");
export default {
  data: () => ({
    modal: false,
    titulo: "",
    mensagem: "",
    comando: "",
    modelo: null
  }),
  methods: {
    confirmar() {
      this.modal = false;
      ipcRenderer.send(this.comando, this.modelo);
    }
  },
  created: function() {
    ipcRenderer.send("configuracao-dark-obter");
    ipcRenderer.on("configuracao-dark-obter", (event, resp) => {
      this.dark = resp.valor == "sim" ? true : false;
    });
    ipcRenderer.on("modal-abrir", (event, resp) => {
      this.titulo = resp.titulo;
      this.mensagem = resp.mensagem;
      this.comando = resp.comando;
      this.modelo = resp.modelo;
      this.modal = true;
    });
  }
};
</script>

<style>
</style>