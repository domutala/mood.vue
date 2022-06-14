import "src/lib";

declare module "vue/types/vue" {
  interface Vue {
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
