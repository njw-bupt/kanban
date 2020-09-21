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
                    <a-input v-model="taskInfo.labelName"/>
                </a-form-model-item>   
                <a-form-model-item label="label color" prop="labelColor">
                    <a-input type='color' v-model="taskInfo.labelColor"/>
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
            rules: {
                taskName: [{ required: true, message: 'Please set the title of task', trigger: 'blur' }],
            }
        }
    },
    // mounted(){
    //     console.log(this.taskInfo)
    // },
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
        submit(){
                let that = this;
                let taskInfo = this.taskInfo;
                this.$refs.newTaskForm.validate(async valid => {
                    if (valid) {
                        try{
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