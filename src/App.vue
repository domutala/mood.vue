<template>
  <div id="app" style="position: relative">
    <div v-if="!ready" class="before-ready">
      <svg viewBox="0 0 38 38" stroke="currentColor" stroke-opacity=".5">
        <g fill="none" fill-rule="evenodd">
          <g transform="translate(1 1)" stroke-width="2">
            <circle stroke-opacity=".3" cx="18" cy="18" r="18"></circle>
            <path d="M36 18c0-9.94-8.06-18-18-18">
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="0 18 18"
                to="360 18 18"
                dur="1s"
                repeatCount="indefinite"
              />
            </path>
          </g>
        </g>
      </svg>
    </div>
    <div v-else>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt minus
      nesciunt voluptate cum molestias delectus sunt iure asperiores cupiditate
      illo, ipsa quis quia in accusantium quibusdam numquam vel ipsam.
      Voluptatum!

      <md-input></md-input>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class App extends Vue {
  ready = false;

  mounted() {
    setTimeout(() => {
      this.ready = true;
    }, 100);
  }
}
</script>

<style lang="scss" scoped>
.before-ready {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 24px;
  }
}
</style>
