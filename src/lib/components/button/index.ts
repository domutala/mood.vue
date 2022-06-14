import { PluginObject } from "vue";

import base from "./base.vue";

const plugin: PluginObject<any> = {
  install(app) {
    app.component("md-button", base);
  },
};

export default plugin;
