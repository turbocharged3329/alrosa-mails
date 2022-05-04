<template>
  <div id="app">
    <div class="header" v-if="!hideHeader">
      <img class="logo" alt="Алроса" src="@/assets/logo.svg" />
    </div>
    <router-view @hide="hideHeader = true"></router-view>
  </div>
</template>

<script>

export default {
  name: 'App',
  data() {
    return {
      hideHeader: false,
    }
  }
}
</script>

<style lang="scss">
@import '@/assets/styles/main.scss';

.header {
  display: flex;
  flex-flow: row nowrap;
  // justify-content: center;
  align-items: center;
  width: 100%;
  height: 72px;
  padding: 0 10%;
  border-bottom: 1px solid #E3E9F2;
}
.logo {
  width: 139px;
  height: 20px;
}
</style>
