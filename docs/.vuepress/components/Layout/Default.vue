<template>
  <!-- 默认布局：按钮+文字 -->
  <div class="layout-default">
    <a href="/ns-blog/notes/" class="button">Let's start!</a>
    <div class="text">
      <!-- 文字通过插槽传入 -->
      <Content slot-key="default" />
    </div>
  </div>
</template>

<script>
  export default {};
</script>

<style scoped>
  .layout-default {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    background-image: url("../../public/images/picture/girl.png");
    background-repeat: no-repeat;
    background-size: cover;
  }
  .layout-default::before {
    content: "";
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    opacity: 0.1;
    z-index: -1;
  }
  .layout-default .button {
    display: inline-block;
    height: 40px;
    line-height: 40px;
    color: #fff;
    background-color: #4bb1bb;
    padding: 0 20px;
    border-radius: 4px;
    transition: background-color 0.1s ease;
    box-sizing: border-box;
    text-decoration: none;
    cursor: pointer;
  }
  .layout-default .button:hover {
    background-color: #5db9c2;
  }
  .layout-default .text {
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #fff;
  }
</style>
