<template>
    <div class='charts-info'>
        <div class='charts-title'>
            <a-icon type="pie-chart" />
            <span>Charts</span>         
        </div>

        <div class='chart-canvas' ref="background"></div>
    </div>
</template>

<script>
export default {
    mounted(){
        this.drawStatusPie();
    },
    methods: {
        drawStatusPie(){
            //let that = this;
            //let chart = this.$echarts.init(that.$refs.background);
            // chart.setOption({
            //     title: { text: '在Vue中使用echarts' },
            //     tooltip: {},
            //     xAxis: {
            //         data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
            //     },
            //     yAxis: {},
            //     series: [{
            //         name: '销量',
            //         type: 'bar',
            //         data: [5, 20, 36, 10, 10, 20]
            //     }]
            // });
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
        height: 100px;
    }
}
</style>