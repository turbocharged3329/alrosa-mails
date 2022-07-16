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
      <div class="image-preview" v-if="showPreview">
        <img :src="imageLink" class="image-preview__img"/>
        <button class="image-preview__delete" @click="clearLoadedImage">
          Очистить
        </button>
      </div>
      <VueFileAgent
        class="mail-fileinput"
        ref="vueFileAgent"
        :theme="'list'"
        :multiple="false"
        :deletable="true"
        :meta="true"
        :accept="'image/*,.zip'"
        :maxSize="'200KB'"
        :maxFiles="14"
        :helpText="'Перетащите файлы сюда или нажмите, чтобы выбрать файл для загрузки'"
        :errorText="{
          type: 'Неверный типа файла',
          size: `Файл не должен быть больше ${maxSize}`,
        }"
        @select="filesSelected($event)"
        @beforedelete="onBeforeDelete($event)"
        @delete="fileDeleted($event)"
        v-model="fileRecords"
      >
      </VueFileAgent>
      <button
        class="select-preloaded btn-custom btn-secondary-custom"
        @click.prevent.stop="$emit('open-modal')"
      >
        выберите картинку из готовых
      </button>
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
import { fileLoader } from "@/mixins/file-loader.js";

export default {
  name: "MailName",
  mixins: [block, color, fileLoader],
  props: ["text"],
  data() {
    return {
      content: "",
      maxSize: '200КB',
    };
  },
  created() {
    this.content = `${this.text}`;
  },
};
</script>

<style lang="scss" scoped></style>
