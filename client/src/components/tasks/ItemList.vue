<template>
    <div class='item-list'>
        <p class='item-list-title'>{{ statusTitle }}</p>
            <item-card
                v-for='(item) in items'
                v-bind:item='item'
                v-bind:key='item.name'
                v-bind:status='status'
                @delete-task='$emit("delete-task",$event)'
                @change-task='$emit("change-task",$event)'		
            ></item-card>
       
    </div>
</template>

<script>
import ItemCard from './ItemCard.vue';

export default {
    data(){
        return{

        }
    },
	props: {
		status: {
			type: String,
			required: true
		},
        items: Array,
    },
	components: {
		ItemCard
    },
    computed: {
        statusTitle: function(){
            let arr = this.status.split('');
            arr[0] = arr[0].toUpperCase();
            return arr.join('');
        }
    },
}
</script>

<style lang='scss' scoped>
@import '../../scss/common.scss';
.item-list{
    border-right: 5px solid #d5d5d5;
    height: $app-content-list-height; 
    flex-grow: 1;
    background-color: #dedede;
    .item-list-title{
        font-size: 20px;
        font-weight: 500;
        padding-left: 10px;
        background-color: #e4e4e4;
        line-height: 2em;
    }
}
</style>