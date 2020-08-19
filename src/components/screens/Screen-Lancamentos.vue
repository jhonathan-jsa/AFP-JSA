<template>
  <v-container fluid style="padding: 0;">
    <v-tabs
      v-model="mes"
      background-color="bar"
      color="tab_text"
      slider-color="transparent"
      fixed-tabs
      next-icon="mdi-arrow-right-bold"
      prev-icon="mdi-arrow-left-bold"
      show-arrows
      style="animation-duration: 0s;"
    >
      <v-tab
        v-for="(mes,index) in meses"
        :key="index"
        @click="obterLancamentosMes(index)"
      >{{ mes.mes }}</v-tab>
    </v-tabs>

    <v-tabs-items v-model="mes" style="background: transparent;">
      <v-tab-item v-for="(mes, index) in meses" :key="index" style="transition-duration: 0s;">
        <v-container fluid>
          <v-data-table
            style="background: transparent; border-radius: 10px;"
            loading-text="Carregando..."
            no-data-text="Sem dados para mostrar"
            :footer-props="{
              'items-per-page-all-text':'Todos',
              'items-per-page-text':'Itens por página',
              'items-per-page-options':[10,25,50,-1]}"
            :headers="headers"
            :items="tipo == 'Saída'?lancamentos.filter((x)=>x.operacao == 'saida'):tipo == 'Entrada'?lancamentos.filter((x)=>x.operacao == 'entrada'):lancamentos"
          >
            <template v-slot:item.executado="{ item }">
              <v-icon
                :color="item.executado && item.operacao == 'entrada'?'#55aa55':item.executado && item.operacao == 'saida'? '#aa5555':'#aaaaaa'"
                size="22"
              >{{item.operacao == 'entrada' ? 'mdi-arrow-up-bold':'mdi-arrow-down-bold'}}</v-icon>
            </template>

            <template v-slot:item.valor="{ item }">
              <span
                style="font-size: 16px; font-weight: 700; opacity: 0.8;text-shadow: 0 0 0.5px;"
              >{{(item.valor).toFixed(2)}}</span>
            </template>

            <template v-slot:item.descricao="{ item }">
              <span style=" opacity: 0.8;">{{item.descricao}}</span>
            </template>

            <template v-slot:item.data="{ item }">
              <span
                style=" opacity: 0.8;"
                small
              >{{diasDaSemana[new Date(item.data+" 00:00").getDay()]}}, dia {{new Date(item.data+" 00:00").toLocaleDateString("pt-BR").substr(0,2)}} às {{item.hora}}</span>
            </template>

            <template v-slot:item.fonte="{ item }">
              <span style="font-size: 11px; opacity: 0.8;">
                {{item.fonte_nome}}
                <v-icon style="margin: 0 1px 0 5px; opacity: 0.6;" size="16">{{item.fonte_icone}}</v-icon>
              </span>
            </template>
            <template v-slot:item.categoria="{ item }">
              <span style="font-size: 11px; opacity: 0.8;">
                {{item.categoria_nome}}
                <v-icon
                  style="margin: 0 1px 0 5px; opacity: 0.6;"
                  size="16"
                >{{item.categoria_icone}}</v-icon>
              </span>
            </template>

            <template v-slot:item.actions="{ item }">
              <v-menu offset-y>
                <template v-slot:activator="{ on, attrs }">
                  <v-btn color="primary" text v-bind="attrs" v-on="on">
                    <v-icon size="14">mdi-dots-horizontal</v-icon>
                  </v-btn>
                </template>

                <v-list color="background">
                  <v-list-item>
                    <v-btn color="edit" text @click="editarLancamento(item)">
                      <v-icon small class="mr-1" size="14">mdi-pencil</v-icon>
                      <span>EDITAR</span>
                    </v-btn>
                  </v-list-item>
                  <v-list-item>
                    <v-btn color="delete" text @click="deletarLancamento(item)">
                      <v-icon small class="mr-1" size="14">mdi-delete</v-icon>
                      <span>REMOVER</span>
                    </v-btn>
                  </v-list-item>
                </v-list>
              </v-menu>
            </template>
          </v-data-table>
        </v-container>
      </v-tab-item>
      <v-form>
        <v-row style="padding: 25px;">
          <v-spacer></v-spacer>
          <v-select
            style="max-width: 100px;margin-right: 10px;"
            :items="anos"
            :value="new Date().getFullYear()"
            v-model="ano"
            label="Ano"
            color="secondary"
            item-color="green"
            @change="obterLancamentos()"
          ></v-select>
          <v-select
            style="max-width: 100px;"
            :items="tipos"
            :value="'Ambos'"
            v-model="tipo"
            label="Tipo"
            color="secondary"
            item-color="green"
            @change="obterLancamentos()"
          ></v-select>
        </v-row>
      </v-form>
    </v-tabs-items>
    <v-container fluid style="padding: 10px 0 0 25px;" class="noselect">
      <v-chip
        outlined
        style="border: none;"
        class="ma-2"
        color="confirm"
        close
        @click:close="chip1 = false"
        v-if="chip1"
      >Já recebeu R$ {{totalEntradaExecutado.toFixed(2)}}</v-chip>
      <v-chip
        outlined
        style="border: none;"
        class="ma-2"
        color="confirm"
        close
        @click:close="chip2 = false"
        v-if="chip2"
      >Ainda não recebeu R$ {{totalEntradaNaoExecutado.toFixed(2)}}</v-chip>
      <v-chip
        outlined
        style="border: none;"
        class="ma-2"
        color="confirm"
        close
        @click:close="chip3 = false"
        v-if="chip3"
      >Total previsto para receber R$ {{totalEntradaGeral.toFixed(2)}}</v-chip>
      <v-chip
        outlined
        style="border: none;"
        class="ma-2"
        color="cancel"
        close
        @click:close="chip4 = false"
        v-if="chip4"
      >Já pagou R$ {{totalSaidaExecutado.toFixed(2)}}</v-chip>
      <v-chip
        outlined
        style="border: none;"
        class="ma-2"
        color="cancel"
        close
        @click:close="chip5 = false"
        v-if="chip5"
      >Ainda não pagou R$ {{totalSaidaNaoExecutado.toFixed(2)}}</v-chip>
      <v-chip
        outlined
        style="border: none;"
        class="ma-2"
        color="cancel"
        close
        @click:close="chip6 = false"
        v-if="chip6"
      >Total previsto para pagar R$ {{totalSaidaGeral.toFixed(2)}}</v-chip>
      <v-chip
        outlined
        style="border: none;"
        class="ma-2"
        :color="( totalEntradaExecutado - totalSaidaExecutado)>=0?'confirm':'cancel'"
        close
        @click:close="chip7 = false"
        v-if="chip7"
      >Saldo atual do mês R$ {{( totalEntradaExecutado - totalSaidaExecutado).toFixed(2)}}</v-chip>
      <v-chip
        outlined
        style="border: none;"
        class="ma-2"
        :color="((totalEntradaExecutado+totalEntradaNaoExecutado)-(totalSaidaNaoExecutado+totalSaidaExecutado))>=0?'confirm':'cancel'"
        close
        @click:close="chip8 = false"
        v-if="chip8"
      >Previsão de fechar o mês em R$ {{((totalEntradaExecutado+totalEntradaNaoExecutado)-(totalSaidaNaoExecutado+totalSaidaExecutado)).toFixed(2)}}</v-chip>
      <v-row style="margin: 25px;">
        <v-btn
          color="confirm"
          text
          rounded
          @click="chip1 = chip2 = chip3 = chip4 = chip5 = chip6 = chip7 = chip8 = true"
        >EXIBIR CÁLCULOS</v-btn>
        <v-btn
          style="margin-left: 15px;"
          color="cancel"
          text
          rounded
          @click="chip1 = chip2 = chip3 = chip4 = chip5 = chip6 = chip7 = chip8 = false"
        >OCULTAR CÁLCULOS</v-btn>
      </v-row>
    </v-container>
  </v-container>
</template>

<script>
const { ipcRenderer } = window.require("electron");
export default {
  data: () => ({
    dialog: false,
    headers: [
      { text: "", value: "executado", align: "start", width: "50px" },
      { text: "Valor", value: "valor", align: "start" },
      { text: "Data", value: "data", align: "start" },
      { text: "Descrição", value: "descricao", align: "start" },
      { text: "Fonte", value: "fonte", align: "end" },
      { text: "Categoria", value: "categoria", align: "end" },
      { text: "Ações", value: "actions", sortable: false, align: "end" },
    ],
    lancamentos: [],
    editedIndex: -1,
    date: new Date().toISOString().substr(0, 10),
    menu: false,
    modalDate: false,
    valid: true,
    disabled: false,
    currency: "R$",
    initialBalance: null,
    lancamentoParaDeletar: null,
    modalConfirmar: false,
    totalSaidaExecutado: 0,
    totalSaidaNaoExecutado: 0,
    totalEntradaExecutado: 0,
    totalEntradaNaoExecutado: 0,
    totalSaidaGeral: 0,
    totalEntradaGeral: 0,
    chip1: false,
    chip2: false,
    chip3: false,
    chip4: false,
    chip5: false,
    chip6: false,
    chip7: false,
    chip8: false,
    diasDaSemana: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"],
    anos: Array.from({ length: 41 }, (x = new Date().getFullYear() - 5, i) => {
      return x + i;
    }),
    ano: new Date().getFullYear(),
    tipos: ["Ambos", "Entrada", "Saída"],
    tipo: "Ambos",
    meses: [
      { mes: "JAN" },
      { mes: "FEV" },
      { mes: "MAR" },
      { mes: "ABR" },
      { mes: "MAI" },
      { mes: "JUN" },
      { mes: "JUL" },
      { mes: "AGO" },
      { mes: "SET" },
      { mes: "OUT" },
      { mes: "NOV" },
      { mes: "DEZ" },
    ],
    mes: new Date().getMonth(),
  }),
  computed: {
    initialBalanceFormatted: {
      get: function () {
        return this.formatAsCurrency(this.initialBalance, 0);
      },
      set: function (newValue) {
        this.initialBalance = Number(newValue.replace(/[^0-9]/g, ""));
      },
    },
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
  },
  methods: {
    formatAsCurrency(value, dec) {
      dec = dec || 0;
      if (value === null) {
        return 0;
      }
      var res = "" + value.toFixed(dec).replace(/([0-9]{2})$/g, ",$1");
      if (res.length > 6)
        res = res.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$1");
      return res;
    },
    editarLancamento(item) {
      ipcRenderer.send("modal-lancamento-editar", item);
    },
    deletarLancamento(item) {
      ipcRenderer.send("modal-abrir", {
        titulo: "Tem certeza que deseja excluir o lançamento?",
        mensagem:
          "Não será possível recuperá-lo.",
        comando: "lancamento-deletar",
        modelo: item,
      });
    },
    obterLancamentos() {
      this.lancamentos = [];
      let mes = (this.mes + 1).toString();
      mes = mes.length == 1 ? "0" + mes : mes;
      console.log(`${this.ano}-${mes}-01`);
      ipcRenderer.send("lancamento-obter-periodo", {
        inicio: `${this.ano}-${mes}-01`,
        fim: `${this.ano}-${mes}-31`,
      });
    },
    obterLancamentosMes(index) {
      this.lancamentos = [];
      let mes = (index + 1).toString();
      mes = mes.length == 1 ? "0" + mes : mes;
      ipcRenderer.send("lancamento-obter-periodo", {
        inicio: `${this.ano}-${mes}-01`,
        fim: `${this.ano}-${mes}-31`,
      });
    },
  },
  created() {
    this.$store.commit("SET_BTN_ADICIONAR", {
      nome: "Novo Lançamento",
      icone: "mdi-plus-thick",
      comando: "modal-lancamento-criar",
    });
    this.obterLancamentos();
    ipcRenderer.on("lancamento-obter-periodo", (event, resp) => {
      resp;
      this.lancamentos = resp;
      console.log(resp)
      this.totalSaidaExecutado = this.lancamentos.reduce((x, y) => {
        if (y.operacao == "saida" && y.executado == true) return x + y.valor;
        else return x;
      }, 0);
      this.totalSaidaNaoExecutado = this.lancamentos.reduce((x, y) => {
        if (y.operacao == "saida" && y.executado == false) return x + y.valor;
        else return x;
      }, 0);
      this.totalEntradaExecutado = this.lancamentos.reduce((x, y) => {
        if (y.operacao == "entrada" && y.executado == true) return x + y.valor;
        else return x;
      }, 0);
      this.totalEntradaNaoExecutado = this.lancamentos.reduce((x, y) => {
        if (y.operacao == "entrada" && y.executado == false) return x + y.valor;
        else return x;
      }, 0);
      this.totalSaidaGeral = this.lancamentos.reduce((x, y) => {
        if (y.operacao == "saida") return x + y.valor;
        else return x;
      }, 0);
      this.totalEntradaGeral = this.lancamentos.reduce((x, y) => {
        if (y.operacao == "entrada") return x + y.valor;
        else return x;
      }, 0);
    });
    ipcRenderer.on("lancamento-criar", (event, resp) => {
      resp;
      this.obterLancamentos();
    });
    ipcRenderer.on("lancamento-editar", () => {
      this.obterLancamentos();
    });
    ipcRenderer.on("lancamento-deletar", () => {
      this.obterLancamentos();
    });
  },
};
</script>

<style>
.dark-tab {
  background: #1e1e1e;
}
.light-tab {
  background: #eee;
}
.theme--dark.v-data-table {
  background-color: #222;
}
.v-tabs {
  border-radius: 25px 0 0 25px;
}
.v-tab--active {
  background: #50505020;
  border-radius: 25px;
}
.v-list-item--active,
.v-list-item__title {
  color: #555 !important;
}
.checked {
  background: #24aeb8;
}
.v-data-footer,
th > span,
.v-input__slot,
.mdi-menu-down::before,
.theme--dark.v-text-field > .v-input__control > .v-input__slot:before {
  color: #77777790 !important;
  font-size: 14px;
}
.v-input__slot,
.mdi-menu-down::before,
.theme--dark.v-text-field > .v-input__control > .v-input__slot:before {
  color: #77777790 !important;
}
.v-input__slot:before {
  display: none;
}
.saida {
  color: red;
}
.entrada {
  color: green;
}
.darkTable {
  background: #111 !important;
}
tr:hover {
  background: transparent !important;
  background-color: #55555510 !important;
}
</style>