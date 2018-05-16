<template>
  <div>
    <div class="mheader">
      <div class="menubtn"><a href="javascript:;" @click="showNav"><i class="el-icon-menu"></i></a></div>
      <div class="m-name">{{moduleName}}</div>
      <div class="page-tabs">
        <a v-for="item in pageTabs" :href="item.url" :class="{on: item.isActive}">{{item.name}}</a>
      </div>
    </div>
    <div>
      <navbar :isShow="navbarShow" @closeNav="closeNav"></navbar>
    </div>
  </div>

</template>

<script>
  import navbar from './navbar'
export default {
  name: 'mheader',
  data(){
    return {
      navbarShow: false
    };
  },
  components: {
    navbar
  },
  props:{
    moduleName:String,
    pageTabs:Array,
    btns:Array,
    goPrevBtn:{
      type:Boolean,
      default:false
    },
    subPageName:{
      type:String,
      default:''
    }
  },
  methods:{
    showNav:function () {
      this.navbarShow = true
    },
    closeNav:function () {
      this.navbarShow = false
    }
  }
}
</script>

<style>
  .mheader{
    width: 100%;
    height: 100%;
  }
  .menubtn{
    float: left;
    width: 60px;
    height: 60px;
    background: #027971;
    padding-top: 13px;
    padding-left: 13px;
  }
  .menubtn a{
    display: block;
  }
  .menubtn a i{
    display: block;
    width: 34px;
    height: 34px;
    background: #008c83;
    font-size: 20px;
    color: #b5fffb;
    text-align: center;
    line-height: 34px;
    border-radius: 50%;
  }
  .m-name{
    float: left;
    width: 240px;
    line-height: 60px;
    font-size:20px;
    padding-left: 20px;
    background: #06a298;
  }
  .page-tabs a{
    float: left;
    line-height: 60px;
    padding: 0 30px;
    color: #fff;
    font-size: 16px;
  }
  .page-tabs a.on{
    background: #00827b;
  }
</style>
