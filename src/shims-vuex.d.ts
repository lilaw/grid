import { ComponentCustomProperties } from "vue";
import { Store } from "vuex";
import { State } from "./store/index";

type unit = { unit: string };
declare module "@vue/runtime-core" {
  // declare your own store states
  interface State {
    columns: number;
    rows: number;
    columnGap: number;
    rowGap: number;
    columnArr: unit[];
    rowArr: unit[];
    childarea: [];
  }
  }
  // provide typings for `this.$store`
  interface ComponentCustomProperties {
    $store: Store<State>;
  }
}
