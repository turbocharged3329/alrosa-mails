<template>
  <div class="auth container-fluid">
    <div class="container h-100">
      <div class="row h-100">
        <div class="auth__login col-3 offset-1">
          <img src="@/assets/logo.svg" alt="Алроса" class="auth__login-logo" />
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
              v-model="email"
            />
            <div class="auth__login-wrapper">
              <img
                src="@/assets/closed-eye.svg"
                alt=""
                class="auth__login-eye"
                @click.prevent.stop="togglePassword"
              />
              <input
                class="auth__login-password auth-input"
                id="password"
                placeholder="Пароль"
                :type="showPass ? 'text' : 'password'"
                v-model="password"
              />
            </div>
            <span v-if="loginError" class="auth__error"
              >Неверный логин или пароль</span
            >
            <button
              class="auth__login-btn btn-primary-custom btn-custom"
              :class="{ disabled: !email.length || !password.length }"
              :disabled="!email.length || !password.length"
              @click.prevent.stop="auth"
            >
              <span v-if="!loading">Войти</span>
              <pulse-loader class="custom-class" :color="'#F0F2F5'" :loading="loading" :size="10" :sizeUnit="'px'"></pulse-loader>
            </button>
          </form>
        </div>
        <div class="auth__picture col-6 offset-2">
          <h3 class="auth__picture-text">
            Конструктор<br />корпоративных<br />рассылок
          </h3>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "Authorization",
  components: {},
  props: {},
  data() {
    return {
      showPass: false,
      email: "",
      password: "",
      loginError: false,
      loading: false,
    };
  },
  methods: {
    ...mapActions(["setHeaderVisibility", "getToken"]),
    togglePassword() {
      this.showPass = !this.showPass;
    },
    auth() {
      this.loading = true;
      this.getToken({ email: this.email, password: this.password }).then(
        (response) => {
          this.loginError = !response;

          if (!this.loginError) {
            this.$router.push({ name: "Layouts" });
          }

          this.loading = false
        }
      );
    },
  },
  mounted() {
    this.$emit("hide");
    this.setHeaderVisibility(false);
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
  background: url("~@/assets/bg.png") no-repeat;
  background-size: contain;
  background-position-x: 100%;
  &-input {
    border: none;
    border-bottom: 1px solid #eeeeee;
    width: 100%;
    height: 40px;
    font-family: Avenir Next Regular, sans-serif !important;
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
    height: 100%;
    display: flex;
    flex-flow: column nowrap;
    justify-content: flex-start;
    align-items: flex-start;
    position: relative;
    &-wrapper {
      position: relative;
      margin-bottom: 5.1rem;
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
      margin-top: 7.4rem;
      margin-bottom: 9.85rem;
    }
    &-form {
      width: 100%;
      position: relative;
    }
    &-email {
      margin-bottom: 2rem;
    }
    &-btn {
      width: 100%;
    }
  }
  &__picture {
    height: 100%;
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-start;
    align-items: center;
    box-sizing: border-box;
    &-text {
      text-align: left;
      font-style: normal;
      font-weight: 400;
      font-size: 36px;
      line-height: 135%;
      text-transform: uppercase;
      color: #ffffff;
      margin-top: -2.2rem;
    }
  }
  &__error {
    color: red;
    position: absolute;
    bottom: 25%;
    width: 100%;
    text-align: center;
    left: 50%;
    transform: translate(-50%);
  }
}
</style>
