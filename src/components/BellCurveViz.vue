<template>
  <span class='bellCurve'>
    <h2>Bell Curve - {{simplifiedScore}}</h2>
    <svg class='bellCurveSvg' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 500'>
      <defs>
        <linearGradient id='g'>
          <stop offset='24.999999%' stop-color='rgb(155,10,0)'/>
          <stop offset='25.000001%' stop-color='rgb(155,10,0)'/>
          <stop offset='49.999999%' stop-color='rgb(155,10,0)'/>
          <stop offset='50.000001%' stop-color='rgb(155,10,0)'/>
          <stop offset='74.999999%' stop-color='rgb(155,10,0)'/>
          <stop offset='75.000001%' stop-color='rgb(155,10,0)'/>
          <stop offset='100%' stop-color='rgb(155,10,0)'/>
        </linearGradient>
        <clipPath id='curveAreaRectClip'>
          <rect x='0' y='0' height='100%' v-bind:width="simplifiedScore" fill='#AA0000' stroke='#000000' stroke-width='1.5794' />
        </clipPath>
        <clipPath id='curveLineRectClip'>
            <rect id='lineClipRect' x='0' y='-10px' height='100%' width='100%' fill='#AA0000' stroke='#000000'  />
        </clipPath>
        <clipPath id='bellCurveGroupClip'>
            <rect  x='2%' y='0' height='98.5%' width='96%' fill='#AA0000' stroke='#000000'  />
        </clipPath>
      </defs>
      <g id='bellCurveGroup'>
        <path id='bellCurvePath' d='M10,490C230,490 290,10 400,10C500,10 560,490 790,490v5H10z'  fill='url(#g)'/>
        <path id='curveLine' d='M10,490C230,490 290,10 400,10C500,10 560,490 790,490v5H10z' fill="transparent" stroke-width="8px"  stroke="black"/>
      </g>
    </svg>

  </span>
</template>

<script>
  export default {
    name: 'bellCurveViz',
    props: ['score'],
    data () {
      return {
      }
    },
    computed: {
      simplifiedScore: function () {
        return (this.score < 100 ? this.score : this.score % 100).toString() + '%'
      }
    },
    methods: {
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .bellCurveSvg {
      height: 300px;
      width: 300px;
  }
  #curveAreaRectClip {

  }
  #curveLine {
    clip-path: url(#curveLineRectClip);
  }
  #bellCurvePath {
    clip-path: url(#curveAreaRectClip);
  }
  #bellCurveGroup {
      clip-path: url(#bellCurveGroupClip);
      transform: translate(10px 10px);
  }
</style>
