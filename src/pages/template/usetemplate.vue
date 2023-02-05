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
                                type="submit"
                                variant="primary"
                                class="mr-1"
                            >
                                Tạo nội dung
                            </b-button>
                        </div>
                    </div>
                </div>
                <div class="col-md-9">
                    <div class="card">
                        <div class="card-body">
                            <p class="card-title">Tiêu đề hiển thị</p>
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

export default {
    name: 'UseTemplate',
    components: {
        ckeditor: CKEditor.component,
    },

    data() {
        return {
            editor: ClassicEditor,
            displayName: 'viết bài miêu tả',
            prompt: 'viết bài miêu tả [phong cảnh] tại [dia diem] [review]',
            description: 'viết bài miêu tả',
            temperature: 0.7,
            maxTokens: 1024,
            topP: 1,
            frequencyPenalty: 0,
            presencePenalty: 0,
            postContent: '',
            listStyle: [],
            listLanguage: [],
            selectedStyle: {},
            selectedLanguage: {},
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
        getTemplateDetail() {},
    },
};
</script>
