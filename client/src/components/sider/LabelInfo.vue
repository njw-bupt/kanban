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
            >{{ label.labelName }}</div>
            <a-icon class='label-add-icon' type="plus-square" />
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            labels: [],
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
                console.log(this.labels);
            }catch(e){
                alert(e.message);
            }
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
                //color: #a9a0a6;
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
            }
            .label-add-icon{
                font-size: 20px;
                //color: '#a9a0a6'
                display: flex;
                align-items: center;
            }
        }
    }
</style>