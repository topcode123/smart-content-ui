<template>
    <div>
        <Breadcrumbs
            main="Smart Content"
            title="Template"
        />
        <!-- Container-fluid starts-->
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-3">
                    <div class="card">
                        <div class="card-body">
                            <div
                                class="form-group"
                                v-for="(field, index) in listField"
                                :key="index"
                            >
                                <label>{{ field }}:</label>
                                <b-form-input
                                    type="text"
                                    class="field-value"
                                ></b-form-input>
                            </div>
                            <div class="form-group">
                                <label>Phong cách:</label>
                                <b-form-select
                                    v-model="selectedStyle"
                                    :options="listStyle"
                                >
                                </b-form-select>
                            </div>
                            <div class="form-group">
                                <label>Ngôn ngữ:</label>
                                <b-form-select
                                    v-model="selectedLanguage"
                                    :options="listLanguage"
                                >
                                </b-form-select>
                            </div>
                        </div>
                        <div class="card-footer">
                            <b-button
                                variant="primary"
                                class="mr-1"
                                @click="handleGenerateContent"
                            >
                                Tạo nội dung
                            </b-button>
                        </div>
                    </div>
                </div>
                <div class="col-md-9">
                    <div class="card">
                        <div class="card-body">
                            <p class="card-title">{{ displayName }}</p>
                            <ckeditor
                                :editor="editor"
                                v-model="postContent"
                            >
                            </ckeditor>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Container-fluid Ends-->
    </div>
</template>
<script>
import 'vue2-dropzone/dist/vue2Dropzone.min.css';
import CKEditor from '@ckeditor/ckeditor5-vue';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { baseURL } from '../../constants/config';

export default {
    name: 'UseTemplate',
    components: {
        ckeditor: CKEditor.component,
    },

    data() {
        return {
            editor: ClassicEditor,
            postContent: '',
            listStyle: [],
            listLanguage: [],
            selectedStyle: {},
            selectedLanguage: {},
            templateId: '',
            displayName: '',
            prompt: '',
            description: '',
            temperature: 0.7,
            maxTokens: 1024,
            topP: 1,
            frequencyPenalty: 0,
            presencePenalty: 0,
            filename: '',
            putFilePresignedURL: '',
            templateImage: null,
            listField: [],
            articleId: '',
        };
    },
    mounted() {
        const listStyle = [
            'Short and to the point',
            'Conversational',
            'Descriptive',
            'Narrative',
            'Evocative',
            'Creative',
            'Humorous',
            'Poetic',
            'Informative',
            'Imaginative',
            'Persuasive',
            'Analytical',
            'Technical',
            'Professional',
            'Academic',
        ];
        const listSelectStyle = listStyle.map((style, index) => {
            return {
                value: index,
                text: style,
            };
        });

        this.listStyle = [...listSelectStyle];

        const listLanguage = [
            'English',
            'Spanish',
            'French',
            'German',
            'Italian',
            'Portuguese',
            'Chinese',
            'Japanese',
            'Korean',
            'Hindi',
            'Arabic',
            'Russian',
            'Polish',
            'Dutch',
            'Swedish',
            'Ukrainian',
            'Czech',
            'Hungarian',
            'Romanian',
            'Turkish',
            'Vietnam',
        ];

        this.listLanguage = listLanguage.map((language, index) => {
            return {
                value: index,
                text: language,
            };
        });
        this.templateId = this.$route.params?.id;
        this.getTemplateDetail();
    },
    methods: {
        handleUpdateTemplate(event) {
            event.preventDefault();

            this.$toasted.show(' New order has been placed ', {
                theme: 'outline',
                position: 'top-right',
                type: 'success',
                duration: 2000,
            });
        },
        async getTemplateDetail() {
            const requestOptions = {
                method: 'GET',
                headers: {
                    Authorization: this.$store.state.authentication.user.accessToken,
                    'Content-Type': 'application/json',
                },
            };
            const detailTemplateRequest = await fetch(
                `${baseURL}/smart-content/article-template/${this.templateId}`,
                requestOptions
            );
            const detailTemplateResponse = await detailTemplateRequest.json();
            console.log(detailTemplateResponse);
            this.articleId = detailTemplateResponse.id;
            this.displayName = detailTemplateResponse.displayName;
            this.prompt = detailTemplateResponse.prompt;
            this.description = detailTemplateResponse.description;
            this.temperature = detailTemplateResponse.temperature;
            this.topP = detailTemplateResponse.topP;
            this.frequencyPenalty = detailTemplateResponse.frequencyPenalty;
            this.maxTokens = detailTemplateResponse.maxTokens;
            this.presencePenalty = detailTemplateResponse.presencePenalty;
            this.listField = [...detailTemplateResponse.listField];
        },
        async handleGenerateContent(event) {
            event.preventDefault();
            
            const listFieldValueElement = document.querySelectorAll('.field-value');
            let listFieldValue = [];
            let isAnyEmptyField = false;
            for (const element of listFieldValueElement) {
                if (element.value.trim() === '') {
                    isAnyEmptyField = true;
                }
                listFieldValue.push(element.value);
            }

            if (isAnyEmptyField) {
                this.$toasted.show('Vui lòng nhập đầy đủ dữ liệu', {
                    theme: 'outline',
                    position: 'top-right',
                    type: 'error',
                    duration: 2000,
                });
                return;
            }
            const style = this.listStyle[this.selectedStyle]?.text || "";
            const createContentRequest = {
                articleId: this.articleId,
                listField: listFieldValue,
                templateId: this.templateId,
                style: style,
            };

            const requestOptions = {
                method: 'POST',
                headers: {
                    Authorization: this.$store.state.authentication.user.accessToken,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(createContentRequest),
            };
            this.$swal.showLoading();
            const generateContentRequest = await fetch(`${baseURL}/smart-content/generate-article`, requestOptions);

            const generateContentResponse = await generateContentRequest.json();

            console.log(generateContentResponse);
            this.postContent = generateContentResponse['content'];
            this.$swal("Thành công");
        },
    },
};
</script>
