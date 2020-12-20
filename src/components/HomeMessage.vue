<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <svg id="home-world-svg" />
  </div>
</template>

<script>
import * as d3 from "d3";
import worldDataJson from "@/assets/data/world/world.geojson";
import notShowList from "@/lib/not-show-list.js"

export default {
  name: "HomeMessage",
  props: {
    msg: String
  },
  //async setup(){
  // let worldData = await worldDataJson
  // console.log(worldData)
  // return worldData
  //},
  async mounted() {
    const width = 1000;
    const height = 500;

    var svg = d3
      .select("#home-world-svg")
      .attr("width", width)
      .attr("height", height);

    var projection = d3
      .geoMercator()
      .center([0, 40])
      .scale(150)
      .rotate([180,0]);
      //.translate([width / 2, height / 2]);

    var geoPath = d3.geoPath().projection(projection);

    let worldData = await worldDataJson;
    console.log(worldData);
    ready(worldData);

    function ready(data) {
      console.log(data);
      svg
        .selectAll("path")
        .data(data.features)
        .enter()
        .append("path")
        .attr("d", data => {
          if (notShowList.checkTooLargeMap(geoPath(data).substr(0,7))) return
          return geoPath(data);
        })
        .attr("class", "country")
        .style("stroke", "#ffffff")
        .style("stroke-width", 0.1)
        .style("fill", "#AFAFAF");
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
#home-world-svg {
  margin: auto;
}

a {
  color: #42b983;
}
</style>
