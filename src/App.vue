<template>
  <div>
    <div class="wrapper">
      <div class="el-header">
        <m-header :moduleName="headerprop.moduleName" :pageTabs="headerprop.pageTabs"></m-header>
      </div>
      <div class="container">
        <el-aside>
          <a href="#" class="toggle-book-tree ell" @click="toggleMaterialList">{{subject}}>{{book}} <span
            class="el-icon-caret-bottom"></span></a>
          <div class="lesson-tree">
            <el-tree :data="lessonData"
                     ref="tree"
                     default-expand-all
                     highlight-current
                     node-key="id"
                     @node-click="lessonNodeClick"
                     :props="{children: 'children',label: 'name'}
          "></el-tree>
          </div>
          <div class="material-list" v-show="isMaterialListShow">
            <ul v-for="item in subjectWithClassData">
              <p>{{item.studyPhaseName}}{{item.subjectName}}</p>
              <li v-for="list in item.teachingMaterial" @click="changeMaterial(list.bookId,item.subjectId)">
                <a href="#" :class="{ on: list.bookId== userSelected.bookId}">{{list.bookName}}</a>
              </li>
            </ul>
          </div>
        </el-aside>
        <el-main>
          <div class="resource-list" v-show="resourceLlist.length>0">
            <ul>
              <li v-for="item in resourceLlist">
                <div class="checkbox-div"><el-checkbox v-model="checked"></el-checkbox></div>
                <div class="info">
                  <span class="ico icon-word"></span>
                  <div class="fluid">
                    <p>
                      <a href="#" class="name">{{item.name}}</a>
                      <a href="#" class="el-icon-edit oper-rename"></a>
                    </p>
                    <p class="t-grey">
                      <span class="mr30">{{item.categoryName}}</span>
                      <span class="mr30">{{item.fileSize/1024}} KB</span>
                      <span class="mr30">{{item.uploadTime}}</span>
                    </p>
                    <div class="oper">
                      <a href="#"><i class="el-icon-star-on"></i>取消收藏</a>
                      <a href="#"><i class="el-icon-share"></i>分享</a>
                      <a href="#"><i class="el-icon-download"></i>下载</a>
                      <a href="#"><i class="el-icon-upload2"></i>置顶</a>
                      <a href="#"><i class="el-icon-setting"></i>移动到</a>
                    </div>
                  </div>
                </div>
                <a href="#" class=" el-icon-delete oper-del"></a>
              </li>
            </ul>
            <el-pagination
              @current-change="handleCurrentChange"
              :current-page="page.currentPage"
              layout="total, prev, pager, next"
              :total="page.totalCount">
            </el-pagination>
          </div>
          <div v-show="resourceLlist.length==0">暂无数据</div>
        </el-main>
      </div>
    </div>
  </div>
</template>

<script>
  import mHeader from './components/base/header'
  import api from './api'

  export default {
    name: 'App',
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
        subject: '',
        book: '',
        lessonData: [],
        subjectWithClassData: [],
        isMaterialListShow: false,
        checked: false,
        resourceLlist:[],
        page:{
          totalCount:0,
          currentPage:1
        }
      };
    },
    components: {
      mHeader
    },
    methods: {
      toggleMaterialList(){
        this.isMaterialListShow = this.isMaterialListShow == false;
      },
      changeMaterial(bookId, subjectId){
        let _this = this;
        api.getLessonList({bookId: bookId}).then(function (response) {
          if (response.code == 2000) {
            _this.lessonData = response.data.bookDirList;
            _this.subject = response.data.subjectName;
            _this.book = response.data.name;
            _this.isMaterialListShow = false;
          } else {
            alert(response.msg)
          }
        });
      },
      getUserSelectedLesson(){
        let _this = this;
        return new Promise(function (resolve, reject) {
          api.getUserSelectedLesson().then(function (response) {
            _this.userSelected = response;
            resolve(response);
          })
        })
      },
      getLessonData(){
        let _this = this;
        api.getLessonList({bookId: _this.userSelected.bookId}).then(function (response) {
          if (response.code == 2000) {
            _this.lessonData = response.data.bookDirList;
            _this.subject = response.data.subjectName;
            _this.book = response.data.name;
          } else {
            alert(response.msg)
          }
        })
      },
      getsubjectWithClass(){
        let _this = this;
        api.getsubjectWithClass().then(function (response) {
          _this.subjectWithClassData = response;
        })
      },
      getMyResource(pageNo){
        let _this = this;
        api.getMyResource({dirId: _this.userSelected.dirId,category: 0,searchName:'',rows: 10,page:pageNo}).then(function (response) {
          _this.resourceLlist = response.rows;
          _this.page.totalCount = response.paginator.totalCount;
        })
      },
      lessonNodeClick(data){
        this.userSelected.dirId = data.id;
        this.getMyResource(this.page.currentPage);
        this.page.currentPage = 1;
      },
      handleCurrentChange(val) {
        this.getMyResource(val);
      }

    },
    mounted () {
      let _this = this;
      _this.getUserSelectedLesson().then(function () {
        _this.getLessonData();
        _this.getsubjectWithClass();
        _this.getMyResource(_this.page.currentPage)
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
</style>
