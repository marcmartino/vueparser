<template>
    <div class="variablesList">
        <div v-for="varName in variablesList">
            <span>{{varName}}</span>
            <span><input @change="varChangeListener" step="any"
                         type="number" v-model="compiledValues[varName]"></span>
        </div>
    </div>
</template>

<script>

  export default {
    name: 'variablesForm',
    props: ['variablesList', 'existingValues'],
    data () {
      return {
        compiledValues: {}
      }
    },
    methods: {
      seedCompiledValues: function () {
        let compRef = this
        this.variablesList.forEach(function (varName) {
          if (compRef.existingValues[varName] !== undefined && compRef.compiledValues[varName] === undefined) {
            compRef.$set(compRef.compiledValues, varName, compRef.existingValues[varName])
          }
        })
      },
      varChangeListener: function () {
        this.$emit('variablesUpdate', this.compiledValues)
      }
    },
    mounted: function () {
      this.seedCompiledValues()
    }
  }
</script>
