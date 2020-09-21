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
            <button v-if='statusTitle==="Todo"' @click='showAddForm=true'>Add Card</button>
            <add-form v-if='statusTitle==="Todo"' :show-add-form='showAddForm' @close-add-form='closeAddForm'></add-form>
       
    </div>
</template>

<script>
import ItemCard from './ItemCard.vue';
import AddForm from './AddForm.vue';

export default {
    data(){
        return{
            showAddForm: false
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
        ItemCard,
        AddForm
    },
    computed: {
        statusTitle: function(){
            let arr = this.status.split('');
            arr[0] = arr[0].toUpperCase();
            return arr.join('');
        }
    },
    methods: {
        closeAddForm(){
            this.showAddForm = false;
            this.$emit("update-task");
        }
    }
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