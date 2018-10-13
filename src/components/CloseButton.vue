<template>
  <div
    :style="`background-image: ${ this.$assets.close };`">
  </div>
</template>

<style lang="scss" scoped>
  div {
    background: none;
    background-size: 15px;
    border: 0;
    margin: 0;
    height: 15px;
    width: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    background-repeat: no-repeat;
    background-position: center center;

    &:hover {
      opacity: 0.9;
      cursor: pointer;
    }
  }
</style>
