<template>
  <div class="mail-picture mail-block" :style="{backgroundColor: backgroundColor}">
    <div class="dragger"></div>
    <mail-nav
      @delete="$emit('delete')"
      @edit="$emit('edit')"
      @up="$emit('up')"
      @down="$emit('down')"
      no-edit
    ></mail-nav>
    <div class="mail-content">
      <badge>Картинка</badge>
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
        :maxSize="'10MB'"
        :maxFiles="14"
        :helpText="'Перетащите файлы сюда или нажмите для загрузки'"
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
      <color-selector @color="setBackgroundColor" :start-color="backgroundColor"></color-selector>
    </div>
  </div>
</template>

<script>
import { fileLoader } from "@/mixins/file-loader.js";
import { color } from "@/mixins/color.js";

export default {
  name: "MailPicture",
  mixins: [fileLoader, color],
  data() {
    return {
      maxSize: "10MB",
    }
  }
};
</script>

<style lang="scss" scoped></style>
