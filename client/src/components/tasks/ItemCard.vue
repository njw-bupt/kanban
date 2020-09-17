<template>
    <div class='item-card'>
        <div class='item-card-title' @click='triggerContent' >
            <a-icon v-if='showDetail' type="down" title='click to hide detail info' class='item-card-title-icon'/>
            <a-icon v-else type="right" title='click to show detail info' class='item-card-title-icon'/>
            <p class='item-card-title-text'>{{ item.taskName }}</p>
            <div class='item-card-title-label' :style="{backgroundColor: labelColor}"></div>
        </div>
        <div class='item-card-content' :class='hideContent'>
            <p class='item-card-content-des'>{{ item.taskDescription }}</p>
            <div class='item-card-content-operate'>
                <a-button 
                    type="default" 
                    @click="$emit('change-task',item)"
                    v-if='status!=="done"'
                    size='small'
                    class='item-card-content-change-button'
                >Transfer</a-button>
                <a-button 
                    type="default" 
                    @click="$emit('delete-task',item.taskId)"
                    size='small'
                    class='item-card-content-delete-button'
                >Delete</a-button>
            </div>
            <p class='item-card-content-time' >{{ createdTime }}</p>
        </div>     
    </div>
</template>

<script>
export default {
    props: {
		status: String,
        item: Object,
    },
    data: function(){
        return {
            hideContent: {
                'card-content-hide': false
            },
            showDetail: true,
            labelColor: this.item.labelColor
        }
    },
    computed: {
        createdTime(){
            let time = Date.parse(this.item.createdAt);
            let now = Date.now();
            let days = Math.floor((now-time)/1000/60/60/24);
            if(days<1){
                return 'created within a day';
            }else if(days===1){
                return 'created 1 day ago';
            }else{
                return `created at ${days} days ago`;
            }
        }
    },
    methods: {
        triggerContent: function(){
            this.showDetail = !this.showDetail;
            this.hideContent['card-content-hide'] = !this.hideContent['card-content-hide'];
        }
    },
}
</script>

<style lang='scss' scoped>
@import '../../scss/common.scss';
.card-content-hide{
    display: none;
}
.item-card{
    width:280px;
    margin: 8px auto;
    .item-card-title{
        background-color: #f7f7f7;
        border: 1px solid #f2f2f2;
        font-size: $text-font-size;
        font-weight: 500;
        .item-card-title-icon, .item-card-title-text{
            display: inline-block;
            vertical-align: center;
        }
        .item-card-title-text{
            margin: 6px;
        }
        .item-card-title-label{
            float: right;
            margin: 10px;
            width: 12px;
            height: 12px;
        }
    }
    .item-card-content{
        background-color: #fff;
        border: 1px solid #f2f2f2;
        border-top-width: 0px;
        padding: 10px;
        font-weight: 500;
        .item-card-content-des{
            line-height: 2em;
        }
        .item-card-content-time{
            text-align: right;
        }
        .item-card-content-operate{
            margin: 10px 0px;
        }
        .item-card-content-change-button{
            background-color: #ebebeb;
            margin-right: 10px;
        }
        .item-card-content-delete-button{
            background-color: #c6c6c6;    
        }
    }
}
</style>