<template>
    <div>
        <Breadcrumbs
            main="Smart Content"
            title="Template"
        />
        <!-- Container-fluid starts-->
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-4">
                    <div class="card">
                        <div class="card-body">
                            <div
                                class="form-group"
                                v-for="(field, index) in listField"
                                :key="index"
                            >
                                <label>{{ field }}:</label>
                                <b-form-textarea
                                    rows="3"
                                    class="field-value"
                                    :data-fieldname="field"
                                >
                                </b-form-textarea>
                            </div>
                            <div
                                class="form-group"
                                v-show="false"
                            >
                                <label>Phong cách:</label>
                                <b-form-select
                                    v-model="selectedStyle"
                                    :options="listStyle"
                                >
                                </b-form-select>
                            </div>
                            <div
                                class="form-group"
                                v-show="false"
                            >
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
                <div class="col-md-8">
                    <div class="card">
                        <div class="card-body">
                            <p class="card-title">{{ displayName }}</p>
                            <ckeditor
                                :editor="editor"
                                :value="postContent"
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
import { Configuration, OpenAIApi } from 'openai';
import { fetchEventSource } from '@microsoft/fetch-event-source';

const ListLanguageName = ['NGÔN NGỮ', 'NGONNGU', 'LANGUAGE'];
const ListStyle = ['VĂN PHONG', 'PHONG CÁCH', 'PHONGCACH', 'STYLE'];

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
            openaiToken: '',
            countSentence: 0,
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
        isExistLangageSelect() {
            return this.listField.some((field) => ListLanguageName.includes(field.toUpperCase()));
        },
        isExistStyleSelect() {
            return this.listField.some((field) => ListLanguageName.includes(field.toUpperCase()));
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
            this.openaiToken = detailTemplateResponse.openaiToken;
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
                this.prompt = this.prompt.replaceAll(`[${element.dataset.fieldname}]`, element.value);
                listFieldValue.push({
                    key: element.dataset.fieldname,
                    value: element.value,
                });
            }
            console.log(listFieldValue);
            if (isAnyEmptyField) {
                this.$toasted.show('Vui lòng nhập đầy đủ dữ liệu', {
                    theme: 'outline',
                    position: 'top-right',
                    type: 'error',
                    duration: 2000,
                });
                return;
            }
            console.log(this.prompt);
            this.openAIFetchAPI();
            // const style = this.listStyle[this.selectedStyle]?.text || '';
            // const createContentRequest = {
            //     articleId: this.articleId,
            //     listField: listFieldValue,
            //     templateId: this.templateId,
            //     style: style,
            // };

            // const requestOptions = {
            //     method: 'POST',
            //     headers: {
            //         Authorization: this.$store.state.authentication.user.accessToken,
            //         'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify(createContentRequest),
            // };
            // this.$swal.showLoading();
            // const generateContentRequest = await fetch(`${baseURL}/smart-content/generate-article`, requestOptions);

            // const generateContentResponse = await generateContentRequest.json();

            // console.log(generateContentResponse);
            // this.postContent = generateContentResponse['content'];
            // this.$swal('Thành công');
        },
        async openAIFetchAPI() {
            // const configuration = new Configuration({
            //     apiKey: apiKey,
            // });

            // const openai = new OpenAIApi(configuration);

            // const completion = await openai.createCompletion(
            //     {
            //         model: 'text-davinci-003',
            //         prompt: prompt,
            //         max_tokens: 1000,
            //         stream: true,
            //     },
            //     { responseType: 'stream' }
            // );
            // console.log(completion)
            // completion.on('data', console.log);
            const respone = await fetch('https://api.openai.com/v1/engines/text-davinci-003/completions', {
                method: 'POST',
                headers: {
                    accept: 'text/event-stream',
                    authorization: `Bearer ${this.openaiToken}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    prompt: this.prompt,
                    max_tokens: this.maxTokens,
                    temperature: 0.5,
                    top_p: 1,
                    frequency_penalty: 0,
                    presence_penalty: 0,
                    best_of: 1,
                    echo: true,
                    logprobs: 0,
                    stream: true,
                }),
            });

            const rersult = respone.body.pipeThrough(new TextDecoderStream()).pipeThrough(this.splitStream('\n'));
            this.writeToDOM(rersult.getReader());
        },
        splitStream(splitOn) {
            let buffer = '';
            return new TransformStream({
                transform(chunk, controller) {
                    buffer += chunk;
                    const parts = buffer.split(splitOn);
                    parts.slice(0, -1).forEach((part) => controller.enqueue(part));
                    buffer = parts[parts.length - 1];
                },
                flush(controller) {
                    if (buffer) {
                        controller.enqueue(buffer);
                    }
                },
            });
        },
        writeToDOM(reader) {
            reader.read().then(
                ({ value, done }) => {
                    if (done) {
                        console.log('The stream was already closed!');
                    } else {
                        if (value) {
                            if (this.countSentence === 0) {
                                this.countSentence += 1;
                            } else {
                                const chunkData = JSON.parse(
                                    value.replace('data:', '').replace('data: [DONE]', '').trim()
                                );
                                if (chunkData.choices[0].text === '\n') {
                                    this.postContent = this.postContent + '<br/>';
                                } else {
                                    this.postContent = this.postContent + chunkData.choices[0].text;
                                }
                            }
                        }

                        // Recursively call
                        this.writeToDOM(reader);
                    }
                },
                (e) => console.error('The stream became errored and cannot be read from!', e)
            );
        },
    },
};
</script>
