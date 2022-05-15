<template>
  <div class="mail-h1 mail-block">
    <div class="dragger"></div>
    <mail-nav
      @delete="$emit('delete')"
      @edit="editContent"
      @up="$emit('up')"
      @down="$emit('down')"
    ></mail-nav>
    <div class="mail-content">
      <badge>Заголовок H1</badge>
      <!-- <p class="mail__input placeholder">Введите текст заголовка H1</p> -->
      <p class="mail__input" v-html="content" v-if="!showEditor"></p>
      <vue-editor
        v-model="content"
        :editorToolbar="customToolbar"
        v-else
        class="wsywig"
      ></vue-editor>
      <button
        @click="saveContent"
        class="btn-custom btn-primary"
        v-if="showEditor"
      >
        Сохранить
      </button>
    </div>
  </div>
</template>

<script>
import { block } from "@/mixins/block.js";

export default {
  name: "MailH1",
  mixins: [block],
  props: ['text'],
  data() {
    return {
      content: "",
    };
  },
  created() {
    this.content = `${this.text}`
  },
};
</script>

<style lang="scss" scoped>
.mail__input {
  font-style: normal;
  font-weight: 500;
  font-size: 28px;
  line-height: 42px;
  letter-spacing: 0.03em;
  color: $black;
  max-width: 100%;
  word-break: break-word;
}
.placeholder {
  color: $gray;
}
</style>
