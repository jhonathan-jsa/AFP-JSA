<template>
  <v-container>
    <v-row>
      <div style="padding: 7px 0; font-size: 11px; position: absolute; left: 25px;">
        <span>
          <v-icon color="green" size="12">mdi-align-vertical-bottom</v-icon> Entradas
        </span>
        <span>
          <v-icon color="red" size="12">mdi-align-vertical-bottom</v-icon> Saídas
        </span>
      </div>
      <v-spacer style="text-align: center;">
        <span style="padding: 10px;font-size: 22px; " class="text--text">GRÁFICO ANUAL</span>
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
    <v-card color="transparent" elevation="0" style="max-width: 800px; margin: 0 auto;">
      <v-card-text>
        <v-row style="text-align: center; font-size: 10px;max-width: 1400px;" class="text--text">
          <v-col
            cols="12"
            sm="1"
            md="1"
            lg="1"
            xl="1"
            v-for="(item, index) in operacoes"
            :key="index"
          >
            <p>{{item.mes}}</p>
            <v-row
              justify="center"
              style="border-bottom: 5px solid #33333333;height: 210px;"
              align="end"
            >
              <div
                style="width: 20px;background: #007700;border-radius: 3px 3px 0 0;height: 0px;transition-duration: 0.7s;"
                :id="item.mes+'-entrada'"
              ></div>
              <div
                style="width: 20px;background: #770000;border-radius: 3px 3px 0 0;height: 0px;transition-duration: 0.7s;"
                :id="item.mes+'-saida'"
              ></div>
            </v-row>
            <v-row>
              <span
                style="word-break: break-all; padding: 5px; text-shadow: 0 0 0.3px;"
                class="confirm--text"
              >{{item.entrada.toFixed(2)}}</span>
              <span
                style="word-break: break-all; padding: 5px; text-shadow: 0 0 0.3px;"
                class="delete--text"
              >{{item.saida.toFixed(2)}}</span>
            </v-row>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
const { ipcRenderer } = window.require("electron");
export default {
  name: "GraficoAnual",
  data: () => ({
    anos: Array.from({ length: 41 }, (x = new Date().getFullYear() - 5, i) => {
      return x + i;
    }),
    ano: new Date().getFullYear(),
    entradas: [],
    saidas: [],
    operacoes: null,
    opcoesDeStatus: ["Todos", "Executados", "Pendentes"],
    status: "Todos",
    maior: 0,
  }),
  methods: {
    somar(tipo, lista) {
      return lista.reduce(
        (total, valor) =>
          (total =
            total +
            (valor.operacao == tipo && valor.valor > 0 ? valor.valor : 0)),
        0
      );
    },
    atualizar() {
      ipcRenderer.send("lancamento-obter-periodo", {
        inicio: `${this.ano}-01-01`,
        fim: `${this.ano}-12-31`,
      });
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
          mes: "JAN",
          dados: resp.filter((x) => x.data.substring(5, 7) == "01"),
          entrada: 0,
          saida: 0,
        },
        {
          mes: "FEV",
          dados: resp.filter((x) => x.data.substring(5, 7) == "02"),
          entrada: 0,
          saida: 0,
        },
        {
          mes: "MAR",
          dados: resp.filter((x) => x.data.substring(5, 7) == "03"),
          entrada: 0,
          saida: 0,
        },
        {
          mes: "ABR",
          dados: resp.filter((x) => x.data.substring(5, 7) == "04"),
          entrada: 0,
          saida: 0,
        },
        {
          mes: "MAI",
          dados: resp.filter((x) => x.data.substring(5, 7) == "05"),
          entrada: 0,
          saida: 0,
        },
        {
          mes: "JUN",
          dados: resp.filter((x) => x.data.substring(5, 7) == "06"),
          entrada: 0,
          saida: 0,
        },
        {
          mes: "JUL",
          dados: resp.filter((x) => x.data.substring(5, 7) == "07"),
          entrada: 0,
          saida: 0,
        },
        {
          mes: "AGO",
          dados: resp.filter((x) => x.data.substring(5, 7) == "08"),
          entrada: 0,
          saida: 0,
        },
        {
          mes: "SET",
          dados: resp.filter((x) => x.data.substring(5, 7) == "09"),
          entrada: 0,
          saida: 0,
        },
        {
          mes: "OUT",
          dados: resp.filter((x) => x.data.substring(5, 7) == "10"),
          entrada: 0,
          saida: 0,
        },
        {
          mes: "NOV",
          dados: resp.filter((x) => x.data.substring(5, 7) == "11"),
          entrada: 0,
          saida: 0,
        },
        {
          mes: "DEZ",
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
      this.maior = this.operacoes
        .map((x) => x.entrada)
        .concat(this.operacoes.map((x) => x.saida))
        .reduce((x, y) => (x > y ? x : y));
      this.operacoes.forEach((x) => {
        let ent = document.getElementById(x.mes + "-entrada");
        if (ent != null) ent.style.height = "0px";
        let sai = document.getElementById(x.mes + "-saida");
        if (sai != null) sai.style.height = "0px";
      });
      this.operacoes.forEach((x) => {
        let ent = document.getElementById(x.mes + "-entrada");
        if (ent != null)
          ent.style.height =
            (x.entrada / (this.maior / 100)).toFixed(2) * 2 + "px";
        let sai = document.getElementById(x.mes + "-saida");
        if (sai != null)
          sai.style.height =
            (x.saida / (this.maior / 100)).toFixed(2) * 2 + "px";
      });
    });
  },
};
</script>
<style>
</style>