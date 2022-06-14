<template>
  <div class="md:popup md-popup">
    <div class="modal" :class="{ break: breaked }">
      <div class="spinner" v-if="!hideTopper">
        <div></div>
      </div>
      <md-scroller>
        <slot />
      </md-scroller>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop } from "vue-property-decorator";
import NPopupBase from "./base.vue";

@Component
export default class extends NPopupBase {
  @Prop({ type: Boolean, default: false }) hideTopper!: boolean;
  breaked = false;

  mounted() {
    this.onResize();
    window.addEventListener("resize", this.onResize);
  }

  onResize() {
    this.breaked = window.innerWidth <= 442;
  }

  beforeDestroy() {
    window.removeEventListener("resize", this.onResize);
  }
}
</script>

<style lang="scss" scoped>
.md-popup {
  > .modal {
    background-color: rgba(var(--light), 1);
    max-width: 90%;
    max-height: 90%;
    box-shadow: var(--box-shadow-sm);
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 0.6em;

    &::before {
      content: "";
      position: absolute;
      top: 0px;
      left: 0px;
      right: 0px;
      bottom: 0px;
      border-radius: inherit;
      border: 1px solid rgba(var(--dark), 0.1);
      pointer-events: none;
      z-index: 5000;
    }

    .spinner {
      height: 30px;
      position: sticky;
      top: 0;
      background-color: inherit;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 100;
      display: none;
      border-radius: inherit;

      > div {
        width: 30px;
        height: 5px;
        background-color: rgba(var(--dark), 01);
        border-radius: 0.6em;
      }
    }

    &.break {
      max-width: 100% !important;
      max-height: 90% !important;
      width: 100% !important;
      border-bottom-right-radius: 0;
      border-bottom-left-radius: 0;

      top: 100%;
      transform: translate(-50%, -100%);

      .spinner {
        display: flex;
      }
    }
  }
}
</style>
