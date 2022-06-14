<template>
  <div class="md-switch">
    <input type="checkbox" :checked="isChecked" @input="onInput" />
    <div class="back"></div>
    <div class="over"></div>
    <div class="circle"></div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";

import "./style.scss";

@Component
export default class NSwitech extends Vue {
  @Prop({ default: "" }) value: any;
  @Prop({ default: "" }) val!: any;
  @Prop({ default: "" }) notValue!: any;

  get isChecked() {
    let isChecked = false;

    if (this.value) {
      if (typeof this.value === "boolean") {
        isChecked = this.value;
      } else if (typeof this.value === "object" && this.value !== null) {
        const array = this.value;
        const containValue =
          !array.includes(this.val) &&
          !JSON.stringify(array).includes(JSON.stringify(this.val));

        if (containValue) {
          return false;
        } else {
          return true;
        }
      }
    } else {
      isChecked = false;
    }
    return isChecked;
  }

  onInput() {
    if (typeof this.value === "boolean") {
      this.$emit("input", !this.value);
    } else if (typeof this.value === "object" && this.value !== null) {
      const array = this.value;
      const containValue =
        !array.includes(this.val) &&
        !JSON.stringify(array).includes(JSON.stringify(this.val));
      let indexVal = 0;

      array.forEach((item: any, index: number) => {
        if (JSON.stringify(item) === JSON.stringify(this.val)) {
          indexVal = index;
        }
      });

      if (containValue) {
        array.push(this.val);
      } else {
        array.splice(indexVal, 1);
      }

      this.$emit("input", array);
    } else if (this.val !== this.value) {
      this.$emit("input", this.val);
    } else {
      this.$emit("input", this.notValue || null);
    }

    // this.$emit("change", evt);
  }
}
</script>
