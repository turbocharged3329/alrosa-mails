<template>
  <button class="action-btn mail-nav__btn" :class="{'down' : action == 'down'}" @click="$emit(`${action}`)"></button>
</template>

<script>
export default {
  name: 'ActionBtn',
  props: {
    action: {
      type: String,
      default: 'up'
    }
  },
}
</script>

<style lang="scss" scoped>
.action-btn {
  background-image: url('~@/assets/arrow.svg');
  background-size: 14px 16px;
  &.down {
    background-image: url('~@/assets/arrow-down.svg');
    background-size: 14px 16px;
  }
}
</style>
