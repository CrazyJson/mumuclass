<template>
  <div>
    <a href="#" class="toggle-book-tree ell" @click="toggleMaterialList">{{subjectName}}>{{bookName}} <span class="el-icon-caret-bottom"></span></a>
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
      <textbook-tree></textbook-tree>
    </div>

  </div>

</template>

<script>
  import textbookTree from 'textbooktree'
  export default {
    name: 'lessontree',
    props:{

    },
    components: {
      textbookTree
    },
    data(){
      return {
        bookId:'',
        subjectId:'',
        dirId:'',
        subjectName: '',
        bookName: '',
        lessonData:[],
        isMaterialListShow: false
      }
    },
    methods: {
      toggleMaterialList(){
        this.isMaterialListShow = this.isMaterialListShow == false;
      },
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
      lessonNodeClick(data){
        this.userSelected.dirId = data.id;
        this.page.currentPage = 1;
        this.loading= true;
        this.getMyResource(this.page.currentPage,0);

      },
    }
  }
</script>

<style scoped>
  .lesson-tree{
    position: absolute;
    width: 100%;
    left: 0;
    top:52px;
    bottom: 0;
    overflow: auto;
    background: #fff;
    border-right: 1px solid #dbdbdb;
  }
</style>
