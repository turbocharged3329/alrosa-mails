<template>
  <div class="mail-highlight mail-block">
    <div class="dragger"></div>
    <mail-nav
      @delete="$emit('delete')"
      @edit="editContent"
      @up="$emit('up')"
      @down="$emit('down')"
    ></mail-nav>
    <div class="mail-content">
      <badge>Акцентированный текст</badge>
      <p class="mail__input" v-html="content" v-if="!showEditor"></p>
      <vue-editor
        v-model="content"
        :editorToolbar="customToolbar"
        class="wsywig"
        v-else
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
import { block } from '@/mixins/block.js';

export default {
  name: "MailTextHighlighted",
  mixins: [block],
  data() {
    return {
      content: '<p></p>'
    };
  },
};
</script>

<style lang="scss" scoped>
.mail__input {
  background-color: $light-blue;
  padding: 1rem;
  caret-color: $black;
}
</style>
