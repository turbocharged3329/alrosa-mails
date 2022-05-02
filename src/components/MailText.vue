<template>
  <div class="mail-text">
    <badge>Обычный текст</badge>
    <textarea />
  </div>
</template>

<script>
import Badge from '@/components/Badge.vue' 
export default {
  name: 'MailText',
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
