import "material-design-icons-iconfont/dist/material-design-icons.css";
import Vue from "vue";
import Vuetify from "vuetify/lib";

Vue.use(Vuetify, {
  theme: {
    themes: {
      light: {
        primary: "#455A64",
        success: "#558B2F",
        info: "#FFB74D",
        error: "#E53935"
      }
    }
  }
});

export default new Vuetify({
  icons: {
    iconfont: "md"
  }
});
