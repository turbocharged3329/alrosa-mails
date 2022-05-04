<template>
  <div class="mail-button mail-block">
    <mail-nav
      @delete="$emit('delete')"
      @edit="$emit('edit')"
      @up="$emit('up')"
      @down="$emit('down')"
    ></mail-nav>
    <div class="mail-content">
      <badge>Кнопка</badge>
      <div class="mail-button__form">
        <p class="mail__input" contenteditable="true">123</p>
      </div>
    </div>
  </div>
</template>

<script>
import Badge from "@/components/Badge.vue";
import MailNav from "@/components/MailNav.vue";

export default {
  name: "MailButton",
  components: { Badge, MailNav },
  emits: ["up", "down"],
  props: {},
  computed: {
  },
  methods: {
  },
};
</script>

<style lang="scss" scoped>
.mail-button {
  &__form {
    border: 2px solid $blue;
    border-radius: 42px;
    width: fit-content;
    height: 42px;
    padding: 10px 36px;
    min-width: 200px;
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;
  }
}
.content {
  flex-basis: 70%;
  height: 100%;
}
</style>
