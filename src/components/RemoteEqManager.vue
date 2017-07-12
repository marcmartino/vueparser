<template>
    <div id="RemoteEqManager">
        <select v-on:change="changeEq">
            <option value="-1">Load Equation</option>
            <option v-for="(eq, index) in equations" v-bind:value="index">
                {{eq.name}}
            </option>
        </select>
        <button v-on:click="createNewEq">Create Equation</button>
        <button v-on:click="saveEq">Save</button>
    </div>
</template>

<script>
  import axios from 'axios'

  export default {
    name: 'remoteEqManager',
    props: ['equations'],
    components: {
    },
    data () {
      return {
      }
    },
    methods: {
      changeEq: function (event) {
        let selectVal = parseInt(event.target.value, 10)
        if (selectVal >= 0) {
          let eqObj = this.equations[selectVal]
          this.updateCurrentEquation(eqObj)
        }
      },
      updateCurrentEquation: function (eqObj) {
        this.$emit('updateEq', eqObj)
      },
      saveEq: function () {
        this.$emit('saveEq')
      },
      createNewEq: function () {
        this.updateCurrentEquation({variables: [], equation: {id: 1, type: 'expression', functionName: 'addition', values: {id: 1, type: 'number', value: 1}}, name: prompt('Type Name?')})
      }
    },
    computed: {
    },
    created: function () {
      axios
    }
  }
</script>

<style>

</style>
