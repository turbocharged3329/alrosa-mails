<template>
  <div class="notification" :style="{ backgroundColor: color }">
    {{ text }}
    <button
      class="notification__close-btn"
      @click="$emit('close')"
    ></button>
  </div>
</template>

<script>
export default {
  name: "NotificationBar",
  props: {
    text: {
      type: String,
      default: "",
    },
    color: {
      type: String,
      default: "#E0F4FF",
    },
  },
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.notification {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 40px;
  padding: 0 20px;
  font-size: 14px;
  line-height: 28px;
  &__close-btn {
    border: none;
    width: 12px;
    height: 12px;
    background-color: transparent;
    background-image: url("data:image/svg+xml,%3Csvg width='13' height='13' viewBox='0 0 13 13' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M12.0524 11.3748L11.4204 12.0063L6.05039 6.6377L0.680407 12.0063L0.0488281 11.3748L5.41881 6.00612L0.0488281 0.637927L0.680407 0.00634766L6.05039 5.37499L11.4204 0.00634766L12.0524 0.637927L6.68242 6.00612L12.0524 11.3748Z' fill='black'/%3E%3C/svg%3E%0A");
    background-size: cover;
  }
}
</style>
