<template>
  <span class="functionSelector">
    {{this.functionName | textRep}}
    <span class="funcOpts">
      <span v-for="(evalObj, funcNameKey) in evalFuncObj" v-on:click="changeFunction(funcNameKey)" >
        {{evalObj.textRep}}
      </span>
    </span>
  </span>
</template>

<script>
  import evalFuncs from '../funcsAndEval'

  export default {
    name: 'functionSelector',
    props: ['functionName'],
    data () {
      return {
        evalFuncObj: evalFuncs
      }
    },
    methods: {
      changeFunction: function (funcNewName) {
        this.$emit('modifyChild', [{modifyAction: 'functionChange', detailsObj: funcNewName}])
        this.$emit('variableChange')
      }
    },
    filters: {
      textRep: function (funcName) {
        return evalFuncs[funcName].textRep
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .funcOpts {
    display: none;
    position: absolute;
    border: 3px solid darkred;
  }
  .functionSelector {
    position: relative;
  }
  .functionSelector:hover .funcOpts {
    display: block;
    top: 1em;
    left: -1em;
    width: 5em;
  }
</style>
