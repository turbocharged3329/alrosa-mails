<template>
  <div class="editor container-fluid">
    <div class="container">
      <div class="row">
        <div
          class="col-1 d-flex flex-row justify-content-end align-items-start"
        >
          <div class="back-link" @click="backToTemplates">
            <span class="back-link-text">Назад</span>
          </div>
        </div>
        <div class="editor__body col-7">
          <div class="editor__mail-constructor">
            <drop-list
              :items="elements"
              class="editor__mail-constructor-list"
              @insert="onInsert"
              @reorder="$event.apply(elements)"
            >
              <template v-slot:item="{ item }">
                <drag class="item" :key="item.id" :handle="'.dragger'">
                  <component
                    :is="item.component"
                    @up="moveElement($event, { direction: 'up', id: item.id })"
                    @down="
                      moveElement($event, { direction: 'down', id: item.id })
                    "
                    @delete="removeElement($event, { id: item.id })"
                    @save="item.content = $event"
                    @link="item.link = $event"
                    @image="item.file = $event"
                    :text="item.content"
                    :link="item.link"
                    :image-url="item.image"
                  ></component>
                </drag>
              </template>
              <template v-slot:feedback="{ data }">
                <div class="item feedback" :key="data.id">{{ data.title }}</div>
              </template>
            </drop-list>
          </div>
        </div>
        <div class="col-3 offset-1 p-0">
          <h3 class="editor__mail-blocks-title">Блоки</h3>
          <p class="editor__mail-blocks-desc">
            Выберите блоки и перетащите их в правую область
          </p>
          <div class="editor__mail-blocks-stack">
            <drag
              v-for="item in blocks"
              :data="item"
              class="item"
              :key="item.id"
            >
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
        <modal name="modal" :width="'50%'" :height="'90%'" @opened="showMail">
          <!-- <vue-iframe :src="src" width="100" height="100"></vue-iframe> -->
          <iframe class="frame" ref="frame" width="100%" height="100%"></iframe>
        </modal>
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
import axios from "axios";
import Vue from "vue";
import { mapGetters } from "vuex";
import { SweetModal } from "sweet-modal-vue";

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
    MailFooter,
    SweetModal,
  },
  props: {
    postData: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      //массив блоков с параметрами для перетаскивания в редактор
      blocks: [
        {
          id: 1,
          title: "Шапка",
          component: "MailHeader",
          type: "header",
          content: null,
          file: "",
        },
        {
          id: 2,
          title: "Заголовок H1",
          component: "MailH1",
          type: "h1",
          content: null,
        },
        {
          id: 3,
          title: "Заголовок H2",
          component: "MailH2",
          type: "h2",
          content: null,
        },
        {
          id: 4,
          title: "Заголовок H3",
          component: "MailH3",
          type: "h3",
          content: null,
        },
        {
          id: 5,
          title: "Обычный текст",
          component: "MailText",
          type: "text",
          content: null,
        },
        {
          id: 6,
          title: "Название письма",
          component: "MailName",
          type: "title",
          content: null,
        },
        {
          id: 7,
          title: "Разделитель",
          component: "MailDivider",
          type: "divider",
          content: null,
        },
        {
          id: 8,
          title: "Картинка",
          component: "MailPicture",
          type: "image",
          content: null,
          file: "",
        },
        {
          id: 9,
          title: "Акцентированный текст",
          component: "MailTextHighlighted",
          type: "highlighted_text",
          content: null,
        },
        {
          id: 10,
          title: "Картинка широкая",
          component: "MailPictureWide",
          type: "wide_image",
          content: null,
          file: "",
        },
        {
          id: 11,
          title: "Кнопка",
          component: "MailButton",
          type: "button",
          content: null,
          link: null,
        },
        {
          id: 12,
          title: "Футер/дно",
          component: "MailFooter",
          type: "footer",
          content: null,
          file: "",
        },
      ],
      //массив блоков в редакторе
      elements: [],
      generatedHtml: "",
      src: `123`,
    };
  },
  computed: {
    ...mapGetters(["token", "postName"]),
  },
  methods: {
    showMail() {
      this.$refs.frame.contentWindow.document.open();
      this.$refs.frame.contentWindow.document.write(this.generatedHtml);
      this.$refs.frame.contentWindow.document.close();
    },
    /**
     * обработчик перетаскивания блока в редактор
     */
    onInsert(event) {
      this.elements.splice(event.index, 0, {
        ...event.data,
        id: this.generateId(),
        content: "",
      });
      this.elements.push();
    },
    /**
     * обработчик перемещения элемента в редакторе
     */
    moveElement(event, data) {
      const elementToMove = this.elements.find((elem) => elem.id == data.id);
      const indexToMove = this.elements.findIndex(
        (elem) => elem == elementToMove
      );
      const indexToReplace =
        data.direction == "up" ? indexToMove - 1 : indexToMove + 1;
      const elementToReplace = this.elements[indexToReplace];

      Vue.set(this.elements, indexToMove, elementToReplace);
      Vue.set(this.elements, indexToReplace, elementToMove);
    },
    /**
     * удаление элемента из редактора
     */
    removeElement(event, data) {
      this.elements.splice(
        this.elements.findIndex((elem) => elem.id == data.id),
        1
      );
    },
    /**
     * генерация идентификатора
     */
    generateId() {
      return Math.random().toString(36).substr(3, 10);
    },
    /**
     * сохранение изменений письма
     */
    savePost(toDrafts) {
      const headers = {
        Authorization: `Token ${this.token}`,
        "Content-Type": "application/json",
      };
      const url = `${process.env.VUE_APP_API}/email-templates/${
        this.postData.id || ""
      }`;

      if (!this.postData.id) {
        axios({
          method: "POST",
          url,
          data: {
            name: this.postName,
            status: toDrafts ? "draft" : "ready",
            template_blocks: this.makeJSON(),
          },
          headers,
        }).then((response) => {
          this.generatedHtml = response.data.generated_html;
          this.$modal.show("modal");
        });
      } else {
        axios({
          method: "PATCH",
          url,
          data: {
            name: this.postData.name,
            status: "ready",
            template_blocks: this.makeJSON(),
          },
          headers,
        }).then((response) => {
          this.generatedHtml = response.data.generated_html;
          this.$modal.show("modal");
        });
      }
    },
    /**
     * подготовка шаблона для сохранения письма
     */
    makeJSON() {
      const dataToSend = JSON.stringify(
        this.elements.map((elem) => {
          const data = {
            type: elem.type,
          };

          if (
            ["h1", "h2", "h3", "title", "text", "highlighted_text"].includes(
              elem.type
            )
          ) {
            data.text = elem.content.replace(/<\/?[a-z][a-z0-9]*>/gi, "");
          } else if (
            ["header", "footer", "image", "wide_image"].includes(elem.type)
          ) {
            data.base64_image = elem.file;
          } else if (elem.type == "button") {
            data.label = elem.content.replace(/<\/?[a-z][a-z0-9]*>/gi, "");
            data.link = elem.link;
          } else if (elem.type == "divider") {
            data.text = [];
          }

          return data;
        })
      );

      return dataToSend;
    },
    /**
     * добавление блоков в редактор при их наличии (есл загружают созданное письмо)
     */
    addTemplateBlocks() {
      if (this.postData?.template_blocks?.length) {
        this.postData.template_blocks.forEach((elem) => {
          const index = this.blocks.findIndex((item) => item.type == elem.type);
          this.elements.splice(index, 0, {
            ...this.blocks[index],
            id: this.generateId(),
            content: elem.text || elem.label || "",
            link: elem.link || "",
            image: elem.image || "",
          });
          this.elements.push();
        });
      }
    },
    /**
     * нажатие на ссылку "Назад"
     */
    backToTemplates() {
      this.$router.push({ name: "Layouts" });
    },
  },
  created() {
    this.$parent.$on("save-post", this.savePost);
  },
  mounted() {
    this.$emit("show", true);
    this.addTemplateBlocks();
  },
  beforeDestroy() {
    this.$emit("show", false);
    this.$parent.$off("save-post", this.savePost);
  },
};
</script>

<style lang="scss" scoped>
iframe {
  border: none;
}

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
  height: calc(100vh - $header-height);
  position: relative;
  padding-top: 5.5rem;
  overflow-y: auto;
  &__body {
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    overflow-y: auto;
  }
  &__mail {
    &-constructor {
      flex-basis: 100%;
      &-list {
        width: 100%;
        height: 100%;
        background: transparent;
      }
    }
    &-blocks {
      flex-basis: 25%;
      padding-left: 10%;
      width: 230px;
      position: sticky;
      top: 0px;
      &-title {
        font-size: 22px;
        line-height: 27px;
        letter-spacing: 0.01em;
        font-weight: 500;
        color: $black;
        text-align: left;
        margin-bottom: .3rem;
      }
      &-desc {
        color: $black;
        opacity: 0.5;
        font-style: normal;
        font-weight: 400;
        font-size: 14px;
        line-height: 17px;
        letter-spacing: 0.01em;
        text-align: left;
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
        box-sizing: border-box;
        height: 32px;
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        align-items: center;
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
          margin-left: 11px;
        }
      }
    }
  }
}

.feedback {
  background: $gray;
  width: 100%;
  height: 100px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
}

.frame {
  padding: 2rem;
}
</style>
