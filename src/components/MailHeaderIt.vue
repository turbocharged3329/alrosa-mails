<template>
  <div class="mail-header__it mail-block" :style="{backgroundColor: backgroundColor}">
    <div class="dragger"></div>
    <mail-nav
      @delete="$emit('delete')"
      @edit="$emit('edit')"
      @up="$emit('up')"
      @down="$emit('down')"
      no-edit
    ></mail-nav>
    <div class="mail-content">
      <badge>Шапка IT</badge>
      <div class="image-preview">
        <img :src="imageUrl" class="image-preview__img"/>
      </div>
      <color-selector @color="setBackgroundColor" :start-color="backgroundColor"></color-selector>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { color } from "@/mixins/color.js";
import MailNav from "@/components/MailNav.vue";
import Badge from "@/components/Badge.vue";
export default {
  name: "MailHeaderIt",
  mixins: [color],
  components: {
    MailNav,
    Badge
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters([
      "it_img"
    ]),
    imageUrl() {
      return process.env.VUE_APP_API + this.it_img
    }
  },
  methods: {},
  mounted() {
    this.$emit('pattern-image', this.it_img)
  }
};
</script>

<style lang="scss" scoped></style>
