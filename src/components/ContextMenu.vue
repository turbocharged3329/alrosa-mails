<template>
  <div class="context-menu">
    <div class="context-menu__item">
      <span class="context-menu__item-content" @click="emitSaveToDrafts">сохранить черновик</span>
    </div>
    <div class="context-menu__item">
      <span class="context-menu__item-content">готово к отправке</span>
    </div>
    <hr class="context-menu__divider" />
    <div class="context-menu__item" @click="createTemplateFrom">
      <span class="context-menu__item-content">превратить в шаблон</span>
    </div>
    <div class="context-menu__item">
      <span class="context-menu__item-content">дублировать</span>
    </div>
    <hr class="context-menu__divider" />
    <div class="context-menu__item">
      <span class="context-menu__item-content">скачать html</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "ContextMenu",
  components: {},
  props: {},
  emits: ['save-draft'],
  data() {
    return {};
  },
  methods: {
    emitSaveToDrafts() {
      this.$emit('save-draft')
    },
    createTemplateFrom() {
      this.$router.push({ name: 'AddTemplate'})
    }
  },
};
</script>

<style lang="scss" scoped>
.context-menu {
  display: block;
  width: 200px;
  height: 170px;
  border: 2px solid #6dcdf6;
  border-radius: 8px;
  box-shadow: 0px 2px 8px 2px rgba(0, 0, 0, 0.1);
  position: absolute;
  right: calc(100% - 32px);
  top: calc(100% + 4px);
  z-index: 999;
  background: white;
  padding: 7px 20px;
  &__item {
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    height: 26px;
    &-content {
      cursor: pointer;
      text-transform: uppercase;
      font-family: Avenir Next, sans-serif;
      font-style: normal;
      letter-spacing: 0.15em;
      font-size: 10px;
      line-height: 100%;
    }
  }
  &__divider {
    width: 100%;
    height: 1px;
    margin: 5px 0;
  }
}
</style>
