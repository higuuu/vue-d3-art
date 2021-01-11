<template>
  <div>
    <router-view />
  <!-- 訳わからんくなるから下記の表示はしばらく閉鎖、しばらくcovid19の地図のみにしよう -->
  <!-- <div id="nav">
    <router-link to="/">Home</router-link> |
    <router-link to="/japan-income/data">JapanIncomeData</router-link>
  </div> -->
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
