import { VueEditor } from "vue2-editor";
import Badge from "@/components/Badge.vue";
import MailNav from "@/components/MailNav.vue";

export const block = {
  components: {
    VueEditor,
    Badge,
    MailNav,
  },
  data() {
    return {
      customToolbar: [
        ["bold", "italic", "underline"],
        ["link"],
        [
          { align: "" },
          { align: "center" },
          { align: "right" },
          { align: "justify" },
        ],
      ],
      showEditor: false,
    };
  },
  methods: {
    saveContent() {
      this.showEditor = false;
      this.$emit("save-content", {
        content: this.content,
        h1: this.contentH1,
        title_content: this.contentTitle,
        html_left: this.content,
        html_right: this.digestLink
      });
    },
    editContent() {
      this.$emit("edit");
      this.showEditor = true;
    },
  },
  mounted() {
    if (!this.content) {
      this.showEditor = true;
    }
  },
};
