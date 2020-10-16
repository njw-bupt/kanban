<template>
    <div class='user-info'>
        <div class='user-info-title'>
            <div>
                <a-icon type="user"/>
                <span class='user-name'>{{ userName }}</span>         
            </div>
            <a-dropdown>
                <a class="ant-dropdown-link" @click="e => e.preventDefault()">
                    <a-icon type="setting" :style="{color: '#000'}"/>
                </a>
                <a-menu slot="overlay">
                    <a-menu-item>
                        <a href="javascript:;" @click="logout">Sign out</a>
                    </a-menu-item>
                    <a-menu-item>
                        <a href="javascript:;" @click="register">Register</a>
                    </a-menu-item>
                </a-menu>
            </a-dropdown>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            userName: '',
        }
    },
    mounted(){
        this.getUserName();
    },
    methods: {
        async getUserName(){
            //根据userId获取username
            let userId = this.$route.params.id;
            try {
                this.userName = await this.$api.user.getUserNameById({userId});
            }catch(e){
                alert(e.message);
            }
        },
        logout(){
            this.$router.push({path:`/login`});
        },
        register(){
            this.$router.push({path:`/register`});
        }
    }
}
</script>

<style lang="scss" scoped>
    @import '../../scss/common.scss';
    .user-info {
        padding: 5px 5px;
        .user-info-title{
            font-size: $text-font-size;
            padding: 5px 5px;
            display: flex;
            justify-content: space-between;
            .user-name {
                margin-left: 3px;
                font-weight: 600;
            }
        }
    }
</style>