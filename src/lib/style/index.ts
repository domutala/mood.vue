import { PluginObject } from "vue";
// import theme from "./theme";

const plugin: PluginObject<any> = {
  install: (app, options) => {
    if (!options) options = {};

    import("./index.scss");

    // app.use(theme, options);

    const setColor = (_colors: any) => {
      const colors: { [key: string]: string } = {
        primary: "31, 111, 235",
        danger: "230, 60, 60",
        warning: "255, 235, 0",
        success: "0, 195, 107",
        white: "255, 255, 255",
        black: "0, 0, 0",
        surface: "247, 247, 247",
        dark: "22, 27, 34",
        light: "255, 255, 255",
        shadow: "13, 13, 13",
      };

      if (_colors) {
        for (const key of Object.keys(_colors)) {
          colors[key] = _colors[key];
        }
      }

      for (const key of Object.keys(colors)) {
        const color = colors[key];
        const _color = `rgb(${color})`;
        const _key = `${key}-color`;

        document.documentElement.style.setProperty(`--${key}`, color);
        document.documentElement.style.setProperty(`--${_key}`, _color);
      }

      for (let i = 0; i < 4; i++) {
        const alphat = [0.07, 0.1, 0.15, 0.2];
        const sizes = ["-xs", "-sm", "", "-lg"];
        const item = `--box-shadow${sizes[i]}`;

        const box = `rgba(var(--shadow), ${alphat[i]}) 0px 7px 29px 0px`;
        document.documentElement.style.setProperty(item, box);
      }
    };

    window.addEventListener("md-set-color", (ev: any) => setColor(ev.detail));
    setColor(options.colors);
  },
};

export default plugin;
