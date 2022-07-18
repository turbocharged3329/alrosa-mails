<template>
  <div class="layouts container-fluid">
    <div class="layouts__body container p-0">
      <div class="row layouts__notification-row">
        <div class="col-10 offset-1">
          <notification-bar
            :text="notification.text"
            :color="notification.color"
            v-if="isShowNotification"
            @close="isShowNotification = false"
          ></notification-bar>
        </div>
      </div>
      <div class="row w-100 layouts__title-row">
        <div class="col-9 offset-3">
          <h1 class="layouts__title">Выберите тему письма</h1>
        </div>
      </div>
      <div class="row w-100 layouts__list-row">
        <div class="layouts__list col-9 offset-1 d-flex flex-row flex-wrap">
          <template v-for="item in templates">
            <div
              class="layouts__list-item"
              :key="item.id"
              @click="createTempaltedMail(item)"
            >
              <img
                class="layouts__list-item-img"
                :class="{'is-new' : checkRecentlyAddedTemplate(item.created_at)}"
                :style="{
                  backgroundImage: item.preview_image ? `url(${item.preview_image})` : 'url(' + require(`@/assets/bg.png`) + ')',
                }"
              />
              <p class="layouts__list-item-title">{{ item.name }}</p>
            </div>
          </template>
          <div
            class="layouts__list-item archive-item"
            @click="$router.push({ name: 'Archive' })"
          >
            <div class="archive-item__bg">Архив рассылок</div>
          </div>
        </div>
      </div>
      <div class="layouts__footer row w-100 layouts__footer-row">
        <div class="col-3 offset-3">
          <button
            class="layouts__create-btn btn-custom btn-secondary-custom"
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
import NotificationBar from "@/components/NotificationBar.vue";
export default {
  name: "Layouts",
  components: {
    NotificationBar,
  },
  data() {
    return {
      isShowNotification: false,
      notification: {},
    }
  },
  computed: {
    ...mapGetters(["templates"]),
  },
  methods: {
    ...mapActions(["setHeaderVisibility", "setPostName", "getTemplates"]),
    async createTempaltedMail(data) {
      await this.setPostName(data.name);
      this.$router.push({
        name: "Constructor",
        params: {postData: {
          ...data,
          template_blocks: JSON.parse(data.template_blocks),
          isPremadeLoaded: true,
        },
        id: data.id},
      });
    },
    checkRecentlyAddedTemplate(createdAt) {
      return this.computeMinutes((Date.now() - new Date(createdAt))) < 1;
    },
    computeMinutes(mileseconds) {
      return mileseconds / 60000
    }
  },
  mounted() {
    this.setHeaderVisibility(true);
    this.getTemplates()
    
    if (this.$route.params?.notification) {
      this.isShowNotification = true;
      this.notification = this.$route.params.notification
    }
  },
  beforeDestroy() {
    this.isShowNotification = false;
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
  // padding: 5.5rem 0;
  padding-top: 1.5rem;
  padding-bottom: 5.5rem;
  position: relative;
  &__body {
    height: 100%;
    min-height: 100%;
    display: flex;
    flex-flow: row wrap;
    align-items: flex-start;
    justify-content: center;
    box-sizing: border-box;
  }
  &__list {
    // display: flex;
    // flex-flow: row wrap;
    // align-items: center;
    // width: 100%;
    height: 75%;
    &-row {
      height: 66%;
      flex-basis: 100%;
      margin-bottom: 2%;
    }
    &-item {
      flex-basis: 31.6%;
      height: 164px;
      margin-bottom: 2.5rem;
      cursor: pointer;
      &:nth-of-type(3n + 1) {
        margin-right: 1.3%;
      }
      &:nth-of-type(3n + 2) {
        margin-left: 1.3%;
        margin-right: 1.3%;
      }
      &:nth-of-type(3n + 3) {
        margin-left: 1.3%;
      }
      &-img {
        width: 100%;
        height: 120px;
        background-size: cover;
        background-repeat: no-repeat;
        margin-bottom: 1rem;
        &.is-new {
          border-bottom: 3px solid #ED1D25;
        }
      }
      &-title {
        font-weight: 500;
        font-size: 14px;
        line-height: 28px;
        letter-spacing: 0.02em;
        color: $black;
        text-align: left;
        width: 100%;
        margin: 0;
        height: auto;
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
    height: 5%;
    margin-bottom: 5%;
    &-row {
      height: 14%;
      flex-basis: 100%;
    }
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
  &__footer-row {
    height: 14.4%;
    flex-basis: 100%;
  }
  &__notification-row {
    width: 100%;
    height: 40px;
    margin-bottom: 1rem;
  }
}
</style>
