<template>
  <div class="mail-divider mail-block" :style="{backgroundColor: backgroundColor}">
    <div class="dragger"></div>
    <mail-nav
      @delete="$emit('delete')"
      @edit="$emit('edit')"
      @up="$emit('up')"
      @down="$emit('down')"
    ></mail-nav>
    <div class="mail-content">
      <badge>Разделитель</badge>
      <hr class="line">
      <color-selector @color="setBackgroundColor" :start-color="backgroundColor"></color-selector>
    </div>
  </div>
</template>

<script>
import { block } from "@/mixins/block.js";
import { color } from "@/mixins/color.js";

export default {
  name: 'MailDivider',
  mixins: [block, color],
}
</script>

<style lang="scss" scoped>
.mail-divider {
  padding: 1rem 1rem !important;
}
.line {
  color: #ff0000;
  height: 2px;
  opacity: 1;
}
</style>
