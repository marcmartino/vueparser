<template>
  <span class="concatExpWidget">
    <div class='newChildOptions'>
      <span @click="newNumber">#</span>
      <span @click="newVariable">?</span>
      <span @click="newExpr">()</span>
    </div>
    <span >@</span>
  </span>
</template>

<script>

  export default {
    name: 'concatinateExpression',
    data () {
      return {
      }
    },
    props: ['idGen'],
    methods: {
      newExpr: function () {
        this.sendNewChildEvent([], 'expression', 'addition')
      },
      newNumber: function () {
        this.sendNewChildEvent(0, 'number')
      },
      newVariable: function () {
        this.sendNewChildEvent('newVar', 'variable')
      },
      sendNewChildEvent: function (value, type, functionName) {
        let newChildObj = [{
          modifyAction: 'create',
          // TODO: Math.rand() needs to be replaced with a real id generator to avoid collisions
          detailsObj: {id: (Math.floor(Math.random() * 1000) + 20), value, type}
        }]
        if (functionName !== undefined) {
          newChildObj[0].detailsObj.functionName = functionName
        }
        this.$emit('modifyChild', newChildObj)
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .concatExpWidget:hover .newChildOptions {
    display: block;
  }
  .newChildOptions {
    display: none;
    position: absolute;
    top: -2.3em;
    right: -30px;
    border: 5px solid blueviolet;
    border-radius: 5px;
    width: 85px;
    background-color: white;
    text-align: center;
  }
  .newChildOptions span {
    text-align: center;
    padding: 5px;
    display: inline-block;
    cursor: pointer;
  }
  .concatExpWidget {
    position: relative;
  }
</style>
