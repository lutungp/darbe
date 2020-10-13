<template>
    <div class="darbe-container">
        <b-row>
            <b-col xs="12" lg="12" style="margin-bottom: 12px;">
                <b-button variant="outline-warning" size="sm" @click="toggleModal">Add</b-button>
            </b-col>
        </b-row>
        <b-row>
            <b-col xs="12" lg="12">
                <Widget>
                    <h3>User <span class="fw-semi-bold">Master</span></h3>
                    <b-table
                        :items="items"
                        :fields="fields"
                        :per-page="perPage"
                        :current-page="currentPage"
                        small
                    >
                        <template v-slot:cell(actions)="row">
                            <b-button size="sm" class="mr-1" variant="outline-success" @click="editUser(row.item)">
                                Edit
                            </b-button>
                            <b-button size="sm" class="mr-1" variant="outline-danger">
                                Delete
                            </b-button>
                        </template>
                    </b-table>
                    <b-row>
                        <b-col>
                            <b-pagination
                                v-model="currentPagination"
                                :total-rows="rows"
                                :per-page="perPage"
                                @change="onPageChanged"
                            ></b-pagination>
                        </b-col>
                    </b-row>
                </Widget>
            </b-col>
        </b-row>
        <b-modal ref="my-modal" hide-footer title="Form User">
            <b-form @submit="onSubmit">
                <div class="d-block">
                        <b-form-group
                            id="input-group-1"
                            label="Email address:"
                            label-for="input-1"
                        >
                            <b-form-input
                            id="input-1"
                            v-model="form.email"
                            type="email"
                            required
                            placeholder="Enter email"
                            ></b-form-input>
                        </b-form-group>

                        <b-form-group id="input-group-2" label="User Name:" label-for="input-2">
                            <b-form-input
                            id="input-2"
                            v-model="form.name"
                            required
                            placeholder="Enter name"
                            ></b-form-input>
                        </b-form-group>

                        <b-form-group id="input-group-2" label="User Group:" label-for="input-2">
                            <multiselect v-model="form.usergroup" track-by="usergroup_nama" label="usergroup_nama" :options="options" :searchable="true" :allow-empty="false">
                                <template slot="singleLabel" slot-scope="{ option }"><strong>{{ option.usergroup_nama }}</strong></template>
                            </multiselect>
                        </b-form-group>

                        <b-form-group id="input-group-2" label="Password:" label-for="input-2">
                            <b-form-input
                            id="input-2"
                            v-model="form.password"
                            required
                            placeholder="Enter name"
                            type="password" 
                            ></b-form-input>
                        </b-form-group>
                </div>
                <b-button type="submit" class="mt-3" variant="outline-success" block>Submit</b-button>
                <b-button class="mt-2" variant="outline-warning" block @click="hideModal">Close</b-button>
            </b-form>
        </b-modal>
    </div>
</template>
<script>
    import Widget from "@/components/Widget/Widget";
    import axios from "./../../../api.js";

    export default {
        name: "User",
        components: { Widget },
        data() {
            return {
                perPage: 20,
                currentPage: 1,
                currentPagination : 1,
                rows : 0,
                items: [],
                paginatedItems: this.items,
                form: {
                    id : 0,
                    email: '',
                    name: '',
                    password: null
                },
                fields : [
                    { key: 'no', label: 'No.', width : 50},
                    { key: 'name', label: 'User Name', sortable: true, sortDirection: 'desc' },
                    { key: 'usergroup_nama', label: 'Group', sortable: true },
                    { key: 'email', label: 'Email Address' },
                    { key: 'actions', label: 'Actions' }
                ],
                options: []
            }
        },
        created () {
            this.getData(1);
            this.getDataUserGroup();
        },
        methods: {
            hideModal() {
                this.$refs['my-modal'].hide()
                this.onReset();
            },
            toggleModal() {
                // We pass the ID of the button that we want to return focus to
                // when the modal has hidden
                this.$refs['my-modal'].toggle('#toggle-btn');
            },
            onSubmit(evt) {
                evt.preventDefault()
                axios.post(`/master/createuser`, this.form)
                .then((response) => {
                    if (response.data.status == 'success') {
                        this.$toasted.success('Form berhasil disimpan ...');
                        this.hideModal();
                        this.getData(this.currentPagination);
                    } else {
                        this.$toasted.error('Form gagal disimpan, harap hubungi Administrator');
                    }
                })
                .catch((error) => {
                    if (error.response.status == 400) {
                        this.$toasted.error('Periksa form kembali, terdapat inputan tidak sesuai/sama ...');
                    }
                });
            },
            onReset() {
                // Reset our form values
                this.form.id = 0;
                this.form.email = '';
                this.form.name = '';
                this.form.password = null;
                this.form.usergroup = null;
            },

            getData(pageNumber) {
                let me = this;
                let url = `/master/user/data_list?page=` + pageNumber;
                axios.get(url)
                .then((response) => {
                    var items = response.data.data;
                    var dataItems = [];
                    var no = pageNumber == 1 ? 1 : (pageNumber * 20) - 19;
                    items.forEach(element => {
                        dataItems.push({
                            no : no,
                            id: element.id,
                            name : element.name,
                            email : element.email,
                            usergroup : element.usergroup_id,
                            usergroup_nama : element.usergroup_nama,
                            created_at : element.created_at
                        });
                        no++;
                    });
                    me.items = dataItems;
                    me.rows = response.data.total;
                });
            },

            onPageChanged(page) {
                this.getData(page);
            },

            editUser(item) {
                var usergroup = {
                    usergroup_id : item.usergroup,
                    usergroup_nama : item.usergroup_nama,
                };

                this.form = {
                    id : item.id,
                    email: item.email,
                    name: item.name,
                    usergroup : usergroup
                };

                console.log(this.form);
                this.toggleModal();
            },

            getDataUserGroup() {
                let me = this;
                let url = `/master/getusergroup`;
                axios.get(url)
                .then((response) => {
                    var items = response.data.data;
                    this.options = items;
                });
            }
        }
    }
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
<style src="./../../darbe.scss" lang="scss" />