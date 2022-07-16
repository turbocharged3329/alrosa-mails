<template>
  <div class="mail-quote mail-block" :style="{backgroundColor: backgroundColor}">
    <div class="dragger"></div>
    <mail-nav
      @delete="$emit('delete')"
      @edit="editContent"
      @up="$emit('up')"
      @down="$emit('down')"
    ></mail-nav>
    <div class="mail-content">
      <badge>Цитата</badge>
      <p class="mail__input" v-html="content" v-if="!showEditor"></p>
      <vue-editor
        v-model="content"
        :editorToolbar="customToolbar"
        class="wsywig"
        v-else
      ></vue-editor>
      <color-selector @color="setBackgroundColor" v-if="showEditor" :start-color="backgroundColor"></color-selector>
      <button
        @click="saveContent"
        class="btn-custom btn-primary-custom"
        v-if="showEditor"
      >
        Сохранить
      </button>
    </div>
  </div>
</template>

<script>
import { block } from "@/mixins/block.js";
import { color } from "@/mixins/color.js";

export default {
  name: "MailQuote",
  mixins: [block, color],
  props: ["html"],
  data() {
    return {
      content: "",
    };
  },
  created() {
    this.content = this.html;
  },
};
</script>

<style lang="scss" scoped>
.mail__input {
  font-family: "Avenir Next Regular";
  font-style: normal;
  font-weight: 400;
  font-size: 22px;
  line-height: 27px;
  letter-spacing: 0.01em !important;
  color: #121212;
}
</style>
