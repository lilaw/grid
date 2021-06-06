<template>
  <!-- <div class="modal"> -->
  <div class="modal__mask">
    <div class="modal__wrapper">
      <header class="modal__header">
        <slot name="header"></slot>
      </header>
      <section class="modal__body">
        <slot name="body"></slot>
      </section>
      <button @click="$emit('close')">Close</button>
    </div>
  </div>
  <!-- </div> -->
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    return {};
  },
});
</script>

<style lang="scss" scoped>
.modal {
  &__mask {
    position: fixed;
    top: 0;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    backdrop-filter: blur(10px);
  }
  &__wrapper {
    width: 41rem;
    height: 40rem;
    border: black solid .2em;
    outline: black solid 0.5em;
    outline-offset: 1em;
  }
}
</style>
