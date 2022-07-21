<template>
  <div
    class="mail-footer mail-block"
    :style="{ backgroundColor: backgroundColor }"
  >
    <div class="dragger"></div>
    <mail-nav
      @delete="$emit('delete')"
      @up="$emit('up')"
      @down="$emit('down')"
      @edit="editContent"
    ></mail-nav>
    <div class="mail-content">
      <badge>Футер/дно</badge>
      <!-- <div class="image-preview" v-if="showPreview">
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
          type: 'Invalid file type. Only images or zip Allowed',
          size: 'Files should not exceed 10MB in size',
        }"
        @select="filesSelected($event)"
        @beforedelete="onBeforeDelete($event)"
        @delete="fileDeleted($event)"
        v-model="fileRecords"
      >
      </VueFileAgent>
      <button class="select-preloaded btn-custom btn-secondary-custom" @click.prevent.stop="$emit('open-modal', true)">выберите картинку из готовых</button> -->
      <div class="image-preview">
        <img :src="imageUrl" class="image-preview__img" />
      </div>
      <p class="mail__input" v-html="content" v-if="!showEditor"></p>
      <vue-editor
        v-model="content"
        :editorToolbar="footerToolbar"
        class="wsywig"
        v-if="showEditor"
      ></vue-editor>
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
// import { fileLoader } from "@/mixins/file-loader.js";
import { mapGetters } from "vuex";
import { block } from "@/mixins/block.js";
import { color } from "@/mixins/color.js";

export default {
  name: "MailFooter",
  mixins: [block, color],
  props: ["text"],
  data() {
    return {
      // maxSize: "10MB",
      footerToolbar: [
        ["bold", "italic", "underline"],
        ["link"],
      ],
    }
  },
  computed: {
    ...mapGetters(["footer_img"]),
    imageUrl() {
      return process.env.VUE_APP_API + this.footer_img;
    },
  },
  created() {
    this.content = `${this.text}`;
  },
  mounted() {
    this.$emit("pattern-image", this.footer_img);
  },
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
