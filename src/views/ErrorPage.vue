<template>
  <div class="error-page">
    <img class="error-page__logo" alt="Алроса" src="@/assets/logo.svg" />
    <p class="error-page__message">
      Конструктор электронных писем не доступен для работы с мобильных устройств
    </p>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "ErrorPage",
  methods: {
    ...mapActions(["setHeaderVisibility"]),
  },
  mounted() {
    this.setHeaderVisibility(false);
  },
};
</script>

<style lang="scss" scoped>
.error-page {
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  &__message {
    font-size: 42px;
    color: #818c99;
  }
  &__logo {
    margin-bottom: 2rem;
  }
}
</style>
