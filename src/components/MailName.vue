<template>
  <div
    class="mail-name mail-block"
    :style="{ backgroundColor: backgroundColor }"
  >
    <div class="dragger"></div>
    <mail-nav
      @delete="$emit('delete')"
      @edit="editContent"
      @up="$emit('up')"
      @down="$emit('down')"
    ></mail-nav>
    <div class="mail-content">
      <badge>Название письма</badge>
      <input
        v-model="content"
        class="content__input"
        v-if="showEditor"
        placeholder="Введите название письма"
      />
      <p class="mail__input" v-html="content" v-if="!showEditor"></p>
      <color-selector
        @color="setBackgroundColor"
        :start-color="backgroundColor"
      ></color-selector>
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
  name: "MailName",
  mixins: [block, color],
  props: ["text"],
  data() {
    return {
      content: "",
    };
  },
  created() {
    this.content = `${this.text}`;
  },
};
</script>

<style lang="scss" scoped></style>
