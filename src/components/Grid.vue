<template>
  <main>
    <div
      class="column-unit"
      :style="{
        gridTemplateColumns: templateCol,
        columnGap: columnGap,
      }"
    >
      <div v-for="(col, index) in columnArr" :key="index">
        <input type="text" name="col" v-model.lazy="col.unit" />
      </div>
    </div>

    <div
      class="row-unit"
      :style="{
        gridTemplateRows: templateRow,
        rowGap: rowGap,
      }"
    >
      <div v-for="(row, index) in rowArr" :key="index">
        <input type="text" name="row" v-model.lazy="row.unit" />
      </div>
    </div>

    <div class="grid-container">
      <section
        class="grid"
        :style="{
          gridTemplateRows: templateRow,
          gridTemplateColumns: templateCol,
          rowGap: rowGap,
          columnGap: columnGap,
        }"
      >
        <div
          class="grid__child"
          v-for="item in divCount"
          :key="item"
          @mousedown="placeChild(item, 'down')"
          @mouseup="placeChild(item, 'up')"
        >
          <span style="opacity: 0">{{ item }}</span>
        </div>
      </section>
      <section
        class="grid grid--placechild"
        :style="{
          gridTemplateRows: templateRow,
          gridTemplateColumns: templateCol,
          rowGap: rowGap,
          columnGap: columnGap,
        }"
      >
        <div
          class="child__child grid__child--placechild"
          v-for="(child, i) in childarea"
          :key="child"
          :style="{ gridArea: child }"
        >
          <button @click="removeChildarea(i)">remove</button>
        </div>
      </section>
    </div>
  </main>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import { mapState, mapGetters } from "vuex";
import { mapMutations } from "vuex";

export default defineComponent({
  setup() {
    const state = reactive({
      place: { downRow: 0, downColumn: 0, upRow: 0, upColumn: 0 },
    });
    return {
      state,
    };
  },
  computed: {
    ...mapGetters(["templateCol", "templateRow", "divCount"]),
    ...mapState([
      "columns",
      "rows",
      "columnGap",
      "rowGap",
      "columnArr",
      "rowArr",
      "childarea",
    ]),
  },
  methods: {
    placeChild(item: number, action: "down" | "up") {
      this.state.place[`${action}Row` as "downRow" | "upRow"] = Math.ceil(
        item / this.columns
      );
      this.state.place[`${action}Column` as "downRow" | "upColumn"] =
        Math.floor(
          item -
            (this.state.place[`${action}Row` as "downRow" | "upRow"] - 1) *
              this.columns
        );

      if (action === "up") {
        let [startRow, endRow] =
          this.state.place.downRow > this.state.place.upRow
            ? [this.state.place.upRow, this.state.place.downRow]
            : [this.state.place.downRow, this.state.place.upRow];
        let [startColumn, endColumn] =
          this.state.place.downColumn > this.state.place.upColumn
            ? [this.state.place.upColumn, this.state.place.downColumn]
            : [this.state.place.downColumn, this.state.place.upColumn];

        console.log({ startRow, endRow, startColumn, endColumn });
        this.addChildarea(
          `${startRow} / ${startColumn} / ${endRow + 1} / ${endColumn + 1}`
        );
      }
    },
    ...mapMutations([
      "addChildarea", //also supports payload `this.nameOfMutation(amount)`
      "removeChildarea",
    ]),
  },
});
</script>

<style lang="scss" scoped>
main {
  width: 900px;
  height: 700px;
  display: grid;
  grid-template-rows: 100px 1fr;
  grid-template-columns: 100px 1fr;
}
.column-unit {
  grid-row: 1 / 2;
  grid-column: 2 / 3;

  display: grid;
}
.row-unit {
  grid-column: 1 /2;
  grid-row: 2 /3;
  width: 100px;
  display: grid;

  div {
    display: flex;
    align-items: center;
  }
}
.grid-container {
  grid-row: 2 /3;
  grid-column: 2 /3;
  display: grid;
  width: 800px;
  height: 600px;
}

@mixin colors($max, $color-frequency) {
  $color: 300 / $max;

  // fruit loops!
  @for $i from 1 through $max {
    div[class*="grid__child--placechild"]:nth-child(#{$i}) {
      background: hsla(($i - 15) * ($color * 1.5), 80%, 30%, 0.5);
      border: 1px solid #ddd;
    }
  }
}

.grid {
  display: grid;
  grid-row: 1 / -1;
  grid-column: 1 / -1;
  @include colors(20, 100);
  &__child {
    border: 2px dashed black;
    cursor: move;
    span {
      user-select: none;
    }
  }
  &--placechild {
    counter-reset: childrentCount;
    pointer-events: none;
  }
  &__child--placechild {
    counter-increment: childrentCount;
    pointer-events: none;
    display: flex;
    align-items: flex-start;
    &::before {
      content: "div" counter(childrentCount);
    }
    button {
      pointer-events: auto;
      cursor: pointer;
      margin-left: auto;
    }
  }
}
input {
  width: 45px;
  height: 30px;
}
</style>
