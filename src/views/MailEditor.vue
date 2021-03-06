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
          <div
            class="editor__mail-constructor"
            @mouseover="hideMainPlaceholder"
          >
            <div
              class="editor__mail-constructor-message"
              v-if="!elements.length && showMainPlaceholder"
            >
              Справа список блоков, из которых складывается письмо.
              Перетаскивайте их мышкой и наполняйте текстом или картинками.
            </div>
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
                    @save-content="saveTextContent($event, item)"
                    @link="item.link = $event"
                    @image="item.file = $event"
                    @pattern-image="item.image = $event"
                    @color="item.background_color = $event"
                    @clear-image="item.image = $event"
                    @open-modal="openImagesSelector($event, item)"
                    :h1="item.h1"
                    :title-content="item.title_content"
                    :text="item.content"
                    :html="item.content"
                    :html-left="item.html_left"
                    :html-right="item.html_right"
                    :link="item.link"
                    :image-url="item.image"
                    :bg-color="item.background_color"
                    :gap="item.gap"
                    :transition-name="item.transition_name"
                  ></component>
                </drag>
              </template>
              <template v-slot:feedback="{ data }">
                <div class="item feedback" :key="data.id">{{ data.title }}</div>
              </template>
            </drop-list>
          </div>
        </div>
        <div class="editor__mail-blocks-col col-3 offset-1 p-0">
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
          <template>
            <!-- <vue-iframe :src="src" width="100" height="100"></vue-iframe> -->
            <iframe
              class="frame"
              ref="frame"
              width="100%"
              height="100%"
            ></iframe>
            <button class="modal__close-btn" @click="$modal.hide('modal')">
              <img
                src="@/assets/close-modal.svg"
                alt=""
                class="modal__close-img"
              />
            </button>
            <button class="modal__close-download" @click="downloadHtml">
              скачать макет
            </button>
          </template>
        </modal>
        <modal name="images" :width="'50%'" :height="'90%'">
          <image-selector
            @apply-selection="applyImageSelection"
            :isFooter="isFooterImageSelection"
          ></image-selector>
          <button class="modal__close-btn" @click="$modal.hide('images')">
            <img
              src="@/assets/close-modal.svg"
              alt=""
              class="modal__close-img"
            />
          </button>
        </modal>
      </div>
    </div>
  </div>
</template>

<script>
import { Drag, DropList } from "vue-easy-dnd";
import MailHeader from "@/components/MailHeader.vue";
import MailHeaderPattern from "@/components/MailHeaderPattern.vue";
import MailHeaderIt from "@/components/MailHeaderIt.vue";
import MailH1 from "@/components/MailH1.vue";
import MailH2 from "@/components/MailH2.vue";
import MailH3 from "@/components/MailH3.vue";
import MailText from "@/components/MailText.vue";
import MailSmallText from "@/components/MailSmallText.vue";
import MailTextHighlighted from "@/components/MailTextHighlighted.vue";
import MailName from "@/components/MailName.vue";
import MailHeaderDigest from "@/components/MailHeaderDigest.vue";
import MailDivider from "@/components/MailDivider.vue";
import MailPicture from "@/components/MailPicture.vue";
import MailPictureWide from "@/components/MailPictureWide.vue";
import MailSignature from "@/components/MailSignature.vue";
import MailButton from "@/components/MailButton.vue";
import MailDigestNumbers from "@/components/MailDigestNumbers.vue";
import MailFooter from "@/components/MailFooter.vue";
import MailQuote from "@/components/MailQuote.vue";
import ImageSelector from "@/components/ImageSelector.vue";
import MailSpacer from "@/components/MailSpacer.vue";
import MailTransition from "@/components/MailTransition.vue";
import axios from "axios";
import Vue from "vue";
import { mapGetters, mapActions } from "vuex";
import { SweetModal } from "sweet-modal-vue";

export default {
  name: "MailEditor",
  components: {
    Drag,
    DropList,
    MailHeader,
    MailHeaderPattern,
    MailHeaderIt,
    MailH1,
    MailH2,
    MailH3,
    MailText,
    MailSmallText,
    MailName,
    MailHeaderDigest,
    MailDivider,
    MailPicture,
    MailTextHighlighted,
    MailPictureWide,
    MailSignature,
    MailButton,
    MailDigestNumbers,
    MailFooter,
    MailQuote,
    SweetModal,
    ImageSelector,
    MailSpacer,
    MailTransition
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
          id: 21,
          title: "Шапка(паттерн)",
          component: "MailHeaderPattern",
          type: "header_with_pattern",
          image: null,
        },
        {
          id: 1,
          title: "Шапка(картинка)",
          component: "MailHeader",
          type: "header_with_image",
          content: null,
          file: "",
        },
        {
          id: 22,
          title: "Шапка IT",
          component: "MailHeaderIt",
          type: "header_from_it_department",
          image: null,
        },
        {
          id: 23,
          title: "Шапка(дайджест)",
          component: "MailHeaderDigest",
          type: "header_for_the_digest",
          h1: null,
          title_content: null,
        },
        {
          id: 2,
          title: "Заголовок 1",
          component: "MailH1",
          type: "h1",
          content: null,
        },
        {
          id: 3,
          title: "Заголовок 2",
          component: "MailH2",
          type: "h2",
          content: null,
        },
        {
          id: 4,
          title: "Заголовок 3",
          component: "MailH3",
          type: "h3",
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
          id: 5,
          title: "Обычный текст",
          component: "MailText",
          type: "text",
          content: null,
        },
        {
          id: 9,
          title: "Акцентированный текст",
          component: "MailTextHighlighted",
          type: "highlighted_text",
          content: null,
        },
        {
          id: 13,
          title: "Цитата",
          component: "MailQuote",
          type: "quote",
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
          id: 10,
          title: "Картинка на всю ширину",
          component: "MailPictureWide",
          type: "wide_image",
          content: null,
          file: "",
        },
        {
          id: 12,
          title: "Футер",
          component: "MailFooter",
          type: "footer",
          content: null,
          file: "",
        },
        {
          id: 7,
          title: "Разделитель",
          component: "MailDivider",
          type: "divider",
          content: null,
        },
        {
          id: 24,
          title: "Мелкий текст",
          component: "MailSmallText",
          type: "small_text",
          content: null,
        },
        {
          id: 25,
          title: "Подпись директора",
          component: "MailSignature",
          type: "signature",
          image: null,
        },
        {
          id: 27,
          title: "Дайджест цифры",
          component: "MailDigestNumbers",
          type: "digest_numbers",
          html_left: null,
          html_right: null,
        },
        {
          id: 34,
          title: "Переход белый-голубой",
          component: "MailTransition",
          type: "transition_white_to_blue",
        },
        {
          id: 35,
          title: "Переход белый-голубой-2",
          component: "MailTransition",
          type: "transition_white_to_blue_2",
        },
        {
          id: 36,
          title: "Переход голубой-белый",
          component: "MailTransition",
          type: "transition_blue_to_white",
        },
        // {
        //   id: 11,
        //   title: "Кнопка",
        //   component: "MailButton",
        //   type: "button",
        //   content: null,
        //   link: null,
        // },
        {
          id: 28,
          title: "Отступ х1",
          component: "MailSpacer",
          type: "spacer_x1",
        },
        {
          id: 29,
          title: "Отступ х2",
          component: "MailSpacer",
          type: "spacer_x2",
        },
        {
          id: 30,
          title: "Отступ х3",
          component: "MailSpacer",
          type: "spacer_x3",
        },
        {
          id: 31,
          title: "Отступ х4",
          component: "MailSpacer",
          type: "spacer_x4",
        },
        {
          id: 32,
          title: "Отступ х5",
          component: "MailSpacer",
          type: "spacer_x5",
        },
      ],
      //массив блоков в редакторе
      elements: [],
      generatedHtml: "",
      src: `123`,
      imageBlockInSelectMode: null,
      isFooterImageSelection: false,
      showMainPlaceholder: true,
    };
  },
  computed: {
    ...mapGetters(["token", "postName", "currentPost", "currentTemplate", "pattern_image"]),
  },

  methods: {
    ...mapActions([
      "setCurrentPost",
      "setCurrentTemplate",
      "setDisabledCopyStatus",
      "setPremadeTemplateLoadedStatus",
      "getPatternImage"
    ]),
    showMail() {
      this.$refs.frame.contentWindow.document.open();
      this.$refs.frame.contentWindow.document.write(this.generatedHtml);
      this.$refs.frame.contentWindow.document.close();
    },
    /**
     * обработчик перетаскивания и добавления блока в редактор
     */
    onInsert(event) {
      this.elements.splice(event.index, 0, {
        ...event.data,
        id: this.generateId(),
        content: "",
        image: "",
        background_color: "#fff",
        h1: "",
        title_content: "",
        gap: event.data.type.includes('spacer') ? event.data.type[event.data.type.length - 1] : "",
        transition_name: event.data.type.includes('transition') ? event.data.type : "",
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

      //условие для предотвращения ошибок при перемещении вверх-вниз при остуствующих элементах рядом
      if (data.direction == "up") {
        if (indexToReplace >= 0) {
          Vue.set(this.elements, indexToMove, elementToReplace);
          Vue.set(this.elements, indexToReplace, elementToMove);
        }
      } else if (data.direction == "down") {
        if (indexToReplace < this.elements.length) {
          Vue.set(this.elements, indexToMove, elementToReplace);
          Vue.set(this.elements, indexToReplace, elementToMove);
        }
      }
    },
    /**
     * удаление элемента из редактора
     */
    removeElement(event, data) {
      this.elements.splice(
        this.elements.findIndex((elem) => elem.id == data.id),
        1
      );

      this.showMainPlaceholder = this.elements.length ? false : true;
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
    savePost({
      toDrafts = true,
      showModal = true,
      downloadAfter = false,
    } = {}) {
      const headers = {
        Authorization: `Token ${this.token}`,
        "Content-Type": "application/json",
      };
      const url = `${process.env.VUE_APP_API}/email-templates/${
        this.postData.id && !this.postData.isPremadeLoaded ? this.postData.id : ""
      }`;
      //если создали новое письмо или если нажали на созранение из шаблона
      if (!this.postData.id || this.postData.isPremadeLoaded) {
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
          if (response.status == 400) {
            this.alertValidationError();
          } else {
            this.setPremadeTemplateLoadedStatus(false)
            this.generatedHtml = response.data.generated_html;

            if (downloadAfter) {
              this.downloadHtml();
            }

            this.$router.push({
            name: "Constructor",
            params: {
              postData: {
                ...response.data,
                template_blocks: JSON.parse(response.data.template_blocks),
              },
              id: response.data.id
            },
            });

            if (showModal) {
              this.$modal.show("modal");
            }
          }
        });
        //если редактировали готовое
      } else {
        axios({
          method: "PATCH",
          url,
          data: {
            name: this.postData.name,
            status: toDrafts ? "draft" : "ready",
            template_blocks: this.makeJSON(),
          },
          headers,
        }).then((response) => {
          if (response.status == 400) {
            this.alertValidationError();
          } else {
            this.setPremadeTemplateLoadedStatus(false)
            this.generatedHtml = response.data.generated_html;

            if (downloadAfter) {
              this.downloadHtml();
            }

            if (showModal) {
              this.$modal.show("modal");
            }
          }
        });
      }
    },
    saveCopyAndOpen() {
      const headers = {
        Authorization: `Token ${this.token}`,
        "Content-Type": "application/json",
      };
      const url = `${process.env.VUE_APP_API}/email-templates/`;
      //если создали новое письмо
      axios({
        method: "POST",
        url,
        data: {
          name: this.postData.name,
          status: "draft",
          template_blocks: this.makeJSON(),
        },
        headers,
      }).then((response) => {
        if (response.status == 400) {
          this.alertValidationError();
        } else {
          this.$router.push({
            name: "Constructor",
            params: {
              postData: {
                ...response.data,
                template_blocks: JSON.parse(response.data.template_blocks),
              },
              id: response.data.id
            },
          });
          
        }
      });
    },
    alertValidationError() {
      alert("Не все поля заполнены!");
    },
    prepareEmailToTemplateSave() {
      this.setCurrentTemplate({
        template: this.makeJSON(),
        postId: this.postData.id,
        postName: this.postData.name,
        isPremadeLoaded: this.postData.isPremadeLoaded,
      });
      this.$router.push({
        name: "AddTemplate",
        params: {
          ...this.currentTemplate,
        },
      });
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

          if (["h1", "h2", "h3", "title", "header_for_the_digest"].includes(elem.type)) {
            if (elem.type == "header_for_the_digest") {
                data.h1 = elem.h1.replace(/<\/?[a-z][a-z0-9]*>/gi, "");
                data.title = elem.title_content.replace(/<\/?[a-z][a-z0-9]*>/gi, "");
            }
            if (elem.content) {
                data.text = elem.content.replace(/<\/?[a-z][a-z0-9]*>/gi, "");
            }
            // else return data;
          } else if (
            ["text", "small_text", "highlighted_text", "quote"].includes(elem.type)
          ) {
            if (elem.content) {
              data.html = elem.content;
            }
            // else return data;
          } else if (
            ["header_with_image", "footer", "image", "wide_image", "header_with_pattern", 'header_from_it_department', "signature"].includes(elem.type)
          ) {
            if (elem.type == "footer") {
              if (elem.content) {
                data.html = elem.content;
              }
            }
            if (elem.file) {
              data.base64_image = elem.file;
            } else {
              if (elem.image) {
                data.image = elem.image;
              }
              // else return data;
            }
          } else if (elem.type == "button") {
            if (elem.content && elem.link) {
              data.label = elem.content.replace(/<\/?[a-z][a-z0-9]*>/gi, "");
              data.link = elem.link;
            }
            // else return data;
          } else if (elem.type == "divider") {
            data.text = [];
          } else if (elem.type == "digest_numbers") {
            data.html_left = elem.html_left;
            data.html_right = elem.html_right;
          }

          if (elem.type) {
            data.background_color = elem.background_color || "#fff";
          }

          return data;
        })
      );

      return dataToSend;
    },
    /**
     * добавление блоков в редактор при их наличии (если загружают созданное письмо)
     */
    addTemplateBlocks() {
      let data = [];

      //получаем список блоков из props или из кэша vuex
      if (this.postData?.template_blocks?.length) {
        data = this.postData.template_blocks;
      } else if (this.currentPost) {
        data = this.currentPost;
      }

      if (data.length) {
        data.forEach((elem) => {
          const index = this.blocks.findIndex((item) => item.type == elem.type);
          this.elements.push({
            ...this.blocks[index],
            id: this.generateId(),
            content: elem.text || elem.label || elem.html || "",
            link: elem.link || "",
            image: elem.image || "",
            background_color: elem.background_color || "",
            h1: elem.h1 || "",
            title_content: elem.title || "",
            html_left: elem.html_left || "",
            html_right: elem.html_right || "",
            gap: elem.type.includes('spacer') ? elem.type[elem.type.length - 1] : "",
            transition_name: elem.type
          });
        });
      }
    },
    /**
     * нажатие на ссылку "Назад"
     */
    backToTemplates() {
      this.setCurrentPost({});
      this.$router.push({ name: "Layouts" });
      // this.$router.push({ name: "Layouts", params: {notification: {text: 'Новый шаблон добавлен!', show: true}}});
    },
    /**
     * открытие модального окна с выбором предзагруженных изображений
     */
    openImagesSelector(event, data) {
      this.isFooterImageSelection = event;
      this.imageBlockInSelectMode = data;
      this.$modal.show("images");
    },
    /**
     * сохранение выбранного изображения из модального окна
     */
    applyImageSelection(event) {
      this.imageBlockInSelectMode.image = event;
      this.imageBlockInSelectMode.file = "";
      this.$modal.hide("images");
    },
    /**
     * копирование полученной разметки письма в буфер обмена
     */
    // async copyEmailTemplate() {
    // await await navigator.clipboard.writeText(this.generatedHtml);
    // alert("Разметка письма скопирована в буфер обмена");
    // },

    /**
     * загрузка сформированного html письма
     */
    downloadHtml() {
      var element = document.createElement("a");
      element.setAttribute(
        "href",
        "data:text/html;charset=utf-8," + encodeURIComponent(this.generatedHtml)
      );
      element.setAttribute(
        "download",
        `${this.postData.name ? this.postData.name : this.postName}.html`
      );

      element.style.display = "none";
      document.body.appendChild(element);

      element.click();

      document.body.removeChild(element);
    },
    hideMainPlaceholder(event) {
      //проверка на нажатие клавиши мыши (проверка на перетаскивание)
      if (event.buttons !== 0) {
        this.showMainPlaceholder = false;
      }
    },
    saveTextContent(content, item) {
      item.content = content.content;
      item.h1 = content.h1;
      item.title_content = content.title_content;
      item.html_left = content.html_left;
      item.html_right = content.html_right;
    },
  },
  async created() {
    this.$parent.$on("save-post", this.savePost);
    this.$parent.$on("save-templates", this.prepareEmailToTemplateSave);
    this.$parent.$on("save-copy", this.saveCopyAndOpen);
    await this.getPatternImage('pattern')
    await this.getPatternImage('it')
    await this.getPatternImage('signature')
    await this.getPatternImage('footer')
  },
  mounted() {
    this.$emit("show", true);
    this.setDisabledCopyStatus(!this.postData?.id ? true : false);
    this.setPremadeTemplateLoadedStatus(this.postData.isPremadeLoaded ? true : false);
    this.addTemplateBlocks();

    if (this.postData.template_blocks) {
      this.setCurrentPost(this.postData.template_blocks);
    }
    //  const headers = {
    //     Authorization: `Token ${this.token}`,
    //     "Content-Type": "application/json",
    //   };
    //   const url = `${process.env.VUE_APP_API}/header-with-pattern-images/`;
    //     axios({
    //       method: "GET",
    //       url,
    //       headers,
    //     }).then((response) => {
    //       console.log(response.data);
    //     });
  },
  beforeDestroy() {
    this.$emit("show", false);
    this.$parent.$off("save-post", this.savePost);
    this.$parent.$off("save-templates", this.prepareEmailToTemplateSave);
    this.$parent.$off("save-copy", this.saveCopyAndOpen);
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
    padding-bottom: 100px;

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
    // overflow-y: auto;
  }
  &__mail {
    &-constructor {
      flex-basis: 100%;
      padding-bottom: 100px;
      &-list {
        width: 100%;
        height: 100%;
        background: transparent;
      }
      &-message {
        width: 100%;
        height: 110px;
        display: flex;
        flex-flow: row nowrap;
        justify-content: center;
        align-items: center;
        padding: 25px 27.5px;
        background-color: #f5f5f5;
        font-style: normal;
        font-weight: 450;
        font-size: 14px;
        text-align: left;
        line-height: 140%;
        letter-spacing: 0.15em;
        text-transform: uppercase;
        word-break: break-word;
        color: #818c99;
        font-family: "Avenir Next Medium", sans-serif;
      }
    }
    &-blocks {
      flex-basis: 25%;
      padding-left: 10%;
      width: 230px;
      position: sticky;
      top: 0px;
      &-col {
        height: fit-content;
        position: sticky;
        top: 0px;
      }
      &-title {
        font-size: 22px;
        line-height: 27px;
        letter-spacing: 0.01em;
        font-weight: 500;
        color: $black;
        text-align: left;
        margin-bottom: 0.3rem;
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
        max-height: 520px;
        overflow-y: auto;
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
::v-deep .vm--modal {
  overflow: visible;
}
.modal__close {
  &-btn {
    position: absolute;
    top: 0px;
    right: -37px;
    border-radius: 50%;
    width: 27px;
    height: 27px;
    background: white;
    border: none;
    display: flex;
    flex-flow: row nowrap;
    justify-content: center;
    align-items: center;
    padding: 0;
  }
  &-download {
    @extend .btn-custom;
    width: 275px;
    height: 41px;
    border: none;
    background: $blue;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 21px;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    font-family: Avenir Next Regular, sans-serif !important;
    position: absolute;
    bottom: 0%;
    left: 124%;
    transform: translate(-50%);

    color: #ffffff;
    &:hover {
      background: $light-blue;
    }
  }
}
</style>
