<template>
  <aside>
    <fieldset>
      <p>
        <label for="columns">Columns:</label>
        <input
          id="columns"
          type="number"
          @change="this.updateColumns(+$event.target.value)"
          :value="columns"
          min="1"
          step="1"
          max="12"
        />
      </p>
      <p>
        <label for="rows">rows:</label>
        <input
          id="rows"
          type="number"
          @change="this.updateRows(+$event.target.value)"
          :value="rows"
          min="1"
          max="12"
        />
      </p>
      <p>
        <label for="columnGap">Column Gap:</label>
        <input
          id="columnGap"
          type="text"
          :value="columnGap"
          @change="this.updateColumnGap($event.target.value)"
          min="1"
          max="12"
        />
      </p>
      <p>
        <label for="rowGap">Row Gap:</label>
        <input
          id="rowGap"
          type="text"
          @change="this.updateRowGap($event.target.value)"
          :value="rowGap"
          min="1"
          max="12"
        />
      </p>
    </fieldset>
    <button @click="showCodeModal = true">Show code</button>
    <Modal v-if="showCodeModal" @close="showCodeModal = false">
      <template v-slot:header>Your Code</template>
      <template v-slot:body><Code /></template>
    </Modal>
  </aside>
</template>

<script lang="ts">
import { defineComponent, toRefs, reactive } from "vue";
import { mapState, mapMutations } from "vuex";
import Modal from "@/components/Modal.vue";
import Code from '@/components/Code.vue';


export default defineComponent({
  setup() {
    const state = reactive({
      showCodeModal: false,
    });
    return {
      ...toRefs(state),
    };
  },
  components: {
    Modal,

    Code
  },
  watch: {
    columns(newv, oldv) {
      const payload = {
        newv,
        oldv,
        direction: "columnArr",
      };
      this.adjustArr(payload);
    },
    rows(newv, oldv) {
      const payload = {
        newv,
        oldv,
        direction: "rowArr",
      };
      this.adjustArr(payload);
    },
  },
  computed: {
    ...mapState(["columns", "rows", "columnGap", "rowGap"]),
  },
  methods: {
    ...mapMutations([
      "updateColumns",
      "updateRows",
      "updateColumnGap",
      "updateRowGap",
      "adjustArr",
    ]),
  },
});
</script>

<style scoped></style>
