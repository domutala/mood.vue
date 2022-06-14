<template>
  <div @click="onOpen">
    <slot name="button" />

    <md-dropper-base
      v-if="open"
      :show-spin="showSpin"
      :square="square"
      :parent="`[data-md-${$index}]`"
      :z-index="zIndex"
      :primary="primary"
      :danger="danger"
      :success="success"
      :warning="warning"
      :dark="dark"
      :light="light"
      :black="black"
      :white="white"
      @close="onClose"
      @open="$emit('open')"
    >
      <slot />
    </md-dropper-base>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class extends Vue {
  @Prop({ type: Boolean, default: false }) showSpin!: boolean;
  @Prop({ type: Boolean, default: false }) square!: boolean;
  @Prop({}) zIndex!: string;

  open = false;

  onOpen() {
    this.open = true;
  }

  onClose() {
    this.open = false;
    this.$emit("close");
  }
}
</script>
