<template>
  <div class="mail__signature mail-block" :style="{backgroundColor: backgroundColor}">
    <div class="dragger"></div>
    <mail-nav
      @delete="$emit('delete')"
      @edit="$emit('edit')"
      @up="$emit('up')"
      @down="$emit('down')"
      no-edit
    ></mail-nav>
    <div class="mail-content">
      <badge>Подпись директора</badge>
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
  name: "MailSignature",
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
      "signature_img"
    ]),
    imageUrl() {
      return process.env.VUE_APP_API + this.signature_img
    }
  },
  mounted() {
    this.$emit('pattern-image', this.signature_img)
  }
};
</script>

<style lang="scss" scoped></style>
