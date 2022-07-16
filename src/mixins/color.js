import ColorSelector from "@/components/ColorSelector.vue";

export const color = {
  components: {
    ColorSelector,
  },
  props: ["bgColor"],
  data() {
    return {
      backgroundColor: "#fff",
    };
  },
  methods: {
    setBackgroundColor(event) {
      this.backgroundColor = event;
      this.$emit("color", this.backgroundColor);
    },
  },
  mounted() {
    this.backgroundColor = this.bgColor;
    this.$emit("set-color", this.bgColor);
  },
};
