<template>
  <div class="mail-h3 mail-block">
    <div class="dragger"></div>
    <mail-nav
      @delete="$emit('delete')"
      @edit="editContent"
      @up="$emit('up')"
      @down="$emit('down')"
    ></mail-nav>
    <div class="mail-content">
      <badge>Заголовок H3</badge>
      <input v-model="content" class="content__input" v-if="showEditor" placeholder="Введите текст заголовка"/>
      <p class="mail__input" v-html="content" v-if="!showEditor"></p>
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

export default {
  name: "MailH3",
  mixins: [block],
  props: ['text'],
  data() {
    return {
      content: "",
    };
  },
  created() {
    this.content = `${this.text}`
  }
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
</style>
