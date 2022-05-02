<template>
  <div class="mail-button">
    <div class="nav">
      <button @click="$emit('up')">up</button>
      <button @click="$emit('down')">down</button>
    </div>
    <div class="content">
      <badge>Кнопка</badge>
      123
    </div>
  </div>
</template>

<script>
import Badge from "@/components/Badge.vue";
export default {
  name: "MailButton",
  components: { Badge },
  props: {},
  data() {
    return {};
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.mail-button  {
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
