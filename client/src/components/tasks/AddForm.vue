<template>
    <div>
        <a-modal class='add-task-modal' v-model="showAddForm" title="Add New Task" :footer="null" :closable="false">
            <a-form-model v-show='showAddForm' class='new-task-form' ref="newTaskForm" :model="taskInfo" :rules="rules" layout="vertical" label-align="left">
                <a-form-model-item label="title" prop="taskName">
                    <a-input v-model="taskInfo.taskName"/>
                </a-form-model-item>  
                <a-form-model-item label="description" prop="taskDescription">
                    <a-input v-model="taskInfo.taskDescription"/>
                </a-form-model-item>  
                <a-form-model-item label="label" prop="labelName">
                    <a-select v-model="taskInfo.labelName" placeholder="please select a label">
                        <a-select-option 
                            v-for="label in labels"
                            :key="label.labelId"
                            :value="label.labelName"
                        >
                            {{ label.labelName }}
                        </a-select-option>
                    </a-select>
                </a-form-model-item>     
                <a-form-model-item>
                    <a-button type="primary" @click="submit" :disabled="taskInfo.taskName===''">
                        add
                    </a-button>
                    <a-button @click="cancelAdd">
                        cancel
                    </a-button>
                </a-form-model-item>
            </a-form-model>
        </a-modal>     
    </div>    
</template>

<script>
export default {
    props: {
        updateTask: Function,
        showAddForm: Boolean,
    },
    data(){
        return {
            taskInfo: {
                taskName: '',
                taskDescription: '',
                labelName: undefined,
                labelColor: undefined,
            },
            labels: [],
            rules: {
                taskName: [{ required: true, message: 'Please set the title of task', trigger: 'blur' }],
            }
        }
    },
    mounted(){
        this.getLabels();
    },
    methods: {
        cancelAdd(){
            this.taskInfo = {
                taskName: '',
                taskDescription: '',
                labelName: undefined,
                labelColor: undefined,
            };       
            this.$emit('close-add-form');    
        },
        async getLabels(){
            let userId = this.$route.params.id;
            try{
                this.labels = await this.$api.label.getAllLabels({userId});
            }catch(e){
                if(e.message){
                    console.log(e.message);
                }
            }
        },
        connectLabelNameWithColor(name){
            let labelColor = "",
                labels = this.labels;
            for(let i=0; i<labels.length; i++){
                if(name===labels[i].labelName){
                    labelColor = labels[i].labelColor;
                    break;
                }
            }
            this.taskInfo.labelColor = labelColor;
        },
        submit(){
                let that = this;
                let taskInfo = this.taskInfo;
                this.$refs.newTaskForm.validate(async valid => {
                    if (valid) {
                        try{
                            that.connectLabelNameWithColor(taskInfo.labelName);
                            taskInfo.userId = that.$route.params.id;
                            await that.$api.task.addNewTask(taskInfo);
                            that.taskInfo = {
                                taskName: '',
                                taskDescription: '',
                                labelName: undefined,
                                labelColor: undefined,
                            };
                            that.$emit('close-add-form');
                        }catch(e){
                            alert(e);
                        }             
                    } else {
                        alert('please check the form before submit');
                        return false;
                    }
                });
        }
    }
}
</script>