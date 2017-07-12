<template>
  <span class="expression">
    <span class="calcVal">[{{this.calculatedValue | rounded}}]</span>
      <span class="exprText">
        <span>(
          <function-selector
            :functionName="dataObj.functionName"
            @modifyChild="modifyChild"
            @variableChange="childValueUpdate"></function-selector>
        </span>
        <component
            v-for="child in dataObj.value"
            :key="child.id"
            v-bind:is="child.type"
            :dataObj="child"
            :variables="variables"
            @variableChange="childValueUpdate"
            @modifyChild="modifyChild"></component>
        <concatinate-expression @modifyChild="modifyChild"></concatinate-expression>
        <span class="removeButton" v-on:dblclick="removeThisElement"><</span>
        <span>)</span>
      </span>
  </span>
</template>

<script>
  import Variable from './Variable'
  import Number from './Number'
  import ConcatinateExpression from './ConcatinateExpression'
  import FunctionSelector from './FunctionSelector'
  import {expressionEval} from '../funcsAndEval'
  // import {funcNames as evalFuncs} from '../funcsAndEval'

  export default {
    name: 'expression',
    components: {
      FunctionSelector,
      ConcatinateExpression,
      Variable,
      Number
    },
    props: ['dataObj', 'variables'],
    data () {
      return {
        calculatedValue: 0,
        childVals: {}
      }
    },
    methods: {
      removeThisElement: function () {
        this.$emit('modifyChild', [{modifyAction: 'remove', detailsObj: this.dataObj.id}])
        this.childValueUpdate()
      },
      modifyChild: function (childEditStack) {
        childEditStack.push(this.dataObj.id)
        this.$emit('modifyChild', childEditStack)
      },
      childValueUpdate: function (childValObj) {
        if (childValObj) {
          this.childVals[childValObj.id] = childValObj.value
        }
        this.$emit('variableChange', {id: this.dataObj.id, value: this.calcVal()})
      },
      calcVal: function () {
        this.calculatedValue = expressionEval(this.dataObj, this.variables)
        return this.calculatedValue
      }
    },
    filters: {
      rounded: function (num) {
        return num % 1 > 0 ? num.toFixed(2) : num
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .expression {
    position: relative;
  }
  .expressionText {
    position: relative;
  }
  .calcVal {
    position: absolute;
    top: -1em;
  }
  .removeButton {
    display: none;
  }
  .exprText:hover > .removeButton {
    display: inline;
  }
  .scalar+.scalar {
    margin-left: 5px;
  }
</style>
