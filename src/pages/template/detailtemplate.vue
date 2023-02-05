<template>
    <div>
        <Breadcrumbs
            main="Smart Content"
            title="Tạo template"
        />
        <div class="container-fluid">
            <div class="row">
                <div class="col-sm-12">
                    <px-card>
                        <div slot="with-padding">
                            <form @submit="handleUpdateTemplate">
                                <div class="form theme-form">
                                    <div class="row">
                                        <div class="col">
                                            <div class="form-group">
                                                <label>Tên hiển thị</label>
                                                <input
                                                    class="form-control"
                                                    type="text"
                                                    v-model="displayName"
                                                    placeholder="Tên hiển thị *"
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col">
                                            <div class="form-group">
                                                <label for="prompt">Prompt</label>
                                                <textarea
                                                    class="form-control"
                                                    id="prompt"
                                                    rows="6"
                                                    v-model="prompt"
                                                    required
                                                >
                                                </textarea>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col">
                                            <div class="form-group">
                                                <label for="description">Mô tả</label>
                                                <textarea
                                                    class="form-control"
                                                    id="description"
                                                    v-model="description"
                                                    required
                                                    rows="3"
                                                ></textarea>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-sm-4">
                                            <div class="form-group">
                                                <label for="temperature">Temperature</label>
                                                <input
                                                    class="form-control"
                                                    type="number"
                                                    id="temperature"
                                                    v-model="temperature"
                                                    placeholder="Temperature"
                                                    required
                                                    step="any"
                                                />
                                            </div>
                                        </div>
                                        <div class="col-sm-4">
                                            <div class="form-group">
                                                <label for="max-tokens">Max Tokens</label>
                                                <input
                                                    class="form-control"
                                                    type="number"
                                                    id="max-tokens"
                                                    v-model="maxTokens"
                                                    placeholder="Max Tokens"
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div class="col-sm-4">
                                            <div class="form-group">
                                                <label for="top-p">Top P</label>
                                                <input
                                                    id="top-p"
                                                    class="form-control"
                                                    type="number"
                                                    v-model="topP"
                                                    placeholder="Top P"
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-sm-4">
                                            <div class="form-group">
                                                <label for="frequency-penalty">Frequency Penalty:</label>
                                                <input
                                                    id="frequency-penalty"
                                                    class="form-control"
                                                    type="number"
                                                    v-model="frequencyPenalty"
                                                    placeholder="Frequency Penalty"
                                                    required
                                                />
                                            </div>
                                        </div>
                                        <div class="col-sm-4">
                                            <div class="form-group">
                                                <label for="presence-penalty">Presence Penalty:</label>
                                                <input
                                                    id="presence-penalty"
                                                    class="form-control"
                                                    type="number"
                                                    v-model="presencePenalty"
                                                    placeholder="Presence Penalty"
                                                    required
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div class="row">
                                        <div class="col">
                                            <div class="form-group">
                                                <label>Hình ảnh</label>
                                                <vue-dropzone
                                                    id="singledropzone"
                                                    :options="singledropzoneOptions"
                                                    class="dropzone digits"
                                                >
                                                </vue-dropzone>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col">
                                            <div class="form-group mb-0">
                                                <button
                                                    class="btn btn-success mr-3"
                                                    type="submit"
                                                >
                                                    Add
                                                </button>
                                                <a
                                                    class="btn btn-danger"
                                                    href="#"
                                                >
                                                    Cancel
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </px-card>
                </div>
            </div>
        </div>
        <!-- Container-fluid Ends-->
    </div>
</template>
<script>
import vue2Dropzone from 'vue2-dropzone';
import 'vue2-dropzone/dist/vue2Dropzone.min.css';
import { baseURL } from '../../constants/config';

export default {
    name: 'DetailTemplate',
    components: {
        vueDropzone: vue2Dropzone,
    },
    props: {
        templateId: String
    },
    data() {
        return {
            singledropzoneOptions: {
                url: 'http://localhost:8080',
                thumbnailWidth: 150,
                maxFiles: 1,
                maxFilesize: 2,
                addRemoveLinks: true,
                dictDefaultMessage:
                    "<i class='icon-cloud-up'></i><h6>Drop files here or click to upload.</h6><span>(This is just a demo dropzone. Selected files are <strong>not</strong> actually uploaded.)</span>",
            },
            displayName: 'viết bài miêu tả',
            prompt: 'viết bài miêu tả [phong cảnh] tại [dia diem] [review]',
            description: 'viết bài miêu tả',
            temperature: 0.7,
            maxTokens: 1024,
            topP: 1,
            frequencyPenalty: 0,
            presencePenalty: 0,
        };
    },
    mounted() {
        console.log(this.$route.params)
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
        getTemplateDetail() {
            fetch(`${baseURL}/smart-content/template${this.templateId}`, requestOptions)
                .then((response) => {
                    this.$toasted.show('Tạo tempate thành công', {
                        theme: 'outline',
                        position: 'top-right',
                        type: 'success',
                        duration: 2000,
                    });
                    this.displayName = '';
                    this.prompt = '';
                    this.description = 0;
                    this.maxTokens = 1024;
                })
                .catch((error) => {
                    this.$toasted.show('Tạo template thất bại', {
                        theme: 'outline',
                        position: 'top-right',
                        type: 'error',
                        duration: 2000,
                    });
                });
        },
    },
};
</script>
