<template>
  <component :is="`md-svg-${name}`" />
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class NSvg extends Vue {
  @Prop({ type: String, required: true }) name!: string;
}
</script>
