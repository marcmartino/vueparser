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
  import {funcNames as evalFuncs} from '../funcsAndEval'

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
        if (!evalFuncs || !evalFuncs[funcName]) {
          console.log('cant find  func for ' + funcName)
          console.log(this.functionName)
        }
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
    background-color: white;
    text-align: center;
  }
  .functionSelector {
    position: relative;
  }
  .functionSelector:hover .funcOpts {
    display: block;
    top: .9em;
    left: -1em;
    width: 5em;
  }
</style>
