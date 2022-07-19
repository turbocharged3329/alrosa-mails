<template>
  <div class="mail-spacer mail-block" :style="{backgroundColor: backgroundColor}">
    <div class="dragger"></div>
    <mail-nav
      @delete="$emit('delete')"
      @edit="editContent"
      @up="$emit('up')"
      @down="$emit('down')"
    ></mail-nav>
    <div class="mail-content">
      <badge>Отступ х1</badge>
      <color-selector @color="setBackgroundColor" :start-color="backgroundColor"></color-selector>
    </div>
  </div>
</template>

<script>
import { block } from "@/mixins/block.js";
import { color } from "@/mixins/color.js";

export default {
  name: "MailH1",
  mixins: [block, color],
};
</script>

<style lang="scss" scoped></style>
