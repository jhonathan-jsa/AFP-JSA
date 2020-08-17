<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="500px">
      <v-card color="modal">
        <v-card-title class="headline noselect">
          {{this.operacao}} PERFIL
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  color="secondary"
                  label="Nome"
                  required
                  v-model="perfil.nome"
                  :counter="50"
                  maxlength="50"
                  clearable
                  messages="Mínimo de 3 caracteres."
                ></v-text-field>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text color="cancel" @click="dialog = false"><v-icon style="margin-right: 5px;">mdi-close</v-icon> Cancelar</v-btn>
          <v-btn text color="confirm" @click="salvarPerfil()"><v-icon style="margin-right: 5px;">mdi-check</v-icon> Salvar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
const { ipcRenderer } = window.require("electron")

export default {
  data: () => ({
    operacao: "CRIAR",
    dialog: false,
    perfil: {
      id: 0,
      nome: "",
      status: "INATIVO"
    },
    counterEn: false,
    counter: 0
  }),
  methods: {
    salvarPerfil() {
      if (this.operacao == "CRIAR") {
        ipcRenderer.send("perfil-criar", this.perfil);
        ipcRenderer.on("perfil-criar", (event, resp) => {
          resp
        });
      }
      if (this.operacao == "EDITAR") {
        ipcRenderer.send("perfil-editar", this.perfil);
        ipcRenderer.on("perfil-editar", (event, resp) => {
          resp
        });
      }
      return false;
    },
    abrirModal(resp, operacao) {
      this.operacao = operacao;
      if(resp != undefined){
        this.perfil.id = resp.id;
        this.perfil.nome = resp.nome || "";
        this.perfil.status = resp.status || "";
      } else {
        this.perfil.nome = "";
        this.perfil.status = "";
      }
      this.dialog = true;
    }
  },
  created: function() {
    ipcRenderer.on("modal-perfil-criar", (event, resp) => {
      this.abrirModal(resp, "CRIAR");
    });
    ipcRenderer.on("modal-perfil-editar", (event, resp) => {
      this.abrirModal(resp, "EDITAR");
    });
    ipcRenderer.on("perfil-criar", () => {
      this.operacao = "";
      this.perfil.id = 0;
      this.perfil.nome = "";
      this.perfil.status = "";
      this.dialog = false;
    });
    ipcRenderer.on("perfil-editar", () => {
      this.operacao = "";
      this.perfil.id = 0;
      this.perfil.nome = "";
      this.perfil.status = "";
      this.dialog = false;
    });
  }
};
</script>

<style>
</style>