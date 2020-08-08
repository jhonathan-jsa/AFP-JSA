<template>
  <v-card :elevation="0" class="mx-auto" color="card">
    <v-row style="padding: 10px 15px 5px 15px; margin: 0;">
      <v-icon
        style="margin-right: 10px;text-shadow: 0 0 1.3px;"
        size="30"
        color="icon"
      >mdi-account-circle</v-icon>
      <span
        class="text--text noselect"
        style="font-size: 16px;text-shadow: 0 0 0.3px black; line-height: 35px;"
      >{{this.perfil.nome}}</span>
      <v-spacer></v-spacer>
      <v-btn
        text
        color="use"
        @click="abrirModal('selecionar')"
        v-if="perfil.status != 'ATIVO'"
        style="font-size: 12px;"
      >
        <v-icon size="12" style="margin-right: 5px;">mdi-account-check</v-icon>Usar
      </v-btn>
      <v-btn text color="edit" @click="abrirModal('editar')" style="font-size: 12px;">
        <v-icon size="12" style="margin-right: 5px;">mdi-account-edit</v-icon>Editar
      </v-btn>
      <v-btn
        text
        color="delete"
        @click="abrirModal('deletar')"
        v-if="perfil.status != 'ATIVO'"
        style="font-size: 12px;"
      >
        <v-icon size="12" style="margin-right: 5px;">mdi-account-alert</v-icon>Excluir
      </v-btn>
    </v-row>
  </v-card>
</template>

<script>
const { ipcRenderer } = window.require("electron");

export default {
  props: ["nome", "id", "status"],
  data: () => ({
    perfil: {
      id: 0,
      nome: "",
      status: "",
    },
  }),
  methods: {
    abrirModal(op) {
      if (op == "editar") {
        ipcRenderer.send("modal-perfil-editar", this.perfil);
      } else if (op == "selecionar") {
        ipcRenderer.send("modal-abrir", {
          titulo: "Confirma a troca de perfil?",
          mensagem:
            "Isso irá alternar entre o perfil atual para o selecionado.",
          comando: "perfil-selecionar",
          modelo: this.perfil,
        });
      } else if (op == "deletar") {
        ipcRenderer.send("modal-abrir", {
          titulo: "Tem certeza que deseja excluir o perfil?",
          mensagem:
            "Isso irá apagar todos os dados do perfil e não será possível recuperá-los.",
          comando: "perfil-deletar",
          modelo: this.perfil,
        });
      }
    },
  },
  created: function () {
    this.perfil.id = this.$props.id;
    this.perfil.nome = this.$props.nome;
    this.perfil.saldo = this.$props.saldo;
    this.perfil.status = this.$props.status;
  },
};
</script>

<style>
</style>