import { PluginObject } from "vue";

import style from "./style";
import mixins from "./mixins";
import components from "./components";
import events from "./events";

import num, { $Number } from "./number";
import datetime, { $Datetime } from "./datetime";

declare module "vue/types/vue" {
  interface Vue {
    $md: {
      number: $Number;
      datetime: $Datetime;
    };
  }
}

const plugin: PluginObject<any> = {
  install(app, options) {
    app.prototype.$md = {};
    if (!options) options = {};

    app.use(style, options.style);
    app.use(mixins);
    app.use(components);
    app.use(events);
    app.use(num);
    app.use(datetime);
  },
};

export default plugin;
