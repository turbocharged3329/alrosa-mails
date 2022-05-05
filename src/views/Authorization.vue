<template>
  <div class="auth">
    <div class="auth__login">
      <img
        src="@/assets/logo.svg"
        alt="Алроса"
        class="auth__login-logo"
      />
      <form
        action="login"
        autocomplete
        name="login"
        class="auth__login-form"
      >
        <input
          class="auth__login-email auth-input"
          id="email"
          placeholder="Почта"
          type="email"
        />
        <div class="auth__login-wrapper">
          <img src="@/assets/closed-eye.svg" alt="" class="auth__login-eye" @click.prevent.stop="togglePassword">
          <input
            class="auth__login-password auth-input"
            id="password"
            placeholder="Пароль"
            :type="showPass ? 'text' : 'password'"
          />
        </div>
        <button class="auth__login-btn btn-primary btn-custom" :class="'disabled'">
          Войти
        </button>
      </form>
    </div>
    <div class="auth__picture">
      <h3 class="auth__picture-text">
        Конструктор<br />корпоративных<br />рассылок
      </h3>
    </div>
  </div>
</template>

<script>
export default {
  name: "Authorization",
  components: {},
  props: {},
  data() {
    return {
      showPass: false,
    };
  },
  methods: {
    togglePassword() {
      this.showPass = !this.showPass;
    }
  },
  mounted() {
    this.$emit("hide");
  },
};
</script>

<style lang="scss" scoped>
.auth {
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  &-input {
    border: none;
    border-bottom: 1px solid #eeeeee;
    width: 100%;
    height: 40px;
    &:focus {
      outline: none;
      &::placeholder {
        opacity: 0.1;
      }
    }
    &::placeholder {
      color: $black;
      opacity: 1;
      font-weight: 400;
      font-size: 14px;
      line-height: 135%;
      margin-bottom: 1rem;
    }
  }
  &__login {
    flex-basis: 40%;
    height: 100%;
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;
    position: relative;
    &-wrapper {
      position: relative;
      margin-bottom: 5.5rem;
    }
    &-eye {
      position: absolute;
      right: 1%;
      top: 50%;
      z-index: 2;
      cursor: pointer;
    }
    &-logo {
      width: 139px;
      height: 20px;
      position: absolute;
      top: 10%;
      left: 50%;
      transform: translate(-50%);
    }
    &-form {
      width: 50%;
    }
    &-email {
      margin-bottom: 2.85rem;
    }
  }
  &__picture {
    flex-basis: 60%;
    background: url("~@/assets/bg.png") no-repeat;
    background-size: 108%;
    height: 100%;
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-start;
    align-items: center;
    padding: 9.3rem;
    box-sizing: border-box;
    &-text {
      text-align: left;
      font-style: normal;
      font-weight: 400;
      font-size: 36px;
      line-height: 135%;
      text-transform: uppercase;
      color: #ffffff;
    }
  }
}
</style>
