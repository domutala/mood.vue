import { PluginObject } from "vue";

export type $RandomParam = { max?: number; min?: number; decimal?: number };
export type $Random = ({ max, min, decimal }?: $RandomParam) => number;

const random = ({ max = 100, min = 0, decimal = 0 }: $RandomParam = {}) => {
  let random = Math.random() * (max - min + 1) + min;

  if (decimal == 0) {
    random = Math.floor(random);
  } else {
    random = Number(random.toFixed(decimal));
  }

  if (min < 0) {
    const m = Math.random() > 0.5 ? -1 : 1;
    random = random * m;
  }

  return random;
};

const plugin: PluginObject<any> = {
  install(app) {
    app.prototype.$md.number.random = random;
  },
};

export default plugin;
