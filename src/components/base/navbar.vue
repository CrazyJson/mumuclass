<template>
  <div>
    <div class="navbar" :class="{'show':isShow}">
      <a href="javascript:;" class="goback-index" >首页</a>
      <a href="javascript:;" class="btn-menu-close" @click="$emit('closeNav')">×</a>
      <div class="agency-img">
        <img :src="agencyImg" alt="木木教学" width="100%">
      </div>
      <div class="nav">
        <ul>
          <li v-for="item in menulist"><a href="#"><i :class="item.class"></i><span>{{item.name}}</span></a></li>
        </ul>
      </div>
    </div>
    <div class="navbar-shadow" v-show="isShow"  @click="$emit('closeNav')"></div>
  </div>
</template>

<script>
  export default {
    name: 'navbar',
    props:{
      isShow:false
    },
    data(){
      return {
        agencyImg:'http://static.mumuclass.com/schoolLogo/201803/20/1017287342018032009075976900000.jpg',
        menulist:[
          {'class':'icon-nav-ziyuan','name':'资 源'},
          {'class':'icon-nav-zujuan','name':'出题组卷'},
          {'class':'icon-nav-beike','name':'个人备课'},
          {'class':'icon-nav-jtbeike','name':'集体备课'},
          {'class':'icon-nav-homework','name':'作 业'},
          {'class':'icon-nav-error','name':'错题本'},
          {'class':'icon-nav-xueqing','name':'学期分析'},
          {'class':'icon-nav-contacts','name':'联系人'}
        ]
      }
    }
  }
</script>

<style>
  .navbar {
    position: fixed;
    width: 300px;
    height: 100%;
    left: -310px;
    top: 0;
    background: #fff;
    z-index: 20;
    overflow: auto;
    transition: all .4s;
  }
  .navbar.show{
    left: 0;
    transition: all .4s;
  }
  .navbar-shadow {
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    z-index: 19;
    background: rgba(0, 0, 0, 0.45)
  }

  .navbar .agency-img {
    width: 100%;
    height: 120px;
    line-height: 140px;
    text-align: center;
    overflow: hidden;
    background: -webkit-linear-gradient(#fff, #cef3f1);
    background: -moz-linear-gradient(#fff, #cef3f1);
    background: -o-linear-gradient(#fff, #cef3f1);
    background: linear-gradient(#fff, #cef3f1)
  }

  .navbar .agency-img img {
    border-radius: 6px
  }

  .goback-index {
    position: absolute;
    left: 5px;
    top: 5px;
    width: 52px;
    height: 24px;
    line-height: 24px;
    color: #fff;
    text-align: center;
    border-radius: 12px;
    background: #4bcac3
  }

  .btn-menu-close {
    position: absolute;
    width: 24px;
    height: 24px;
    right: 5px;
    top: 5px;
    background: #4bcac3;
    color: #fff;
    font-size: 20px;
    line-height: 24px;
    text-align: center;
    border-radius: 50%
  }

  .goback-index:hover, .btn-menu-close:hover {
    opacity: .9;
    color: #fff
  }
</style>
