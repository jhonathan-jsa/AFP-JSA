<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      persistent
      max-width="960px"
    >
      <v-card color="card" style="backdrop-filter: blur(5px);">
        <v-card-title class="headline noselect">
          <span>{{operacao}} movimentação</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row cols="12">
              <v-col cols="12" sm="4" md="6" lg="6">
                <v-currency-field
                  prepend-icon="mdi-cash"
                  label="Valor"
                  v-model="lancamento.valor"
                  color="secondary"
                />
              </v-col>
              <v-col cols="12" sm="6" md="6" lg="6">
                <v-radio-group
                  row
                  v-model="lancamento.operacao"
                  :mandatory="true"
                  prepend-icon="mdi-contrast"
                >
                  <v-radio label="Entrada" value="entrada" color="secondary"></v-radio>
                  <v-radio label="Saída" value="saida" color="secondary"></v-radio>
                </v-radio-group>
              </v-col>

              <v-col cols="12" sm="6">
                <v-menu
                  ref="data"
                  v-model="dataPicker"
                  :close-on-content-click="false"
                  :return-value.sync="data"
                  transition="scale-transition"
                  offset-y
                  max-width="290px"
                  min-width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      color="secondary"
                      v-model="lancamento.data"
                      label="Data do lançamento"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    color="secondary"
                    v-model="lancamento.data"
                    scrollable
                    locale="pt-BR"
                  >
                    <v-spacer></v-spacer>
                    <v-btn text color="secondary"  @click="dataPicker = false">
                      <v-icon>mdi-check</v-icon>OK
                    </v-btn>
                  </v-date-picker>
                </v-menu>
              </v-col>

              <v-col cols="12" sm="6">
                <v-menu
                  ref="hora"
                  v-model="horaPicker"
                  :close-on-content-click="false"
                  :return-value.sync="data"
                  transition="scale-transition"
                  offset-y
                  max-width="290px"
                  min-width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      color="secondary"
                      v-model="lancamento.hora"
                      label="Horário do lançamento"
                      prepend-icon="mdi-clock"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-time-picker
                    color="secondary"
                    v-model="lancamento.hora"
                    scrollable
                    locale="pt-BR"
                    value="00:00"
                    format="24hr"
                  >
                    <v-spacer></v-spacer>
                    <v-btn text color="secondary" @click="horaPicker = false">
                      <v-icon>mdi-check</v-icon>OK
                    </v-btn>
                  </v-time-picker>
                </v-menu>
              </v-col>
              <v-col cols="12" sm="6" md="6" lg="6">
                <v-select
                  color="secondary"
                  :items="categorias"
                  item-text="nome"
                  item-value="id"
                  v-model="lancamento.categoria_id"
                  label="Categorias"
                  :prepend-inner-icon="categorias.find(x => x.id == lancamento.categoria_id)?categorias.find(x => x.id == lancamento.categoria_id).icone:'mdi-help'"
                ></v-select>
              </v-col>
              <v-col cols="12" sm="6" md="6" lg="6">
                <v-select
                  color="secondary"
                  item-color="grey"
                  :items="fontes"
                  item-text="nome"
                  item-value="id"
                  v-model="lancamento.fonte_id"
                  label="Fontes"
                  :prepend-inner-icon="fontes.find(x => x.id == lancamento.fonte_id)?fontes.find(x => x.id == lancamento.fonte_id).icone:'mdi-help'"
                ></v-select>
              </v-col>
              <v-col cols="12" sm="6" md="6" lg="6">
                <v-text-field
                  prepend-icon="mdi-alphabetical"
                  label="Descrição"
                  v-model="lancamento.descricao"
                  required
                  color="secondary"
                  :counter="50"
                  maxlength="50"
                  clearable
                  messages="Minimo de 3 caracteres."
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6" lg="6">
                <v-switch
                  prepend-icon="mdi-check"
                  color="secondary"
                  v-model="lancamento.executado"
                  label="Executado"
                ></v-switch>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="cancel" text @click="dialog = false">Cancelar</v-btn>
          <v-btn color="confirm" text @click="salvarLancamento()">Salvar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
const { ipcRenderer } = window.require("electron");
export default {
  data: () => ({
    data: new Date().toLocaleDateString(),
    dataPicker: false,
    hora: new Date().toISOString().substr(0, 7),
    horaPicker: false,
    operacao: "CRIAR",
    dialog: false,
    counterEn: false,
    counter: 0,
    lancamento: {
      id: null,
      valor: 0,
      descricao: "",
      operacao: "",
      executado: true,
      data: "",
      hora: "",
      perfil_id: null,
      categoria_id: null,
      fonte_id: null
    },
    categorias: [],
    fontes: [],
    categoriaSelecionada: 0,
    fonteSelecionada: 0
  }),
  methods: {
    limparLancamento() {
      this.lancamento.id = null;
      this.lancamento.valor = 0;
      this.lancamento.descricao = "";
      this.lancamento.operacao = "";
      this.lancamento.executado = true;
      this.lancamento.data = "";
      this.lancamento.hora = "";
      this.lancamento.perfil_id = null;
      this.lancamento.categoria_id = null;
      this.lancamento.fonte_id = null;
    },
    abrirModal(resp, operacao) {
      this.operacao = operacao;
      if (resp != undefined) {
        this.lancamento.id = resp.id || null;
        this.lancamento.valor = resp.valor || 0;
        this.lancamento.descricao = resp.descricao || "";
        this.lancamento.operacao = resp.operacao || "";
        this.lancamento.executado = resp.executado == 0 ? false : true;
        this.lancamento.data = resp.data || "";
        this.lancamento.hora = resp.hora || "";
        this.lancamento.perfil_id = resp.perfil_id || null;
        this.lancamento.categoria_id = resp.categoria_id || null;
        this.lancamento.fonte_id = resp.fonte_id || null;
      }
      this.dialog = true;
      if (this.lancamento.categoria_id != null)
        this.categoriaSelecionada = this.categorias.indexOf(
          this.categorias.find(x => x.id == this.lancamento.categoria_id)
        );
      else this.categoriaSelecionada = -1;
      if (this.lancamento.fonte_id != null)
        this.fonteSelecionada = this.fontes.indexOf(
          this.fontes.find(x => x.id == this.lancamento.fonte_id)
        );
      else this.fonteSelecionada = -1;
    },
    salvarLancamento() {
      if (this.operacao == "Cadastrar") {
        if (this.lancamento.categoria_id == null)
          this.lancamento.categoria_id = this.categorias.find(
            x => x.nome == "SEM CATEGORIA"
          ).id;
        if (this.lancamento.fonte_id == null)
          this.lancamento.fonte_id = this.fontes.find(
            x => x.nome == "FONTE DESCONHECIDA"
          ).id;
        ipcRenderer.send("lancamento-criar", this.lancamento);
        ipcRenderer.on("lancamento-criar", (event, resp) => {
          resp;
          this.limparLancamento();
        });
      }
      if (this.operacao == "Editar") {
        if (this.lancamento.categoria_id == null)
          this.lancamento.categoria_id = this.categorias.find(
            x => x.nome == "SEM CATEGORIA"
          ).id;
        if (this.lancamento.fonte_id == null)
          this.lancamento.fonte_id = this.fontes.find(
            x => x.nome == "FONTE DESCONHECIDA"
          ).id;
        ipcRenderer.send("lancamento-editar", this.lancamento);
        ipcRenderer.on("lancamento-editar", (event, resp) => {
          resp;
          this.limparLancamento();
        });
      }
      return false;
    },
    selecionarCategoria(index) {
      this.categoriaSelecionada = index;
      this.lancamento.categoria_id = this.categorias[index].id;
    },
    selecionarFonte(index) {
      this.fonteSelecionada = index;
      this.lancamento.fonte_id = this.fontes[index].id;
    }
  },
  created() {
    ipcRenderer.send("categoria-obter-todas");
    ipcRenderer.send("fonte-obter-todas");
    ipcRenderer.on("modal-lancamento-criar", () => {
      this.abrirModal(
        {
          id: 0,
          valor: 0,
          data: new Date().toISOString().substring(0, 10),
          hora: "00:00",
          descricao: "",
          operacao: "",
          perfil_id: 0,
          categoria_id: null,
          fonte_id: null
        },
        "Cadastrar"
      );
    });
    ipcRenderer.on("modal-lancamento-editar", (event, resp) => {
      this.abrirModal(resp, "Editar");
    });
    ipcRenderer.on("categoria-obter-todas", (event, resp) => {
      this.categorias = resp;
    });
    ipcRenderer.on("fonte-obter-todas", (event, resp) => {
      this.fontes = resp;
    });
    ipcRenderer.on("lancamento-criar", (event, resp) => {
      resp;
      this.dialog = false;
    });
  }
};
</script>

<style>
/* .item {
  padding: 10px;
  margin: 5px;
  background: rgba(39, 39, 39, 0.6);
  cursor: pointer;
  border-radius: 5px;
  color: #efe;
}
.item:hover {
  background: rgb(78, 109, 78);
}
.item-selecionado {
  background: rgb(36, 94, 36);
} */
.theme--dark.v-picker__body {
  background-color: #1e1e1e;
}
.theme--dark.v-time-picker-clock {
  background: #1e1e1e;
  border: 1px solid #1e1e1e;
}
.theme--light.v-picker__body {
  background-color: #fff;
}
.theme--light.v-time-picker-clock {
  background: #fff;
  border: 1px solid #aaa;
}
.dark-selector {
  background: #1e1e1e;
}
.light-selector {
  background: #fff;
}
/* .v-picker__title {
  color: green;
}
.v-time-picker-title__time {
  color: green;
} */
.v-time-picker-title {
  justify-content: flex-start;
}
</style>