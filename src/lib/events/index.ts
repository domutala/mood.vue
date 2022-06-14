import { PluginObject } from "vue";
import popup from "./popup";

const plugin: PluginObject<any> = {
  install(app) {
    app.use(popup);
  },
};

export default plugin;
