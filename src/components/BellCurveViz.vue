<template>
  <span class='bellCurve'>
    <!--<h2>CompuCurve - {{simplifiedScore}}</h2>-->
    <svg class='bellCurveSvg' viewbox='0 0 800 520'>
      <svg class='bellCurveSvg' xmlns='http://www.w3.org/2000/svg' preserveAspectRatio="none" viewBox='0 0 800 500' height="90%">
        <defs>
          <clipPath v-bind:id="clipPathId">
            <rect v-bind:x="simplifiedQuad"
                  y='0' height='100%' width='25%'
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
            <!--centerline <line x1='400' y1='8' x2='400' y2='500' stroke-width='3' stroke='black'></line> -->
            <path id='curveLine' d='M10,490C230,490 290,10 400,10C500,10 560,490 790,490v5H10z' fill="transparent" stroke-width="3px"  stroke="black"/>
          </g>
        </g>
      </svg>

      <g class="numberLine" height="10%" y="100%">
        <g>
          <line x1="9%" y1="83%" x2="96%" y2="83%" stroke-width="5" stroke='gray'></line>


          <line x1="9.1%" x2="9.1%" y1="83%" y2="90%" stroke-width="3" stroke="gray"></line>
          <line x1="52.5%" x2="52.5%" y1="83%" y2="90%" stroke-width="3" stroke="gray"></line>
          <line x1="95.8%" x2="95.8%" y1="83%" y2="90%" stroke-width="3" stroke="gray"></line>

          <line x1="30%" x2="30%" y1="7" y2="82%" stroke-width="2" stroke="#EEE"></line>
          <line x1="52.5%" x2="52.5%" y1="7" y2="82%" stroke-width="2" stroke="#EEE"></line>
          <line x1="75%" x2="75%" y1="7" y2="82%" stroke-width="2" stroke="#EEE"></line>


          <line x1="14.51875%" x2="14.51875%" y1="83%" y2="88%" stroke-width="3" stroke="black"></line>
          <line x1="19.9375%" x2="19.9375%" y1="83%" y2="88%" stroke-width="3" stroke="black"></line>
          <line x1="25.35625%" x2="25.35625%" y1="83%" y2="88%" stroke-width="3" stroke="black"></line>
          <line x1="30%" x2="30%" y1="83%" y2="90%" stroke-width="3" stroke="gray"></line>
          <line x1="35.41875%" x2="35.41875%" y1="83%" y2="88%" stroke-width="3" stroke="black"></line>
          <line x1="41.6125%" x2="41.6125%" y1="83%" y2="88%" stroke-width="3" stroke="black"></line>
          <line x1="47.03125%" x2="47.03125%" y1="83%" y2="88%" stroke-width="3" stroke="black"></line>
          <line x1="57.91875%" x2="57.91875%" y1="83%" y2="88%" stroke-width="3" stroke="black"></line>
          <line x1="63.3375%" x2="63.3375%" y1="83%" y2="88%" stroke-width="3" stroke="black"></line>
          <line x1="68.75625%" x2="68.75625%" y1="83%" y2="88%" stroke-width="3" stroke="black"></line>
          <line x1="75%" x2="75%" y1="83%" y2="90%" stroke-width="3" stroke="gray"></line>
          <line x1="80.41875%" x2="80.41875%" y1="83%" y2="88%" stroke-width="3" stroke="black"></line>
          <line x1="84.965%" x2="84.965%" y1="83%" y2="88%" stroke-width="3" stroke="black"></line>
          <line x1="90.38375%" x2="90.38375%" y1="83%" y2="88%" stroke-width="3" stroke="black"></line>
        </g>

        <text v-if="expected" x="52.5%" y="100%" font-family="Verdana" font-size="20" text-anchor="middle">
          {{expected | dollars}}
        </text>

        <text v-if="actual" v-bind:x="actualXPosition" y="100%" font-family="Verdana" font-size="20" text-anchor="middle">
          {{actual | dollars}}
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
      actualXPosition: function () {
        // this.actual - this.
        return (0.867 * this.actualPercentage + 9.1) + '%'
      },
      actualPercentage: function () {
        const pct = (0.4 + this.numeralScore) * 125
        return Math.max(0, Math.min(100, pct))
      },
      simplifiedScore: function () {
        return this.actualPercentage + '%'
      },
      simplifiedQuad: function () {
        const quad = (parseInt(this.actualPercentage / 25) * 25)

        return Math.max(0, Math.min(100, quad)) + '%'
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
        return `rgb(${parseInt(this.curveColorObj.r)}, ${parseInt(this.curveColorObj.g)}, ${parseInt(this.curveColorObj.b)})`
      }
    },
    filters: {
      dollars: function (num) {
        return `$${num}`
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .bellCurveSvg {
    height: 200px;
    width: 600px;
  }
  #curveLine {
    clip-path: url(#curveLineRectClip);
  }
  #bellCurveGroup {
    clip-path: url(#bellCurveGroupClip);
    transform: translate(60px, 10px) scale(.9, .9);
  }
</style>
