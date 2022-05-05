<template>
  <div id="app">
    <div class="header" v-if="headerVisibility">
      <img class="logo" alt="Алроса" src="@/assets/logo.svg" />
      <div class="header__actions">
        <div class="header__actions-btns" v-if="showHeaderButtons">
          <button class="btn-custom btn-secondary">Сохранить</button>
          <button class="btn-custom btn-secondary">Предпросмотр</button>
        </div>
        <a class="header__actions-logout" @click="$router.push({path: '/'})">Выйти</a>
      </div>
    </div>
    <router-view @show="showHeaderButtons = $event"></router-view>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';
export default {
  name: "App",
  data() {
    return {
      showHeaderButtons: false,
    };
  },
  method: {
    
  },
  computed: {
    ...mapGetters([
      'headerVisibility'
    ])
  }
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
    width: 40%;
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-start;
    align-items: center;
    position: relative;
    &-btns {
      flex-basis: 80%;
      display: flex;
      flex-flow: row nowrap;
      justify-content: space-between;
      align-items: center;
    }
    &-logout {
      cursor: pointer;
      position: absolute;
      right: 0px;
      top: 50%;
      transform: translateY(-50%);
    }
  }
}
.logo {
  width: 139px;
  height: 20px;
}
</style>
