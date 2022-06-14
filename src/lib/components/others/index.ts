import { PluginObject } from "vue";

import LoaderComponent from "./LoaderComponent.vue";
import Scroller from "./Scroller.vue";

const plugin: PluginObject<any> = {
  install(app) {
    app.component("MdLoaderComponent", LoaderComponent);
    app.component("MdScroller", Scroller);
  },
};

export default plugin;
