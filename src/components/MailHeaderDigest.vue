<template>
  <div
    class="mail-header__digest mail-block"
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
      <badge>Шапка (дайджест)</badge>
      <input
        v-model="contentH1"
        class="content__input"
        v-if="showEditor"
        placeholder="h1"
      />
      <input
        v-model="contentTitle"
        class="content__input"
        v-if="showEditor"
        placeholder="title"
      />
      <p class="mail__input" v-html="contentH1" v-if="!showEditor"></p>
      <p class="mail__input" v-html="contentTitle" v-if="!showEditor"></p>
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
  name: "MailHeaderDigest",
  mixins: [block, color],
  props: ["h1", "titleContent"],
  data() {
    return {
      contentH1: "",
      contentTitle: "",
      maxSize: '200КB',
    };
  },
  created() {
    this.contentH1 = `${this.h1}`;
    this.contentTitle = `${this.titleContent}`;
  },
};
</script>

<style lang="scss" scoped></style>
