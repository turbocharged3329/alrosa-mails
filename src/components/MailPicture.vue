<template>
  <div class="mail-picture mail-block">
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
      <img :src="imageLink" v-if="imageUrl" />
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
    </div>
  </div>
</template>

<script>
import { fileLoader } from "@/mixins/file-loader.js";

export default {
  name: "MailPicture",
  mixins: [fileLoader],
  data() {
    return {
      maxSize: "10MB",
    }
  }
};
</script>

<style lang="scss" scoped></style>
