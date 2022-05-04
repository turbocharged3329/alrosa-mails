<template>
  <div class="mail-h1 mail-block">
    <mail-nav
      @delete="$emit('delete')"
      @edit="$emit('edit')"
      @up="$emit('up')"
      @down="$emit('down')"
    ></mail-nav>
    <div class="mail-content">
      <badge>Заголовок H1</badge>
      <div class="mail__input" contenteditable="true">123</div>
    </div>
  </div>
</template>

<script>
import Badge from "@/components/Badge.vue";
import MailNav from "./MailNav.vue";

export default {
  name: "MailH1",
  components: {
    Badge,
    MailNav,
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
  font-style: normal;
  font-weight: 500;
  font-size: 28px;
  line-height: 42px;
  letter-spacing: 0.03em;
  color: $black;
  max-width: 80%;
  word-break: break-word;
}
</style>
