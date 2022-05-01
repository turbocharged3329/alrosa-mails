<template>
  <div id="app">
    <div class="header">
      <img class="logo" alt="Алроса" src="@/assets/logo.svg" />
    </div>
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'App',
  components: {}
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
