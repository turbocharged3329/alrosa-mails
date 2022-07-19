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
        Переход {{ detectTransitionType(transitionName) }}
      </badge>
      <div class="image-preview">
        <img :src="imageUrl" class="image-preview__img"/>
      </div>
    </div>
  </div>
</template>

<script>
import { block } from "@/mixins/block.js";

export default {
  name: "MailTransition",
  mixins: [block],
  props: ["transitionName"],
  computed: {
    imageUrl() {
      return `${process.env.VUE_APP_API}/static/img/${this.transitionName}.png`
    }
  },
  methods: {
    detectTransitionType(transitionName) {
      switch (transitionName) {
        case 'transition_white_to_blue': 
          return 'белый-голубой';
        case 'transition_white_to_blue_2':
          return 'белый-голубой-2'
        case 'transition_blue_to_white':
          return 'голубой-белый'
        default: 
          return 
      }
    }
  },
  mounted() {

  }
};
</script>
