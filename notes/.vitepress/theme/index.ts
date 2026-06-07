import DefaultTheme from "vitepress/theme";
import CodeLink from "./components/CodeLink.vue";
import "./custom.css";

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component("CodeLink", CodeLink);
  },
};
