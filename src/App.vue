<template>
  <equation-gui :existingEquations="equations"></equation-gui>
</template>

<script>
  import EquationGui from './components/EquationGui'

  export default {
    name: 'app',
    components: {
      EquationGui
    },
    data () {
      return {
        equations: [
          {id: 1, name: 'testCurve', equation: JSON.parse('{"id": 0, "type": "expression", "value": [{"id": 1, "type": "variable", "value": "testVar"}], "functionName": "subtraction"}'), variables: ['testVar']},
          {id: 2, name: 'testCurveTwo', equation: JSON.parse('{"id": 0, "type": "expression", "value": [{"id": 1, "type": "variable", "value": "testVar"},{"id": 4, "type": "number", "value": 13}], "functionName": "addition"}'), variables: ['testVarTwo', 'testVar']}
        ]
      }
    }
  }
</script>
