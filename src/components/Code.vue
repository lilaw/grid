<template>
  <div>
    <button @click.stop.prevent="copy">
      {{ codeWasCopied ? "copied" : 'copy' }}
    </button>
    <button @click.stop.prevent="showHtml = !showHtml">showHtml</button>

    <div class="code" ref="code">
      <section v-if="showHtml">
        <textarea class="codearea" :value="createHtml()"> </textarea>
      </section>
      <section v-else>
        <textarea class="codearea" :value="createCSS()"> </textarea>
      </section>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from "vue";
import { mapState, mapGetters } from "vuex";

export default defineComponent({
  setup() {
    const state = reactive({
      showHtml: false,
      codeWasCopied: false,
    });
    return { ...toRefs(state) };
  },

  computed: {
    ...mapState(["childarea"]),
    ...mapGetters(["templateCol", "templateRow", "divCount"]),
  },
  methods: {
    createHtml() {
      return `<div class="grid">\n  ${this.childarea
        .map((child: string, i: number) => `<div class="div${i + 1}"></div>`)
        .join(`\n  `)}\n</div>`;
    },
    createCSS() {
      return `
.parent {
  display: grid;
  grid-template-columns: ${this.templateCol};
  grid-template-rows: ${this.templateRow};
  grid-column-gap: 0px;
  grid-row-gap: 0px;
}

${this.childarea
  .map((child: string, i: number) => `.div${i + 1} { grid-area: ${child}; }`)
  .join("\n")}
`;
    },
    copy() {
      const code = this.$refs.code as Node;
      const selection = window.getSelection() as Selection;
      const range = document.createRange();
      range.selectNodeContents(code);
      selection.removeAllRanges();
      selection.addRange(range);

      let copied = document.execCommand("copy");
      if (copied) {
        this.codeWasCopied = true;
        setTimeout(() => {
          this.codeWasCopied = false;
        }, 3000);
      }
    },
  },
});
</script>

<style scoped>
.codearea {
  border: black solid 1px;
  width: 400px;
  height: 200px;
}
</style>
