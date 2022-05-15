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
      <img :src="imageLink" v-if="imageUrl"/>
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
      <p class="mail__input" v-html="content" v-if="!showEditor"></p>
      <vue-editor
        v-model="content"
        :editorToolbar="customToolbar"
        v-else
        class="wsywig"
      ></vue-editor>
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
import { fileLoader } from "@/mixins/file-loader.js";

export default {
  name: "MailFooter",
  mixins: [block, fileLoader],
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
