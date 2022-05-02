<template>
  <div class="mail-name">
    <badge>Название письма</badge>
    <textarea />
  </div>
</template>

<script>
import Badge from '@/components/Badge.vue' 
export default {
  name: 'MailName',
  components: {
    Badge
  },
  props: {},
  data() {
    return {}
  },
  methods: {}
}
</script>

<style lang="scss" scoped></style>
