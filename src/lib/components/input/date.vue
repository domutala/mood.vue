<template>
  <md-dropper @close="openDropper = false" @open="openDropper = true">
    <div slot="button" class="md-input" :class="dynamicClass">
      <div class="over">
        <slot name="before" />
        <div class="in">
          <div class="placeholder">{{ placeholder }}</div>
          <input
            :required="required"
            :readonly="readonly"
            :name="name"
            :id="id"
            :value="formated"
            @focus="onFocus"
          />
        </div>
        <slot name="after" />
      </div>
      <div class="info">
        <slot name="info" />
      </div>
    </div>

    <div v-if="openDropper">
      <md-date :value="val" @input="onInput" />
    </div>
  </md-dropper>
</template>
<script lang="ts">
import moment from "moment";
import { Component, Prop, Watch } from "vue-property-decorator";
import NInputBase from "./base.vue";
import "./select.scss";

@Component
export default class NInput extends NInputBase {
  @Prop({ type: Array, default: () => [] })
  options!: { text: string; icon: string; value: any }[];

  openDropper = false;
  minWidth = 0;
  val: Date | null = null;

  get formated() {
    if (!this.val) return "";
    const v = this.$md.datetime.formater(this.value);
    return v;
  }

  get isCon() {
    return this.formated.length !== 0;
  }

  mounted() {
    this.onValue();
  }

  onFocus(e: any) {
    e.target.blur();
  }

  onInput(value: Date) {
    this.closePopup();
    this.val = value;
  }

  @Watch("val")
  onVal() {
    this.$emit("input", this.val);
  }

  @Watch("value", { deep: true })
  onValue() {
    if (this.value) {
      const date = moment(this.value);

      if (!moment(this.val).isSame(date)) {
        if (date.isValid()) this.val = date.toDate();
      }
    }
  }
}
</script>
