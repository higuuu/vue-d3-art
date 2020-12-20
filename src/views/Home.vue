<template>
  <div class="home">
    <HomeMessage msg="Welcome to Data Art" />
  </div>
</template>

<script>
// @ is an alias to /src
import HomeMessage from "@/components/HomeMessage.vue";

export default {
  name: "Home",
  components: {
    HomeMessage
  }
};
</script>
