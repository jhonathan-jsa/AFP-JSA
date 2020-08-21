<template>
  <v-container fluid style="font-family: champagne-bold;">
    <v-row justify="center">
      <div style="margin-bottom: 50px;" class="text--text">GERENCIADO FINANCEIRO - DevKit V.1.0.1</div>
    </v-row>
    <v-row justify="start">
      <v-expansion-panels flat>
        <v-expansion-panel>
          <v-expansion-panel-header class="card text--text">Perfil</v-expansion-panel-header>
          <v-expansion-panel-content class="card text--text">
            <v-container>
              <v-row style="margin: 0  0 100px 0;">
                <v-col>
                  <p>O G.F. DevKit utiliza perfis separados para que você possa configurar de forma pessoal.</p>
                  <p>Assim, para cada pessoa que for utilizar o programa no mesmo computador, será possível criar seu próprio perfil.</p>
                </v-col>
                <v-col align="center">
                  <v-img
                    src="./../../assets/img/perfil_principal.png"
                    style="box-shadow: 0 0 10px rgba(0,0,0,0.15);"
                    height="465px"
                    width="600px"
                  ></v-img>
                </v-col>
              </v-row>
              <v-row style="margin: 100px 0;">
                <v-col align="center">
                  <v-img
                    src="./../../assets/img/perfil_usar.png"
                    style="box-shadow: 0 0 10px rgba(0,0,0,0.15);"
                    height="465px"
                    width="600px"
                  ></v-img>
                </v-col>
                <v-col>
                  <p>
                    Para alternar entre os perfis existentes, você pode clicar no botão <strong class="use--text">USAR</strong> que aparece no card do perfil e então confirmar para efetuar a troca.
                  </p>
                  <p>O perfil que estiver selecionado no momento, irá aparecer na barra de título no topo do programa.</p>
                </v-col>
              </v-row>
              <v-row style="margin: 100px 0 0 0;">
                <v-col>
                  <p>
                    Caso deseje criar um perfil, ao clicar no botão no rodapé do programa dentro da tela de perfis, irá abrir uma modal questionando o nome que deseja para o mesmo.
                  </p>
                  <p
                    class="delete--text"
                  >Atenção: Não é possível criar perfis com nomes iguais dentro do programa e é obrigatório no mínimo 3 caracteres para escolha do nome.</p>
                </v-col>
                <v-col align="center">
                  <v-img
                    src="./../../assets/img/perfil_criar.png"
                    style="box-shadow: 0 0 10px rgba(0,0,0,0.15);"
                    height="465px"
                    width="600px"
                  ></v-img>
                </v-col>
              </v-row>
            </v-container>
          </v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel>
          <v-expansion-panel-header class="card text--text">Fonte</v-expansion-panel-header>
          <v-expansion-panel-content class="card text--text">
            <v-container>
              <v-row style="margin: 0  0 100px 0;">
                <v-col>
                  <p>O conceito de FONTES dentro do programa, seria o de um local onde o dinheiro/crédito/valor está concentrado. Por exemplo, carteira, cartão de débito, etc. Também será de onde o dinheiro irá sair para pagamento de algo.</p>
                </v-col>
                <v-col align="center">
                  <v-img
                    src="./../../assets/img/fonte_principal.png"
                    style="box-shadow: 0 0 10px rgba(0,0,0,0.15);"
                    height="465px"
                    width="600px"
                  ></v-img>
                </v-col>
              </v-row>
              <v-row style="margin: 100px 0;">
                <v-col align="center">
                  <v-img
                    src="./../../assets/img/fonte_criar.png"
                    style="box-shadow: 0 0 10px rgba(0,0,0,0.15);"
                    height="465px"
                    width="600px"
                  ></v-img>
                </v-col>
                <v-col>
                  <p>
                    Para criar fontes, basta clicar no botão "<strong>NOVA FONTE</strong>" no rodapé da página referente as mesmas.
                  </p>
                  <p
                    class="delete--text"
                  >Atenção: A nova fonte precisa ter no mínimo 3 caracteres e não será aceito fontes com nomes iguais para o mesmo perfil.</p>
                </v-col>
              </v-row>
              <v-row style="margin: 100px 0 0 0;">
                <v-col>
                  <p>
                    Caso deseje excluir uma fonte existente, todos os lançamentos que estiverem atribuídos a ela, serão reatribuídos a "<strong>FONTE DESCONHECIDA</strong>" que não pode ser excluída.
                  </p>
                </v-col>
                <v-col align="center">
                  <v-img
                    src="./../../assets/img/fonte_excluir.png"
                    style="box-shadow: 0 0 10px rgba(0,0,0,0.15);"
                    height="465px"
                    width="600px"
                  ></v-img>
                </v-col>
              </v-row>
            </v-container>
          </v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel>
          <v-expansion-panel-header class="card text--text">Categoria</v-expansion-panel-header>
          <v-expansion-panel-content class="card text--text">
            <v-container>
              <v-row style="margin: 0  0 100px 0;">
                <v-col>
                  <p>O conceito de CATEGORIAS dentro do programa, seria de uma classificação do tipo de lançamento. Por exemplo, despesas da casa, restaurantes ou em caso de entradas como pagamento, bicos, etc.</p>
                </v-col>
                <v-col align="center">
                  <v-img
                    src="./../../assets/img/categoria_principal.png"
                    style="box-shadow: 0 0 10px rgba(0,0,0,0.15);"
                    height="465px"
                    width="600px"
                  ></v-img>
                </v-col>
              </v-row>
              <v-row style="margin:100px 0;">
                <v-col align="center">
                  <v-img
                    src="./../../assets/img/categoria_criar.png"
                    style="box-shadow: 0 0 10px rgba(0,0,0,0.15);"
                    height="465px"
                    width="600px"
                  ></v-img>
                </v-col>
                <v-col>
                  <p>
                    Para criar novas categorias, basta clicar no botão "<strong>NOVA CATEGORIA</strong>" no rodapé da página referente as mesmas.
                  </p>
                  <p
                    class="delete--text"
                  >Atenção: A nova categoria precisa ter no mínimo 3 caracteres e não será aceito categorias com nomes iguais para o mesmo perfil.</p>
                </v-col>
              </v-row>
              <v-row style="margin:100px 0 0 0;">
                <v-col>
                  <p>
                    Caso deseje excluir uma categoria existente, todos os lançamentos que estiverem atribuídos a ela, serão reatribuídos a "<strong>SEM CATEGORIA</strong>" que não pode ser excluída.
                  </p>
                </v-col>
                <v-col align="center">
                  <v-img
                    src="./../../assets/img/categoria_excluir.png"
                    style="box-shadow: 0 0 10px rgba(0,0,0,0.15);"
                    height="465px"
                    width="600px"
                  ></v-img>
                </v-col>
              </v-row>
            </v-container>
          </v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel>
          <v-expansion-panel-header class="card text--text">Lançamento</v-expansion-panel-header>
          <v-expansion-panel-content class="card text--text">
            <v-container>
              <v-row style="margin: 0  0 100px 0;">
                <v-col>
                  <p>Em LANÇAMENTOS você terá uma tabela com as entradas e saídas que podem ser visualizados pelo mês e classificados pelo ano.</p>
                  <p>Em cada lançamento, o ícone de flecha para cima indica entrada e para baixo saída.</p>
                  <p>O ícone cinza, indica que o lançamento ainda não foi executado, ou seja, foi cadastrado, mas ainda não aconteceu. Quando for alterado para executado, seu ícone ficara colorido. Vermelho para saída e verde para entrada.</p>
                </v-col>
                <v-col align="center">
                  <v-img
                    src="./../../assets/img/lancamento_principal.png"
                    style="box-shadow: 0 0 10px rgba(0,0,0,0.15);"
                    height="465px"
                    width="600px"
                  ></v-img>
                </v-col>
              </v-row>
              <v-row style="margin:100px 0;">
                <v-col align="center">
                  <v-img
                    src="./../../assets/img/lancamento_criar.png"
                    style="box-shadow: 0 0 10px rgba(0,0,0,0.15);"
                    height="465px"
                    width="600px"
                  ></v-img>
                </v-col>
                <v-col>
                  <p>Ao clicar em "NOVO LANÇAMENTO", será aberta a tela de cadastro de lançamentos. O valor precisa ser maior que 0,00 e a descrição de no mínimo 3 caracteres para poder salvar o lançamento.</p>
                </v-col>
              </v-row>
              <v-row style="margin:100px 0 0 0;">
                <v-col>
                  <p>O botão "EXIBIR CÁLCULOS", mostrará alguns resumos referente ao mês que está selecionado, você pode fechar cada resumo clicando no x ao lado ou em "OCULTAR CÁLCULOS" para esconder todos novamente.</p>
                </v-col>
                <v-col align="center">
                  <v-img
                    src="./../../assets/img/lancamento_exibir.png"
                    style="box-shadow: 0 0 10px rgba(0,0,0,0.15);"
                    height="465px"
                    width="600px"
                  ></v-img>
                </v-col>
              </v-row>
            </v-container>
          </v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel>
          <v-expansion-panel-header class="card text--text">Dashboard</v-expansion-panel-header>
          <v-expansion-panel-content class="card text--text">
            <v-container>
              <v-row style="margin: 0  0 100px 0;">
                <v-col>
                  <p>Na tela de DASHBOARD, você tem uma visão geral dos lançamentos cadastrados no seu perfil.</p>
                  <p>No gráfico anual, você tem a somatória dos valores de entrada e saída que são classificados por ano e separados pelo mês.</p>
                  <p>Também é possível no alterar em status, para visualizar todos, executados ou pendentes.</p>
                </v-col>
                <v-col align="center">
                  <v-img
                    src="./../../assets/img/grafico_anual.png"
                    style="box-shadow: 0 0 10px rgba(0,0,0,0.15);"
                    height="465px"
                    width="600px"
                  ></v-img>
                </v-col>
              </v-row>
              <v-row style="margin:100px 0 0 0;">
                <v-col align="center">
                  <v-img
                    src="./../../assets/img/dados_segmentados.png"
                    style="box-shadow: 0 0 10px rgba(0,0,0,0.15);"
                    height="465px"
                    width="600px"
                  ></v-img>
                </v-col>
                <v-col>
                  <p>Em "DADOS SEGMENTADOS", você tem as entradas e saída por fontes e por categorias. Além de também serem separados por mês e classificados pelo ano.</p>
                  <p>As tabelas podem ser classificadas de maior para menor ou o contrário clicando no cabeçalho de cada mês.</p>
                </v-col>
              </v-row>
            </v-container>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-row>
    <v-row>
      <v-col>
        <v-card color="transparent" flat>
          <v-col
            cols="12"
            sm="12"
            md="12"
            lg="12"
            xl="12"
            class="text--text"
            style="font-size: 16px; text-shadow: 0 0 0.5px; font-family: champagne-bold;"
          >
            <p>Esse programa foi desenvolvido com objetivo de auxiliar no controle e visão dos gastos pessoais e possui uma abordagem própria.</p>
            <p>
              Em caso de maiores dúvidas ou suporte, envie um correio eletrônico para:
              <i class="info--text">developer.jsa@gmail.com</i>
            </p>
            <p>
              Página institucional:
              <i class="info--text">http://devkit.com.br</i>
            </p>
            <div style="height: 20px;"></div>
            <p>OBRIGADO POR UTILIZAR.</p>
          </v-col>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
const { ipcRenderer } = window.require("electron");
export default {
  methods: {
    abrirNavegador() {
      ipcRenderer.send("abrir-publicidade");
    },
  },
  created() {
    this.$store.commit("SET_BTN_ADICIONAR", {
      nome: "",
      icone: "",
      comando: "",
    });
  },
};
</script>

<style>
</style>