import { VueEditor } from "vue2-editor";
import Badge from "@/components/Badge.vue";
import MailNav from "@/components/MailNav.vue";
import ColorSelector from "@/components/ColorSelector.vue";

export const block = {
  components: {
    VueEditor,
    Badge,
    MailNav,
    ColorSelector
  },
  props: ["bgColor"],
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
      backgroundColor: '#fff',
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
    setBackgroundColor(event) {
      this.backgroundColor = event;
      this.$emit("color", this.backgroundColor)
    }
  },
  mounted() {
    this.backgroundColor = this.bgColor;
    this.$emit('set-color', this.bgColor);
    if (!this.content) {
      this.showEditor = true;
    }
  }
};
