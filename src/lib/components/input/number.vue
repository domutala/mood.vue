<template>
  <div class="md-input" :class="dynamicClass">
    <div class="over">
      <slot name="before" />
      <div class="in">
        <div class="placeholder">{{ placeholder }}</div>
        <input
          :required="required"
          :readonly="readonly"
          :name="name"
          :id="id"
          v-model="val"
          inputmode="numeric"
        />
      </div>
      <slot name="after" />
    </div>
    <div class="info"></div>
  </div>
</template>

<script lang="ts">
import Component from "vue-class-component";
import { Watch } from "vue-property-decorator";
import NInputBase from "./base.vue";

@Component
export default class NInput extends NInputBase {
  aval: null | number = null;

  get val(): string {
    const v = this.aval || "";
    return this.$md.number.formater(v);
  }

  set val(v: string) {
    if (!v) this.aval = null;
    else {
      v = v.toString().replaceAll(/\s/gim, "");
      v = v.toString().replaceAll(/,/gim, ".");
      const v0 = Number(v);
      if (!isNaN(v0)) this.aval = v0;
      else this.aval = null;
    }
  }

  get isCon() {
    if (typeof this.aval === "number") return true;
    return false;
  }

  mounted() {
    this.onValue();
  }

  @Watch("aval", { deep: true })
  onVal() {
    this.$emit("input", this.aval);
  }

  @Watch("value", { deep: true })
  onValue() {
    if (typeof this.value === "number") this.val = this.value.toString();
    else this.val = "";
  }
}
</script>
