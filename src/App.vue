<template>
  <div id="app">
    <div class="header container-fluid" v-if="headerVisibility">
      <div class="container">
        <div class="row">
          <div class="col-11 offset-1 d-flex flex-row justify-content-between align-items-center">
            <img class="logo" alt="Алроса" src="@/assets/logo.svg" />
            <div class="header__actions">
              <div class="header__actions-btns" v-if="showHeaderButtons">
                <button
                  class="btn-custom btn-secondary-custom btn-save"
                  @click.prevent.stop="emitSave"
                >
                  Сохранить
                </button>
                <button
                  class="btn-custom btn-secondary-custom btn-preview"
                  @click.prevent.stop="emitDraft"
                >
                  Предпросмотр
                </button>
              </div>
              <a class="header__actions-logout" @click.prevent.stop="logoutUser"
                >Выйти</a
              >
            </div>
          </div>
        </div>
      </div>
    </div>
    <router-view @show="showHeaderButtons = $event"></router-view>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "App",
  data() {
    return {
      showHeaderButtons: false,
    };
  },
  methods: {
    ...mapActions(["logout"]),
    logoutUser() {
      this.logout();
      this.$router.push({ path: "/" });
    },
    emitSave() {
      this.$emit("save-post", null);
    },
    emitDraft() {
      this.$emit("save-post", true);
    },
  },
  computed: {
    ...mapGetters(["headerVisibility"]),
  },
};
</script>

<style lang="scss">
@import "@/assets/styles/main.scss";

.header {
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  height: $header-height;
  padding: 0 10%;
  border-bottom: 1px solid #e3e9f2;
  &__actions {
    width: 50%;
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-start;
    align-items: center;
    position: relative;
    &-btns {
      flex-basis: 80%;
      display: flex;
      flex-flow: row nowrap;
      justify-content: flex-end;
      align-items: center;
      .btn-custom:first-of-type {
        margin-right: 1.5rem;
      }
    }
    &-logout {
      cursor: pointer;
      position: absolute;
      right: 0px;
      top: 50%;
      transform: translateY(-50%);
      font-weight: 400;
      font-size: 14px;
      line-height: 17px;
      color: #000;
      text-decoration: none;
    }
  }
}
.logo {
  width: 139px;
  height: 20px;
}
.btn-save, .btn-preview {
  height: 32px !important;
  font-size: 10px !important;
  line-height: 100% !important;
  width: 176px !important;
}
</style>
