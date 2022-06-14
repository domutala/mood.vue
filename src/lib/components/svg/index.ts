import { PluginObject } from "vue";
import base from "./base.vue";

const filenames = require.context("./contents", false, /.svg$/);

const plugin: PluginObject<any> = {
  install: async function (app) {
    for (const filename of filenames.keys()) {
      const name = filename.replace(/^\.\/(.+)\.svg$/, "$1");
      const svg = (await import(`!!raw-loader!./contents/${name}.svg`)).default;
      app.component(`md-svg-${name}`, { template: svg });
    }

    app.component("MdSvg", base);
  },
};

export default plugin;
