<template>
  <Base />
  <Debounce />
  <Hidden />
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Base from "./components/Base.vue";
import Debounce from "./components/Debounce.vue";
import Hidden from "./components/Hidden.vue";

export default defineComponent({
  name: "App",
  components: {
    Base,
    Debounce,
    Hidden
  }
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
