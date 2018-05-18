<template>
  <div>
    <span class="ico" :class="fileIco(item.fileType)"></span>
  </div>
</template>

<script>
  export default {
    name: 'fileicon',
    props:{

    },
    data(){
      return {

      }
    },
    methods: {
      fileTypeIco:function (fileType) {
        let icoType = '';
        switch (fileType){
          case 'T001':
            icoType='ppt';
            break;
          case 'T002':
            icoType='word';
            break;
          case 'T003':
            icoType='video';
            break;
          case 'T004':
            icoType='music';
            break;
          case 'T005':
            icoType='img';
            break;
          case 'T007':
            icoType='pdf';
            break;
          case 'T008':
            icoType='txt';
            break;
          case 'T009':
            icoType='excel';
            break;
          case 'T010':
            icoType='micro';
            break;
          default:
            icoType='png';
            break;
        }
        return 'icon-'+icoType;
      }
    }
  }
</script>

<style scoped>
  .ico {
    display: inline-block;
    width: 48px;
    height: 48px;
    background: url("../../assets/fileicon.png") no-repeat
  }

  .ico.icon-word {
    background-position: -10px -10px
  }

  .ico.icon-ppt {
    background-position: -68px -10px
  }

  .ico.icon-pdf {
    background-position: -126px -10px
  }

  .ico.icon-txt {
    background-position: -184px -10px
  }

  .ico.icon-excel {
    background-position: -242px -10px
  }

  .ico.icon-img {
    background-position: -300px -10px
  }

  .ico.icon-video {
    background-position: -358px -10px
  }

  .ico.icon-music {
    background-position: -242px -68px
  }

  .ico.icon-package {
    background-position: -126px -68px
  }

  .ico.icon-exam {
    background-position: -300px -68px
  }

  .ico.icon-micro {
    background-position: -358px -68px
  }

  .ico-md {
    display: inline-block;
    width: 32px;
    height: 32px;
    background: url("../../assets/fileicon.png") no-repeat
  }

  .ico-md.icon-word {
    background-position: -10px -136px
  }

  .ico-md.icon-ppt {
    background-position: -52px -136px
  }

  .ico-md.icon-pdf {
    background-position: -94px -136px
  }

  .ico-md.icon-txt {
    background-position: -136px -136px
  }

  .ico-md.icon-excel {
    background-position: -178px -136px
  }

  .ico-md.icon-img {
    background-position: -220px -136px
  }

  .ico-md.icon-video {
    background-position: -262px -136px
  }

  .ico-md.icon-music {
    background-position: -178px -178px
  }

  .ico-md.icon-package {
    background-position: -94px -178px
  }

  .ico-md.icon-exam {
    background-position: -220px -178px
  }

  .ico-md.icon-micro {
    background-position: -262px -178px
  }

  .ico-sm {
    display: inline-block;
    width: 16px;
    height: 16px;
    background: url("../../assets/fileicon.png") no-repeat
  }

  .ico-sm.icon-word {
    background-position: -10px -230px
  }

  .ico-sm.icon-ppt {
    background-position: -36px -230px
  }

  .ico-sm.icon-pdf {
    background-position: -62px -230px
  }

  .ico-sm.icon-txt {
    background-position: -88px -230px
  }

  .ico-sm.icon-excel {
    background-position: -114px -230px
  }

  .ico-sm.icon-img {
    background-position: -140px -230px
  }

  .ico-sm.icon-video {
    background-position: -166px -230px
  }

  .ico-sm.icon-music {
    background-position: -114px -256px
  }

  .ico-sm.icon-package {
    background-position: -62px -256px
  }

  .ico-sm.icon-exam {
    background-position: -140px -256px
  }

  .ico-sm.icon-micro {
    background-position: -166px -256px
  }

</style>
