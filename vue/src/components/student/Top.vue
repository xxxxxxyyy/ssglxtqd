<template>
  <!--  <div class="load"></div>-->

  <div class="loader" style="height:60px;line-height: 60px">
    <span>学生宿舍管理系统</span>
    <span>学生宿舍管理系统</span>
  </div>
</template>

<script setup>

</script>

<style scoped>
.loader {
  position: relative;
}

.loader span {
  font-size: 30px;
  position: absolute;
  /*transform: translate(-50%, -50%);*/
  letter-spacing: 5px;
  font-family: "行楷", cursive;
}

.loader span:nth-child(1) {
  color: transparent;
  -webkit-text-stroke: 0.3px rgb(255, 255, 255);
}

.loader span:nth-child(2) {
  color: rgb(255, 255, 255);
  -webkit-text-stroke: 1px rgb(255, 255, 255);
  animation: uiverse723 3s ease-in-out infinite;
}

@keyframes uiverse723 {
  0%, 100% {
    clip-path: polygon(0% 45%, 15% 44%, 32% 50%,
    54% 60%, 70% 61%, 84% 59%, 100% 52%, 100% 100%, 0% 100%);
  }

  50% {
    clip-path: polygon(0% 60%, 16% 65%, 34% 66%,
    51% 62%, 67% 50%, 84% 45%, 100% 46%, 100% 100%, 0% 100%);
  }
}
.load {
  width: 44.8px;
  height: 44.8px;
  color: #554cb5;
  position: relative;
  background: radial-gradient(11.2px,currentColor 94%,#0000);
}

.load:before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 50%;
  background: radial-gradient(10.08px at bottom right,#0000 94%,currentColor) top    left,
  radial-gradient(10.08px at bottom left ,#0000 94%,currentColor) top    right,
  radial-gradient(10.08px at top    right,#0000 94%,currentColor) bottom left,
  radial-gradient(10.08px at top    left ,#0000 94%,currentColor) bottom right;
  background-size: 22.4px 22.4px;
  background-repeat: no-repeat;
  animation: loader 1.5s infinite cubic-bezier(0.3,1,0,1);
}

@keyframes load {
  33% {
    inset: -11.2px;
    transform: rotate(0deg);
  }

  66% {
    inset: -11.2px;
    transform: rotate(90deg);
  }

  100% {
    inset: 0;
    transform: rotate(90deg);
  }
}


</style>