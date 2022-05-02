<template>
  <button class="arrow-btn" :class="{'down' : direction == 'down'}" @click="$emit(`${direction}`)"></button>
</template>

<script>
export default {
  name: 'ArrowBtn',
  components: {},
  props: {
    direction: {
      type: String,
      default: 'up'
    }
  },
  data() {
    return {}
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
.arrow-btn {
  background: white;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  box-shadow: 0px 3px 8px rgba(23, 24, 27, 0.12), 0px 3px 1px rgba(23, 24, 27, 0.04);
  background: url('~@/assets/arrow.svg') no-repeat;
  background-size: 14px 16px;
  background-position: center;
  cursor: pointer;
  border: none;
  &.down {
    background: url('~@/assets/arrow-down.svg') no-repeat !important;
    background-size: 14px 16px !important;
    background-position: center !important;
  }
}
</style>
