import ScreenDashboard from './../../components/screens/Screen-Dashboard.vue';
import ScreenLancamentos from './../../components/screens/Screen-Lancamentos.vue';
import ScreenCategorias from './../../components/screens/Screen-Categorias.vue';
import ScreenFontes from './../../components/screens/Screen-Fontes.vue';
import ScreenPerfis from './../../components/screens/Screen-Perfis.vue';
import ScreenSobre from './../../components/screens/Screen-Sobre.vue';
import ScreenNotFound from './../../components/screens/Screen-not-found.vue';

const rotas = new Array();
rotas.push({ path: '/', component: ScreenDashboard });
rotas.push({ path: '/Lancamentos', component: ScreenLancamentos });
rotas.push({ path: '/Categorias', component: ScreenCategorias });
rotas.push({ path: '/Fontes', component: ScreenFontes });
rotas.push({ path: '/Perfis', component: ScreenPerfis });
rotas.push({ path: '/Sobre', component: ScreenSobre });
rotas.push({ path: '/**', component: ScreenNotFound });

const links = [
    {
        title: "Dashboard",
        icon: "mdi-view-dashboard",
        path: "/"
    },
    {
        title: "Lançamentos",
        icon: "mdi-cash-register",
        path: "/Lancamentos",
    },
    {
        title: "Categorias",
        icon: "mdi-palette-swatch",
        path: "/Categorias",
    },
    {
        title: "Fontes",
        icon: "mdi-currency-usd",
        path: "/Fontes",
    },
    {
        title: "Perfis",
        icon: "mdi-account-group",
        path: "/Perfis",
    },
    {
        title: "Sobre", icon: "mdi-help", path: "/Sobre",
    },
]

export { rotas, links };