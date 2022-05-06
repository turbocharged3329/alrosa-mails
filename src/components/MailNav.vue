<template>
  <div class="mail-nav">
    <div class="mail-nav__section">
      <button class="mail-nav__btn delete" @click="$emit('delete')"></button>
    </div>
    <div class="mail-nav__section">
      <button class="mail-nav__btn edit" @click="$emit('edit')" :class="{'hidden': noEdit}"></button>
    </div>
    <div class="mail-nav__section">
      <action-btn action="up" @up="$emit('up')"></action-btn>
      <action-btn action="down" @down="$emit('down')"></action-btn>
    </div>
  </div>
</template>

<script>
import ActionBtn from "@/components/ActionBtn.vue";
export default {
  name: "MailNav",
  components: { ActionBtn },
  props: {
    noEdit: {
      type: Boolean,
      default: false,
    }
  },
  data() {
    return {};
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.edit {
  background-image: url("~@/assets/edit.svg");
  background-size: 24px 24px;
  background-position: center;
  margin: auto;
}
.delete {
  background-image: url("~@/assets/trash.svg");
  background-size: 24px 24px;
  background-position: center;
  margin: auto;
}
.hidden {
  visibility: hidden;
}
</style>
