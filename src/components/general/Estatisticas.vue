<template>
  <v-card color="card" elevation="0">
    <v-card-text>
      <v-row style="padding: 20px;">
        <v-spacer style="text-align: center;">
          <span style="font-size: 22px;" class="text--text">DADOS SEGMENTADOS</span>
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
    <v-row style="padding: 20px;">
      <v-col cols="12" sm="12" md="12" lg="12" xl="12">
        <v-expansion-panels multiple hover flat>
          <!-- FONTES -->
          <v-expansion-panel style="background-color: transparent;border: 1px solid #44444410;">
            <v-expansion-panel-header color="transparent" class="text--text">ENTRADAS POR FONTE</v-expansion-panel-header>
            <v-expansion-panel-content color="transparent">
              <v-data-table
                style="background: transparent; border-radius: 10px;"
                loading-text="Carregando..."
                no-data-text="Sem dados para mostrar"
                :footer-props="{
              'items-per-page-all-text':'Todos',
              'items-per-page-text':'Itens por página',
              'items-per-page-options':[10,25,50,-1]}"
                :headers="fonte_headers"
                :items="fontes.map(x => x = {
                FONTE: x.nome,
                ICONE: x.icone,
                JAN: x.dados[0].entrada.toFixed(2), 
                FEV: x.dados[1].entrada.toFixed(2), 
                MAR: x.dados[2].entrada.toFixed(2), 
                ABR: x.dados[3].entrada.toFixed(2), 
                MAI: x.dados[4].entrada.toFixed(2), 
                JUN: x.dados[5].entrada.toFixed(2), 
                JUL: x.dados[6].entrada.toFixed(2), 
                AGO: x.dados[7].entrada.toFixed(2), 
                SET: x.dados[8].entrada.toFixed(2), 
                OUT: x.dados[9].entrada.toFixed(2), 
                NOV: x.dados[10].entrada.toFixed(2), 
                DEZ: x.dados[11].entrada.toFixed(2)})"
              >
                <template v-slot:item.FONTE="{ item }">
                  <span style="font-size: 11px; opacity: 0.8;">
                    <v-icon style="margin: 0 1px 0 5px; opacity: 0.6;" size="16">{{item.ICONE}}</v-icon>
                    {{item.FONTE}}
                  </span>
                </template>
              </v-data-table>
            </v-expansion-panel-content>
          </v-expansion-panel>
          <v-expansion-panel style="background-color: transparent;border: 1px solid #44444410;">
            <v-expansion-panel-header color="transparent" class="text--text">SAÍDAS POR FONTE</v-expansion-panel-header>
            <v-expansion-panel-content color="transparent">
              <v-data-table
                style="background: transparent; border-radius: 10px;"
                loading-text="Carregando..."
                no-data-text="Sem dados para mostrar"
                :footer-props="{
              'items-per-page-all-text':'Todos',
              'items-per-page-text':'Itens por página',
              'items-per-page-options':[10,25,50,-1]}"
                :headers="fonte_headers"
                :items="fontes.map(x => x = {
                FONTE: x.nome,
                ICONE: x.icone,
                JAN: x.dados[0].saida.toFixed(2), 
                FEV: x.dados[1].saida.toFixed(2), 
                MAR: x.dados[2].saida.toFixed(2), 
                ABR: x.dados[3].saida.toFixed(2), 
                MAI: x.dados[4].saida.toFixed(2), 
                JUN: x.dados[5].saida.toFixed(2), 
                JUL: x.dados[6].saida.toFixed(2), 
                AGO: x.dados[7].saida.toFixed(2), 
                SET: x.dados[8].saida.toFixed(2), 
                OUT: x.dados[9].saida.toFixed(2), 
                NOV: x.dados[10].saida.toFixed(2), 
                DEZ: x.dados[11].saida.toFixed(2)})"
              >
                <template v-slot:item.FONTE="{ item }">
                  <span style="font-size: 11px; opacity: 0.8;">
                    <v-icon style="margin: 0 1px 0 5px; opacity: 0.6;" size="16">{{item.ICONE}}</v-icon>
                    {{item.FONTE}}
                  </span>
                </template>
              </v-data-table>
            </v-expansion-panel-content>
          </v-expansion-panel>
          <!-- CATEGORIAS -->
          <v-expansion-panel style="background-color: transparent;border: 1px solid #44444410;">
            <v-expansion-panel-header color="transparent" class="text--text">ENTRADAS POR CATEGORIA</v-expansion-panel-header>
            <v-expansion-panel-content color="transparent">
              <v-data-table
                style="background: transparent; border-radius: 10px;"
                loading-text="Carregando..."
                no-data-text="Sem dados para mostrar"
                :footer-props="{
              'items-per-page-all-text':'Todos',
              'items-per-page-text':'Itens por página',
              'items-per-page-options':[10,25,50,-1]}"
                :headers="categoria_headers"
                :items="categorias.map(x => x = {
                CATEGORIA: x.nome,
                ICONE: x.icone,
                JAN: x.dados[0].entrada.toFixed(2), 
                FEV: x.dados[1].entrada.toFixed(2), 
                MAR: x.dados[2].entrada.toFixed(2), 
                ABR: x.dados[3].entrada.toFixed(2), 
                MAI: x.dados[4].entrada.toFixed(2), 
                JUN: x.dados[5].entrada.toFixed(2), 
                JUL: x.dados[6].entrada.toFixed(2), 
                AGO: x.dados[7].entrada.toFixed(2), 
                SET: x.dados[8].entrada.toFixed(2), 
                OUT: x.dados[9].entrada.toFixed(2), 
                NOV: x.dados[10].entrada.toFixed(2), 
                DEZ: x.dados[11].entrada.toFixed(2)})"
              >
                <template v-slot:item.CATEGORIA="{ item }">
                  <span style="font-size: 11px; opacity: 0.8;">
                    <v-icon style="margin: 0 1px 0 5px; opacity: 0.6;" size="16">{{item.ICONE}}</v-icon>
                    {{item.CATEGORIA}}
                  </span>
                </template>
              </v-data-table>
            </v-expansion-panel-content>
          </v-expansion-panel>
          <v-expansion-panel style="background-color: transparent;border: 1px solid #44444410;">
            <v-expansion-panel-header color="transparent" class="text--text">SAÍDAS POR CATEGORIA</v-expansion-panel-header>
            <v-expansion-panel-content color="transparent">
              <v-data-table
                style="background: transparent; border-radius: 10px;"
                loading-text="Carregando..."
                no-data-text="Sem dados para mostrar"
                :footer-props="{
              'items-per-page-all-text':'Todos',
              'items-per-page-text':'Itens por página',
              'items-per-page-options':[10,25,50,-1]}"
                :headers="categoria_headers"
                :items="categorias.map(x => x = {
                CATEGORIA: x.nome,
                ICONE: x.icone,
                JAN: x.dados[0].saida.toFixed(2), 
                FEV: x.dados[1].saida.toFixed(2), 
                MAR: x.dados[2].saida.toFixed(2), 
                ABR: x.dados[3].saida.toFixed(2), 
                MAI: x.dados[4].saida.toFixed(2), 
                JUN: x.dados[5].saida.toFixed(2), 
                JUL: x.dados[6].saida.toFixed(2), 
                AGO: x.dados[7].saida.toFixed(2), 
                SET: x.dados[8].saida.toFixed(2), 
                OUT: x.dados[9].saida.toFixed(2), 
                NOV: x.dados[10].saida.toFixed(2), 
                DEZ: x.dados[11].saida.toFixed(2)})"
              >
                <template v-slot:item.CATEGORIA="{ item }">
                  <span style="font-size: 11px; opacity: 0.8;">
                    <v-icon style="margin: 0 1px 0 5px; opacity: 0.6;" size="16">{{item.ICONE}}</v-icon>
                    {{item.CATEGORIA}}
                  </span>
                </template>
              </v-data-table>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
const { ipcRenderer } = window.require("electron");
export default {
  data: () => ({
    anos: Array.from({ length: 41 }, (x = new Date().getFullYear() - 5, i) => {
      return x + i;
    }),
    ano: new Date().getFullYear(),
    opcoesDeStatus: ["Todos", "Executados", "Pendentes"],
    status: "Todos",
    fonte_headers: [
      { text: "FONTE", value: "FONTE" },
      { text: "JANEIRO", value: "JAN" },
      { text: "FEVEREIRO", value: "FEV" },
      { text: "MARÇO", value: "MAR" },
      { text: "ABRIL", value: "ABR" },
      { text: "MAIO", value: "MAI" },
      { text: "JUNHO", value: "JUN" },
      { text: "JULHO", value: "JUL" },
      { text: "AGOSTO", value: "AGO" },
      { text: "SETEMBRO", value: "SET" },
      { text: "OUTUBRO", value: "OUT" },
      { text: "NOVEMBRO", value: "NOV" },
      { text: "DEZEMBRO", value: "DEZ" },
    ],
    categoria_headers: [
      { text: "CATEGORIA", value: "CATEGORIA" },
      { text: "JANEIRO", value: "JAN" },
      { text: "FEVEREIRO", value: "FEV" },
      { text: "MARÇO", value: "MAR" },
      { text: "ABRIL", value: "ABR" },
      { text: "MAIO", value: "MAI" },
      { text: "JUNHO", value: "JUN" },
      { text: "JULHO", value: "JUL" },
      { text: "AGOSTO", value: "AGO" },
      { text: "SETEMBRO", value: "SET" },
      { text: "OUTUBRO", value: "OUT" },
      { text: "NOVEMBRO", value: "NOV" },
      { text: "DEZEMBRO", value: "DEZ" },
    ],
    fontes: [],
    categorias: [],
  }),
  methods: {
    atualizar() {
      this.fontes = [];
      this.categorias = [];
      ipcRenderer.send("fonte-obter-com-valores", {
        inicio: `${this.ano}-01-01`,
        fim: `${this.ano}-12-31`,
      });
      ipcRenderer.send("categoria-obter-com-valores", {
        inicio: `${this.ano}-01-01`,
        fim: `${this.ano}-12-31`,
      });
    },
    somar(tipo, lista) {
      return lista.reduce(
        (total, valor) =>
          (total =
            total +
            (valor.operacao == tipo && valor.valor > 0 ? valor.valor : 0)),
        0
      );
    },
    separar(resp) {
      return [
        {
          mes: "JANEIRO",
          dados: resp.filter((x) => x.data.substring(5, 7) == "01"),
          entrada: this.somar(
            "entrada",
            resp.filter((x) => x.data.substring(5, 7) == "01")
          ),
          saida: this.somar(
            "saida",
            resp.filter((x) => x.data.substring(5, 7) == "01")
          ),
        },
        {
          mes: "FEVEREIRO",
          dados: resp.filter((x) => x.data.substring(5, 7) == "02"),
          entrada: this.somar(
            "entrada",
            resp.filter((x) => x.data.substring(5, 7) == "02")
          ),
          saida: this.somar(
            "saida",
            resp.filter((x) => x.data.substring(5, 7) == "02")
          ),
        },
        {
          mes: "MARÇO",
          dados: resp.filter((x) => x.data.substring(5, 7) == "03"),
          entrada: this.somar(
            "entrada",
            resp.filter((x) => x.data.substring(5, 7) == "03")
          ),
          saida: this.somar(
            "saida",
            resp.filter((x) => x.data.substring(5, 7) == "03")
          ),
        },
        {
          mes: "ABRIL",
          dados: resp.filter((x) => x.data.substring(5, 7) == "04"),
          entrada: this.somar(
            "entrada",
            resp.filter((x) => x.data.substring(5, 7) == "04")
          ),
          saida: this.somar(
            "saida",
            resp.filter((x) => x.data.substring(5, 7) == "04")
          ),
        },
        {
          mes: "MAIO",
          dados: resp.filter((x) => x.data.substring(5, 7) == "05"),
          entrada: this.somar(
            "entrada",
            resp.filter((x) => x.data.substring(5, 7) == "05")
          ),
          saida: this.somar(
            "saida",
            resp.filter((x) => x.data.substring(5, 7) == "05")
          ),
        },
        {
          mes: "JUNHO",
          dados: resp.filter((x) => x.data.substring(5, 7) == "06"),
          entrada: this.somar(
            "entrada",
            resp.filter((x) => x.data.substring(5, 7) == "06")
          ),
          saida: this.somar(
            "saida",
            resp.filter((x) => x.data.substring(5, 7) == "06")
          ),
        },
        {
          mes: "JULHO",
          dados: resp.filter((x) => x.data.substring(5, 7) == "07"),
          entrada: this.somar(
            "entrada",
            resp.filter((x) => x.data.substring(5, 7) == "07")
          ),
          saida: this.somar(
            "saida",
            resp.filter((x) => x.data.substring(5, 7) == "07")
          ),
        },
        {
          mes: "AGOSTO",
          dados: resp.filter((x) => x.data.substring(5, 7) == "08"),
          entrada: this.somar(
            "entrada",
            resp.filter((x) => x.data.substring(5, 7) == "08")
          ),
          saida: this.somar(
            "saida",
            resp.filter((x) => x.data.substring(5, 7) == "08")
          ),
        },
        {
          mes: "SETEMBRO",
          dados: resp.filter((x) => x.data.substring(5, 7) == "09"),
          entrada: this.somar(
            "entrada",
            resp.filter((x) => x.data.substring(5, 7) == "09")
          ),
          saida: this.somar(
            "saida",
            resp.filter((x) => x.data.substring(5, 7) == "09")
          ),
        },
        {
          mes: "OUTUBRO",
          dados: resp.filter((x) => x.data.substring(5, 7) == "10"),
          entrada: this.somar(
            "entrada",
            resp.filter((x) => x.data.substring(5, 7) == "10")
          ),
          saida: this.somar(
            "saida",
            resp.filter((x) => x.data.substring(5, 7) == "10")
          ),
        },
        {
          mes: "NOVEMBRO",
          dados: resp.filter((x) => x.data.substring(5, 7) == "11"),
          entrada: this.somar(
            "entrada",
            resp.filter((x) => x.data.substring(5, 7) == "11")
          ),
          saida: this.somar(
            "saida",
            resp.filter((x) => x.data.substring(5, 7) == "11")
          ),
        },
        {
          mes: "DEZEMBRO",
          dados: resp.filter((x) => x.data.substring(5, 7) == "12"),
          entrada: this.somar(
            "entrada",
            resp.filter((x) => x.data.substring(5, 7) == "12")
          ),
          saida: this.somar(
            "saida",
            resp.filter((x) => x.data.substring(5, 7) == "12")
          ),
        },
      ];
    },
  },
  created() {
    ipcRenderer.send("lancamento-obter-periodo", {
      inicio: `${this.ano}-01-01`,
      fim: `${this.ano}-12-31`,
    });
    ipcRenderer.send("fonte-obter-com-valores", {
      inicio: `${this.ano}-01-01`,
      fim: `${this.ano}-12-31`,
    });
    ipcRenderer.send("categoria-obter-com-valores", {
      inicio: `${this.ano}-01-01`,
      fim: `${this.ano}-12-31`,
    });

    ipcRenderer.on("fonte-obter-com-valores", (event, resp) => {
      if (this.status != "Todos") {
        if (this.status == "Executados") {
          resp.dados = resp.dados.filter((i) => i.executado == 1);
        } else if (this.status == "Pendentes") {
          resp.dados = resp.dados.filter((i) => i.executado == 0);
        }
      }
      let id = this.fontes.indexOf(
        this.fontes.filter((x) => x.id == resp.fonte.id)[0]
      );
      if (id != undefined && id != null && id >= 0) this.fontes.splice(id, 1);
      this.fontes.push({
        id: resp.fonte.id,
        nome: resp.fonte.nome,
        icone: resp.fonte.icone,
        dados: this.separar(resp.dados),
      });
    });
    ipcRenderer.on("categoria-obter-com-valores", (event, resp) => {
      if (this.status != "Todos") {
        if (this.status == "Executados") {
          resp.dados = resp.dados.filter((i) => i.executado == 1);
        } else if (this.status == "Pendentes") {
          resp.dados = resp.dados.filter((i) => i.executado == 0);
        }
      }
      let id = this.categorias.indexOf(
        this.categorias.filter((x) => x.id == resp.categoria.id)[0]
      );
      if (id != undefined && id != null && id >= 0)
        this.categorias.splice(id, 1);
      this.categorias.push({
        id: resp.categoria.id,
        nome: resp.categoria.nome,
        icone: resp.categoria.icone,
        dados: this.separar(resp.dados),
      });
    });
  },
};
</script>

<style>
</style>