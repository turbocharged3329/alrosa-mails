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
          @click="selectImage(item.serverPath, item.id)"
          :class="{ selected: item.id == selectedId }"
        >
          <div class="image-selector__selection">
            <div class="image-selector__selection-badge">Выбрано</div>
          </div>
          <img
            class="image-selector__preview"
            :src="`${item.src}`"
            :srcset="`${item.src}`"
          />
        </div>
      </template>
    </div>
    <button
      :disabled="!selected"
      :class="{ disabled: !selected }"
      class="image-selector__save-btn btn-custom btn-primary-custom"
      @click="emitSave"
    >
      Сохранить
    </button>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "ImageSelector",
  props: {
    isFooter: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      selected: null,
      selectedId: null,
    };
  },
  computed: {
    ...mapGetters(["header_img"]),
    images() {
      return this.header_img.map((image) => {
        return {
          id: image.id,
          src: `${process.env.VUE_APP_API}${image.image}`,
          serverPath: image.image
        };
      });
    },
  },
  methods: {
    ...mapActions(["getPatternImage"]),
    //выбор изображения
    selectImage(path, id) {
      this.selectedId = id;
      this.selected = path;
      this.$emit("select");
    },
    //сохранение выбранных изменений
    emitSave() {
      this.$emit("apply-selection", this.selected);
    },
  },
  async created() {
    await this.getPatternImage("header");
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
    width: 98%;
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
