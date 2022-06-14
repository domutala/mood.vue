import { PluginObject } from "vue";

const plugin: PluginObject<any> = {
  install() {
    let isrun = false;

    const lastPopup = () => {
      const popups = document.querySelectorAll("[popup]");
      if (!popups.length) return null;

      const el = popups.item(popups.length - 1);
      return el;
    };

    const unsetRun = () => {
      setTimeout(() => {
        isrun = false;
      }, 100);
    };

    const closer = () => {
      if (isrun) return;
      isrun = true;

      const popup = lastPopup();
      if (!popup) return unsetRun();

      const attr = popup.getAttribute("popup") as string;
      const ev = new CustomEvent(`back-${attr}`); // `close-popup-${attr}`
      popup.dispatchEvent(ev);

      unsetRun();
    };

    const closerEsc = (e: KeyboardEvent) => {
      if (e.code !== "Escape") return;
      if (isrun) return;
      isrun = true;

      const popup = lastPopup();
      if (!popup) return unsetRun();

      const attr = popup.getAttribute("popup") as string;
      const ev = new CustomEvent(`esc-${attr}`);
      popup.dispatchEvent(ev);

      unsetRun();
    };

    window.addEventListener("keydown", closerEsc);
    window.addEventListener("close-popup", closer);
    window.addEventListener("click", closer);
  },
};

export default plugin;
