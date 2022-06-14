import { PluginObject } from "vue";

import button from "./button";
import inpute from "./input";
import popup from "./popup";
import switche from "./switch";
import svg from "./svg";
import date from "./date";
import others from "./others";

const plugin: PluginObject<any> = {
  install(app) {
    app.use(button);
    app.use(inpute);
    app.use(popup);
    app.use(switche);
    app.use(svg);
    app.use(date);
    app.use(others);
  },
};

export default plugin;
