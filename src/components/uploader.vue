<template>
  <uploader :options="options" class="uploader">
    <uploader-unsupport></uploader-unsupport>
    <uploader-btn>上传文件</uploader-btn>
    <uploader-btn :directory="true">上传文件夹</uploader-btn>
    <uploader-drop>
      <p>拖拽文件至此处上传</p>
    </uploader-drop>
    <uploader-list></uploader-list>
  </uploader>
</template>

<script>
export default {
  data () {
    return {
      options: {
        // 可通过 https://github.com/simple-uploader/Uploader/tree/develop/samples/Node.js 示例启动服务
        target: '//localhost:3000/upload',
        testChunks: false
      },
      attrs: {
        accept: 'image/*'
      }
    }
  }
}
</script>

<style>
  .uploader {
    width: 880px;
    padding: 15px;
    margin: 40px auto 0;
    font-size: 12px;
    box-shadow: 0 0 10px rgba(0, 0, 0, .4);
  }
  .uploader .uploader-btn {
    margin-right: 4px;
  }
  .uploader .uploader-list {
    max-height: 440px;
    overflow: auto;
    overflow-x: hidden;
    overflow-y: auto;
  }
</style>
