<template>
    <div class='charts-info'>
        <div class='charts-title'>
            <a-icon type="pie-chart" />
            <span>Charts</span>         
        </div>

        <div class='chart-canvas' ref="labelAnalysisBackground"></div>
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
        let that = this;
        Promise.all([that.getAllLabels(), that.getAllTasks()]).then(()=>{
            that.drawLabelAnalysis();
        }) 
    },
    methods: {
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
        }
    }
}
</script>

<style lang="scss" scoped>
.charts-info{
    padding: 5px 5px;
    .charts-title{
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