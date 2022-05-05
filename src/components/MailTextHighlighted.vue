<template>
  <div class="mail-highlight mail-block">
    <mail-nav
      @delete="$emit('delete')"
      @edit="$emit('edit')"
      @up="$emit('up')"
      @down="$emit('down')"
    ></mail-nav>
    <div class="mail-content">
      <badge>Акцентированный текст</badge>
      <div contenteditable="true" class="mail__input">123</div>
    </div>
  </div>
</template>

<script>
import Badge from "@/components/Badge.vue";
import MailNav from "@/components/MailNav.vue";

export default {
  name: "MailTextHighlighted",
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

<style lang="scss" scoped>
.mail__input {
  background-color: $light-blue;
  padding: 1rem;
  caret-color: $black;
}
</style>
