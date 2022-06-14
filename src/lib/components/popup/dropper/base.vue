<template>
  <div class="md:popup md-popup" v-show="showed" disabled-back>
    <div
      ref="popup"
      class="dropper"
      :class="{
        square,
        primary,
        danger,
        success,
        warning,
        dark,
        light,
        black,
        white,
      }"
    >
      <span v-show="showSpin" ref="spin" class="spin"></span>
      <md-scroller ref="content" id="content" class="content">
        <slot />
      </md-scroller>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop } from "vue-property-decorator";
import NPopupBase from "../base.vue";

@Component
export default class extends NPopupBase {
  @Prop({ type: String }) parent!: string;
  @Prop({ type: Boolean, default: false }) showSpin!: boolean;
  @Prop({ type: Boolean, default: false }) square!: boolean;

  // color
  @Prop({ type: Boolean, default: false }) primary!: boolean;
  @Prop({ type: Boolean, default: false }) danger!: boolean;
  @Prop({ type: Boolean, default: false }) success!: boolean;
  @Prop({ type: Boolean, default: false }) warning!: boolean;
  @Prop({ type: Boolean, default: false }) dark!: boolean;
  @Prop({ type: Boolean, default: false }) light!: boolean;
  @Prop({ type: Boolean, default: false }) black!: boolean;
  @Prop({ type: Boolean, default: false }) white!: boolean;

  openned = false;
  showed = false;

  afterMount() {
    window.addEventListener("resize", this.rebuild);
    this.toOpen();
  }

  toOpen() {
    if (this.openned) return;
    setTimeout(this.open, 120);
  }

  open() {
    this.openned = true;

    setTimeout(() => {
      // const popup = this.$refs.popup as HTMLDivElement;
      const button = document.querySelector(this.parent) as HTMLDivElement;
      const rect = button.getBoundingClientRect();

      const popup = this.$refs.popup as HTMLDivElement;
      const content = this.$el.querySelector("#content") as HTMLDivElement;
      // const content = this.$refs.content as HTMLDivElement;

      let vertAlign: "bottom" | "top" = "bottom";
      let horizAlign: "left" | "right" = "left";

      // set vertical align
      if (window.innerHeight - rect.top > rect.top) vertAlign = "top";
      else vertAlign = "bottom";

      // set horizontal align
      if (window.innerWidth - rect.left < 450) horizAlign = "right";
      else horizAlign = "left";

      let vertCoord = 0;
      let horizCoord = 0;

      if (vertAlign === "bottom") vertCoord = window.innerHeight - rect.top;
      else vertCoord = rect.top + button.offsetHeight;

      if (horizAlign === "right") horizCoord = window.innerWidth - rect.right;
      else horizCoord = rect.left;

      // set max-height
      let maxHeight = 0;
      if (vertAlign === "bottom") maxHeight = rect.top;
      else maxHeight = window.innerHeight - rect.bottom;

      // set max-width
      let maxWidth = 0;
      if (horizAlign === "left") maxWidth = window.innerWidth - rect.left;
      else maxWidth = rect.right;

      const spinHeight = this.showSpin ? 10 : 5;

      // set margin
      popup.style[`margin-${vertAlign}` as "margin"] = `${spinHeight}px`;

      // set attributes
      popup.setAttribute(`align-${vertAlign}`, "");
      popup.setAttribute(`align-${horizAlign}`, "");

      // spin position
      const spin = this.$refs.spin as HTMLDivElement;
      spin.style[vertAlign] = "0";
      spin.style[horizAlign] = "10px";

      popup.style[vertAlign] = `${vertCoord}px`;
      popup.style[horizAlign] = `${horizCoord}px`;
      popup.style.maxWidth = `${maxWidth}px`;
      popup.style.zIndex = `${parseInt(this.zIndex.toString()) + 1}`;

      content.style.maxHeight = `${maxHeight - spinHeight}px`;

      this.showed = true;
      this.$emit("open");
    }, 200);
  }

  rebuild() {
    if (this.openned && this.showed) this.open();
  }

  closer() {
    this.showed = false;
    this.openned = false;
    this.$emit("close");
  }

  beforeDestroy() {
    window.removeEventListener("resize", this.rebuild);
    this.closer();
  }
}
</script>

<style lang="scss">
.md-popup {
  .dropper {
    position: absolute;
    box-shadow: var(--box-shadow);
    transition: all 0.3s ease;
    background-color: rgba(var(--light), 1);
    border-radius: 6px;

    &::before {
      content: "";
      position: absolute;
      top: 0px;
      left: 0px;
      right: 0px;
      bottom: 0px;
      border-radius: inherit;
      pointer-events: none;
      z-index: -1;
      background-color: inherit;
    }

    &::after {
      content: "";
      position: absolute;
      top: 0px;
      left: 0px;
      right: 0px;
      bottom: 0px;
      border-radius: inherit;
      border: 1px solid rgba(var(--dark), 0.1);
      pointer-events: none;
      z-index: 0;
    }

    &.square {
      border-radius: 0;
    }

    .spin {
      content: "";
      background-color: inherit;
      position: absolute;
      border-radius: 7px 0 0 0;
      box-shadow: inherit;
      border: inherit;
      width: 15px;
      height: 15px;
      z-index: -2;
    }

    &[align-top] {
      .spin {
        transform: translateY(-50%) rotate(45deg);
      }
    }

    &[align-bottom] {
      .spin {
        transform: translateY(50%) rotate(225deg);
      }
    }

    // primary
    &.primary {
      background-color: rgba(var(--primary), 1);
      color: rgba(var(--white), 1);
    }

    // danger
    &.danger {
      background-color: rgba(var(--danger), 1);
      color: rgba(var(--white), 1);
    }

    // success
    &.success {
      background-color: rgba(var(--success), 1);
      color: rgba(var(--white), 1);
    }

    // warning
    &.warning {
      background-color: rgba(var(--warning), 1);
      color: rgba(var(--black), 1);
    }

    // dark
    &.dark {
      background-color: rgba(var(--dark), 1);
      color: rgba(var(--light), 1);
    }

    // light
    &.light {
      background-color: rgba(var(--light), 1);
      color: rgba(var(--dark), 1);
    }

    // dark
    &.white {
      background-color: rgba(var(--white), 1);
      color: rgba(var(--black), 1);
    }

    // dark
    &.black {
      background-color: rgba(var(--black), 1);
      color: rgba(var(--white), 1);
    }
  }
}
</style>
