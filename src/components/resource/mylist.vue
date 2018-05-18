<template>
  <div>
    <div class="wrapper" v-loading="loading">
      <div class="el-header">
        <m-header :moduleName="headerprop.moduleName" :pageTabs="headerprop.pageTabs"></m-header>
      </div>
      <div class="container">
        <el-aside>
          <lesson-tree ></lesson-tree>
        </el-aside>
        <el-main>
          <div class="resource-top">
            <a href="#" @click="getMyResource(1,0)">全部</a>
            <a href="#" @click="getMyResource(1,'C002')">教案</a>
            <a href="#" @click="getMyResource(1,'C003')">课件</a>
            <a href="#" @click="getMyResource(1,'C009')">学案</a>
            <a href="#" @click="getMyResource(1,'C006')">试卷</a>
            <a href="#" @click="getMyResource(1,'C004')">素材</a>
            <a href="#" @click="getMyResource(1,'C001')">微课</a>
            <a href="#" @click="getMyResource(1,'C008')">其他</a>
            <el-input placeholder="请输入关键字搜索" style="width: 180px;"  size="small">
              <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
            <el-button type="warning" icon="el-icon-upload" round size="small" class="fr">上传文件</el-button>
          </div>
          <div class="resource-list" v-show="resourceLlist.length>0">
            <div class="mult-oper">
              <el-checkbox v-model="checkAll">全选</el-checkbox>
              <el-button type="success" icon="el-icon-edit" size="mini"></el-button>
              <el-button type="success" icon="el-icon-share" size="mini"></el-button>
              <el-button type="danger" icon="el-icon-delete" size="mini"></el-button>
            </div>
            <ul>
              <li v-for="item in resourceLlist">
                <div class="checkbox-div"><el-checkbox v-model="checked"></el-checkbox></div>
                <div class="info">
                  <file-icon></file-icon>
                  <div class="fluid">
                    <p>
                      <a href="#" class="name">{{item.name}}</a>
                    </p>
                    <p class="t-grey">
                      <span class="mr30">{{item.categoryName}}</span>
                      <span class="mr30">{{item.fileSize | calcFileSize}}</span>
                      <span class="mr30">{{$formatDate(item.uploadTime,"YYYY-MM-DD")}}</span>
                    </p>
                    <div class="oper">
                      <el-button type="success" icon="el-icon-edit" circle size="mini" @click="renameMyResource({resId:item.id,faId:item.faId,rename:'03月份需求列表11.xls'})"></el-button>
                      <el-button type="success" icon="el-icon-share" circle size="mini"></el-button>
                      <el-button type="danger" icon="el-icon-delete" circle size="mini"></el-button>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
            <el-pagination
              @current-change="handleCurrentChange"
              :current-page.sync="page.currentPage"
              layout="total, prev, pager, next"
              :total="page.totalCount">
            </el-pagination>
          </div>
          <div v-show="resourceLlist.length==0" class="nodata-search"><img src="./assets/nodata-search.png"></div>
        </el-main>
      </div>
    </div>
  </div>
</template>

<script>
  import mHeader from '../base/header'
  import lessonTree from '../base/lessontree'
  import fileIcon from '../base/flieicon.vue'
  import api from '../../api'

  export default {
    name: 'mylist',
    data(){
      return {
        headerprop: {
          moduleName: '资源中心',
          pageTabs: [
            {'name': '我的资源', 'url': 'http://www.mumuclass.com', isActive: true},
            {'name': '官网资源', 'url': 'http://www.mumuclass.com', isActive: false},
            {'name': '共享资源', 'url': 'http://www.mumuclass.com', isActive: false},
            {'name': '校本资源', 'url': 'http://www.mumuclass.com', isActive: false}
          ],
          btns: [
            {'name': '组题记录', 'url': 'http://www.mumuclass.com'},
            {'name': '购物车', 'url': '#'}
          ],
          goPrevBtn: false,
          subPageName: ''
        },
        userSelected: {},
        checked: false,
        checkAll:false,
        resourceLlist:[],
        page:{
          totalCount:0,
          currentPage:1
        },
        loading:true
      };
    },
    components: {
      mHeader,
      lessonTree,
      fileIcon
    },
    methods: {
      getUserSelectedLesson(){
        let _this = this;
        return new Promise(function (resolve, reject) {
          api.getUserSelectedLesson().then(function (response) {
            _this.userSelected = response;
            resolve(response);
          })
        })
      },
      getMyResource(pageNo,category){
        let _this = this;
        api.getMyResource({dirId: _this.userSelected.dirId,category: category,searchName:'',rows: 10,page:pageNo}).then(function (response) {
          _this.resourceLlist = response.rows;
          _this.page.totalCount = response.paginator.totalCount;
          _this.loading= false;
        })
      },
      handleCurrentChange(val) {
        this.getMyResource(val,0);
      },
      renameMyResource(params){
        let _this = this;
        api.renameMyResource(params).then(function (response) {
          _this.getMyResource(1,0);
        })
      }
    },
    filters:{
      calcFileSize:function (size) {
        if(size < 1024*1024){
          return (size / 1024).toFixed(1)+'KB';
        }else{
          return (size / (1024*1024)).toFixed(2)+'M';
        }
      }
    },
    mounted () {
      let _this = this;
      _this.getUserSelectedLesson().then(function () {
        _this.getLessonData(_this.userSelected.bookId);
        _this.getsubjectWithClass();
        _this.getMyResource(_this.page.currentPage,0)
      });
    },
    updated: function () {
      this.$nextTick(function () {
        this.$refs.tree.setCurrentKey(this.userSelected.dirId);
      })
    }
  }
</script>

<style>
  @import '/assets/style/base';

  .wrapper {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
  }

  .el-header {
    position: absolute;
    width: 100%;
    height: 60px;
    left: 0;
    top: 0;
    background-color: #00b4aa;
    color: #fff;
    padding: 0;
  }

  .container {
    position: absolute;
    width: 100%;
    left: 0;
    top: 60px;
    bottom: 0;
  }

  .el-aside {
    position: absolute;
    width: 300px;
    height: 100%;
    left: 0;
    top: 0;
    background-color: #D3DCE6;
    color: #333;
  }

  .el-aside + .el-main {
    width: 100%;
    height: 100%;
    padding: 0;
    padding-left: 300px;
    overflow: auto;
    background: #f2f2f2;
  }

  .toggle-book-tree {
    position: relative;
    display: block;
    color: #fff;
    padding-left: 15px;
    padding-right: 30px;
    height: 52px;
    line-height: 52px;
    font-size: 16px;
    background: #00b4aa;
  }

  .toggle-book-tree span {
    position: absolute;
    right: 15px;
    top: 20px;
  }

  .lesson-tree, .material-list {
    position: absolute;
    width: 100%;
    left: 0;
    top: 52px;
    bottom: 0;
    overflow: auto;
    background: #fff;
    border-right: 1px solid #dbdbdb;
  }

  .material-list {
    z-index: 10;
  }

  .material-list ul p {
    font-size: 16px;
    padding-left: 20px;
    background: #EFEFEF;
    line-height: 46px;
    border-bottom: 1px solid #dbdbdb;
  }

  .material-list a {
    display: block;
    color: #333;
    padding: 10px 30px;
    border-bottom: 1px solid #dbdbdb;
    position: relative;
  }

  .material-list a.on {
    background: #9ee2de;
  }

  .material-list a.on:after {
    content: "\E639";
    font-family: element-icons !important;
    speak: none;
    font-style: normal;
    font-weight: 400;
    font-variant: normal;
    text-transform: none;
    line-height: 1;
    position: absolute;
    right: 10px;
    color: #06a298;
    font-size: 24px;
    top: 9px;
  }

  .el-tree-node__content {
    width: 100%;
    height: 36px;
    line-height: 36px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .resource-top{
    height: 52px;
    padding: 10px;
    background: #f5f8f8;
  }
  .mult-oper{
    padding: 10px;
  }
  .mult-oper .el-checkbox{
    margin-right: 10px;
  }
  .resource-top>a{
    display: inline-block;
    font-size: 14px;
    height: 24px;
    line-height: 24px;
    padding: 0 12px;
    color: #666;
    border-radius: 24px;
  }
  .resource-top>a.on{
    background: #00b4aa;
    color: #fff;
  }
  .nodata-search{
    padding: 40px;
    text-align: center;
    background: #fff;
  }
</style>
