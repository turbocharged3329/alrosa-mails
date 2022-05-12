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
      <p class="mail__input" v-if="!showEditor">Ссылка: <a :href="buttonLink" target="_blank">{{ buttonLink }}</a></p>
      <vue-editor
        v-model="content"
        :editorToolbar="customToolbar"
        class="wsywig"
        v-if="showEditor"
      ></vue-editor>
      <div class="mail-button__link" v-if="showEditor">
        <p>Укажите ссылку на кнопку</p>
        <input v-model="buttonLink"  class="mail-button__link-input"/>
      </div>
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
  props: ['text', 'link'],
  data() {
    return {
      content: '',
      buttonLink: ''
    }
  },
  methods: {
    saveContent() {
      this.showEditor = false;
      this.$emit("save", this.content)
      this.$emit("link", this.buttonLink)
    },
  },
  created() {
    this.content = this.text
    this.buttonLink = this.link
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
    margin-bottom: 1rem;
  }
  &__link-input {
    width: 100%;
    margin-bottom: 1rem;
  }
}
.content {
  flex-basis: 70%;
  height: 100%;
}
</style>
