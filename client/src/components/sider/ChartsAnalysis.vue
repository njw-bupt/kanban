<template>
    <div class='charts-info'>
        <div class='charts-title'>
            <div>
                <a-icon type="pie-chart" />
                <span>Charts</span> 
            </div>
            <div>
                <a-icon type="sync" @click='drawCharts' /> 
            </div>                
        </div>

        <div class='chart-canvas' ref="labelAnalysisBackground"></div>
        <div class='chart-canvas' ref="statusAnalysisBackground"></div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            allTasks: [],
            labels: []
        }
    },
    mounted(){
        this.drawCharts();
    },
    methods: {
        drawCharts(){
            let that = this;
            Promise.all([that.getAllLabels(), that.getAllTasks()]).then(()=>{
                that.drawLabelAnalysis();
                that.drawStatusAnalysis();
            }) 
        },
        async getAllTasks(){
            let userId = this.$route.params.id;
            try{
                this.allTasks = await this.$api.task.getAllTasks({userId});
            }catch(e){
                alert(e);
            }
        },
        async getAllLabels(){
            let userId = this.$route.params.id;
            try{
                this.labels = await this.$api.label.getAllLabels({userId});
            }catch(e){
                alert(e.message);
            }
        },
        async drawLabelAnalysis(){
            let that = this;

            let labelInfo = this.labels.map((item=>{
                let count = that.allTasks.filter((task)=>{
                    return task.labelName === item.labelName;
                }).length;
                let obj = {
                    name: item.labelName,
                    value: count,
                    itemStyle:{
                        color: item.labelColor
                    }
                }
                return obj;
            }))
            //console.log('labelInfo',labelInfo);          
            let chart = this.$echarts.init(that.$refs.labelAnalysisBackground);
            chart.setOption({
                title: { 
                    text: 'Label Analysis',
                    textStyle: {
                        fontSize: 12,
                    }
                },
                series : [
                    {
                        type: 'pie',
                        radius: '40%',
                        data: labelInfo
                    }
                ]
            });
        },
        async drawStatusAnalysis(){
            let that = this;
            let taskStatusInfo = new Map();
            this.allTasks.forEach(task=>{
                let count = taskStatusInfo.has(task.taskStatus)?taskStatusInfo.get(task.taskStatus)+1:1;
                taskStatusInfo.set(task.taskStatus,count);
            })
            //console.log('tasks:',taskStatusInfo);
            let taskStatusCount = [];
            for(let [status,count] of taskStatusInfo){
                let obj = {
                    name: status,
                    value: count
                }
                taskStatusCount.push(obj);
            }

            let chart = this.$echarts.init(that.$refs.statusAnalysisBackground);
            chart.setOption({
                title: { 
                    text: 'Task Status Analysis',
                    textStyle: {
                        fontSize: 12,
                    }
                },
                series : [
                    {
                        type: 'pie',
                        radius: '40%',
                        data: taskStatusCount
                    }
                ]
            });
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../../scss/common.scss';
.charts-info{
    padding: 5px 5px;
    .charts-title{
        font-size: $text-font-size;
        padding: 5px 5px;
        display: flex;
        justify-content: space-between;
        span{
            margin-left: 3px;
            font-weight: 600;
            }
    }
    .chart-canvas{
        height: 200px;
    }
}
</style>