<template>
  <v-card :elevation="0" color="card">
    <v-row style="padding: 10px; margin: 0;">
      <v-icon
        style="margin-right: 10px;text-shadow: 0 0 1.3px;"
        size="35"
        color="icon"
      >{{this.fonte.icone}}</v-icon>
      <span
        class="text--text noselect"
        style="font-size: 16px;text-shadow: 0 0 0.3px black; line-height: 35px;"
      >{{this.fonte.nome}}</span>
      <v-spacer></v-spacer>
      <v-btn
        text
        color="edit"
        @click="abrirModal('editar')"
        style="font-size: 12px; margin: 0 10px 0 10px;"
        v-if="fonte.nome != 'FONTE DESCONHECIDA'"
      >
        <v-icon size="16" style="margin-right: 5px;">mdi-pencil-box</v-icon>Editar
      </v-btn>
      <v-btn
        text
        color="delete"
        @click="abrirModal('deletar')"
        style="font-size: 12px; margin: 0 10px 0 10px;"
        v-if="fonte.nome != 'FONTE DESCONHECIDA'"
      >
        <v-icon size="16" style="margin-right: 5px;">mdi-close-box</v-icon>Excluir
      </v-btn>
    </v-row>
  </v-card>
</template>

<script>
const { ipcRenderer } = window.require("electron");
export default {
  props: ["icone", "nome", "id", "perfil_id"],
  data: () => ({
    fonte: {
      id: 0,
      nome: "",
      icone: "",
      perfil_id: 0,
    },
  }),
  methods: {
    abrirModal(op) {
      if (op == "editar") {
        ipcRenderer.send("modal-fonte-editar", this.fonte);
      } else if (op == "deletar") {
        ipcRenderer.send("modal-abrir", {
          titulo: "Tem cereteza que deseja excluir a fonte?",
          mensagem:
            'Todos os lançamentos que estiverem para ela serão automaticamente mudados para "FONTE DESCONHECIDA".',
          comando: "fonte-deletar",
          modelo: this.fonte,
        });
      }
    },
  },
  created: function () {
    this.fonte.id = this.$props.id;
    this.fonte.nome = this.$props.nome;
    this.fonte.icone = this.$props.icone;
    this.fonte.perfil_id = this.$props.perfil_id;
  },
};
</script>

<style>
</style>