<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="960px">
      <v-card color="modal">
        <v-card-title class="headline noselect">
          {{this.operacao}} CATEGORIA
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  color="text"
                  label="Nome"
                  required
                  v-model="categoria.nome"
                  :counter="50"
                  maxlength="50"
                  clearable
                  messages="Mínimo de 3 caracteres."
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-container style="overflow-y: scroll; max-height: 300px;">
                  <v-icon color="icon" v-for="(item, index) in icones" v-bind:key="index" v-bind:class="['icones', index == iconeSelecionado? 'icone-selecionado':'']" @click="selecionarIcone(index)">{{item}}</v-icon>
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
          <v-btn text color="confirm" @click="salvarCategoria()">
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
    categoria: {
      id: 0,
      nome: "",
      icone: "",
      perfil_id: 0
    },
    counterEn: false,
    counter: 0,
    icones: [],
    iconeSelecionado: 0
  }),
  methods: {
    salvarCategoria() {
      if (this.operacao == "CRIAR") {
        ipcRenderer.send("categoria-criar", this.categoria);
        ipcRenderer.on("categoria-criar", (event, resp) => {
          resp;
          this.categoria.id = 0
          this.categoria.nome = ""
          this.categoria.icone = ""
          this.categoria.perfil_id = 0
        });
      }
      if (this.operacao == "EDITAR") {
        ipcRenderer.send("categoria-editar", this.categoria);
        ipcRenderer.on("categoria-editar", (event, resp) => {
          resp;
          this.categoria.id = 0
          this.categoria.nome = ""
          this.categoria.icone = ""
          this.categoria.perfil_id = 0
        });
      }
      return false;
    },
    abrirModal(resp, operacao) {
      this.operacao = operacao;
      if (resp != undefined) {
        this.categoria.id = resp.id;
        this.categoria.nome = resp.nome || "";
        this.categoria.icone = resp.icone || "mdi-help-circle";
        this.categoria.perfil_id = resp.perfil_id || "";
        this.iconeSelecionado = this.icones.indexOf(resp.icone);
        if(this.iconeSelecionado == -1) this.iconeSelecionado = 0;
      }
      this.dialog = true;
    },
    selecionarIcone(index) {
      this.iconeSelecionado = index
      this.categoria.icone = this.icones[index]
    }
  },
  created: function() {
    this.icones = Icones;
    ipcRenderer.on("modal-categoria-criar", () => {
      this.abrirModal({ id: 0, nome: "", icone: "", perfil_id: 0 }, "CRIAR");
    });
    ipcRenderer.on("modal-categoria-editar", (event, resp) => {
      this.abrirModal(resp, "EDITAR");
    });
    ipcRenderer.on("categoria-criar", (event, resp) => {
      resp
      this.operacao = "";
      this.categoria.id = 0;
      this.categoria.nome = "";
      this.categoria.icone = "";
      this.categoria.perfil_id = 0;
      this.dialog = false;
    });
    ipcRenderer.on("categoria-editar", (event, resp) => {
      resp
      this.operacao = "";
      this.categoria.id = 0;
      this.categoria.nome = "";
      this.categoria.icone = "";
      this.categoria.perfil_id = 0;
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