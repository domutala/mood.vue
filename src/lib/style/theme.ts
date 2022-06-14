import { PluginObject } from "vue";

const plugin: PluginObject<any> = {
  install: () => {
    const config = (mode: "dark" | "light") => {
      let ts = ["255, 255, 255", "13, 17, 23"];
      if (mode === "dark") ts = ts.reverse();

      const surfaces = ["22, 27, 34", "250, 250, 250"];
      const surface = surfaces[mode === "dark" ? 0 : 1];

      const shadows = ["rgba(100, 100, 111, 0.2)", "rgba(0, 0, 0, 0.69)"];
      const shadow = shadows[mode === "dark" ? 1 : 0];

      const colors: { [key: string]: string } = {
        white: "255, 255, 255",
        black: "0, 0, 0",
        surface,
        light: ts[0],
        dark: ts[1],
        "shadow-color": shadow,
      };

      for (const key of Object.keys(colors)) {
        document.documentElement.style.setProperty(`--${key}`, colors[key]);
      }
    };

    const toconfig = () => {
      let mode = localStorage.getItem("mdtheme");
      if (!mode) {
        const dark = "(prefers-color-scheme: dark)";
        const isDark = window.matchMedia(dark).matches;
        mode = isDark ? "dark" : "light";
      }

      config(mode as "dark");
    };

    window.addEventListener("md:theme", toconfig);
    toconfig();
  },
};

export default plugin;
