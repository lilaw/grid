<template>
  <Form />
  <Grid />
</template>

<script lang="ts">
import Form from "@/components/Form.vue";
import { defineComponent } from "vue";
import Grid from "@/components/Grid.vue";
import { useStore } from "./store/index";

export default defineComponent({
  name: "App",
  components: {
    Form,
    Grid,
  },
  setup() {
    const store = useStore();
    console.log(store)
    store.state.columnArr.push(
      { unit: "1fr" },
      { unit: "1fr" },
      { unit: "1fr" },
      { unit: "1fr" },
      { unit: "1fr" }
    );
    store.state.rowArr.push(
      { unit: "1fr" },
      { unit: "1fr" },
      { unit: "1fr" },
      { unit: "1fr" },
      { unit: "1fr" }
    );
  },
});
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
