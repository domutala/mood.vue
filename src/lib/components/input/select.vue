<template>
  <md-dropper @close="openDropper = false" @open="openDropper = true">
    <div slot="button" class="md-input" :class="dynamicClass">
      <div class="over">
        <slot name="before" />
        <div class="in">
          <div class="placeholder">{{ placeholder }}</div>

          <div v-if="isValueArray" class="input">
            <div class="select-group" style="min-height: 16px">
              <button
                v-for="(val, v) in valueInputer0"
                :key="v"
                :class="{ select: valueArray.includes(val.value) }"
                @click="choice(val.value)"
              >
                <div>{{ val.text }}</div>
              </button>
            </div>
          </div>
          <input
            v-else
            :required="required"
            :readonly="readonly"
            :name="name"
            :id="id"
            :value="valueInputer0.length ? valueInputer0[0].text : ''"
            @focus="onFocus"
          />
        </div>
        <slot name="after" />
      </div>
      <div class="info"></div>
    </div>

    <div class="select-con" :style="{ minWidth: `${minWidth}px` }">
      <button
        v-for="(option, o) in options"
        :key="o"
        :class="{ select: valueArray.includes(option.value) }"
        @click="choice(option.value)"
      >
        <div class="index"></div>
        {{ option.text }}
      </button>
    </div>
  </md-dropper>
</template>
<script lang="ts">
import { Component, Prop } from "vue-property-decorator";
import NInputBase from "./base.vue";
import "./select.scss";

@Component
export default class NInput extends NInputBase {
  @Prop({ type: Array, default: () => [] })
  options!: { text: string; icon: string; value: any }[];

  openDropper = false;
  minWidth = 0;

  get isValueArray() {
    return Array.isArray(this.value);
  }

  get valueArray() {
    if (!this.isValueArray && typeof this.value === "undefined") return [];
    return this.isValueArray ? this.value : [this.value];
  }

  get valueInputer0() {
    const value = this.valueArray;
    const options = this.options.filter((opt) => value.includes(opt.value));

    return options;
  }

  get isCon() {
    return typeof this.value !== "undefined" && this.valueArray.length !== 0;
  }

  mounted() {
    this.setMinWidth();
    window.addEventListener("resize", this.setMinWidth);
  }

  setMinWidth() {
    this.minWidth = this.$el.getBoundingClientRect().width;
  }

  choice(value: any) {
    if (Array.isArray(this.value)) {
      let values = this.value;
      const i = values.includes(value);

      if (i) values = values.filter((v) => v !== value);
      else values.push(value);

      this.$emit("input", values);
    } else {
      this.$emit("input", value);
      this.closePopup();
    }
  }

  onFocus(e: any) {
    e.target.blur();
  }

  beforeDestroy() {
    window.removeEventListener("resize", this.setMinWidth);
  }
}
</script>
