<template>
    <div class='task-manager'>
        <div class='task-manager-sider'>
            <user-info></user-info>
            <hr />
            <label-info></label-info>
            <hr />
            <charts-analysis></charts-analysis>
        </div>
        <div class='task-manager-content'>
            <item-list 
                    status='todo'
                    v-bind:items='todoItems'
                    @delete-task='deleteTask'
                    @change-task='changeTask'
                    @update-task='updateTask'
            ></item-list>
            <item-list  
                    status='doing'
                    v-bind:items='doingItems'
                    @delete-task='deleteTask'
                    @change-task='changeTask'
            ></item-list>
            <item-list  
                    status='done'
                    v-bind:items='doneItems'
                    @delete-task='deleteTask'
            ></item-list>
        </div>
	</div>
</template>

<script>
import ItemList from './ItemList';
import UserInfo from '../sider/UserInfo';
import LabelInfo from '../sider/LabelInfo';
import ChartsAnalysis from '../sider/ChartsAnalysis';
export default {
    components: {
        ItemList,
        UserInfo,
        LabelInfo,
        ChartsAnalysis
    },
    data(){
        return {
            allTasks: [],
            userId: this.$route.params.id,
        }
    },
    computed: {
		todoItems: function(){
			return this.allTasks.filter(item=>item.taskStatus==='todo')
		},
		doingItems: function(){
			return this.allTasks.filter(item=>item.taskStatus==='doing')
		},
		doneItems: function(){
			return this.allTasks.filter(item=>item.taskStatus==='done')
		}
	},
    methods: {
        //添加新task后更新数据
        updateTask(){
            this.getAllTasks();
        },
        async getAllTasks(){
            //let userId = this.$route.params.id;
            let userId = this.userId;
            try{
                this.allTasks = await this.$api.task.getAllTasks({userId});
            }catch(e){
                alert(e);
            }
        },
        async deleteTask(taskId){
            let userId = this.userId;
            try{
                await this.$api.task.deleteTask({userId, taskId});
                this.getAllTasks();
            }catch(e){
                alert(e);
            }
        },
        async changeTask(task){
            let userId = this.userId,
                taskId = task.taskId,
                taskStatus = '';
            switch(task.taskStatus){
                case 'todo':
                    taskStatus = 'doing';
                    break;
                case 'doing':
                    taskStatus = 'done';
                    break;
            }
            let updateInfo = {
                taskStatus
            }
            try{
                await this.$api.task.updateTask({userId, taskId, updateInfo});
                this.getAllTasks();
            }catch(e){
                alert(e);
            }
        }
    },
    mounted(){
        this.getAllTasks();
        
    }
}
</script>

<style lang="scss">
    .task-manager{
        // white-space: nowrap;
        // overflow-x: scroll;
        .task-manager-content{
            display: flex;
            margin-right: 300px;
        }
        .task-manager-sider{
            width: 300px;
            float: right;
            hr{
                height: 1px;
                margin: 5px;
                border: 0;
                background-color: #a9a0a6;
            }
        }
    }
</style>