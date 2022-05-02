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
          @reorder="$event.apply(elements)"
        >
          <template v-slot:item="{ item }">
            <drag class="item" :key="item.id">
              <component
                :is="item.component"
                @enter="saveData($event, item.id)"
                @up="moveElement($event, {direction: 'up', id:item.id})"
                @down="moveElement($event, {direction: 'down', id:item.id})"
              ></component>
            </drag>
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
import MailHeader from "@/components/MailHeader.vue";
import MailH1 from "@/components/MailH1.vue";
import MailH2 from "@/components/MailH2.vue";
import MailH3 from "@/components/MailH3.vue";
import MailText from "@/components/MailText.vue";
import MailTextHighlighted from "@/components/MailTextHighlighted.vue";
import MailName from "@/components/MailName.vue";
import MailDivider from "@/components/MailDivider.vue";
import MailPicture from "@/components/MailPicture.vue";
import MailPictureWide from "@/components/MailPictureWide.vue";
import MailButton from "@/components/MailButton.vue";
import MailFooter from "@/components/MailFooter.vue";
import Vue from 'vue'

export default {
  name: "MailEditor",
  components: {
    Drag,
    DropList,
    MailHeader,
    MailH1,
    MailH2,
    MailH3,
    MailText,
    MailName,
    MailDivider,
    MailPicture,
    MailTextHighlighted,
    MailPictureWide,
    MailButton,
    MailFooter
  },
  props: {},
  data() {
    return {
      blocks: [
        {
          id: 1,
          title: "Шапка",
          component: "MailHeader",
          data: {},
        },
        {
          id: 2,
          title: "Заголовок H1",
          component: "MailH1",
          data: {},
        },
        {
          id: 3,
          title: "Заголовок H2",
          component: "MailH2",
          data: {},
        },
        {
          id: 4,
          title: "Заголовок H3",
          component: "MailH3",
          data: {},
        },
        {
          id: 5,
          title: "Обычный текст",
          component: "MailText",
          data: {},
        },
        {
          id: 6,
          title: "Название письма",
          component: "MailName",
          data: {},
        },
        {
          id: 7,
          title: "Разделитель",
          component: "MailDivider",
          data: {},
        },
        {
          id: 8,
          title: "Картинка",
          component: "MailPicture",
          data: {},
        },
        {
          id: 9,
          title: "Акцентированный текст",
          component: "MailTextHighlighted",
          data: {},
        },
        {
          id: 10,
          title: "Картинка широкая",
          component: "MailPictureWide",
          data: {},
        },
        {
          id: 11,
          title: "Кнопка",
          component: "MailButton",
          data: {},
        },
        {
          id: 12,
          title: "Футер/дно",
          component: "MailFooter",
          data: {},
        },
      ],
      elements: [],
    };
  },
  methods: {
    onInsert(event) {
      this.elements.splice(event.index, 0, event.data);
    },
    saveData(event, id) {
      const targetElem = this.elements.find((elem) => elem.id == id);
      targetElem.data = event;
    },
    moveElement(event, data) {
      const elementToMove = this.elements.find(elem => elem.id == data.id);
      const indexToMove = this.elements.findIndex(elem => elem == elementToMove)
      const indexToReplace = data.direction == 'up' ? indexToMove - 1 : indexToMove + 1;
      const elementToReplace = this.elements[indexToReplace];
      
      Vue.set(this.elements, indexToMove, elementToReplace)
      Vue.set(this.elements, indexToReplace, elementToMove)
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
