<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h3>Today Covid-19 Total Comfirmed</h3>
    <svg id="home-world-svg" />
  </div>
</template>

<script>
import * as d3 from "d3";
import axios from "axios";
import worldDataJson from "@/assets/data/world/world.geojson";
import notShowList from "@/lib/not-show-list.js";

export default {
  name: "HomeMessage",
  props: {
    msg: String
  },
  setup() {
    // let worldData = await worldDataJson
    // console.log(worldData)
    //return convid19ChangeColor
  },
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
      .rotate([180, 0]);
    //.translate([width / 2, height / 2]);

    var geoPath = d3.geoPath().projection(projection);

    let worldGeoData = await worldDataJson;
    const worldCovid19Data = await axios.get(
      "https://api.covid19api.com/summary"
    );
    console.log(worldCovid19Data);
    ready(worldGeoData);

    function ready(data) {
      console.log(data);
      svg
        .selectAll("path")
        .data(data.features)
        .enter()
        .append("path")
        .attr("d", data => {
          if (notShowList.checkTooLargeMap(geoPath(data).substr(0, 7))) return;
          return geoPath(data);
        })
        .attr("class", "country")
        .style("stroke", "#ffffff")
        .style("stroke-width", 0.1)
        .style("fill", countryGeoData => {
          console.log(convid19ChangeColor(countryGeoData, worldCovid19Data));
          return convid19ChangeColor(countryGeoData, worldCovid19Data);
        });
    }

    function convid19ChangeColor(countryGeoData, covidDataSet) {
      let countryCovidData = null;
      covidDataSet.data.Countries.forEach(element => {
        if (countryGeoData.properties.ISO_A2 === element.CountryCode) {
          countryCovidData = element;
          return;
        }
      });
      if (countryCovidData) {
        const totalCovid19 = countryCovidData.TotalConfirmed;
        if (totalCovid19 > 1000000) return "#ff0000";
        if (totalCovid19 > 100000) return "#ff6347";
        if (totalCovid19 > 10000) return "#ff8c00";
        if (totalCovid19 > 1000) return "#ffff00";
        if (totalCovid19 > 100) return "#ffffe0";
        return "#fff";
      }
      return "#fff";
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
