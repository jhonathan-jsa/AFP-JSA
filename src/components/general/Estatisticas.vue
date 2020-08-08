<template>
  <v-card color="card" elevation="0">
    <v-card-text>
      <v-row style="padding: 20px;">
        <v-spacer style="text-align: center;">
          <span style="font-size: 22px;" class="text--text">ESTATÍSTICAS</span>
        </v-spacer>
        <v-select
          style="max-width: 125px; position: absolute; right: 20px;"
          :items="opcoesDeStatus"
          :value="'Todos'"
          v-model="status"
          label="Status"
          color="secondary"
          item-color="green"
          @change="atualizar()"
        ></v-select>
        <v-select
          style="max-width: 100px; position: absolute; right: 160px;"
          :items="anos"
          :value="new Date().getFullYear()"
          @change="atualizar()"
          v-model="ano"
          label="Ano"
          color="secondary"
          item-color="green"
        ></v-select>
      </v-row>
    </v-card-text>
    <v-row style="padding: 0 20px;">
      <v-col cols="12" sm="4" md="4" lg="4" xl="4" v-for="(item, index) in operacoes" :key="index">
        <v-card color="#22222208" elevation="0">
          <v-card-text style="text-align: left;">
            <p class="text--text" style="font-size: 16px;">{{item.mes}}</p>
            <v-card color="card" elevation="0">
              <v-card-text>
                <p class="text--text">Maiores entradas</p>
                <p>Por valor: R$ 0.00</p>
                <p>Por fonte: R$ 0.00</p>
                <p>Por categoria: R$ 0.00</p>
              </v-card-text>
            </v-card>
            <div style="height: 20px;"></div>
            <v-card color="card" elevation="0">
              <v-card-text>
                <p class="text--text">Maiores saídas</p>
                <p>Por valor: R$ 0.00</p>
                <p>Por fonte: R$ 0.00</p>
                <p>Por categoria: R$ 0.00</p>
              </v-card-text>
            </v-card>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
const { ipcRenderer } = window.require("electron");
export default {
  data: () => ({
    meses: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
    anos: Array.from({ length: 41 }, (x = new Date().getFullYear() - 5, i) => {
      return x + i;
    }),
    ano: new Date().getFullYear(),
    entradas: null,
    saidas: null,
    operacoes: null,
    opcoesDeStatus: ["Todos", "Executados", "Pendentes"],
    status: "Todos",
  }),
  methods: {
    atualizar() {
      ipcRenderer.send("lancamento-obter-periodo", {
        inicio: `${this.ano}-01-01`,
        fim: `${this.ano}-12-31`,
      });
    },
    somar(tipo, lista) {
      return lista.reduce((total, valor) => (total = total + (valor.operacao == tipo && valor.valor > 0 ? valor.valor : 0)),0);
    },
  },
  created() {
    ipcRenderer.send("lancamento-obter-periodo", {
      inicio: `${this.ano}-01-01`,
      fim: `${this.ano}-12-31`,
    });

    ipcRenderer.on("lancamento-obter-periodo", (event, resp) => {
      if (this.status != "Todos") {
        if (this.status == "Executados") {
          resp = resp.filter((i) => i.executado == 1);
        } else if (this.status == "Pendentes") {
          resp = resp.filter((i) => i.executado == 0);
        }
      }
      this.operacoes = [
        {
          mes: "JANEIRO",
          dados: resp.filter((x) => x.data.substring(5, 7) == "01"),
          entrada: 0,
          saida: 0,
        },
        {
          mes: "FEVEREIRO",
          dados: resp.filter((x) => x.data.substring(5, 7) == "02"),
          entrada: 0,
          saida: 0,
        },
        {
          mes: "MARÇO",
          dados: resp.filter((x) => x.data.substring(5, 7) == "03"),
          entrada: 0,
          saida: 0,
        },
        {
          mes: "ABRIL",
          dados: resp.filter((x) => x.data.substring(5, 7) == "04"),
          entrada: 0,
          saida: 0,
        },
        {
          mes: "MAIO",
          dados: resp.filter((x) => x.data.substring(5, 7) == "05"),
          entrada: 0,
          saida: 0,
        },
        {
          mes: "JUNHO",
          dados: resp.filter((x) => x.data.substring(5, 7) == "06"),
          entrada: 0,
          saida: 0,
        },
        {
          mes: "JULHO",
          dados: resp.filter((x) => x.data.substring(5, 7) == "07"),
          entrada: 0,
          saida: 0,
        },
        {
          mes: "AGOSTO",
          dados: resp.filter((x) => x.data.substring(5, 7) == "08"),
          entrada: 0,
          saida: 0,
        },
        {
          mes: "SETEMBRO",
          dados: resp.filter((x) => x.data.substring(5, 7) == "09"),
          entrada: 0,
          saida: 0,
        },
        {
          mes: "OUTUBRO",
          dados: resp.filter((x) => x.data.substring(5, 7) == "10"),
          entrada: 0,
          saida: 0,
        },
        {
          mes: "NOVEMBRO",
          dados: resp.filter((x) => x.data.substring(5, 7) == "11"),
          entrada: 0,
          saida: 0,
        },
        {
          mes: "DEZEMBRO",
          dados: resp.filter((x) => x.data.substring(5, 7) == "12"),
          entrada: 0,
          saida: 0,
        },
      ];
      for (var i = 0; i < 12; i++) {
        this.operacoes[i].entrada = this.somar(
          "entrada",
          this.operacoes[i].dados
        );
        this.operacoes[i].saida = this.somar("saida", this.operacoes[i].dados);
      }
      this.entradas = this.operacoes.map((x) => x.entrada);
      this.saidas = this.operacoes.map((x) => x.saida);
    });
  },
};
</script>

<style>
</style>