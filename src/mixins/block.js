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
      this.$emit("save", this.content)
    },
    editContent() {
      this.$emit("edit");
      this.showEditor = true;
    },
  },
};
