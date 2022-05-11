<template>
  <div class="add-new">
    <div class="back-link" @click="$router.go(-1)">
      <span class="back-link-text">Назад</span>
    </div>
    <div class="add-new__content">
      <h1 class="add-new__title">Создайте название<br />для рассылки</h1>
      <input
        ref="input"
        class="add-new__input"
        contenteditable="true"
        v-model="name"
      />
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
      this.setPostName(this.name)
      this.$router.push({name: 'Constructor'})
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
  &__content {
    width: 50%;
    height: 50%;
    margin-top: 9.5rem;
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
    margin-bottom: 12rem;
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
    margin-bottom: 6rem;
    &:focus {
      border-bottom: 1px solid #eeeeee;
    }
  }
}
</style>
