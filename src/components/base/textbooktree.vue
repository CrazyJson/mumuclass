<template>
  <div>
    <div class="textbook-tree">
      <ul v-for="item in subjectWithClassData">
        <p>{{item.studyPhaseName}}{{item.subjectName}}</p>
        <li v-for="list in item.teachingMaterial" @click="changeMaterial(list.bookId,item.subjectId)">
          <a href="#" :class="{ on: list.bookId== userSelected.bookId}">{{list.bookName}}</a>
        </li>
      </ul>
    </div>

  </div>

</template>

<script>
  export default {
    name: 'textbooktree',
    props:{

    },
    data(){
      return {
        bookId:'',
        subjectId:'',
        dirId:'',
        subjectWithClassData: [],
      }
    },
    methods: {
      getsubjectWithClass(){
        let _this = this;
        api.getsubjectWithClass().then(function (response) {
          _this.subjectWithClassData = response;
        })
      },
      changeMaterial(bookId, subjectId){
        let _this = this;
        this.loading= true;
        this.getLessonData(bookId).then(function (data) {
          let first = _this.lessonData[0];
          if(first.children && first.children.length>0){
            _this.userSelected.dirId =first.children[0].id;
          }else{
            _this.userSelected.dirId =first.id;
          }
          _this.getMyResource(1,0);
        });
        this.isMaterialListShow = false;
        this.userSelected.bookId = bookId;
      },
    }
  }
</script>

<style scoped>
  .textbook-tree{
    position: absolute;
    width: 100%;
    left: 0;
    top:52px;
    bottom: 0;
    overflow: auto;
    background: #fff;
    border-right: 1px solid #dbdbdb;
  }
  .textbook-tree{z-index: 10;}
  .textbook-tree ul p{
    font-size: 16px;
    padding-left: 20px;
    background: #EFEFEF;
    line-height: 46px;
    border-bottom: 1px solid #dbdbdb;
  }
  .textbook-tree a{
    display: block;
    color: #333;
    padding: 10px 30px;
    border-bottom: 1px solid #dbdbdb;
    position: relative;
  }
  .textbook-tree a.on{
    background: #9ee2de;
  }
  .textbook-tree a.on:after{
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
