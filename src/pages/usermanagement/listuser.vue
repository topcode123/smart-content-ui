<template>
    <div>
        <Breadcrumbs
            main="Tables"
            title="Danh sách người dùng"
        />
        <!-- Container-fluid starts-->
        <div class="container-fluid">
            <div class="row">
                <div class="col-md-12">
                    <div class="card">
                        <div class="card-body">
                            <div class="datatable-vue m-0">
                                <div class="row filter-smart">
                                    <div class="col-sm-2">
                                        <input
                                            class="form-control"
                                            v-model="filters.name.value"
                                            placeholder="Name"
                                        />
                                    </div>
                                    <div class="col-sm-2">
                                        <input
                                            class="form-control"
                                            v-model="filters.position.value"
                                            placeholder="Position"
                                        />
                                    </div>
                                    <div class="col-sm-2">
                                        <input
                                            class="form-control"
                                            v-model="filters.office.value"
                                            placeholder="Office"
                                        />
                                    </div>
                                    <div class="col-sm-2">
                                        <input
                                            class="form-control"
                                            v-model="filters.age.value"
                                            placeholder="Age"
                                        />
                                    </div>
                                    <div class="col-sm-2">
                                        <input
                                            class="form-control"
                                            v-model="filters.startdate.value"
                                            placeholder="Start Date"
                                        />
                                    </div>
                                    <div class="col-sm-2">
                                        <input
                                            class="form-control"
                                            v-model="filters.salary.value"
                                            placeholder="Salary"
                                        />
                                    </div>
                                </div>
                                <div class="table-responsive vue-smart">
                                    <v-table
                                        :data="users.data"
                                        class="table"
                                        :currentPage.sync="filter.currentPage"
                                        :pageSize="10"
                                        @totalPagesChanged="filter.totalPages = $event"
                                        :filters="filters"
                                    >
                                        <thead slot="head">
                                            <v-th sortKey="name">Name</v-th>
                                            <v-th sortKey="position">Position</v-th>
                                            <v-th sortKey="office">Office</v-th>
                                            <v-th sortKey="age">Age</v-th>
                                            <v-th sortKey="startdate">Start date</v-th>
                                            <v-th sortKey="salary">Salary</v-th>
                                        </thead>
                                        <tbody
                                            slot="body"
                                            slot-scope="{ displayData }"
                                        >
                                            <tr
                                                v-for="row in displayData"
                                                :key="row.id"
                                            >
                                                <td>{{ row.name }}</td>
                                                <td>{{ row.position }}</td>
                                                <td>{{ row.office }}</td>
                                                <td>{{ row.age }}</td>
                                                <td>{{ row.startdate }}</td>
                                                <td>{{ row.salary }}</td>
                                            </tr>
                                        </tbody>
                                    </v-table>
                                </div>

                                <smart-pagination
                                    :currentPage.sync="filter.currentPage"
                                    :totalPages="filter.totalPages"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- Container-fluid Ends-->
</template>

<script>
import users from '../../data/users';

export default {
    name: 'ListUser',
    data() {
        return {
            users,

            basic: {
                currentPage: 1,
                totalPages: 0,
            },

            filter: {
                currentPage: 1,
                totalPages: 0,
            },

            agefilter: {
                currentPage: 1,
                totalPages: 0,
            },

            selectrow: {
                currentPage: 1,
                totalPages: 0,
            },

            selectedRows: [],

            filters: {
                name: { value: '', keys: ['name'] },
                position: { value: '', keys: ['position'] },
                office: { value: '', keys: ['office'] },
                age: { value: '', keys: ['age'] },
                startdate: { value: '', keys: ['startdate'] },
                salary: { value: '', keys: ['salary'] },
            },

           
        };
    },
    methods: {
        
    },
};
</script>
