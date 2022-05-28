import Badge from "@/components/Badge.vue";
import MailNav from "@/components/MailNav.vue";

export const fileLoader = {
  components: {
    Badge,
    MailNav,
  },
  props: ["imageUrl"],
  data() {
    return {
      fileRecords: [],
      fileRecordsForUpload: [], // maintain an upload queue
      image: "",
      helpText: "",
      showPreview: false
    };
  },
  computed: {
    imageLink() {
      return process.env.VUE_APP_API + this.imageUrl;
    },
  },
  watch: {
    imageUrl(value) {
      this.showPreview = value ? true : false
    }
  },
  created() {
    this.image = this.imageUrl;
    this.showPreview = this.imageUrl ? true : false;
  },
  mounted() {
    this.helpText = this.$refs.vueFileAgent.$el.querySelector(".help-text");
    this.helpText.innerHTML = `<span>Перетащите файлы сюда или нажмите,<br>чтобы <a class="select-file">выбрать файл для загрузки</a><br><span class="size">до ${this.maxSize}</span></span>`;
  },
  methods: {
    clearLoadedImage() {
      this.showPreview = false;
      this.image = '';
      this.$emit('image', null)
      this.$emit('clear-image', null)
    },
    showSelectedImage() {
      this.showPreview = true;
    },
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
        this.$emit("image", reader.result);
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

      this.helpText = null;
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
};
