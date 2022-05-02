<template>
  <div class="mail-highlight">
    <badge>Акцентированный текст</badge>
    <textarea />
  </div>
</template>

<script>
import Badge from '@/components/Badge.vue' 
export default {
  name: 'MailTextHighlighted',
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
