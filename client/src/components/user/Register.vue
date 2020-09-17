<template>
    <div class='register'>
        <p class='register-title'>create your account</p>
        <a-form-model class='register-form' ref="newUserForm" :model="userInfo" :rules="rules" layout="vertical" label-align="left">
            <a-form-model-item label="username" prop="userName">
                <a-input v-model="userInfo.userName"/>
            </a-form-model-item>  
            <a-form-model-item label="password" prop="password">
                <a-input-password v-model="userInfo.password"/>
            </a-form-model-item>  
            <a-form-model-item label="confirm your password" prop="checkPassword">
                <a-input-password v-model="userInfo.checkPassword"/>
            </a-form-model-item>  
            <div class='control-panel'>
                <a-form-model-item>
                    <a-button type="primary" @click="submit" :disabled="userInfo.userName==='' || userInfo.password==='' || userInfo.checkPassword===''">
                        create
                    </a-button>
                </a-form-model-item>
                <a-form-model-item>
                    <a-button @click="login">
                        login
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
                    userName: '',
                    password: '',
                    checkPassword: ''
                },
                rules: {
                    userName: [
                        { required: true, message: 'Please set username.', trigger: 'blur' },
                        {
                            validator: async (rule,value,callback) => {
                            let res = await this.$api.user.uniqueName({userName:this.userInfo.userName});
                            if(!res){
                                callback("Already exist! Please re-entry.");
                            }
                                callback();
                            }, 
                            trigger: 'blur'
                        }
                    ],
                    password: [{ required: true, message: 'Please set password', trigger: 'blur' }],          
                    checkPassword: [
                        { required: true, message: 'Please input your password again.', trigger: 'blur' },
                        { 
                            validator: (rule,value,callback) => {
                                if(this.userInfo.password !== value){
                                    callback("the two passwords you typed do not match.");
                                }
                                callback();
                            }, 
                            trigger: 'blur'
                        }
                    ],          
                },
            };
        },
        methods: {
            submit() {
                let that = this;
                let newUserInfo = this.userInfo;
                let router = this.$router;
                this.$refs.newUserForm.validate(async valid => {
                    if (valid) {
                        try{
                            let res = await that.$api.user.register(newUserInfo);
                            //跳转到登录页 res.userName自动填充
                            router.push({path:`/login/${res.userName}`});
                        }catch(e){
                            console.log(e.message);
                        }                                         
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            login(){
                this.$router.push({path:`/login`});
            }
        }
    };
</script>


<style lang="scss" scoped>
    .register{
        min-width: 300px;
        margin: 0 auto;
        padding: 20px;
        .register-title{
            text-align: center;
            font-size: 25px;
        }
        .register-form{
            width: 400px;
            margin: 0 auto;
            .control-panel{
                display: flex;
                justify-content: space-between;
            }
        }
    }
</style>