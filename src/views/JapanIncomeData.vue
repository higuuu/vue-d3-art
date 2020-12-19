<template>
  <svg id="svg-area"></svg>
</template>

<script>
import * as d3 from "d3";
import japanGeoJson from "@/assets/data/japan.geojson";

export default {
  name: "JapanIncomeData",
  mounted() {
    console.log(japanGeoJson);
    var width = 800;
    var height = 800;
    var scale = 1600;
    var svg = d3
      .select("#svg-area")
      .attr("width", width)
      .attr("height", height);

    d3.json(
      "https://script.google.com/macros/s/AKfycbzYmvgwr0PgKgB3i6RxuVh-FooBlJhOmRVmgh6G2anNfI05OPD-/exec"
    ).then(data => {
      readSpreadSeet(data);
      createMap(japanGeoJson);
    });

    var aProjection = d3
      .geoMercator()
      .center([136.0, 35.6])
      .translate([width / 2, height / 2])
      .scale(scale);
    var geoPath = d3.geoPath().projection(aProjection);


    function createMap(japan) {
      console.log("japan:", japan);
      //マップ描画
      svg
        .selectAll("path")
        .data(japan.features)
        .enter()
        .append("path")
        .attr("d", geoPath)
        .style("stroke", "#ffffff")
        .style("stroke-width", 0.1)
        .style("fill", "#AFAFAF");
    }

    function createCircle(circleData) {
      let i = 0;
      for (i = 1955; i < 2020; i++) {
        (pram => {
          setTimeout(() => {
            svg.selectAll("circle").remove();
            svg.selectAll("text").remove();

            const circle = svg
              .selectAll("circle")
              .data(circleData)
              .enter()
              .append("circle");

            circle
              .attr("fill", "#b01010")
              .attr("opacity", "0.5")
              .attr("stroke", "#f00")
              .attr("stroke-width", 1)
              .attr("cx", d => {
                return d.cx;
              })
              .attr("cy", d => {
                return d.cy;
              })
              .attr("r", d => {
                console.log(pram);
                if (typeof d[pram] != "number") return;
                console.log(d[pram]);
                return 7 + Math.log(d[pram] / 50000) ** 2;
              });

            const text = svg
              .selectAll("text")
              .data(circleData)
              .enter()
              .append("text");

            text
              .attr("x", d => d.cx)
              .attr("y", d => d.cy + (5 + Math.log(d[pram] / 50000)) / 2)
              .text(d => d[pram])
              .attr("font-family", "sans-serif")
              .attr("font-size", d => 5 + Math.log(d[pram] / 5000))
              .attr("text-anchor", "middle")
              .attr("fill", "black");

            svg
              .append("text")
              .attr("x", 100)
              .attr("y", 80)
              .text(pram)
              .attr("font-family", "sans-serif")
              .attr("font-size", "48px")
              .attr("fill", "grey");

            svg
              .append("text")
              .attr("x", 500)
              .attr("y", 650)
              .text(() => {
                if (pram > 1960) return "単位:百万円";
              })
              .attr("font-family", "sans-serif")
              .attr("font-size", "36px")
              .attr("fill", "grey");
          }, (pram - 1955) * 300);
        })(i);
      }
    }

    function readSpreadSeet(sheetData) {
      console.log("sheetData", sheetData);
      let centerAreas = [];
      let areaIncomeList = [];
      const geoData = japanGeoJson;
      console.log(geoData);
      let geoPath = d3.geoPath().projection(aProjection);
      geoData.features.forEach(element => {
        centerAreas[element.properties.pref_j] = geoPath.centroid(element);
      });
      console.log("centerAreas", centerAreas);
      sheetData.forEach(element => {
        if (!element.group_verify) return;
        //if (!element["都道府県"]) return
        console.log(element);
        console.log(element["area"]);
        element.cx = centerAreas[element["area"]][0];
        element.cy = centerAreas[element["area"]][1];
        areaIncomeList.push(element);
      });
      console.log(areaIncomeList);
      createCircle(areaIncomeList);
    }
    // return {
    //   createMap,
    //   createCircle,
    //   readSpreadSeet
    // };
  }
};
</script>
