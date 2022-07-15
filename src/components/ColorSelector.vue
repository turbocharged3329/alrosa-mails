<template>
  <div class="color-selector">
    <span>Фон:</span>
    <div
      v-for="color in colors"
      :key="color.id"
      :style="{ backgroundColor: color.color }"
      class="color-selector__item"
      :class="{selected: color.color == selected}"
      @click="selectColor(color.color)"
    ></div>
  </div>
</template>

<script>
export default {
  name: "ColorSelector",
  props: {},
  data() {
    return {
      colors: [
        {
          color: "#fff",
          id: 1,
        },
        {
          color: "#e6f5fc",
          id: 2,
        },
      ],
      selected: "#fff",
    };
  },
  methods: {
    selectColor(color) {
      this.selected = color;
      this.$emit('color', color);
    },
  },
};
</script>

<style lang="scss" scoped>
.color-selector {
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;
  height: 30px;
  width: auto;
  margin-bottom: 1rem;
  &__item {
    display: block;
    width: 30px;
    height: 30px;
    border: 1px solid $black;
    margin: 0 5px;
    &.selected {
      border: 2px solid $blue;
    }
  }
}
</style>
