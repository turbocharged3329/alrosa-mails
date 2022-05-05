<template>
  <div class="layouts">
    <div class="layouts__body">
      <h1 class="layouts__title">Выберите тему письма</h1>
      <div class="layouts__list">
        <template v-for="item in layouts">
          <div class="layouts__list-item" :key="item.id" @click="$router.push({name: 'Constructor'})">
            <img
              class="layouts__list-item-img"
              :style="{
                backgroundImage: 'url(' + require(`@/assets/bg.png`) + ')',
              }"
            />
            <p class="layouts__list-item-title">{{ item.title }}</p>
          </div>
        </template>
        <div class="layouts__list-item archive-item" @click="$router.push({name: 'Archive'})">
          <div class="archive-item__bg">Архив рассылок</div>
        </div>
      </div>
      <div class="layouts__footer">
        <button class="layouts__create-btn btn-custom" @click="$router.push({name: 'AddNew'})">
          Создать новую тему
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import {mapActions} from 'vuex';
export default {
  name: "Layouts",
  components: {},
  props: {},
  data() {
    return {
      layouts: [
        { id: 1, title: "Мониторинг СМИ" },
        { id: 2, title: "Профилактические работы" },
        { id: 3, title: "Обращение генерального директора" },
        { id: 4, title: "Поздравление" },
        { id: 5, title: "HR" },
        { id: 6, title: "Поздравление" },
        { id: 7, title: "HR" },
        { id: 8, title: "Поздравление" },
        { id: 9, title: "HR" },
        { id: 10, title: "Поздравление" },
        { id: 11, title: "HR" },
      ],
    };
  },
  methods: {
    ...mapActions([
      'setHeaderVisibility'
    ]),
  },
  mounted() {
    this.setHeaderVisibility(true)
  }
};
</script>

<style lang="scss" scoped>
.layouts {
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: calc(100vh - $header-height);
  box-sizing: border-box;
  padding: 72px 0;
  &__body {
    width: 80%;
    height: 100%;
    min-height: 100%;
    display: flex;
    flex-flow: column nowrap;
    justify-content: flex-start;
    align-items: center;
    box-sizing: border-box;
  }
  &__list {
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    width: 100%;
    height: 75%;
    overflow-y: auto;
    margin-bottom: 5%;
    &-item {
      flex-basis: 30%;
      height: 164px;
      margin-bottom: 2.5rem;
      cursor: pointer;
      &:nth-of-type(3n + 1) {
        margin-right: 1.66%;
      }
      &:nth-of-type(3n + 2) {
        margin-left: 1.66%;
        margin-right: 1.66%;
      }
      &:nth-of-type(3n + 3) {
        margin-left: 1.66%;
      }
      &-img {
        width: 100%;
        height: 120px;
        background-size: cover;
        background-repeat: no-repeat;
        margin-bottom: 1rem;
      }
      &-title {
        font-weight: 500;
        font-size: 14px;
        line-height: 28px;
        letter-spacing: 0.02em;
        color: $black;
        text-align: center;
        width: 100%;
        margin: 0;
      }
    }
  }
  &__title {
    font-style: normal;
    font-weight: 500;
    font-size: 28px;
    line-height: 42px;
    letter-spacing: 0.07em;
    text-transform: uppercase;
    color: $black;
    width: 100%;
    margin: 0;
    margin-bottom: 3.2rem;
    padding-left: 50%;
    text-align: left;
    height: 5%;
    margin-bottom: 5%;
  }
  &__footer {
    width: 100%;
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-start;
    align-items: center;
    padding-left: 50%;
    height: 10%;
  }
  &__create-btn {
    border: 2px solid $blue;
    background: transparent;
  }
  .archive-item {
    &__bg {
      background-color: $gray;
      width: 100%;
      height: 120px;
      font-weight: 500;
      font-size: 14px;
      line-height: 28px;
      text-align: center;
      letter-spacing: 0.15em;
      color: #818c99;
      text-transform: uppercase;
      display: flex;
      flex-flow: row nowrap;
      justify-content: center;
      align-items: center;
    }
  }
}
</style>
