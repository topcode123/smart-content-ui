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
                                            <div class="form-group row">
                                                <label class="col-sm-3 col-form-label">Hình ảnh</label>
                                                <div class="col-sm-9">
                                                    <input
                                                        type="file"
                                                        class="form-control form-control-file"
                                                        @change="handleChangeFileUpload"
                                                    />
                                                </div>
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
                                                    Update
                                                </button>
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
import { baseURL } from '../../constants/config';

export default {
    name: 'DetailTemplate',
    components: {},
    data() {
        return {
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
        };
    },
    mounted() {
        this.templateId = this.$route.params?.id;
        this.getDetailTemplate();
    },
    methods: {
        handleChangeFileUpload(event) {
            this.templateImage = event.target.files[0];
        },
        async handleUpdateTemplate(event) {
            event.preventDefault();

            if (!this.displayName || !this.prompt || !this.description || !this.temperature || !this.maxTokens) {
                this.$toasted.show('Các trường không được để trống', {
                    theme: 'outline',
                    position: 'top-right',
                    type: 'error',
                    duration: 2000,
                });

                return;
            }

            const uploadFileOptions = {
                method: 'PUT',
                headers: {
                    'Content-Type': 'image/jpeg',
                },
                body: this.templateImage,
                redirect: 'follow',
            };
            if (this.templateImage) {
                await fetch(this.putFilePresignedURL, uploadFileOptions)
                    .then((_) => {
                        this.updateTemplate();
                    })
                    .catch((_) => {
                        this.$toasted.show('Cập nhật template thất bại', {
                            theme: 'outline',
                            position: 'top-right',
                            type: 'error',
                            duration: 2000,
                        });
                    });
            } else {
                this.updateTemplate();
            }
        },
        updateTemplate() {
            let formDataUpdateTemplate = new FormData();
            formDataUpdateTemplate.append('displayName', this.displayName);
            formDataUpdateTemplate.append('prompt', this.prompt);
            formDataUpdateTemplate.append('description', this.description);
            formDataUpdateTemplate.append('temperature', this.temperature);
            formDataUpdateTemplate.append('maxTokens', this.maxTokens);
            formDataUpdateTemplate.append('topP', this.topP);
            formDataUpdateTemplate.append('frequencyPenalty', this.frequencyPenalty);
            formDataUpdateTemplate.append('presencePenalty', this.presencePenalty);
            if (this.templateImage) {
                formDataUpdateTemplate.append('templateImage', this.templateImage);
            }

            const requestOptions = {
                method: 'PUT',
                headers: {
                    Authorization: this.$store.state.authentication.user.accessToken,
                },
                body: formDataUpdateTemplate,
            };
            fetch(`${baseURL}/smart-content/template/${this.templateId}`, requestOptions)
                .then((response) => {
                    this.$toasted.show('Cập nhật tempate thành công', {
                        theme: 'outline',
                        position: 'top-right',
                        type: 'success',
                        duration: 2000,
                    });
                    // setTimeout(() => {
                    //     this.$router.go();
                    // }, 1000);
                })
                .catch((error) => {
                    console.log(JSON.stringify(error));
                    this.$toasted.show('Cập nhật template thất bại', {
                        theme: 'outline',
                        position: 'top-right',
                        type: 'error',
                        duration: 2000,
                    });
                });
        },
        
        async getDetailTemplate() {
            const requestOptions = {
                method: 'GET',
                headers: {
                    Authorization: this.$store.state.authentication.user.accessToken,
                    'Content-Type': 'application/json',
                },
            };
            const detailTemplateRequest = await fetch(
                `${baseURL}/smart-content/template/${this.templateId}`,
                requestOptions
            );
            const detailTemplateResponse = await detailTemplateRequest.json();
            console.log(detailTemplateResponse);
            this.displayName = detailTemplateResponse['data'].displayName;
            this.prompt = detailTemplateResponse['data'].prompt;
            this.description = detailTemplateResponse['data'].description;
            this.temperature = detailTemplateResponse['data'].temperature;
            this.topP = detailTemplateResponse['data'].topP;
            this.frequencyPenalty = detailTemplateResponse['data'].frequencyPenalty;
            this.maxTokens = detailTemplateResponse['data'].maxTokens;
            this.presencePenalty = detailTemplateResponse['data'].presencePenalty;
        },
    },
};
</script>
