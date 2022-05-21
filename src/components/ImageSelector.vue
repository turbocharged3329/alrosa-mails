<template>
  <div class="image-selector">
    <h3 class="image-selector__title mail-block__heading">
      Выберите одно из существующих изображений
    </h3>
    <div class="image-selector__variants">
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
    <button
      class="image-selector__save-btn btn-custom btn-primary"
      @click="emitSave"
    >
      Сохранить
    </button>
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
    //выбор изображения
    selectImage(id) {
      this.selected = id;
      this.$emit("select");
    },
    //сохранение выбранных изменений
    emitSave() {
      this.$emit("apply-selection", "123");
    },
  },
};
</script>

<style lang="scss" scoped>
.image-selector {
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  padding: 1.5rem;
  width: 100%;
  height: 100%;
  &__title {
    width: 100%;
    text-align: left;
    margin-bottom: 1rem;
  }
  &__variants {
    display: flex;
    flex-flow: column nowrap;
    width: 100%;
    height: 100%;
    overflow-y: auto;
  }
  &__item-wrapper {
    width: auto;
    height: auto;
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
  &__save-btn {
    width: 271px;
    height: 42px;
  }
}
</style>
