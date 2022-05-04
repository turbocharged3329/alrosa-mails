<template>
  <div class="mail-name mail-block">
    <mail-nav
      @delete="$emit('delete')"
      @edit="$emit('edit')"
      @up="$emit('up')"
      @down="$emit('down')"
    ></mail-nav>
    <div class="mail-content">
      <badge>Название письма</badge>
       <p class="mail__input" contenteditable="true">123</p>
    </div>
  </div>
</template>

<script>
import Badge from "@/components/Badge.vue";
import MailNav from "@/components/MailNav.vue";

export default {
  name: "MailName",
  components: {
    Badge,
    MailNav
  },
  props: {},
  data() {
    return {};
  },
  methods: {},
};
</script>

<style lang="scss" scoped></style>
