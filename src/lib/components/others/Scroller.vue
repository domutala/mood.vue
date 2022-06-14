<template>
  <div class="md-scroller">
    <slot />
    <!-- <div ref="scroll" class="scroll"></div>
    <div ref="spin" class="spin"></div> -->
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class extends Vue {
  mounted() {
    // this.$el.addEventListener("scroll", this.onScroll);
    // window.addEventListener("resize", this.build);
    // this.build();
  }

  updated() {
    // this.build();
  }

  build() {
    const spin = this.$refs.spin as HTMLDivElement;
    const scroll = this.$refs.scroll as HTMLDivElement;

    scroll.style.height = "0";
    spin.style.top = "0";

    setTimeout(() => {
      scroll.style.height = `${(this.$el as HTMLDivElement).scrollHeight}px`;

      const el = this.$el as HTMLDivElement;
      const x1 = (el.offsetHeight * 100) / el.scrollHeight;

      spin.style.height = `${x1}%`;

      const w = el.scrollHeight > el.offsetHeight ? 7 : 0;
      spin.style.width = `${w}px`;
      scroll.style.width = `${w}px`;

      this.onScroll();
    }, 10);
  }

  onScroll() {
    const el = this.$el as HTMLDivElement;
    const spin = this.$refs.spin as HTMLDivElement;

    const p = el.scrollTop / el.scrollHeight;

    spin.style.marginTop = `${this.$el.scrollTop + p * el.offsetHeight}px`;
  }

  beforeDestroy() {
    this.$el.removeEventListener("scroll", this.onScroll);
    window.removeEventListener("resize", this.build);
  }
}
</script>

<style lang="scss">
.md-scroller {
  overflow: auto;
  border-radius: inherit;
  background-color: inherit;

  &::-webkit-scrollbar {
    width: 0px;
    height: 0px;
  }
}
</style>
