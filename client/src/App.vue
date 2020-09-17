<template>
  <div class="app" :style="{height: getBrowserHeight()}">
    <div class='app-header'>
			<p>KanBan WEB</p>
      <!-- <div class='app-login-panel'>
        <div class='app-login-button'><router-link to='/login'>login</router-link></div>
        <div class='app-login-button'><router-link to='/register'>register</router-link></div>     
      </div> -->
		</div>
    <div class='app-content'>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      //headerHeight: 0
    }
  },
  methods: {
    getBrowserHeight(){
      return window.innerHeight+"px";
    }
  },
  mounted(){
    //this.headerHeight = this.$refs.appHeader.scrollHeight;
  }
}
</script>

<style lang='scss'>
  @import 'scss/common.scss';
  .app{
    .app-header{
      height: $app-header-height;
      min-height: 40px;
      background-color: #27ae60;
      color: #fff;
      font-size: 25px;
      display: flex;
      justify-content: space-between;
        p{
          margin-left: 10px;
          display:inline-block;
        }
        // .app-login-panel{
        //   display: inline-block;
        //   .app-login-button{
        //     display: inline-block;
        //     border: 1px solid #e1e4e8;
        //     border-radius: 6px;
        //     margin-right: 10px;
        //     padding: 4px 8px;
        //     font-size: 14px;
        //   }
        // }
    }
  }
</style>
