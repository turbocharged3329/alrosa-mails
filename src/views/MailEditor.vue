<template>
  <div class="editor">
    <div class="editor__navbar"></div>
    <div class="editor__body">
      <div class="editor__back-link">Назад</div>
      <div class="editor__mail-constructor">
        <drop-list
          :items="elements"
          class="editor__mail-constructor-list"
          @insert="onInsert"
          @reorder="$event.apply(items)"
        >
          <template v-slot:item="{ item }">
            <drag class="item" :key="item.id">{{ item.id }}</drag>
          </template>
          <template v-slot:feedback="{ data }">
            <div class="item feedback" :key="data.id">{{ data.title }}</div>
          </template>
        </drop-list>
      </div>
      <div class="editor__mail-blocks">
        <h3 class="editor__mail-blocks-title">Блоки</h3>
        <p class="editor__mail-blocks-desc">
          Выберите блоки и перетащите их в правую область
        </p>
        <div class="editor__mail-blocks-stack">
          <drag v-for="item in blocks" :data="item" class="item" :key="item.id">
            <template>
              <div class="editor__mail-blocks-item" :key="item.id">
                <img
                  src="@/assets/dots.svg"
                  alt=""
                  class="editor__mail-blocks-item-dots"
                />
                <span class="editor__mail-blocks-item-title">
                  {{ item.title }}
                </span>
              </div>
            </template>
          </drag>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Drag, DropList } from "vue-easy-dnd";
export default {
  name: "MailEditor",
  components: { Drag, DropList },
  props: {},
  data() {
    return {
      blocks: [
        {
          id: 1,
          title: "Шапка",
        },
        {
          id: 2,
          title: "Заголовок H1",
        },
        {
          id: 3,
          title: "Заголовок H2",
        },
        {
          id: 4,
          title: "Заголовок H3",
        },
        {
          id: 5,
          title: "Обычный текст",
        },
        {
          id: 6,
          title: "Акцентированный текст",
        },
        {
          id: 7,
          title: "Текст в 2 колонки",
        },
        {
          id: 8,
          title: "Большая фотография",
        },
        {
          id: 9,
          title: "Фотография и текст",
        },
        {
          id: 10,
          title: "Кнопка",
        },
        {
          id: 11,
          title: "Футер/дно",
        },
      ],
      elements: [],
    };
  },
  methods: {
    onInsert(event) {
      this.elements.splice(event.index, 0, event.data);
    },
  },
};
</script>

<style lang="scss" scoped>
.wrapper {
  .list {
    border: 1px solid black;
    margin: 100px auto;
    width: 200px;

    .item {
      padding: 20px;
      margin: 10px;
      background-color: rgb(220, 220, 255);
      display: flex;
      align-items: center;
      justify-content: center;

      &.drag-image {
        background-color: rgb(220, 255, 220);
        transform: translate(-50%, -50%);
      }
    }
  }
}

.editor {
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: center;
  &__navbar {
    width: 100%;
    height: 72px;
    background-color: $gray;
  }
  &__body {
    width: 80%;
    height: auto;
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
  }
  &__back-link {
    flex-basis: 5%;
  }
  &__mail {
    &-constructor {
      flex-basis: 70%;
      &-list {
        width: 100%;
        height: 100%;
        background: yellowgreen;
      }
    }
    &-blocks {
      flex-basis: 25%;
      &-title {
        font-size: 22px;
        line-height: 27px;
        letter-spacing: 0.01em;
        font-weight: 500;
        color: $black;
      }
      &-desc {
        color: $black;
        opacity: 0.5;
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 17px;
        letter-spacing: 0.01em;
      }
      &-stack {
        display: flex;
        flex-flow: column nowrap;
        justify-content: flex-start;
        align-items: flex-start;
      }
      &-item {
        background: $gray;
        padding: 6px 8px 6px 15.5px;
        border-radius: 6px;
        margin-bottom: 1rem;
        &-img {
          width: 5px;
          height: 15px;
        }
        &-title {
          font-style: normal;
          font-weight: 400;
          font-size: 16px;
          line-height: 20px;
          letter-spacing: 0.01em;
          color: $black;
          // margin-left: 12.5px;
        }
      }
    }
  }
}

.feedback {
  background: $gray;
  width: 100%;
  height: 100px;
}
</style>
