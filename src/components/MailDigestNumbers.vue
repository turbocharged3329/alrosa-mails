<template>
  <div class="mail-numbers mail-block" :style="{backgroundColor: backgroundColor}">
    <div class="dragger"></div>
    <mail-nav
      @delete="$emit('delete')"
      @edit="editContent"
      @up="$emit('up')"
      @down="$emit('down')"
    ></mail-nav>
    <div class="mail-content">
      <badge>Дайджест цифры</badge>
      <p class="mail-numbers__text-label" v-if="showEditor">
        Укажите цифры дайджеста:
      </p>
      <p class="mail__input" v-html="content" v-if="!showEditor"></p>
      <vue-editor
        v-model="content"
        :editorToolbar="customToolbar"
        class="wsywig"
        v-else
      ></vue-editor>
      <p class="mail-numbers__text-label" v-if="showEditor">
        Укажите ссылку дайджеста:
      </p>
      <p class="mail__input" v-if="!showEditor" v-html="digestLink">
      </p>
      <vue-editor
        v-model="digestLink"
        :editorToolbar="customToolbar"
        class="wsywig"
        v-else
      ></vue-editor>
      <color-selector @color="setBackgroundColor" :start-color="backgroundColor"></color-selector>
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
  name: "MailDigestNumbers",
  mixins: [block, color],
  props: ["htmlLeft", "htmlRight"],
  data() {
    return {
      content: "",
      digestLink: "",
    };
  },
  created() {
    this.content = this.htmlLeft;
    this.digestLink = this.htmlRight;
  },
};
</script>

<style lang="scss" scoped>
.mail-numbers {
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
