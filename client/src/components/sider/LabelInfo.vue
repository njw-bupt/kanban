<template>
     <div class='label-info'>
        <div class='label-title'>
            <a-icon type="tags"/>
            <span>Labels</span>         
        </div>
        <div class='label-area'>
            <div v-for='label in labels' 
                :key='label.labelName' 
                :style='{backgroundColor:label.labelColor}'
                class='label-item'
                @click='labelInfo=label;showEditModal=true;'
            >{{ label.labelName }}</div>
            <a-icon class='label-add-icon' type="plus-square" @click="showAddModal=true"/>
        </div>

        <!-- add label model -->
        <div>
            <a-modal class='add-label-modal' v-model="showAddModal" title="Add New Label" :footer="null">
                <a-form-model class='add-label-form' :labelCol='{span:4}' :wrapperCol='{span:10}' labelAlign='left' ref="addLabelForm" :rules="rules" :model="labelInfo" @submit="submit" @submit.native.prevent>
                    <a-form-model-item label='title:' prop="labelName">
                        <a-input v-model="labelInfo.labelName"></a-input>
                    </a-form-model-item>
                    <a-form-model-item label='color:' prop="labelColor">
                        <a-input v-model="labelInfo.labelColor" type='color'></a-input>
                    </a-form-model-item>
                    <a-form-model-item>
                        <a-button
                            type="primary"
                            html-type="submit"
                        >
                            submit
                        </a-button>
                    </a-form-model-item>         
                </a-form-model>
            </a-modal>
        </div>
        <!-- edit label model -->
        <div>
            <a-modal class='edit-label-modal' v-model="showEditModal" title="Edit Label" :footer="null">
                <a-form-model class='edit-label-form' :labelCol='{span:4}' :wrapperCol='{span:10}' labelAlign='left' ref="editLabelForm" :rules="rules" :model="labelInfo" @submit="editLabel" @submit.native.prevent>
                    <a-form-model-item label='title:' prop="labelName">
                        <a-input v-model="labelInfo.labelName"></a-input>
                    </a-form-model-item>
                    <a-form-model-item label='color:' prop="labelColor">
                        <a-input v-model="labelInfo.labelColor" type='color'></a-input>
                    </a-form-model-item>
                    <a-form-model-item>
                        <a-button
                            type="primary"
                            html-type="submit"
                        >
                            edit
                        </a-button>
                    </a-form-model-item>         
                    <a-form-model-item>
                        <a-button @click='deleteLabel'>delete</a-button>
                    </a-form-model-item>         
                </a-form-model>
            </a-modal>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            labels: [],
            showAddModal: false,
            showEditModal: false,
            labelInfo: {
                labelName: '',
                labelColor: undefined
            },
            rules: {
                labelName: [
                    {required: true, message: 'please set a name for label'},
                    {min: 2, max: 20, message: 'name should more than 2 chars, less than 20 chars.'}
                ],
                labelCol: [
                    {required: true, message: 'please set a color for label'}
                ],
            }
        }
    },
    mounted(){
        this.getAllLabels();
    },
    methods: {
        async getAllLabels(){
            let userId = this.$route.params.id;
            try{
                this.labels = await this.$api.label.getAllLabels({userId});
            }catch(e){
                alert(e.message);
            }
        },
        submit(){
            let that = this;
            this.$refs.addLabelForm.validate(async valid => {
                let userId = that.$route.params.id;
                let labelInfo = that.labelInfo;
                if (valid) {
                    try{
                        await that.$api.label.addLabel({userId,...labelInfo});
                        that.labelInfo = {
                            labelName: '',
                            labelColor: undefined
                        }
                        that.getAllLabels();
                        }catch(e){
                            console.log(e.message);
                        }                                         
                    }
                });
            this.showAddModal = false;
        },
        editLabel(){
            let that = this;
            this.$refs.editLabelForm.validate(async valid => {
                let userId = that.$route.params.id;
                let labelInfo = that.labelInfo;
                if (valid) {
                    try{
                        await that.$api.label.editLabel({userId,...labelInfo});
                        that.labelInfo = {
                            labelName: '',
                            labelColor: undefined
                        }
                        that.getAllLabels();
                        }catch(e){
                            console.log(e.message);
                        }                                         
                    }
                });
            this.showEditModal = false;
        },

        async deleteLabel(){
            let labelId = this.labelInfo.labelId;
            try{
                await this.$api.label.deleteLabel({labelId});
                this.labelInfo = {
                    labelName: '',
                    labelColor: undefined
                }
                this.getAllLabels();
            }catch(e){
                console.log(e.message);
            }
            this.showEditModal = false;
        }
    }
}
</script>

<style lang="scss" scoped>
    .label-info{
        padding: 5px 5px;
        .label-title{
            span{
                margin-left: 3px;
                font-weight: 600;
            }
        }
        .label-area{
            display: flex;
            flex-wrap: wrap;  
            margin-top: 5px;          
            .label-item{
                width: fit-content;
                padding: 1px 10px;
                border-radius: 5%;
                margin: 1px 2px;
                cursor: pointer;
            }
            .label-add-icon{
                font-size: 25px;
                color: rgba(0,0,0,0.4);
                display: flex;
                align-items: center;
            }
        }
    }
</style>