<template>
  <div class="mail-header__pattern mail-block" :style="{backgroundColor: backgroundColor}">
    <div class="dragger"></div>
    <mail-nav
      @delete="$emit('delete')"
      @edit="$emit('edit')"
      @up="$emit('up')"
      @down="$emit('down')"
      no-edit
    ></mail-nav>
    <div class="mail-content">
      <badge>Шапка (паттерн)</badge>
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
  name: "MailHeaderPattern",
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
      "pattern_img"
    ]),
    imageUrl() {
      return process.env.VUE_APP_API + this.pattern_img
    }
  },
  mounted() {
    this.$emit('pattern-image', this.pattern_img)
  }
};
</script>

<style lang="scss" scoped></style>
