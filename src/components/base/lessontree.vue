<template>
  <div>
    <div class="lesson-tree">
      <el-tree
        :data="lessonData"
        ref="tree"
        default-expand-all
        highlight-current
        node-key="id"
        :props="{
        children: 'children',
        label: 'name'}
    "></el-tree>
    </div>

  </div>

</template>

<script>
  export default {
    name: 'lessontree',
    props:{

    },
    data(){
      return {
        bookId:'',
        subjectId:'',
        dirId:'',
        lessonData:[]
      }
    },
    methods: {
      getLessonData(){
        let _this = this;
        api.getLessonList({bookId:_this.bookId}).then(function (response) {
          if(response.code == 2000){
            _this.lessonData = response.data.bookDirList;
            _this.subject = response.data.subjectName;
            _this.book = response.data.name;
            _this.fullscreenLoading = false;
          }else{
            alert(response.msg)
          }
        })
      },
    }
  }
</script>

<style>
  .lesson-tree,.material-list{
    position: absolute;
    width: 100%;
    left: 0;
    top:52px;
    bottom: 0;
    overflow: auto;
    background: #fff;
    border-right: 1px solid #dbdbdb;
  }
  .material-list{z-index: 10;}
  .material-list ul p{
    font-size: 16px;
    padding-left: 20px;
    background: #EFEFEF;
    line-height: 46px;
    border-bottom: 1px solid #dbdbdb;
  }
  .material-list a{
    display: block;
    color: #333;
    padding: 10px 30px;
    border-bottom: 1px solid #dbdbdb;
    position: relative;
  }
  .material-list a.on{
    background: #9ee2de;
  }
  .material-list a.on:after{
    content: "\E639";
    font-family: element-icons!important;
    speak: none;
    font-style: normal;
    font-weight: 400;
    font-variant: normal;
    text-transform: none;
    line-height: 1;
    position: absolute;
    right: 10px;
    color: #06a298;
    font-size:24px;
    top:9px;
  }
</style>
