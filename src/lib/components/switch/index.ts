import { PluginObject } from "vue";

import base from "./base.vue";

const plugin: PluginObject<any> = {
  install(app) {
    app.component("md-switch", base);
  },
};

export default plugin;
