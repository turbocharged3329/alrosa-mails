<template>
  <div class="mail-text mail-block">
    <mail-nav
      @delete="$emit('delete')"
      @edit="$emit('edit')"
      @up="$emit('up')"
      @down="$emit('down')"
    ></mail-nav>
    <div class="mail-content">
      <badge>Обычный текст</badge>
      <div contenteditable="true" class="mail__input mail__textarea">123</div>
    </div>
  </div>
</template>

<script>
import MailNav from "@/components/MailNav.vue";
import Badge from "@/components/Badge.vue";
export default {
  name: "MailText",
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
.mail-text {
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
}
</style>
