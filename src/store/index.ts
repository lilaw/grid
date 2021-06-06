import { InjectionKey } from "vue";
import { createStore, useStore as baseUseStore, Store } from "vuex";

type unit = { unit: string };
// type place = {
//   [key in "downRow" | "downColumn" | "upRow" | "upColumn"]: number;
// };

export type State = {
  columns: number;
  rows: number;
  columnGap: string;
  rowGap: string;
  columnArr: unit[];
  rowArr: unit[];
  childarea: string[];
};

export const key: InjectionKey<Store<State>> = Symbol();

export const store = createStore<State>({
  state: {
    columns: 5,
    rows: 5,
    columnGap: '0',
    rowGap: '0',
    columnArr: [],
    rowArr: [],
    childarea: [],
  },
  mutations: {
    updateColumns(state, payload: number) {
      state.columns = payload;
    },
    updateRows(state, payload: number) {
      state.rows = payload;
    },
    updateColumnGap(state, payload: string) {
      state.columnGap = payload;
    },
    updateRowGap(state, payload: string) {
      state.rowGap = payload;
    },
    adjustArr(
      state,
      payload: { newv: number; oldv: number; direction: "columnArr" | "rowArr" }
    ) {
      const difference = Math.abs(payload.newv - payload.oldv);

      console.log({ payload, difference });
      if (payload.newv > payload.oldv) {
        state[payload.direction].push(
          ...Array.from({ length: difference }, () => ({ unit: "1fr" }))
        );
      } else {
        state[payload.direction].splice(payload.newv - 1, difference);
      }
    },
    addChildarea(state, payload: string) {
      state.childarea.push(payload);
    },
    removeChildarea(state, payload: number) {
      console.log(payload)
      state.childarea.splice(payload, 1);
    },
  },
  getters: {
    divCount(state) {
      return state.columns * state.rows;
    },
    templateCol(state) {
      return createRepeat(groupRepeat(state.columnArr));
    },
    templateRow(state) {
      return createRepeat(groupRepeat(state.rowArr));
    },
  },
  actions: {},
  modules: {},
});

// define your own `useStore` composition function
export function useStore(): typeof store {
  return baseUseStore(key);
}

function groupRepeat(template: unit[]) {
  return template
    .map((it) => it.unit)
    .reduce((acc: string[][], cur) => {
      const last: string[] = acc[acc.length - 1] || [];
      if (last.includes(cur)) {
        last.push(cur);
        return acc;
      } else {
        acc.push([cur]);
        return acc;
      }
    }, []);
}

function createRepeat(group: string[][]) {
  return group
    .flatMap((g) => (g.length > 1 ? `repeat(${g.length}, ${g[0]})` : g))
    .join(" ");
}
