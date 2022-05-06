<template>
  <div class="mail-button mail-block">
    <div class="dragger"></div>
    <mail-nav
      @delete="$emit('delete')"
      @edit="editContent"
      @up="$emit('up')"
      @down="$emit('down')"
    ></mail-nav>
    <div class="mail-content">
      <badge>Кнопка</badge>
      <div class="mail-button__form" v-if="!showEditor">
        <p class="mail__input" v-html="content"></p>
      </div>
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
  name: "MailButton",
  mixins: [block],
  data() {
    return {
      content: ''
    }
  }
};
</script>

<style lang="scss" scoped>
.mail-button {
  &__form {
    border: 2px solid $blue;
    border-radius: 42px;
    width: fit-content;
    height: 42px;
    padding: 10px 36px;
    min-width: 200px;
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;
  }
}
.content {
  flex-basis: 70%;
  height: 100%;
}
</style>
