import ScreenHome from './../../components/screens/Screen-Home.vue';
import ScreenDashboard from './../../components/screens/Screen-Dashboard.vue';
import ScreenLancamentos from './../../components/screens/Screen-Lancamentos.vue';
import ScreenCategorias from './../../components/screens/Screen-Categorias.vue';
import ScreenFontes from './../../components/screens/Screen-Fontes.vue';
import ScreenPerfis from './../../components/screens/Screen-Perfis.vue';
import ScreenAjuda from './../../components/screens/Screen-Ajuda.vue';
import ScreenNotFound from './../../components/screens/Screen-not-found.vue';

const rotas = new Array();
rotas.push({ path: '/', component: ScreenHome });
rotas.push({ path: '/Dashboard', component: ScreenDashboard });
rotas.push({ path: '/Lancamentos', component: ScreenLancamentos });
rotas.push({ path: '/Categorias', component: ScreenCategorias });
rotas.push({ path: '/Fontes', component: ScreenFontes });
rotas.push({ path: '/Perfis', component: ScreenPerfis });
rotas.push({ path: '/Ajuda', component: ScreenAjuda });
rotas.push({ path: '/**', component: ScreenNotFound });

const links = [
    {
        title: "Início",
        icon: "mdi-home",
        path: "/",
        description: "Aqui você tem uma breve descrição de cada tela."
    },
    {
        title: "Dashboard",
        icon: "mdi-view-dashboard",
        path: "/Dashboard",
        description: "Nessa tela, você terá acesso a um gráfico dinâmico e tabelas onde poderá filtrar seus dados."
    },
    {
        title: "Lançamentos",
        icon: "mdi-cash-register",
        path: "/Lancamentos",
        description: "Aqui você poderá cadastrar seus lançamentos de entrada e saída."
    },
    {
        title: "Categorias",
        icon: "mdi-palette-swatch",
        path: "/Categorias",
        description: "Crie categorias para ter maior nível de detalhes sobre suas entrada e saídas."
    },
    {
        title: "Fontes",
        icon: "mdi-currency-usd",
        path: "/Fontes",
        description: "Crie fontes para direcionar o suas entradas e ter maior controle sobre suas saídas."
    },
    {
        title: "Perfis",
        icon: "mdi-account-group",
        path: "/Perfis",
        description: "Gerencie os perfis existentes dentro do programa."
    },
    {
        title: "Ajuda", icon: "mdi-help", path: "/Ajuda", description: "Está com dúvidas? Talvez essa tela possa lhe ajudar."
    },
]

export { rotas, links };