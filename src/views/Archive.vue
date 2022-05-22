<template>
  <div class="archive container-fluid">
    <div class="container h-100 archive__container p-0">
      <div class="row archive__title-row">
        <div
          class="col-1 d-flex flex-row justify-content-end align-items-start"
        >
          <div class="back-link" @click="$router.go(-1)">
            <span class="back-link-text">Назад</span>
          </div>
        </div>
        <div class="col-9 offset-2">
          <h1 class="archive__title h-100">Архив рассылок</h1>
        </div>
      </div>
      <div class="row archive__list-row">
        <div class="col-8 offset-2 h-100">
            <div class="archive__list">
              <p v-if="!posts.length">Загрузка...</p>
              <template v-for="item in posts">
                <div
                  class="archive__list-item"
                  :key="item.id"
                  @click.prevent.stop="goToTemplate(item)"
                >
                  <div class="archive__list-item-status">
                    <span
                      class="status-value"
                      :class="{
                        draft: item.status == 'draft',
                        ready: item.status != 'draft',
                      }"
                      >{{
                        item.status == "draft" ? "Черновик" : "Готово"
                      }}</span
                    >
                  </div>
                  <p class="archive__list-item-title">{{ item.name }}</p>
                  <div class="archive__list-item-date">
                    <span class="archive__list-item-date-value">
                    {{ user.email }}<br>
                    {{
                      moment(
                        item.status == "draft"
                          ? item.created_at
                          : item.updated_at
                      ).format("DD.MM.YYYY HH:MM")
                    }}
                    </span>
                  </div>
                </div>
              </template>
          </div>
        </div>
      </div>
      <div class="row archive__footer-row">
        <div class="col-4 offset-3 p-0">
          <button
            class="archive__create-btn btn-custom btn-secondary-custom"
            @click="$router.push({ name: 'AddNew' })"
          >
            Создать новую тему
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

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
  computed: {
    ...mapGetters(["posts", "user"]),
  },
  methods: {
    ...mapActions(["getPosts"]),
    goToTemplate(data) {
      this.$router.push({
        name: "Constructor",
        params: {
          postData: {
            ...data,
            template_blocks: JSON.parse(data.template_blocks),
          },
        },
      });
    },
  },
  async mounted() {
    await this.getPosts();
  },
};
</script>

<style lang="scss" scoped>
.archive {
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: calc(100vh - $header-height);
  box-sizing: border-box;
  padding: 5.5rem 0;
  position: relative;
  &__container {
    display: flex;
    flex-flow: row wrap;
    align-items: flex-start;
    justify-content: center;
  }
  &__body {
    width: 100%;
    height: 100%;
    max-height: 100%;
    display: flex;
    flex-flow: column nowrap;
    justify-content: flex-start;
    align-items: center;
    box-sizing: border-box;
  }
  &__list {
    display: block;
    width: 100%;
    overflow-y: auto;
    height: 100%;
    box-sizing: border-box;
    &-row {
      // flex-basis: 80%;
      height: 66%;
      flex-basis: 100%;
      margin-bottom: 5.6%;
    }

    &-item {
      flex-basis: 100%;
      height: 70px;
      cursor: pointer;
      box-sizing: border-box;
      display: flex;
      flex-flow: row nowrap;
      justify-content: flex-start;
      align-items: center;
      &-status {
        flex-basis: 11.5%;
        height: 100%;
        display: flex;
        flex-flow: row nowrap;
        justify-content: center;
        align-items: center;
        .status-value {
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
          &.draft {
            background-color: #c7ced9;
          }
          &.ready {
            background-color: #54b76b;
          }
        }
      }
      &-title {
        display: flex;
        flex-flow: row nowrap;
        justify-content: flex-start;
        align-items: center;
        font-style: normal;
        font-weight: 500;
        font-size: 20px;
        line-height: 28px;
        color: $black;
        text-align: left;
        flex-basis: 62.5%;
        margin: 0;
        border-bottom: 1px solid $gray;
        height: 100%;
        padding-left: 13px;
        // padding-top: 9px;
      }
      &-date {
        flex-basis: 26%;
        height: 100%;
        display: flex;
        flex-flow: row wrap;
        justify-content: flex-start;
        align-items: center;
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 135%;
        padding-left: 20px;
        &-date {
          flex-basis: 100%;
          text-align: left;
        }
        &-value {
          flex-basis: 100%;
          text-align: left;
        }
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
    // margin-bottom: 5%;
    text-align: left;
    &-row {
          // flex-basis: 14%;
          height: 14%;
          flex-basis: 100%;
    }
  }
  &__footer-row {
    // flex-basis: 8%;
    height: 14.4%;
    flex-basis: 100%;
  }
  &__create-btn {
    border: 2px solid $blue;
    background: transparent;
    padding: 0;
    max-width: 275px;
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
.back-link {
  top: 90px !important;
}
</style>
