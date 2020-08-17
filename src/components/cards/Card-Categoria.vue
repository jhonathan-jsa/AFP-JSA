<template>
  <v-card :elevation="0" color="card">
    <v-row style="padding: 10px; margin: 0;">
      <v-icon
        style="margin-right: 10px;text-shadow: 0 0 1.3px;"
        size="35"
        color="icon"
      >{{this.categoria.icone}}</v-icon>
      <span
        class="text--text noselect"
        style="font-size: 16px;text-shadow: 0 0 0.3px black;  line-height: 35px;"
      >{{this.categoria.nome}}</span>
      <v-spacer></v-spacer>
      <v-btn
        text
        color="edit"
        @click="abrirModal('editar')"
        style="font-size: 12px; margin: 0 10px 0 10px;"
        v-if="categoria.nome != 'SEM CATEGORIA'"
      >
        <v-icon size="16" style="margin-right: 5px;">mdi-pencil-box</v-icon>Editar
      </v-btn>
      <v-btn
        text
        color="delete"
        @click="abrirModal('deletar')"
        style="font-size: 12px; margin: 0 10px 0 10px;"
        v-if="categoria.nome != 'SEM CATEGORIA'"
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
    categoria: {
      id: 0,
      nome: "",
      icone: "",
      perfil_id: 0,
    },
  }),
  methods: {
    abrirModal(op) {
      if (op == "editar") {
        ipcRenderer.send("modal-categoria-editar", this.categoria);
      } else if (op == "deletar") {
        ipcRenderer.send("modal-abrir", {
          titulo: "Tem certeza que deseja excluir a categoria?.",
          mensagem:
            'Todos os lançamentos que estiverem atribuídos, serão automaticamente reatribuídos para "SEM CATEGORIA".',
          comando: "categoria-deletar",
          modelo: this.categoria,
        });
      }
    },
  },
  created: function () {
    this.categoria.id = this.$props.id;
    this.categoria.nome = this.$props.nome;
    this.categoria.icone = this.$props.icone;
    this.categoria.perfil_id = this.$props.perfil_id;
  },
};
</script>

<style>
</style>