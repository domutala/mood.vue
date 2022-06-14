import { PluginObject } from "vue";

import base from "./base.vue";
import modal from "./modal.vue";
import dropper from "./dropper";

const plugin: PluginObject<any> = {
  install(app) {
    app.component("md-popup", base);
    app.component("md-modal", modal);

    app.use(dropper);
  },
};

export default plugin;
