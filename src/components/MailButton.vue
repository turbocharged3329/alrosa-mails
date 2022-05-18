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
        <p class="mail-button__text" v-html="content"></p>
      </div>
      <p class="mail-button__text-label" v-if="showEditor">Укажите текст кнопки:</p>
      <input v-model="content" class="content__input" v-if="showEditor" placeholder="Текст кнопки"/>
      <p class="mail__input" v-if="!showEditor">
        Ссылка: <a :href="buttonLink" target="_blank">{{ buttonLink }}</a>
      </p>
      <div class="mail-button__link" v-if="showEditor">
        <p class="mail-button__link-label">Вставьте ссылку для перехода:</p>
        <input
          v-model="buttonLink"
          class="mail-button__link-input content__input"
          placeholder="Ссылка"
        />
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
import { block } from "@/mixins/block.js";

export default {
  name: "MailButton",
  mixins: [block],
  props: ["text", "link"],
  data() {
    return {
      content: "",
      buttonLink: "",
    };
  },
  methods: {
    saveContent() {
      this.showEditor = false;
      this.$emit("save", this.content);
      this.$emit("link", this.buttonLink);
    },
  },
  created() {
    this.content = this.text;
    this.buttonLink = this.link;
  },
};
</script>

<style lang="scss" scoped>
.mail-button {
  &__form {
    border: 2px solid $blue;
    border-radius: 42px;
    width: fit-content;
    height: 50px;
    padding: 10px 45px;
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
  &__text {
    font-style: normal;
    font-weight: 300;
    font-size: 14px;
    line-height: 21px;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    margin: 0;
    text-align: center;
  }
}
.content {
  flex-basis: 70%;
  height: 100%;
}
</style>
