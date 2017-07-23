<template>
  <span class='bellCurve'>
    <h2>CompuCurve - {{simplifiedScore}}</h2>
    <svg class='bellCurveSvg' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 800 500'>
      <defs>
        <clipPath v-bind:id="clipPathId">
          <rect v-bind:x="simplifiedScore"
                y='0' height='100%' width='100%'
                fill='#AA0000' stroke='#000000' stroke-width='1.5794' />
        </clipPath>
        <clipPath id='curveLineRectClip'>
            <rect id='lineClipRect' x='0' y='-10px' height='100%' width='100%' fill='#AA0000' stroke='#000000'  />
        </clipPath>
        <clipPath id='bellCurveGroupClip'>
            <rect  x='2%' y='0' height='98.5%' width='96%' fill='#AA0000' stroke='#000000'  />
        </clipPath>
      </defs>
      <g id="graphGroup">
        <g id='bellCurveGroup'>
          <path id='bellCurvePath' v-bind:clip-path="clipPathUrl"
                d='M10,490C230,490 290,10 400,10C500,10 560,490 790,490v5H10z'
                v-bind:fill="curveColor"/>
          <line x1='400' y1='8' x2='400' y2='500' stroke-width='3' stroke='black'></line>
          <path id='curveLine' d='M10,490C230,490 290,10 400,10C500,10 560,490 790,490v5H10z' fill="transparent" stroke-width="8px"  stroke="black"/>
        </g>
        <text v-if="expected" x="50%" y="480" font-family="Verdana" font-size="35" text-anchor="middle">
          Projection: ${{expected}}
        </text>
      </g>
    </svg>

  </span>
</template>

<script>
  export default {
    name: 'bellCurveViz',
    props: ['actual', 'expected'],
    data () {
      return {
        genId: this._uid,
        curveColors: [{r: 91, g: 142, b: 79},
          {r: 60, g: 72, b: 132},
          {r: 239, g: 144, b: 11},
          {r: 201, g: 32, b: 32}]
      }
    },
    methods: {
      calculateBetweenColor: function (btwnPos,
                                       startColorObj = {r: 127.5, g: 127.5, b: 127.5},
                                       endColorObj = {r: 127.5, g: 127.5, b: 127.5}) {
        return ['r', 'g', 'b'].reduce((rgbObj, colorLet) => {
          const startCol = startColorObj[colorLet]
          const endCol = endColorObj[colorLet]
          rgbObj[colorLet] = startCol * (1 - btwnPos) + endCol * btwnPos
          return rgbObj
        }, {})
      }
    },
    computed: {
      simplifiedScore: function () {
        return ((0.4 + this.numeralScore) * 125) + '%'
      },
      numeralScore: function () {
        return (this.expected - this.actual) / this.expected
      },
      clipPathId: function () {
        return 'clipPath' + this.genId
      },
      clipPathUrl: function () {
        return `url(#${this.clipPathId})`
      },
      curveColorObj: function () {
        const curveColorPosition = (((0.4 + this.numeralScore) * 125) || 0) * ((this.curveColors.length - 1) / 100)
        const betweenPosition = curveColorPosition % 1
        return (betweenPosition === 0
          ? this.curveColors[curveColorPosition]
          : this.calculateBetweenColor(betweenPosition, this.curveColors[Math.floor(curveColorPosition)], this.curveColors[Math.ceil(curveColorPosition)]))
      },
      curveColor: function () {
        return `rgb(${this.curveColorObj.r}, ${this.curveColorObj.g}, ${this.curveColorObj.b})`
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .bellCurveSvg {
    height: 200px;
    width: 300px;
  }
  #curveLine {
    clip-path: url(#curveLineRectClip);
  }
  #bellCurveGroup {
    clip-path: url(#bellCurveGroupClip);
    transform: translate(60px, 10px) scale(.9, .9);
  }
</style>
