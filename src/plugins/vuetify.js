import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      dark: {
        icon: "#90b5b5",
        text: "#90b5b5",
        primary: "#90b5b5",
        secondary: "#90b5b5",
        background: "#020502",
        card: "#050a08",
        modal: "#040704",
        edit: "#393",
        delete: "#a33",
        confirm: "#393",
        cancel: "#a33",
        use: "#44c",
        bar: "#050a08",
        tab_text: "#aaa"
      },
      light: {
        icon: "#025863",
        text: "#025863",
        primary: "#026873",
        secondary: "#026873",
        background: "#f5fff5",
        card: "#dfefdf",
        modal: "#efe",
        confirm: "#393",
        cancel: "#a33",
        edit: "#393",
        delete: "#a33",
        use: "#55d",
        bar: "#dfefdf",
        tab_text: "#777"
      },
    },
  },
});
