<template>
  <div class="mail-header mail-block">
    <div class="dragger"></div>
    <mail-nav
      @delete="$emit('delete')"
      @edit="$emit('edit')"
      @up="$emit('up')"
      @down="$emit('down')"
      no-edit
    ></mail-nav>
    <div class="mail-content">
      <badge>Шапка</badge>
      <img :src="imageLink" v-if="imageUrl" />
      <VueFileAgent
        class="mail-fileinput"
        ref="vueFileAgent"
        :theme="'list'"
        :multiple="false"
        :deletable="true"
        :meta="true"
        :accept="'image/*,.zip'"
        :maxSize="maxSize"
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
    </div>
  </div>
</template>

<script>
import { fileLoader } from "@/mixins/file-loader.js";

export default {
  name: "MailHeader",
  mixins: [fileLoader],
  data() {
    return {
      maxSize: "10MB",
    }
  }
};
</script>

<style lang="scss" scoped></style>
