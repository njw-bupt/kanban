<template>
    <div class="login">
        <div class='app-icon'><a-icon type="edit" /></div>
        <p class='login-title'>Sign in to KanBan Web</p>
        <a-form-model class='login-form' layout="vertical" ref="loginForm" :rules="rules" :model="userInfo" @submit="handleSubmit" @submit.native.prevent>
            <a-form-model-item prop="userName">
                <a-input v-model="userInfo.userName" placeholder="username">
                    <a-icon slot="prefix" type="user" style="color:rgba(0,0,0,.25)" />
                </a-input>
            </a-form-model-item>
            <a-form-model-item prop="password">
                <a-input-password v-model="userInfo.password" placeholder="password">
                    <a-icon slot="prefix" type="lock" style="color:rgba(0,0,0,.25)" />
                </a-input-password>
            </a-form-model-item>
            <div class="control-panel">
                <a-form-model-item>
                    <a-button
                        type="primary"
                        html-type="submit"
                        :disabled="userInfo.user === '' || userInfo.password === ''"
                    >
                        sign in
                    </a-button>
                </a-form-model-item>
                <a-form-model-item>
                    <a-button @click='register'>
                        register
                    </a-button>
                </a-form-model-item>
            </div>           
        </a-form-model>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                userInfo: {
                    userName: this.$route.params.pathMatch.substring(1),
                    password: '',
                },
                rules: {
                    userName: [{ required: true, message: 'Please input username.', trigger: 'blur' }],
                    password: [{ required: true, message: 'Please input password', trigger: 'blur' }]
                }
            };
        },
        methods: {
            handleSubmit() {
                let that = this;
                let userInfo = this.userInfo;
                let router = this.$router;
                this.$refs.loginForm.validate(async valid => {
                    if (valid) {
                        try{
                            let res = await that.$api.user.login(userInfo);
                            window.localStorage.setItem('token',res.token);
                            router.push({path:`/tasks/${res.userId}`})
                        }catch(e){
                            alert('request error',e)
                        }                                   
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            register(){
                this.$router.push({path:`/register`});
            }
        }
    };
</script>

<style lang='scss' scoped>
    .login{
        margin: 70px auto auto auto;
        .login-title, .app-icon{
            text-align: center;
            font-size: 25px;
            margin-bottom: 20px;
        }
        .login-form{
            width: 300px;
            border: 1px solid black;
            padding: 20px 20px 0 20px;
            margin: 0 auto;
            .control-panel{
                display: flex;
                justify-content: space-between;
            }
        }
    }
</style>
