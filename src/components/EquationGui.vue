<template>
    <div id="EquationGui">
        <input v-model="eqName" placeholder="Equation Name">
        <remote-eq-manager
                :equations="existingEquations"
                @updateEq="updateCurrentEquation"
                @saveEq="saveEquation"
        ></remote-eq-manager><br/>
        <expression :dataObj="expObj"
                    :variables="varData"
                    @variableChange="exprValUpdate"
                    @modifyChild="modifyChildExpr"
        ></expression>
        <h1 v-on:click="addToVars">{{expVal}}</h1>
        <div class="lowerFold">
            <variable-grid
                    @variableUpdate="variableUpdate"
                    @addVariable="addVariable"
                    :expectedVars="variablesArr"
            ></variable-grid>
            <!--<textarea class="exprTextarea" v-model="expObjJson"></textarea>-->
        </div>
        <bell-curve-viz :expected="expVal" :actual="computedActualPrice"></bell-curve-viz>

        <div id="examplePrice">
            <h2>Example Price</h2>
            <input type="text" v-model="testPrice"></div>
    </div>
</template>

<script>

  import Expression from './Expression'
  import VariableGrid from './VariableGrid'
  import BellCurveViz from './BellCurveViz'
  import VariablesForm from './VariablesForm'
  import RemoteEqManager from './RemoteEqManager.vue'
  import axios from 'axios'

  export default {
    name: 'equationGui',
    props: ['existingEquations', 'actualPrice'],
    components: {
      VariablesForm,
      BellCurveViz,
      VariableGrid,
      Expression,
      RemoteEqManager
    },
    data () {
      return {
        expVal: 0,
        expObj: {'id': 12, type: 'expression', functionName: 'subtraction', value: []},
        variablesArr: [],
        varData: {},
        eqName: '',
        eqId: undefined,
        testPrice: 0
      }
    },
    methods: {
      addVariable: function (varName) {
        this.variablesArr.push(varName)
      },
      updateCurrentEquation: function (eqObj) {
        this.expObj = eqObj.equation
        this.variablesArr = eqObj.variables
        this.eqName = eqObj.name
        this.eqId = eqObj.id
      },
      saveEquation: function () {
        console.log('saving #' + this.eqId)
        console.log(JSON.stringify(this.expObj))
        let eqObj = {id: this.eqId, equation: JSON.stringify(this.expObj), variables: JSON.stringify(this.variablesArr), name: this.eqName}
        axios[this.eqId ? 'put' : 'post']('/compucurvetype' + (this.eqId ? `/${this.eqId}` : ''),
          eqObj)
          .then(function (response) {
            console.log('saved successfully')
            console.log(response)
            // might need to emit an event here to update the equations object in the parent
          })
          .catch(function (error) {
            console.log(error)
          })
      },
      variableUpdate: function (newVars) {
        this.varData = newVars
      },
      modifyChildExpr: function ([modifyDetailsObj, ...pathStack]) {
        let foundObj = this.findInnerObjByIds({value: [this.expObj]}, pathStack)
        switch (modifyDetailsObj.modifyAction) {
          case 'create':
            this.addChildToRoot(modifyDetailsObj.detailsObj, foundObj)
            break
          case 'edit':
            this.editChildInRoot(modifyDetailsObj.detailsObj, foundObj)
            break
          case 'functionChange':
            this.changeFunction(modifyDetailsObj.detailsObj, foundObj)
            break
          case 'remove':
            this.removeChildInRoot(modifyDetailsObj.detailsObj, foundObj)
            break
        }
      },
      removeChildInRoot: function (removalId, foundObj) {
        const removalIndex = foundObj.value.reduce((collectedObj, childObj, index) => {
          collectedObj[childObj.id] = index
          return collectedObj
        }, {})[removalId]
        foundObj.value.splice(removalIndex, 1)
      },
      changeFunction: function (newFuncName, foundObj) {
        foundObj.functionName = newFuncName
      },
      editChildInRoot: function (editVal, foundObj) {
        this.$set(foundObj, 'value', editVal)
      },
      addChildToRoot: function (newChildObj, foundObj) {
        foundObj.value.push(newChildObj)
      },
      findInnerObjByIds: function (obj, idsStack) {
        // TODO maybe convert this to use the approach in removeChildInRoot
        if (idsStack.length) {
          let searchId = idsStack.pop()
          for (searchId; searchId !== undefined; searchId = idsStack.pop()) {
            let objIndex
            for (objIndex = 0; objIndex < obj.value.length; objIndex++) {
              if (obj.value[objIndex].id === searchId) {
                return this.findInnerObjByIds(obj.value[objIndex], idsStack)
              }
            }
          }
        } else {
          return obj
        }
      },
      exprValUpdate: function (exprValueObj) {
        this.expVal = exprValueObj.value
      },
      addToVars: function () {
        this.$set(this.varData, Math.floor(Math.random() * 20), true)
      }
    },
    computed: {
      expObjJson: function () {
        return JSON.stringify(this.expObj)
      },
      computedActualPrice: function () {
        return parseFloat(this.testPrice || this.actualPrice)
      }
    },
    created: function () {
    }
  }
</script>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }
    .exprTextarea {
        width: 40%;
        height: 10em;
    }
    .lowerFold > * {
        float: left;
        width: 49%;
    }
</style>
