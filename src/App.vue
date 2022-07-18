<template>
  <div id="app">
    <div class="header container-fluid" v-if="headerVisibility">
      <div class="container">
        <div class="row header__row">
          <div
            class="col-11 offset-1 d-flex flex-row justify-content-between align-items-center"
          >
            <img class="logo" alt="Алроса" src="@/assets/logo.svg" />
            <div class="header__actions">
              <div class="header__actions-btns" v-if="showHeaderButtons">
                <div class="header__menu-wrapper">
                  <button
                    class="btn-menu btn-secondary-custom"
                    @click="toggleContextMenu()"
                  ></button>
                  <context-menu
                    v-if="showContextMenu"
                    @save-templates="emitTemplates"
                    @save-ready="emitSave"
                    @save-draft="emitDraft"
                    @save-download="emitDownload"
                    @save-copy="emitCopy"
                    @close="checkContextMenuLeave"
                  ></context-menu>
                </div>
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
import ContextMenu from "@/components/ContextMenu.vue";
export default {
  name: "App",
  data() {
    return {
      showHeaderButtons: false,
      showContextMenu: false,
    };
  },
  computed: {
    ...mapGetters(["headerVisibility"]),
  },
  components: {
    ContextMenu,
  },
  methods: {
    ...mapActions(["logout"]),
    logoutUser() {
      this.logout();
      this.$router.push({ path: "/" });
    },
    toggleContextMenu(show = true) {
      this.showContextMenu = show;
    },
    emitSave() {
      this.toggleContextMenu(false);
      this.$emit("save-post", {
        toDrafts: false,
        showModal: false,
        downloadAfter: false,
      });
    },
    emitTemplates() {
      this.toggleContextMenu(false);
      this.$emit("save-templates", {
        toDrafts: false,
        showModal: false,
        downloadAfter: false,
      });
    },
    emitDraft() {
      this.toggleContextMenu(false);
      this.$emit("save-post", {
        toDrafts: true,
        showModal: true,
        downloadAfter: false,
      });
    },
    emitCopy() {
      this.toggleContextMenu(false);
      this.$emit("save-copy", {
        toDrafts: true,
        showModal: false,
        downloadAfter: false,
      });
    },
    emitDownload() {
      this.toggleContextMenu(false);
      this.$emit("save-post", {
        toDrafts: true,
        showModal: false,
        downloadAfter: true,
      });
    },
    checkContextMenuLeave() {
      this.toggleContextMenu(false);
    },
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
  &__row {
    padding: 0 8px;
  }
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
  &__menu-wrapper {
    position: relative;
  }
}
.logo {
  width: 139px;
  height: 20px;
}
.btn-save,
.btn-preview {
  height: 32px !important;
  font-size: 10px !important;
  line-height: 100% !important;
  width: 176px !important;
  margin-left: 20px;
}
.btn-menu {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-image: url("data:image/svg+xml,%3Csvg width='14' height='2' viewBox='0 0 14 2' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='1' cy='1' r='1' fill='black'/%3E%3Ccircle cx='7' cy='1' r='1' fill='black'/%3E%3Ccircle cx='13' cy='1' r='1' fill='black'/%3E%3C/svg%3E%0A") !important;
  background-repeat: no-repeat !important;
  background-size: 14px 2px !important;
  background-position: center !important;
  &:hover {
    background-image: url("data:image/svg+xml,%3Csvg width='14' height='2' viewBox='0 0 14 2' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='1' cy='1' r='1' fill='black'/%3E%3Ccircle cx='7' cy='1' r='1' fill='black'/%3E%3Ccircle cx='13' cy='1' r='1' fill='black'/%3E%3C/svg%3E%0A") !important;
    background-repeat: no-repeat !important;
    background-size: 14px 2px !important;
    background-position: center !important;
  }
}
</style>
