<template>
  <component
    :is="tag"
    v-on="listeners"
    class="md-button md:button"
    :class="dynamicClass"
    :type="type"
    :disabled="disabled"
  >
    <slot />
    <div class="over">
      <div v-if="loading" class="loading">
        <md-svg name="loader" />
      </div>
      <md-loader-component v-if="loading2" width="100%" height="100%" />
    </div>
  </component>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import { Prop } from "vue-property-decorator";

@Component
export default class Base extends Vue {
  @Prop({ type: String }) type!: string;
  @Prop({ type: String, default: "center" }) align!: string;
  @Prop({ type: String, default: "button" }) tag!: string;
  @Prop({ type: Boolean, default: false }) block!: boolean;
  @Prop({ type: Boolean, default: false }) icon!: boolean;
  @Prop({ type: Boolean, default: false }) loading!: boolean;
  @Prop({ type: Boolean, default: false }) loading2!: boolean;
  @Prop({ type: Boolean, default: false }) disabled!: boolean;

  // type
  @Prop({ type: Boolean, default: false }) shine!: boolean;
  @Prop({ type: Boolean, default: false }) transparent!: boolean;
  @Prop({ type: Boolean, default: false }) border!: boolean;

  // radius
  @Prop({ type: Boolean, default: false }) circle!: boolean;
  @Prop({ type: Boolean, default: false }) round!: boolean;
  @Prop({ type: Boolean, default: false }) square!: boolean;

  // size
  @Prop({ type: Boolean, default: false }) sm!: boolean;
  @Prop({ type: Boolean, default: false }) xs!: boolean;
  @Prop({ type: Boolean, default: false }) lg!: boolean;

  get dynamicClass() {
    return [
      {
        // color
        danger: this.danger,
        success: this.success,
        warning: this.warning,
        dark: this.dark,
        light: this.light,
        black: this.black,
        white: this.white,

        // type
        shine: this.shine,
        transparent: this.transparent,
        border: this.border,

        // radius
        circle: this.circle,
        square: this.square,
        round: this.round,

        // size
        sm: this.sm,
        xs: this.xs,
        lg: this.lg,

        block: this.block,
        icon: this.icon,
      },
      [this.align],
    ];
  }
}
</script>
