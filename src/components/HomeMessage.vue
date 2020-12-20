<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <svg id='home-world-svg'/>
  </div>
</template>

<script>
import * as d3 from "d3";
import * as topojson from "topojson"

export default {
  name: "HomeMessage",
  props: {
    msg: String
  },
  mounted(){
    var width = 1200,
        height = 500;
    
    var svg = d3.select( "#home-world-svg" )
          .attr( "width", width )
          .attr( "height", height );
      
    var projection = d3.geoEquirectangular()
        .scale(170)
        .translate([width / 2, height / 2]);

    var geoPath = d3.geoPath()
        .projection(projection);
    
    d3.json("https://unpkg.com/world-atlas@1/world/110m.json")
        .then(data => ready(data))
      
    function ready(data){
         console.log(data)
         svg.append("g")
            .selectAll("path")
            .data(topojson.feature(data,data.objects.countries).features)
            .enter()
            .append("path")
            .attr( "d", geoPath )
            .attr("class","country");   
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
