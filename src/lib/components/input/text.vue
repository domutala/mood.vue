<template>
  <div class="md-input" :class="dynamicClass">
    <div class="over">
      <slot name="before" />
      <div class="in">
        <div class="placeholder">{{ placeholder }}</div>
        <div class="input">
          <textarea
            style=""
            :required="required"
            :readonly="readonly"
            :name="name"
            :id="id"
            :type="type"
            v-model="val"
          />
        </div>
      </div>
      <slot name="after" />
    </div>
    <div class="info"></div>
  </div>
</template>

<script lang="ts">
import Component from "vue-class-component";
import { Prop, Watch } from "vue-property-decorator";
import NInputBase from "./base.vue";

@Component
export default class NInput extends NInputBase {
  @Prop({ type: String, default: "text" }) type!: string;

  val = "";

  get isCon() {
    if (typeof this.val === "undefined" || this.val === null) return false;
    return String(this.val).length > 0;
  }

  mounted() {
    this.onValue();
  }

  @Watch("val")
  onVal() {
    this.$emit("input", this.val);
  }

  @Watch("value", { deep: true })
  onValue() {
    this.val = this.value;
  }
}
</script>

<style scoped lang="scss">
textarea {
  resize: none;
  font: inherit;
  background-color: transparent;
  color: inherit;
  border: 0;
  padding: 0;
  min-height: 80px;
  max-height: 170px;
  width: 100%;

  &::-webkit-scrollbar {
    width: 7px;
  }

  /* Track */
  &::-webkit-scrollbar-track {
    background: rgba(var(--dark), 0.1);
    border-radius: 10em;
  }

  /* Handle */
  &::-webkit-scrollbar-thumb {
    background: rgba(var(--dark), 0.2);
    border-radius: 10em;

    &:hover {
      background: rgba(var(--dark), 0.5);
    }
  }
}
</style>
