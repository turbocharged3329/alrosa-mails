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
import Badge from "@/components/Badge.vue";
import MailNav from "@/components/MailNav.vue";
import { fileLoader } from "@/mixins/file-loader.js";

export default {
  name: "MailHeader",
  mixins: [fileLoader],
  components: {
    Badge,
    MailNav,
  },
  props: ["imageUrl"],
  data() {
    return {
      text: "",
      fileRecords: [],
      uploadUrl: "https://www.mocky.io/v2/5d4fb20b3000005c111099e3",
      uploadHeaders: { "X-Test-Header": "vue-file-agent" },
      fileRecordsForUpload: [], // maintain an upload queue
      image: "",
      maxSize: "10MB",
      helpText: '',
    };
  },
  computed: {
    imageLink() {
      return process.env.VUE_APP_API + this.imageUrl;
    },
    // helpText() {
    //   return document.querySelector(".help-text");
    // },
  },
  created() {
    this.image = this.imageUrl;
  },
  mounted() {
    this.helpText = document.querySelector(".help-text");
    this.helpText.innerHTML = `<span>Перетащите файлы сюда или нажмите,<br>чтобы <a class="select-file">выбрать файл для загрузки</a><br><span class="size">до ${this.maxSize}</span></span>`;
  },
};
</script>

<style lang="scss" scoped></style>
