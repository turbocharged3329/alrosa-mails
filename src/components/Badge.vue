<template>
  <div class="badge">
    <span class="badge__title">
      <slot></slot>
    </span>
  </div>
</template>

<script>
export default {
  name: "Badge",
  components: {},
  data() {
    return {};
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.badge {
  font-style: normal;
  font-weight: 500;
  font-size: 10px;
  line-height: 12px;
  letter-spacing: 0.03em;
  text-transform: uppercase;
  padding: 3px 5px;
  background: #f0f2f5;
  border-radius: 11px;
  width: fit-content;
  &__title {
    color: #121212;
    opacity: 0.5;
  }
}
</style>
