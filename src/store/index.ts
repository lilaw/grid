import { createStore, Store as VuexStore } from "vuex";

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



export type Mutations<S = State> = {
  updateColumns(state: S, payload: number): void,
  updateRows(state: S, payload: number): void,
  updateColumnGap(state: S, payload: string): void,
  updateRowGap(state: S, payload: string): void
  adjustArr(state: S, payload: { newv: number; oldv: number; direction: "columnArr" | "rowArr" }): void,
  addChildarea(state: S, payload: string): void,
  removeChildarea(state: S, payload: number): void,
}

export type Getters<S = State> = {
  divCount(state: S): number,
  templateCol(state: S): string,
  templateRow(state: S): string,
}


export type Store = Omit<
  VuexStore<State>,
  'getters' | 'commit' | 'dispatch'
> & {
  commit<K extends keyof Mutations, P extends Parameters<Mutations[K]>[1]>(
    key: K,
    payload: P 
  ): ReturnType<Mutations[K]>
}& {
  getters: {
    [K in keyof Getters]: ReturnType<Getters[K]>
  }
}






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
    updateColumns(state: State, payload: number) {
      state.columns = payload;
    },
    updateRows(state: State, payload: number) {
      state.rows = payload;
    },
    updateColumnGap(state: State, payload: string) {
      state.columnGap = payload;
    },
    updateRowGap(state: State, payload: string) {
      state.rowGap = payload;
    },
    adjustArr(
      state: State,
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
    addChildarea(state: State, payload: string) {
      state.childarea.push(payload);
    },
    removeChildarea(state: State, payload: number) {
      console.log(payload)
      state.childarea.splice(payload, 1);
    },
  },
  getters: {
    divCount(state: State) {
      return state.columns * state.rows;
    },
    templateCol(state: State) {
      return createRepeat(groupRepeat(state.columnArr));
    },
    templateRow(state: State) {
      return createRepeat(groupRepeat(state.rowArr));
    },
  },
  actions: {},
  modules: {},
});



function groupRepeat(template: unit[]): string[][] {
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

function createRepeat(group: string[][]): string {
  return group
    .flatMap((g) => (g.length > 1 ? `repeat(${g.length}, ${g[0]})` : g))
    .join(" ");
}

export function useStore() {
  return store as Store
}