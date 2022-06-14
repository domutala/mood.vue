import { PluginObject } from "vue";
import moment from "moment";

export interface $Datetime {
  formater: (date: string | Date, format?: string) => string;
}

const formater = (date: string | Date, format = "DD MMMM YYYY") => {
  return moment(date).format(format);
};

const plugin: PluginObject<any> = {
  install(app) {
    app.prototype.$md.datetime = { formater };
  },
};

export default plugin;
