<template>
  <div class="archive">
      <h1 class="archive__title">Архив рассылок</h1>
      <div class="archive__body">
        <div class="archive__list">
          <template v-for="item in archive">
            <div class="archive__list-item" :key="item.id">
              <img
                class="archive__list-item-img"
                :style="{
                  backgroundImage: 'url(' + require(`@/assets/bg.png`) + ')',
                }"
              />
              <p class="archive__list-item-title">{{ item.title }}</p>
            </div>
          </template>
          <div class="archive__list-item archive-item">
            <div class="archive-item__bg">Архив рассылок</div>
          </div>
        </div>
      </div>
      <div class="archive__footer">
        <button class="archive__create-btn btn-custom">
          Создать новую тему
        </button>
      </div>
    </div>
</template>

<script>
export default {
  name: "Archive",
  components: {},
  props: {},
  data() {
    return {
      archive: [
        {id: 1, title: '123'},
      ]
    };
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.archive {
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: calc(100vh - 72px);
  box-sizing: border-box;
  padding: 5.5rem 0;
  &__body {
    width: 80%;
    height: 75%;
    min-height: 75%;
    max-height: 75%;
    margin-bottom: 3.5rem;
  }
  &__list {
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    width: 100%;
    height: 100%;
    overflow-y: auto;
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
    text-align: left;
    padding-left: 60%;
  }
  &__footer {
    width: 100%;
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-start;
    align-items: center;
    padding-left: 60%;
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
