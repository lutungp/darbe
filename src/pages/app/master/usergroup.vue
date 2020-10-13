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
                    <h3>User Group <span class="fw-semi-bold">Master</span></h3>
                    <b-table
                        :items="items"
                        :fields="fields"
                        :per-page="perPage"
                        :current-page="currentPage"
                        small
                    >
                        <template v-slot:cell(actions)="row">
                            <b-button size="sm" class="mr-1" variant="outline-success" @click="editUserGroup(row.item)">
                                Edit
                            </b-button>
                            <b-button size="sm" class="mr-1" variant="outline-danger">
                                Delete
                            </b-button>
                            <b-button size="sm" class="mr-1" variant="outline-primary" @click="toggleRoleModal(row.item)">
                                Role
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
                    <b-form-group id="input-group-1" label="Kode :" label-for="input-1">
                    <b-form-input
                        id="input-1"
                        v-model="form.usergroup_kode"
                        required
                        ></b-form-input>
                    </b-form-group>

                    <b-form-group id="input-group-2" label="Nama : " label-for="input-2">
                    <b-form-input
                        id="input-2"
                        v-model="form.usergroup_nama"
                        required
                        ></b-form-input>
                    </b-form-group>
                </div>
                <b-button type="submit" class="mt-3" variant="outline-success" block>Submit</b-button>
                <b-button class="mt-2" variant="outline-warning" block @click="hideModal">Close</b-button>
            </b-form>
        </b-modal>
        <b-modal ref="my-rolemodal" hide-footer title="Form Role">
            <b-form @submit="onRoleSubmit">
                <b-table :items="itemRoles" :fields="fieldsMenus" small>
                    <template v-slot:cell(create)="data">
                        <b-form-checkbox v-model="data.item.create"></b-form-checkbox>
                    </template>
                    <template v-slot:cell(read)="data">
                        <b-form-checkbox v-model="data.item.read"></b-form-checkbox>
                    </template>
                    <template v-slot:cell(update)="data">
                        <b-form-checkbox v-model="data.item.update"></b-form-checkbox>
                    </template>
                    <template v-slot:cell(delete)="data">
                        <b-form-checkbox v-model="data.item.delete"></b-form-checkbox>
                    </template>
                </b-table>
                <b-button type="submit" class="mt-3" variant="outline-success" block>Submit</b-button>
                <b-button class="mt-2" variant="outline-warning" block @click="hideRoleModal">Close</b-button>
            </b-form>
        </b-modal>
    </div>
</template>
<script>
    import Widget from "@/components/Widget/Widget";
    import axios from "./../../../api.js"
    export default {
        name: "UserGroup",
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
                    usergroup_id : 0,
                    usergroup_kode: '',
                    usergroup_nama: '',
                },
                fields : [
                    { key: 'no', label: 'No.', width : 50},
                    { key: 'usergroup_kode', label: 'Kode', sortable: true, sortDirection: 'desc' },
                    { key: 'usergroup_nama', label: 'User Group' },
                    { key: 'actions', label: 'Actions' }
                ],
                itemRoles : [],
                fieldsMenus : [
                    { key: 'menu_nama', label: 'Nama', sortable: true, sortDirection: 'desc', width : 100},
                    { key: 'create', label: 'Create', class: 'text-center' },
                    { key: 'read', label: 'Read', class: 'text-center' },
                    { key: 'update', label: 'Update', class: 'text-center' },
                    { key: 'delete', label: 'Delete', class: 'text-center' },
                ]
            }
        },

        created () {
            this.getData(1);
        },

        methods: {
            toggleModal(){
                this.onReset();
                this.$refs['my-modal'].toggle()
            },

            hideModal(){
                this.$refs['my-modal'].hide()
                this.onReset();
            },

            onReset() {
                // Reset our form values
                this.form.usergroup_id = 0;
                this.form.usergroup_kode = '';
                this.form.usergroup_nama = '';
            },

            getData(pageNumber) {
                let me = this;
                let url = `/master/usergroup/data_list?page=` + pageNumber;
                axios.get(url)
                .then((response) => {
                    var items = response.data.data;
                    var dataItems = [];
                    var no = pageNumber == 1 ? 1 : (pageNumber * 20) - 19;
                    items.forEach(element => {
                        dataItems.push({
                            no : no,
                            usergroup_id: element.usergroup_id,
                            usergroup_kode : element.usergroup_kode,
                            usergroup_nama : element.usergroup_nama,
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

            editUserGroup(item) {
                this.form = {
                    usergroup_id : item.usergroup_id,
                    usergroup_kode : item.usergroup_kode,
                    usergroup_nama : item.usergroup_nama,
                };
                this.$refs['my-modal'].show();
            },

            onSubmit(evt) {
                evt.preventDefault()
                axios.post(`/master/createusergroup`, this.form)
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

            toggleRoleModal(items){ 
                let me = this;
                let url = `/master/usergroup/data_role?id=` + items.usergroup_id;
                axios.get(url)
                .then((response) => {
                    let data = response.data;
                    var no = 1;
                    var dataRole = [];
                    data.forEach(element => {
                        var role = element.role_privilege;
                        // role = role == null ? '' : role.split(",");
                        let create = role == null ? null : role.match(/c/g);
                        let read = role == null ? null : role.match(/r/g);
                        let update = role == null ? null : role.match(/u/g);
                        let del = role == null ? null : role.match(/d/g);
                        
                        dataRole.push({
                            role_id : element.role_id,
                            usergroup_id : items.usergroup_id,
                            menu_id : element.menu_id,
                            menu_nama : element.menu_nama,
                            create : create == null ? false : true,
                            read : read == null ? false : true,
                            update : update == null ? false : true,
                            delete : del == null ? false : true,
                        });
                        no++;
                    });
                    this.itemRoles = dataRole;
                    this.$refs['my-rolemodal'].show();
                });
            },

            hideRoleModal(){
                this.$refs['my-rolemodal'].hide()
            },

            onRoleSubmit(evt){
                evt.preventDefault();
                axios.post(`/master/createrole`, {
                    data : this.itemRoles
                })
                .then((response) => {
                    if (response.data.status == 'success') {
                        this.$toasted.success('Form berhasil disimpan ...');
                        this.hideRoleModal();
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
        }
    }
</script>
<style src="./../../darbe.scss" lang="scss" />