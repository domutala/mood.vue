<template>
  <div class="md:popup md-popup" v-if="isFinish">
    <slot />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

import "./style.scss";

@Component
export default class NPopupBase extends Vue {
  @Prop({ type: Boolean, default: true }) closeOnBack!: boolean;
  @Prop({ type: Boolean, default: true }) closeOnEsc!: boolean;
  @Prop({ type: Boolean, default: false }) disabledBack!: boolean;
  @Prop({
    type: [String, Number],
    default: 500,
    validator: (val) => !isNaN(val),
  })
  zIndex!: string;

  popupClicked = false;
  index = "";
  isFinish = false;

  mounted() {
    setTimeout(() => {
      this.isFinish = true;

      this.index = `md-popup-${this.$index}`;
      this.$el.setAttribute(this.index, "");
      this.$el.setAttribute("popup", this.index);

      if (this.$slots.default && this.$slots.default.length > 1) {
        const error = new Error(
          "Popup component requires exactly one element."
        );
        throw error;
      }

      if (this.disabledBack) this.$el.setAttribute("disabled-back", "");

      const body = document.querySelector("body") as HTMLElement;
      setTimeout(this.setPopup, 50);

      if (body) {
        body.setAttribute("style", "overflow: hidden");
        body.appendChild(this.$el);
        this.$emit("open");
      }
    }, 50);
  }

  setPopup() {
    this.$el.addEventListener(`back-${this.index}`, this.onBackClick);
    this.$el.addEventListener(`esc-${this.index}`, this.onEscPress);

    const key = `[${this.index}] > :nth-child(1)`;
    const popup = this.$el.querySelector(key) as HTMLDivElement;
    if (!popup) return;

    const onClick = () => {
      this.popupClicked = true;
      setTimeout(() => (this.popupClicked = false), 200);
    };

    popup.style.zIndex = this.zIndex;
    popup.addEventListener("click", onClick);

    this.afterMount();
  }

  afterMount() {}

  close() {
    this.$emit("close");
  }

  onBackClick() {
    if (!this.closeOnBack) return;
    if (this.popupClicked) return;

    this.close();
  }

  onEscPress() {
    if (!this.closeOnEsc) return;
    this.close();
  }

  beforeDestroy() {
    this.$el.removeEventListener(`back${this.index}`, this.onBackClick);
    this.$el.removeEventListener(`esc-${this.index}`, this.onBackClick);

    const body = document.querySelector("body");
    const modals = document.querySelectorAll(".npopup");

    if (body && modals.length <= 1) {
      body.setAttribute("style", "overflow: auto");
    }

    if (body && this.$el.parentNode === body) {
      body.removeChild(this.$el);
    }
  }
}
</script>
