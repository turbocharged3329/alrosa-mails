<template>
  <div class="archive">
    <div class="back-link">
      <span class="back-link-text">Назад</span>
    </div>
    <div class="archive__body">
      <h1 class="archive__title">Архив рассылок</h1>
      <div class="archive__list">
        <template v-for="item in archive">
          <div class="archive__list-item" :key="item.id">
            <div class="archive__list-item-status">
              <span class="status-value">{{ item.status }}</span>
            </div>
            <p class="archive__list-item-title">{{ item.title }}</p>
            <div class="archive__list-item-date">132</div>
          </div>
        </template>
      </div>
      <div class="archive__footer">
        <button class="archive__create-btn btn-custom">
          Создать новую тему
        </button>
      </div>
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
        { id: 1, title: "Просто title", status: "Готово" },
        { id: 2, title: "Просто title", status: "Готово" },
        { id: 3, title: "Просто title", status: "Готово" },
        { id: 4, title: "Просто title", status: "Готово" },
        { id: 5, title: "Просто title", status: "Готово" },
        { id: 6, title: "Просто title", status: "Готово" },
        { id: 7, title: "Просто title", status: "Черновик" },
        { id: 8, title: "Просто title", status: "Готово" },
        { id: 9, title: "Просто title", status: "Готово" },
      ],
    };
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.archive {
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: calc(100vh - 72px);
  box-sizing: border-box;
  padding: 72px 0;
  position: relative;
  &__body {
    width: 80%;
    height: 100%;
    max-height: 100%;
    display: flex;
    flex-flow: column nowrap;
    justify-content: flex-start;
    align-items: center;
    box-sizing: border-box;
  }
  &__list {
    display: flex;
    flex-flow: row wrap;
    justify-content: flex-start;
    align-items: center;
    width: 75%;
    overflow-y: auto;
    height: 75%;
    box-sizing: border-box;
    margin-bottom: 5%;

    &-item {
      flex-basis: 100%;
      height: 50px;
      cursor: pointer;
      box-sizing: border-box;
      display: flex;
      flex-flow: row nowrap;
      justify-content: flex-start;
      align-items: center;
      margin-bottom: 1.5rem;
      &-status {
        flex-basis: 15%;
        height: 100%;
        display: flex;
        flex-flow: row nowrap;
        justify-content: center;
        align-items: flex-start;
        .status-value {
          background: red;
          padding: 3px auto;
          border-radius: 11px;
          height: 1.5rem;
          width: 85%;
          font-style: normal;
          font-weight: 500;
          font-size: 12px;
          line-height: 135%;
          color: white;
          display: flex;
          flex-flow: row nowrap;
          justify-content: center;
          align-items: center;
          margin-top: 5px;
        }
      }
      &-title {
        font-style: normal;
        font-weight: 500;
        font-size: 20px;
        line-height: 28px;
        color: $black;
        text-align: center;
        flex-basis: 60%;
        margin: 0;
        border-bottom: 1px solid $gray;
        height: 100%;
      }
      &-date {
        flex-basis: 25%;
        height: 100%;
        display: flex;
        flex-flow: row nowrap;
        justify-content: center;
        align-items: center;
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
    margin-bottom: 5%;
    text-align: left;
    padding-left: 15%;
    height: 5%;
  }
  &__footer {
    width: 100%;
    display: flex;
    flex-flow: row nowrap;
    justify-content: flex-start;
    align-items: center;
    padding-left: 15%;
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
