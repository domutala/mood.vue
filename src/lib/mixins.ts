import Vue, { PluginObject } from "vue";

declare module "vue/types/vue" {
  export interface Vue {
    $index: string;
    listeners(this: Vue): { [key: string]: (event: any) => void };
    dispatchEvent(this: Vue, name: string, detail?: any): void;
    closePopup(): void;

    // props colors
    primary: boolean;
    danger: boolean;
    success: boolean;
    warning: boolean;
    dark: boolean;
    light: boolean;
    black: boolean;
    white: boolean;
  }
}

const plugin: PluginObject<any> = {
  install(app) {
    app.mixin({
      props: {
        primary: { type: Boolean, default: false },
        danger: { type: Boolean, default: false },
        success: { type: Boolean, default: false },
        warning: { type: Boolean, default: false },
        dark: { type: Boolean, default: false },
        light: { type: Boolean, default: false },
        black: { type: Boolean, default: false },
        white: { type: Boolean, default: false },
      },

      beforeCreate() {
        let $index = Math.random().toString().split(".")[1];
        $index = $index.slice(0, 8);

        this.$index = $index;
      },

      mounted(this: Vue) {
        if (this.$el && typeof this.$el.setAttribute === "function") {
          this.$el.setAttribute(`data-md-${this.$index}`, "");
        }
      },

      methods: {
        dispatchEvent(name: string, detail?: any) {
          const ev = new CustomEvent(name, { detail });
          window.dispatchEvent(ev);
        },

        closePopup() {
          this.dispatchEvent("close-popup");
        },
      },

      computed: {
        listeners(this: Vue) {
          return {
            ...this.$listeners,
            click: (event: any) => {
              this.$emit("click", event);
            },
            dblclick: (event: any) => {
              this.$emit("dblclick", event);
            },
            focus: (event: any) => {
              this.$emit("focus", event);
            },
            focusin: (event: any) => {
              this.$emit("focusin", event);
            },
            focusout: (event: any) => {
              this.$emit("focusout", event);
            },
            blur: (event: any) => {
              this.$emit("blur", event);
            },
            scroll: (event: any) => {
              this.$emit("scroll", event);
            },
            resize: (event: any) => {
              this.$emit("resize", event);
            },
            keyup: (event: any) => {
              this.$emit("keyup", event);
            },
            keydown: (event: any) => {
              this.$emit("keydown", event);
            },
            keypress: (event: any) => {
              this.$emit("keypress", event);
            },
            mouseenter: (event: any) => {
              this.$emit("mouseenter", event);
            },
            mouseleave: (event: any) => {
              this.$emit("mouseleave", event);
            },
            mousedown: (event: any) => {
              this.$emit("mousedown", event);
            },
            mousemove: (event: any) => {
              this.$emit("mousemove", event);
            },
            mouseout: (event: any) => {
              this.$emit("mouseout", event);
            },
            mouseup: (event: any) => {
              this.$emit("mouseup", event);
            },
            mousewheel: (event: any) => {
              this.$emit("mousewheel", event);
            },
            touchstart: (event: any) => {
              this.$emit("touchstart", event);
            },
            touchmove: (event: any) => {
              this.$emit("touchmove", event);
            },
            touchcancel: (event: any) => {
              this.$emit("touchcancel", event);
            },
            touchend: (event: any) => {
              this.$emit("touchend", event);
            },
          };
        },
      },
    });
  },
};

export default plugin;
