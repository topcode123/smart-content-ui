<template>
    <div>
        <Breadcrumbs
            main="Smart Content"
            title="Danh sách template"
        />

        <div class="container-fluid">
            <div class="row">
                <div class="col-xl-9 xl-60">
                    <div class="row">
                        <!-- <div
                            class="col-xl-12"
                            v-for="(course, index) in specialcourses"
                            :key="'special' + index"
                        >
                            <div class="card">
                                <div class="blog-box blog-list row">
                                    <div class="col-sm-5">
                                        <img
                                            class="img-fluid sm-100-w"
                                            :src="getImgUrl(course.image)"
                                            alt=""
                                        />
                                    </div>
                                    <div class="col-sm-7">
                                        <div class="blog-details">
                                            <div class="blog-date digits">
                                                <span v-text="course.dd"></span> {{ course.mm }} {{ course.yy }}
                                            </div>
                                            <h6 v-text="course.title"></h6>
                                            <div class="blog-bottom-content">
                                                <ul class="blog-social">
                                                    <li v-text="' by: ' + course.author"></li>
                                                    <li
                                                        class="digits"
                                                        v-text="course.hits + ' Hits'"
                                                    ></li>
                                                </ul>
                                                <hr />
                                                <p
                                                    class="mt-0"
                                                    v-text="course.descr"
                                                ></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div> -->

                        <div
                            class="col-xl-4 xl-50 col-sm-6 box-col-6"
                            v-for="(template, index) in listTemplate"
                            :key="'normal' + index"
                        >
                            <div class="card">
                                <div class="card-header display-name">
                                    <h6>{{ template.displayName }}</h6>
                                </div>
                                <div class="blog-box blog-grid text-center product-box">
                                    <div class="product-img">
                                        <img
                                            class="template-thumbnail"
                                            :src="getImgUrl(template.url)"
                                            alt=""
                                            @error="handleLoadImageError"
                                        />
                                        <div class="product-hover"  v-if="role === 'admin'">
                                            <ul>
                                                <li>
                                                    <router-link
                                                        :to="{ name: 'Detail Template', params: { id: template.id } }"
                                                    >
                                                        <i class="icon-link"></i>
                                                    </router-link>
                                                </li>

                                                <li>
                                                    <i
                                                        class="icon-trash"
                                                        @click="handleDeleteTemplate(template.id)"
                                                    ></i>
                                                </li>
                                            </ul>
                                            <!-- <ul v-else>
                                                <li>
                                                    <router-link
                                                        :to="{ name: 'Use Template', params: { id: template.id } }"
                                                    >
                                                        <i class="icon-link"></i>
                                                    </router-link>
                                                </li>
                                            </ul> -->
                                        </div>
                                    </div>
                                    <div class="blog-details-main p-1">
                                        <!-- <ul class="blog-social">
                                            <li
                                                class="digits"
                                                v-text="template.dd + ' ' + template.mm + ' ' + template.yy"
                                            ></li>
                                            <li
                                                class="digits"
                                                v-text="' by: ' + template.author"
                                            ></li>
                                            <li
                                                class="digits"
                                                v-text="template.hits + ' Hits'"
                                            ></li>
                                        </ul> -->
                                        <hr />
                                        <router-link
                                            class="btn btn-primary btn-sm mb-2"
                                            v-if="role === 'user'"
                                            :to="{ name: 'Use Template', params: { id: template.id } }"
                                        >
                                            Tạo content
                                        </router-link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- <div class="col-xl-3 xl-40">
                    <div
                        class="default-according style-1 faq-accordion job-accordion"
                        id="accordionoc"
                    >
                        <div class="row">
                            <div class="col-xl-12">
                                <b-card no-body>
                                    <b-card-header
                                        header-tag="div"
                                        role="tab"
                                    >
                                        <h5 class="mb-0">
                                            <b-button
                                                class="btn btn-link pl-0"
                                                block
                                                v-b-toggle.collapseicon
                                                >Find Course</b-button
                                            >
                                        </h5>
                                    </b-card-header>
                                    <b-collapse
                                        id="collapseicon"
                                        visible
                                        role="tabpanel"
                                    >
                                        <b-card-body class="filter-cards-view animate-chk">
                                            <div class="job-filter">
                                                <div class="faq-form">
                                                    <input
                                                        class="form-control"
                                                        type="text"
                                                        placeholder="Search.."
                                                    /><feather
                                                        class="search-icon"
                                                        type="search"
                                                    ></feather>
                                                </div>
                                            </div>
                                            <div class="checkbox-animated">
                                                <div class="learning-header">
                                                    <span class="f-w-600">Categories</span>
                                                </div>
                                                <label
                                                    class="d-block"
                                                    for="chk-ani"
                                                >
                                                    <input
                                                        class="checkbox_animated"
                                                        id="chk-ani"
                                                        type="checkbox"
                                                    />Accounting
                                                </label>
                                                <label
                                                    class="d-block"
                                                    for="chk-ani0"
                                                >
                                                    <input
                                                        class="checkbox_animated"
                                                        id="chk-ani0"
                                                        type="checkbox"
                                                    />Design
                                                </label>
                                                <label
                                                    class="d-block"
                                                    for="chk-ani1"
                                                >
                                                    <input
                                                        class="checkbox_animated"
                                                        id="chk-ani1"
                                                        type="checkbox"
                                                    />Development
                                                </label>
                                                <label
                                                    class="d-block"
                                                    for="chk-ani2"
                                                >
                                                    <input
                                                        class="checkbox_animated"
                                                        id="chk-ani2"
                                                        type="checkbox"
                                                    />Management
                                                </label>
                                            </div>
                                            <div class="checkbox-animated mt-0">
                                                <div class="learning-header"><span class="f-w-600">Duration</span></div>
                                                <label
                                                    class="d-block"
                                                    for="chk-ani6"
                                                >
                                                    <input
                                                        class="checkbox_animated"
                                                        id="chk-ani6"
                                                        type="checkbox"
                                                    />0-50 hours
                                                </label>
                                                <label
                                                    class="d-block"
                                                    for="chk-ani7"
                                                >
                                                    <input
                                                        class="checkbox_animated"
                                                        id="chk-ani7"
                                                        type="checkbox"
                                                    />50-100 hours
                                                </label>
                                                <label
                                                    class="d-block"
                                                    for="chk-ani8"
                                                >
                                                    <input
                                                        class="checkbox_animated"
                                                        id="chk-ani8"
                                                        type="checkbox"
                                                    />100+ hours
                                                </label>
                                            </div>
                                            <div class="checkbox-animated mt-0">
                                                <div class="learning-header"><span class="f-w-600">Price</span></div>
                                                <label
                                                    class="d-block"
                                                    for="edo-ani"
                                                >
                                                    <input
                                                        class="radio_animated"
                                                        id="edo-ani"
                                                        type="radio"
                                                        name="rdo-ani"
                                                        checked=""
                                                    />All Courses
                                                </label>
                                                <label
                                                    class="d-block"
                                                    for="edo-ani1"
                                                >
                                                    <input
                                                        class="radio_animated"
                                                        id="edo-ani1"
                                                        type="radio"
                                                        name="rdo-ani"
                                                        checked=""
                                                    />Paid Courses
                                                </label>
                                                <label
                                                    class="d-block"
                                                    for="edo-ani2"
                                                >
                                                    <input
                                                        class="radio_animated"
                                                        id="edo-ani2"
                                                        type="radio"
                                                        name="rdo-ani"
                                                        checked=""
                                                    />Free Courses
                                                </label>
                                            </div>
                                            <div class="checkbox-animated mt-0">
                                                <div class="learning-header"><span class="f-w-600">Status</span></div>
                                                <label
                                                    class="d-block"
                                                    for="chk-ani3"
                                                >
                                                    <input
                                                        class="checkbox_animated"
                                                        id="chk-ani3"
                                                        type="checkbox"
                                                    />Registration
                                                </label>
                                                <label
                                                    class="d-block"
                                                    for="chk-ani4"
                                                >
                                                    <input
                                                        class="checkbox_animated"
                                                        id="chk-ani4"
                                                        type="checkbox"
                                                    />Progress
                                                </label>
                                                <label
                                                    class="d-block"
                                                    for="chk-ani5"
                                                >
                                                    <input
                                                        class="checkbox_animated"
                                                        id="chk-ani5"
                                                        type="checkbox"
                                                    />Completed
                                                </label>
                                            </div>

                                            <button
                                                class="btn btn-primary text-center"
                                                type="button"
                                            >
                                                Filter
                                            </button>
                                        </b-card-body>
                                    </b-collapse>
                                </b-card>
                            </div>

                            <div class="col-xl-12">
                                <b-card no-body>
                                    <b-card-header
                                        header-tag="div"
                                        role="tab"
                                    >
                                        <h5 class="mb-0">
                                            <b-button
                                                class="btn btn-link pl-0"
                                                block
                                                v-b-toggle.collapseicon1
                                                >Categories</b-button
                                            >
                                        </h5>
                                    </b-card-header>
                                    <b-collapse
                                        id="collapseicon1"
                                        visible
                                        role="tabpanel"
                                    >
                                        <div class="categories">
                                            <div class="learning-header"><span class="f-w-600">Design</span></div>
                                            <ul>
                                                <li>
                                                    <a href="#">UI Design </a
                                                    ><span class="badge badge-primary pull-right">28</span>
                                                </li>
                                                <li>
                                                    <a href="#">UX Design </a
                                                    ><span class="badge badge-primary pull-right">35</span>
                                                </li>
                                                <li>
                                                    <a href="#">Interface Design </a
                                                    ><span class="badge badge-primary pull-right">17</span>
                                                </li>
                                                <li>
                                                    <a href="#">User Experience </a
                                                    ><span class="badge badge-primary pull-right">26</span>
                                                </li>
                                            </ul>
                                        </div>
                                        <div class="categories pt-0">
                                            <div class="learning-header"><span class="f-w-600">Development</span></div>
                                            <ul>
                                                <li>
                                                    <a href="#">Frontend Development</a
                                                    ><span class="badge badge-primary pull-right">48</span>
                                                </li>
                                                <li>
                                                    <a href="#">Backend Development</a
                                                    ><span class="badge badge-primary pull-right">19</span>
                                                </li>
                                            </ul>
                                        </div>
                                    </b-collapse>
                                </b-card>
                            </div>

                            <div class="col-xl-12">
                                <b-card no-body>
                                    <b-card-header
                                        header-tag="div"
                                        role="tab"
                                    >
                                        <h5 class="mb-0">
                                            <b-button
                                                class="btn btn-link pl-0"
                                                block
                                                v-b-toggle.collapseicon2
                                                >Upcoming Courses</b-button
                                            >
                                        </h5>
                                    </b-card-header>
                                    <b-collapse
                                        id="collapseicon2"
                                        visible
                                        role="tabpanel"
                                    >
                                        <div class="upcoming-course card-body">
                                            <div class="media">
                                                <div class="media-body">
                                                    <span class="f-w-600">UX Development</span
                                                    ><span class="d-block">Course By <a href="#"> Lorem ipsum</a></span
                                                    ><span class="d-block"
                                                        ><i class="fa fa-star font-warning"></i
                                                        ><i class="fa fa-star font-warning"></i
                                                        ><i class="fa fa-star font-warning"></i
                                                        ><i class="fa fa-star font-warning"></i
                                                        ><i class="fa fa-star-half-o font-warning"></i
                                                    ></span>
                                                </div>
                                                <div>
                                                    <h5 class="mb-0 font-primary">18</h5>
                                                    <span class="d-block">Dec</span>
                                                </div>
                                            </div>
                                            <div class="media">
                                                <div class="media-body">
                                                    <span class="f-w-600">Business Analyst</span
                                                    ><span class="d-block">Course By <a href="#">Lorem ipsum </a></span
                                                    ><span class="d-block"
                                                        ><i class="fa fa-star font-warning"></i
                                                        ><i class="fa fa-star font-warning"></i
                                                        ><i class="fa fa-star font-warning"></i
                                                        ><i class="fa fa-star font-warning"></i
                                                        ><i class="fa fa-star font-warning"></i
                                                    ></span>
                                                </div>
                                                <div>
                                                    <h5 class="mb-0 font-primary">28</h5>
                                                    <span class="d-block">Dec</span>
                                                </div>
                                            </div>
                                            <div class="media">
                                                <div class="media-body">
                                                    <span class="f-w-600">Web Development</span
                                                    ><span class="d-block">Course By <a href="#">Lorem ipsum </a></span
                                                    ><span class="d-block"
                                                        ><i class="fa fa-star font-warning"></i
                                                        ><i class="fa fa-star font-warning"></i
                                                        ><i class="fa fa-star font-warning"></i
                                                        ><i class="fa fa-star font-warning"></i
                                                        ><i class="fa fa-star-o font-warning"></i
                                                    ></span>
                                                </div>
                                                <div>
                                                    <h5 class="mb-0 font-primary">5</h5>
                                                    <span class="d-block">Jan</span>
                                                </div>
                                            </div>
                                        </div>
                                    </b-collapse>
                                </b-card>
                            </div>
                        </div>
                    </div>
                </div> -->
            </div>
        </div>
    </div>
</template>
<script>
import { baseURL } from '../../constants/config';
export default {
    name: 'ListTemplate',
    data() {
        return {
            listTemplate: [],
            role: '',
        };
    },

    computed: {},
    mounted() {
        this.getListTemplate();
        this.role = this.$store.state.authentication?.user.role;
    },
    methods: {
        getImgUrl(filename) {
            return `${baseURL}/${filename}`;
        },
        async getListTemplate() {
            const requestOptions = {
                method: 'GET',
                headers: {
                    Authorization: this.$store.state.authentication.user.accessToken,
                    'Content-Type': 'application/json',
                },
            };
            const listTemplateRequest = await fetch(`${baseURL}/smart-content/list-template`, requestOptions);
            const listTemplateResponse = await listTemplateRequest.json();
            console.log(listTemplateResponse);

            this.listTemplate = listTemplateResponse['data'];
        },
        handleLoadImageError(event) {
            var images = require.context('../../assets/images/faq/', false, /\.jpg$/);
            event.target.src = images('./default-thumbnail.jpg');
        },
        handleDeleteTemplate(templateId) {
            const requestOptions = {
                method: 'DELETE',
                headers: {
                    Authorization: this.$store.state.authentication.user.accessToken,
                    'Content-Type': 'application/json',
                },
            };

            fetch(`${baseURL}/smart-content/template/${templateId}`, requestOptions)
                .then((response) => {
                    this.$toasted.show('Xoá tempate thành công', {
                        theme: 'outline',
                        position: 'top-right',
                        type: 'success',
                        duration: 2000,
                    });
                    this.getListTemplate();
                })
                .catch((error) => {
                    console.log(JSON.stringify(error));
                    this.$toasted.show('Xoá template thất bại', {
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
<style scoped>
.template-thumbnail {
    width: 100%;
    height: 310px;
}

.display-name {
    padding: 20px;
    text-align: center;
}
</style>
