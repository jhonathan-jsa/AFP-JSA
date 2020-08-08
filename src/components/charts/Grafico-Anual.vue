<template>
  <v-container>
    <v-row>
      <div style="padding: 7px 0; font-size: 11px; position: absolute; left: 25px;">
        <span>
          <v-icon color="green">mdi-chart-line-variant</v-icon>Entradas
        </span>
        <span>
          <v-icon color="red">mdi-chart-line-variant</v-icon>Saídas
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
    <v-card color="transparent" elevation="0" style="max-width: 1400px; margin: 0 auto;">
      <v-card-text>
        <v-sheet color="transparent" style="max-width: 1400px;">
          <!-- style="position: absolute; bottom: 150px;" -->
          <v-sparkline
            smooth="1"
            line-width="0.5"
            :value="[0,0,0,0,0,0,0,0,0,0,0,0]"
            color="#55555520"
            :height="16"
            style="position: absolute; bottom: 170px; left: 0px;max-width: 1400px;"
          ></v-sparkline>
          <v-sparkline
            auto-draw
            smooth="1"
            line-width="0.5"
            :value="saidas"
            color="red"
            :height="tamanhos.saida"
            style="position: absolute; bottom: 170px; left: 0px;max-width: 1400px;"
          ></v-sparkline>
          <v-sparkline
            auto-draw
            smooth="1"
            line-width="0.5"
            :value="entradas"
            color="green"
            :height="tamanhos.entrada"
            style="position: absolute; bottom: 170px; left: 0px;max-width: 1400px;"
          ></v-sparkline>
        </v-sheet>

        <div style="height: 330px;"></div>
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
            <p class="confirm--text">R${{item.entrada.toFixed(2)}}</p>
            <p class="cancel--text">R${{item.saida.toFixed(2)}}</p>
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
    tamanhos: {saida: 16, entrada: 16}
  }),
  methods: {
    somar(tipo, lista) {
      return lista.reduce(
        (total, valor) => (total = total + (valor.operacao == tipo && valor.valor > 0 ? valor.valor : 0)),0);
    },
    definirTamanhos(maximos) {
      let ent = maximos.entrada;
      let sai = maximos.saida;
      if (ent > sai) {
        return {
          entrada: ent / (ent / 100) / 2 + 16,
          saida: sai / (ent / 100) / 2 + 16,
        };
      } else {
        return {
          entrada: ent / (sai / 100) / 2 + 16,
          saida: sai / (sai / 100) / 2 + 16,
        };
      }
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
      console.log(this.status);
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
      this.tamanhos = this.definirTamanhos({
        entrada: this.operacoes.map((x) => x.entrada).sort((x, y) => y - x)[0],
        saida: this.operacoes.map((x) => x.saida).sort((x, y) => y - x)[0],
      });
    });
  },
};
</script>
<style>
</style>