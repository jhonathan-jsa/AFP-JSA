<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="960px">
      <v-card  color="modal">
        <v-card-title class="headline noselect">
          {{this.operacao}} FONTE
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  color="secondary"
                  label="Nome"
                  required
                  v-model="fonte.nome"
                  :counter="50"
                  maxlength="50"
                  clearable
                  messages="Mínimo de 3 caracteres."
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-container style="overflow-y: scroll; max-height: 300px;">
                  <v-icon v-for="(item, index) in icones" color="primary" v-bind:key="index" v-bind:class="['icones', index == iconeSelecionado? 'icone-selecionado':'']" @click="selecionarIcone(index)">{{item}}</v-icon>
                </v-container>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn text color="cancel" @click="dialog = false">
            <v-icon style="margin-right: 5px;">mdi-close</v-icon>Cancelar
          </v-btn>
          <v-btn text color="confirm" @click="salvarFonte()">
            <v-icon style="margin-right: 5px;">mdi-check</v-icon>Salvar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
const { ipcRenderer } = window.require("electron");
import { Icones } from "./../../backend/utils/U-Icones";

export default {
  data: () => ({
    operacao: "CRIAR",
    dialog: false,
    fonte: {
      id: 0,
      nome: "",
      icone: "",
      saldo: 0,
      perfil_id: 0
    },
    counterEn: false,
    counter: 0,
    icones: [],
    iconeSelecionado: 0
  }),
  methods: {
    salvarFonte() {
      if (this.operacao == "CRIAR") {
        ipcRenderer.send("fonte-criar", this.fonte);
        ipcRenderer.on("fonte-criar", (event, resp) => {
          resp;
          this.fonte.id = 0
          this.fonte.nome = ""
          this.fonte.icone = ""
          this.fonte.saldo = 0
          this.fonte.perfil_id = 0
        });
      }
      if (this.operacao == "EDITAR") {
        ipcRenderer.send("fonte-editar", this.fonte);
        ipcRenderer.on("fonte-editar", (event, resp) => {
          resp;
          this.fonte.id = 0
          this.fonte.nome = ""
          this.fonte.icone = ""
          this.fonte.saldo = 0
          this.fonte.perfil_id = 0
        });
      }
      return false;
    },
    abrirModal(resp, operacao) {
      this.operacao = operacao;
      if (resp != undefined) {
        this.fonte.id = resp.id;
        this.fonte.nome = resp.nome || "";
        this.fonte.icone = resp.icone || "mdi-help-circle";
        this.fonte.saldo = resp.saldo || 0;
        this.fonte.perfil_id = resp.perfil_id || 0;
        this.iconeSelecionado = this.icones.indexOf(resp.icone);
        if(this.iconeSelecionado == -1) this.iconeSelecionado = 0;
      }
      this.dialog = true;
    },
    selecionarIcone(index) {
      this.iconeSelecionado = index
      this.fonte.icone = this.icones[index]
    }
  },
  created: function() {
    this.icones = Icones;
    ipcRenderer.on("modal-fonte-criar", () => {
      this.abrirModal({ id: 0, nome: "", icone: "", perfil_id: 0 }, "CRIAR");
    });
    ipcRenderer.on("modal-fonte-editar", (event, resp) => {
      this.abrirModal(resp, "EDITAR");
    });
    ipcRenderer.on("fonte-criar", (event, resp) => {
      resp
      this.operacao = "";
      this.fonte.id = 0;
      this.fonte.nome = "";
      this.fonte.icone = "";
      this.fonte.saldo = 0;
      this.fonte.perfil_id = 0;
      this.dialog = false;
    });
    ipcRenderer.on("fonte-editar", (event, resp) => {
      resp
      this.operacao = "";
      this.fonte.id = 0;
      this.fonte.nome = "";
      this.fonte.icone = "";
      this.fonte.saldo = 0;
      this.fonte.perfil_id = 0;
      this.dialog = false;
    });
  }
};
</script>

<style>
.icones {
  padding: 10px; 
  border-radius: 50%; 
  margin: 5px; 
  background: transparent;
  cursor: pointer;
  border: 1px solid transparent;
}
.icones:hover {
  background: #444;
}
.icone-selecionado {
  background: #2e796c50;
  border: 1px solid #2e796c;
}
</style>