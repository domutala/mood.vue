import { PluginObject } from "vue";

import formater, { $Fomater } from "./formater";
import random, { $Random } from "./random";

export interface $Number {
  formater: $Fomater;
  random: $Random;
}

const plugin: PluginObject<any> = {
  install(app) {
    app.prototype.$md.number = {};

    app.use(formater);
    app.use(random);
  },
};

// const plugin: Plugin = async (context, app) => {
//   if (!context.$number) {
//     app.prototype.$number = {};
//     await formater(context, app);
//     await random(context, app);
//   }

//   // (context as any).$number = {};
// };

export default plugin;
