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
          type="number"
          :value="columnGap"
          @change="this.updateColumnGap(+$event.target.value)"
          min="1"
          max="12"
        />
      </p>
      <p>
        <label for="rowGap">Row Gap:</label>
        <input
          id="rowGap"
          type="number"
          @change="this.updateRowGap(+$event.target.value)"
          :value="rowGap"
          min="1"
          max="12"
        />
      </p>
    </fieldset>
  </aside>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapState, mapMutations } from "vuex";

export default defineComponent({
  setup() {
    return {};
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
    ]),
  },
});
</script>

<style scoped></style>
