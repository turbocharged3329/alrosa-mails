<template>
  <div
    class="mail-spacer mail-block"
    :style="{ backgroundColor: backgroundColor }"
  >
    <div class="dragger"></div>
    <mail-nav
      @delete="$emit('delete')"
      @edit="editContent"
      @up="$emit('up')"
      @down="$emit('down')"
    ></mail-nav>
    <div class="mail-content">
      <badge>
        Отступ х{{ gap }}
      </badge>
      <color-selector
        @color="setBackgroundColor"
        :start-color="backgroundColor"
      ></color-selector>
    </div>
  </div>
</template>

<script>
import { block } from "@/mixins/block.js";
import { color } from "@/mixins/color.js";

export default {
  name: "MailSpacer",
  props: ["gap"],
  mixins: [block, color],
  data() {
    return {
      badgeContent: {
        content: 123,
      },
    };
  },
  // computed: {
  //   badgeContent() {
  //     return { content: `Отступ ${this.gap}` };
  //   },
  // },
};
</script>
