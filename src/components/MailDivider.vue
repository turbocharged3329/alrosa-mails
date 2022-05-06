<template>
  <div class="mail-divider mail-block">
    <div class="dragger"></div>
    <mail-nav
      @delete="$emit('delete')"
      @edit="$emit('edit')"
      @up="$emit('up')"
      @down="$emit('down')"
    ></mail-nav>
    <div class="mail-content">
      <badge>Разделитель</badge>
      <hr>
    </div>
  </div>
</template>

<script>
import MailNav from "@/components/MailNav.vue";
import Badge from "@/components/Badge.vue";

export default {
  name: 'MailDivider',
  components: {
    MailNav,
    Badge
  },
  props: {},
  data() {
    return {}
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
.mail-divider {
  padding: 1rem 1rem !important;
}
</style>
