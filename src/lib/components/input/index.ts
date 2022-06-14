import { PluginObject } from "vue";

import base from "./base.vue";
import inpute from "./input.vue";
import num from "./number.vue";
import text from "./text.vue";
import select from "./select.vue";
import date from "./date.vue";

const plugin: PluginObject<any> = {
  install(app) {
    app.component("md-input-base", base);
    app.component("md-input", inpute);
    app.component("md-input-number", num);
    app.component("md-input-text", text);
    app.component("md-input-select", select);
    app.component("md-input-date", date);
  },
};

export default plugin;
