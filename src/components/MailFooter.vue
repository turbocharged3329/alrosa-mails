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

export default {
  name: "MailFooter",
  mixins: [block],
  props: ['imageUrl'],
  data() {
    return {
      fileRecords: [],
      uploadUrl: "https://www.mocky.io/v2/5d4fb20b3000005c111099e3",
      uploadHeaders: { "X-Test-Header": "vue-file-agent" },
      fileRecordsForUpload: [], // maintain an upload queue
      content: "<p></p>",
      image: ''
    };
  },
  computed: {
    imageLink() {
      return process.env.VUE_APP_API + this.imageUrl
    }
  },
  methods: {
    uploadFiles() {
      // Using the default uploader. You may use another uploader instead.
      this.$refs.vueFileAgent.upload(
        this.uploadUrl,
        this.uploadHeaders,
        this.fileRecordsForUpload
      );
      this.fileRecordsForUpload = [];
    },
    deleteUploadedFile(fileRecord) {
      // Using the default uploader. You may use another uploader instead.
      this.$refs.vueFileAgent.deleteUpload(
        this.uploadUrl,
        this.uploadHeaders,
        fileRecord
      );
    },
    filesSelected(fileRecordsNewlySelected) {
      let validFileRecords = fileRecordsNewlySelected.filter(
        (fileRecord) => !fileRecord.error
      );
      this.fileRecordsForUpload =
        this.fileRecordsForUpload.concat(validFileRecords);

      let reader = new FileReader();
        reader.readAsDataURL(this.fileRecords[0].file);
        reader.onload = () => {
        this.$emit('image', reader.result)
      };
    },
    onBeforeDelete(fileRecord) {
      let i = this.fileRecordsForUpload.indexOf(fileRecord);
      if (i !== -1) {
        // queued file, not yet uploaded. Just remove from the arrays
        this.fileRecordsForUpload.splice(i, 1);
        let k = this.fileRecords.indexOf(fileRecord);
        if (k !== -1) this.fileRecords.splice(k, 1);
      } else {
        if (confirm("Are you sure you want to delete?")) {
          this.$refs.vueFileAgent.deleteFileRecord(fileRecord); // will trigger 'delete' event
        }
      }
    },
    fileDeleted(fileRecord) {
      let i = this.fileRecordsForUpload.indexOf(fileRecord);
      if (i !== -1) {
        this.fileRecordsForUpload.splice(i, 1);
      } else {
        this.deleteUploadedFile(fileRecord);
      }
    },
  },
  created() {
    this.image = this.imageUrl
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
