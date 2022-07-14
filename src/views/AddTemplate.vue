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
          <h1 class="add-new__title">
            <span v-if="postId">Изменение шаблона</span>
            <span v-else>Создание шаблона</span>
          </h1>
        </div>
      </div>
      <div class="row">
        <div class="col-5 offset-3">
          <input
            ref="input"
            class="add-new__input"
            contenteditable="true"
            v-model="templateName"
            placeholder="Название шаблона"
          />
        </div>
      </div>
      <div class="row">
        <div class="col-5 offset-3">
          <VueFileAgent
            class="mail-fileinput"
            ref="vueFileAgent"
            :theme="'list'"
            :multiple="false"
            :deletable="true"
            :meta="true"
            :accept="'image/*,.zip'"
            :maxSize="'200KB'"
            :maxFiles="1"
            :helpText="'Перетащите файлы сюда или нажмите для загрузки'"
            :errorText="{
              type: 'Неверный типа файла',
              size: `Файл не должен быть больше ${maxSize}`,
            }"
            @select="filesSelected($event)"
            @beforedelete="onBeforeDelete($event)"
            @delete="fileDeleted($event)"
            v-model="fileRecords"
          >
          </VueFileAgent>
        </div>
      </div>
      <div class="row">
        <div class="col-3 offset-3">
          <button
            class="add-new__btn btn-primary-custom btn-custom"
            @click="saveTemplate"
            :class="{ disabled: !templateName.length }"
            :disabled="!templateName.length"
          >
            <span v-if="postId">Сохранить</span>
            <span v-else>Создать</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { fileLoader } from "@/mixins/file-loader.js";
import axios from "axios";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "AddTemplate",
  mixins: [fileLoader],
  components: {},
  props: {
    template: {
      type: String,
      default: "",
    },
    postId: {
      type: Number,
    },
    postName: {
      type: String
    }
  }, 
  data() {
    return {
      templateName: "",
      maxSize: "200KB",
    };
  },
  computed: {
    ...mapGetters(['token'])
  },
  methods: {
    ...mapActions(["setPostName"]),
    saveTemplate() {
      axios({
        method: `${this.postId ? 'PATCH' : 'POST'}`,
        url: `${process.env.VUE_APP_API}/premade-email-templates/${this.postId ? this.postId : ''}`,
        data: {
          name: this.templateName,
          status: "draft",
          template_blocks: this.template,
        },
        headers: {
          Authorization: `Token ${this.token}`,
          "Content-Type": "application/json",
        },
      })
      .then(() => {
        const formData = new FormData();
        formData.append('preview_image', this.fileRecords[0].file)

        axios({
        method: `${this.postId ? 'PATCH' : 'POST'}`,
        url: `${process.env.VUE_APP_API}/premade-email-templates/${this.postId ? this.postId : ''}`,
        data: formData,
        headers: {
          Authorization: `Token ${this.token}`,
          "Content-Type": " multipart/form-data",
        },
        })
        .then(() => {
          this.$router.push({name: 'Layouts'})
        })
      });
    },
  },
  mounted() {
      this.$refs.input.focus();
      this.helpText.innerHTML = `<p class="loader-title">картинка-превью 280 Х 120</p><span>Перетащите файлы сюда или нажмите,<br>чтобы <a class="select-file">выбрать файл для загрузки</a><br><span class="size">до ${this.maxSize}</span></span>`;
      this.templateName = this.postName;
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
    margin-bottom: 7rem;
    letter-spacing: 0.07em;
  }
  &__input {
    @extend .mail__input;
    border: none;
    display: block;
    width: 100%;
    position: relative;
    background: transparent;
    border-bottom: 1px solid #eeeeee;
    height: 42px;
    min-height: 42px;
    margin-bottom: 2.3rem;
    letter-spacing: 0;
    &:focus {
      outline: none;
      border-bottom: 1px solid #eeeeee;
    }
  }
}
.mail-fileinput {
  margin-bottom: 7.7rem !important;
}
::v-deep .help-text {
  flex-flow: column nowrap !important;
}
::v-deep .loader-title {
  text-transform: uppercase;
  font-family: "Avenir Next", sans-serif;
  margin-bottom: 6px;
}
</style>
