<template>
  <div class="variableGrid">
    <h2>variable grid</h2>
    <div v-for="varName in expectedVars">
      <span>{{varName}}</span>
      <span><input v-on:change="updateCompiledVars" step="any" type="number" v-model="variableList[varName]"></span>
    </div>
    <div v-on:click="newVariable">+</div>
  </div>
</template>

<script>

  export default {
    name: 'variableGrid',
    props: ['expectedVars'],
    data () {
      return {
        variableList: {},
        compiledVarsObj: {}
      }
    },
    methods: {
      newVariable: function () {
        // this.$set(this.variableList, this.variableList.length, {name: 'newVar', value: 0})
        this.$emit('addVariable', prompt('name of new variable'))
      },
      updateCompiledVars: function () {
        let compVarList = this.expectedVars.reduce((collectionObj, varName) => {
          collectionObj[varName] = parseFloat(this.variableList[varName])
          return collectionObj
        }, {})
        this.$emit('variableUpdate', compVarList)
        this.compiledVarsObj = compVarList
      }
    },
    watch: {
      expectedVars: function () {
        this.updateCompiledVars()
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  textarea {
    width: 75%;
    height: 5em;
  }
</style>
