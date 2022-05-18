<template>
  <div class="image-selector">
    <template v-for="item in images">
      <div
        class="image-selector__item-wrapper"
        :key="item.id"
        @click="selectImage(item.id)"
        :class="{ selected: item.id == selected }"
      >
        <div class="image-selector__selection">
          <div class="image-selector__selection-badge">Выбрано</div>
        </div>
        <img
          class="image-selector__preview"
          :src="require(`@/assets/preloaded_pictures/${item.id}.png`)"
        />
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: "ImageSelector",
  components: {},
  props: {},
  data() {
    return {
      images: [
        {
          id: 1,
        },
        {
          id: 2,
        },
      ],
      selected: null,
    };
  },
  methods: {
    selectImage(id) {
      this.selected = id;
      this.$emit('select')
    }
  },
};
</script>

<style lang="scss" scoped>
.image-selector {
  &__item-wrapper {
    width: fit-content;
    height: fit-content;
    margin-bottom: 31px;
    position: relative;
    &.selected {
      & .image-selector__selection {
        display: block;
      }
    }
  }
  &__preview {
    width: 100%;
    height: auto;
  }
  &__selection {
    display: none;
    width: 100%;
    height: 100%;
    border: 2px solid $blue;
    position: absolute;
    top: 0px;
    left: 0px;
    &-badge {
      width: 76px;
      height: 22px;
      padding: 3px 11.5px;
      font-style: normal;
      font-weight: 450;
      font-size: 12px;
      line-height: 16px;
      display: flex;
      flex-flow: row nowrap;
      justify-content: center;
      align-items: center;
      color: #ffffff;
      background-color: $blue;
      border-radius: 11px;
      position: absolute;
      bottom: 10px;
      right: 10px;
    }
  }
}
</style>
