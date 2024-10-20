<template>
  <div class="wrap">
    <div class="con">
      <a class="tag">HTML</a>
      <a class="tag">CSS</a>
      <a class="tag">JavaScript</a>
      <a class="tag">Flutter</a>
      <a class="tag">Vue</a>
      <a class="tag">React</a>
      <a class="tag">Svelte</a>
    </div>
  </div>
</template>

<script setup></script>

<style lang="less" scoped>
@keyframes appear {

  from,
  to {
    counter-increment: num 0;
  }
}

@keyframes check {

  from,
  to {
    margin-right: 0;
    -webkit-mask: linear-gradient(to right, #fff calc(100% - 30px), transparent);
  }
}

.wrap {
  width: 300px;
  display: flex;
  align-items: center;
  padding: 15px;
  outline: 2px solid #9747FF;
  gap: 5px;
  overflow: hidden;

  &::after {
    content: "+" counter(num);
    padding: .2em .5em;
    background-color: #FFE8A3;
    color: #191919;
    border-radius: 4px;
  }
}

.con {
  position: relative;
  display: flex;
  gap: 5px;
  margin-right: -46px;
  padding: 5px;
  overflow: hidden;
  counter-reset: num;
  animation: check;
  animation-timeline: scroll(x self);
}

.tag {
  padding: .2em .5em;
  background-color: #9747FF;
  border-radius: 4px;
  color: #fff;
  counter-increment: num 1;
  animation: appear;
  animation-timeline: view(inline);
  animation-range: contain;
}
</style>
