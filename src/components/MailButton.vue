<template>
  <div class="mail-button mail-block">
    <div class="mail-nav">
      <div class="mail-nav__direction">
        <arrow-btn direction="up" @up="$emit('up')"></arrow-btn>
        <arrow-btn direction="down" @down="$emit('down')"></arrow-btn>
      </div>
      <div class="mail-nav__edit">
        
      </div>
    </div>
    <div class="mail-content">
      <badge>Кнопка</badge>
      123
    </div>
  </div>
</template>

<script>
import Badge from "@/components/Badge.vue";
import ArrowBtn from "@/components/ArrowBtn.vue";
export default {
  name: "MailButton",
  components: { Badge, ArrowBtn },
  emits: ["up", "down"],
  props: {},
  data() {
    return {};
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.mail-button {
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
}
.nav {
  flex-basis: 30%;
  height: 100%;
}
.content {
  flex-basis: 70%;
  height: 100%;
}
</style>
