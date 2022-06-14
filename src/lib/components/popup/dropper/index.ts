import { PluginObject } from "vue";

import base from "./base.vue";
import inner from "./inner.vue";

const plugin: PluginObject<any> = {
  install(app) {
    app.component("md-dropper-base", base);
    app.component("md-dropper", inner);
  },
};

export default plugin;
