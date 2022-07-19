<template>
  <div
    class="mail-transition mail-block"
  >
    <div class="dragger"></div>
    <mail-nav
      @delete="$emit('delete')"
      @edit="editContent"
      @up="$emit('up')"
      @down="$emit('down')"
      no-edit
    ></mail-nav>
    <div class="mail-content">
      <badge>
        Переход {{ transitionName }}
      </badge>
    </div>
  </div>
</template>

<script>
import { block } from "@/mixins/block.js";

export default {
  name: "MailTransition",
  mixins: [block],
  props: ["transitionName"]
};
</script>
