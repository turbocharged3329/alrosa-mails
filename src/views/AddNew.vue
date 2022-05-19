<template>
  <div class="add-new container-fluid">
    <div class="container h-100">
      <div class="row">
        <div
          class="col-1 d-flex flex-row justify-content-end align-items-start"
        >
          <div class="back-link" @click="$router.go(-1)">
            <span class="back-link-text">Назад</span>
          </div>
        </div>
        <div class="col-9 offset-2">
          <h1 class="add-new__title">Создайте название<br />для рассылки</h1>
        </div>
      </div>
      <div class="row">
        <div class="col-5 offset-3">
          <input
            ref="input"
            class="add-new__input"
            contenteditable="true"
            v-model="name"
          />
        </div>
      </div>
      <div class="row">
        <div class="col-3 offset-3">
          <button
            class="add-new__btn btn-primary btn-custom"
            @click="savePost"
            :class="{ disabled: !name.length }"
            :disabled="!name.length"
          >
            Создать
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "AddNew",
  components: {},
  props: {},
  data() {
    return {
      name: "",
    };
  },
  methods: {
    ...mapActions(["setPostName"]),
    enterName(event) {
      this.name = event.target.innerHTML;
    },
    savePost() {
      this.setPostName(this.name);
      this.$router.push({ name: "Constructor" });
    },
    mounted() {
      this.$refs.input.focus();
    },
  },
};
</script>

<style lang="scss" scoped>
.add-new {
  width: 100%;
  height: 100%;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: flex-start;
  padding: 5.5rem 0;
  height: calc(100vh - 72px);
  &__content {
    width: 100%;
    height: 100%;
    display: flex;
    flex-flow: column nowrap;
    justify-content: flex-start;
    align-items: flex-start;
  }
  &__title {
    text-align: left;
    text-transform: uppercase;
    font-style: normal;
    font-weight: 500;
    font-size: 28px;
    line-height: 42px;
    color: $black;
    margin: 0;
    margin-bottom: 8rem;
  }
  &__input {
    @extend .mail__input;
    border: none;
    display: block;
    width: 100%;
    position: relative;
    background: transparent;
    border-bottom: 1px solid #eeeeee;
    height: 32px;
    margin-bottom: 5.3rem;
    &:focus {
      outline: none;
      border-bottom: 1px solid #eeeeee;
    }
  }
  &__btn {
  }
}
</style>
