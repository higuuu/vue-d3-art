<template>
  <div class="home">
    <WorldCovid19Data msg="Welcome to Data Visualization" />
  </div>
</template>

<script>
// @ is an alias to /src
import WorldCovid19Data from "@/components/WorldCovid19Data.vue";

export default {
  name: "Home",
  components: {
    WorldCovid19Data
  }
};
</script>
