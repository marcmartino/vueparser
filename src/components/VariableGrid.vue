<template>
  <div class="variableGrid">
    <h2>variable grid</h2>
    <div v-for="varObj in variableList">
      <span><input v-model='varObj.name'></span>
      <span><input type="number" v-model='varObj.value'></span>
    </div>
    <div v-on:click="newVariable">+</div>
    <textarea>{{compiledVarObj}}</textarea>
  </div>
</template>

<script>

  export default {
    name: 'variableGrid',
    props: [],
    data () {
      return {
        variableList: [{name: 'ram', value: 10}, {name: 'screenSize', value: 11}, {name: 'hardDrive', value: 11}]
      }
    },
    watch: {
    },
    methods: {
      newVariable: function () {
        this.$set(this.variableList, this.variableList.length, {name: 'newVar', value: 0})
      }
    },
    mounted: function () {
    },
    computed: {
      compiledVarObj: function () {
        let compVarList = this.variableList.reduce((runningObj, varObj) => {
          runningObj[varObj.name] = parseFloat(varObj.value)
          return runningObj
        }, {})
        this.$emit('variableUpdate', compVarList)
        return compVarList
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
