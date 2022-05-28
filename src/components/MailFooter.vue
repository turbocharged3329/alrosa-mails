<template>
  <div class="mail-footer mail-block">
    <div class="dragger"></div>
    <mail-nav
      @delete="$emit('delete')"
      @edit="editContent"
      @up="$emit('up')"
      @down="$emit('down')"
    ></mail-nav>
    <div class="mail-content">
      <badge>Футер/дно</badge>
      <div class="image-preview" v-if="showPreview">
        <img :src="imageLink" class="image-preview__img"/>
        <button class="image-preview__delete" @click="clearLoadedImage">
          Удалить
        </button>
      </div>
      <h3 class="mail-block__heading">Загрузить новое изображение</h3>
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
          type: 'Invalid file type. Only images or zip Allowed',
          size: 'Files should not exceed 10MB in size',
        }"
        @select="filesSelected($event)"
        @beforedelete="onBeforeDelete($event)"
        @delete="fileDeleted($event)"
        v-model="fileRecords"
      >
      </VueFileAgent>
      <button class="select-preloaded btn-custom btn-secondary-custom" @click.prevent.stop="$emit('open-modal', true)">выберите картинку из готовых</button>
    </div>
  </div>
</template>

<script>
import { fileLoader } from "@/mixins/file-loader.js";

export default {
  name: "MailFooter",
  mixins: [fileLoader],
  data() {
    return {
      maxSize: "10MB",
    }
  }
};
</script>

<style lang="scss" scoped>
.mail-fileinput {
  margin-bottom: 3rem;
}
.mail__input {
  font-style: normal;
  font-weight: 500;
  font-size: 28px;
  line-height: 42px;
  letter-spacing: 0.03em;
  color: $black;
}
</style>
