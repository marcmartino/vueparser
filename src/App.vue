<template>
  <div id="app">

    <expression :dataObj="expObj"
                :variables="varData"
                @variableChange="exprValUpdate"
                @modifyChild="modifyChildExpr"
                ></expression>
    <h1 v-on:click="addToVars">{{expVal}}</h1>
    <div class="lowerFold">
      <variable-grid @variableUpdate="variableUpdate"></variable-grid>
      <textarea class="exprTextarea" v-model="expObjJson"></textarea>
    </div>
  </div>
</template>

<script>
  import Hello from './components/Hello'
  import Expression from './components/Expression'
  import VariableGrid from './components/VariableGrid'

  export default {
    name: 'app',
    components: {
      VariableGrid,
      Hello,
      Expression
    },
    data () {
      return {
        expVal: 'undef',
        expObj: {
          id: 0,
          type: 'expression',
          functionName: 'mean',
          value: [
            {id: 1, type: 'variable', value: 'ram'},
            {id: 2, type: 'number', value: 6969},
            {id: 3,
              type: 'expression',
              functionName: 'subtraction',
              value: [{id: 4, type: 'number', value: 3}, {id: 5, type: 'variable', value: 'screenSize'}]
            },
            {id: 6,
              type: 'expression',
              functionName: 'multiplication',
              value: [{id: 7, type: 'number', value: 105}, {id: 8, type: 'variable', value: 'hardDrive'}]
            }
          ]
        },
        varData: {}
      }
    },
    methods: {
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
      }
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
