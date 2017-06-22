<template>
  <span class="concatExpWidget">
    <div class='newChildOptions'>
      <span @click="newNumber">#</span>
      <span @click="newVariable">?</span>
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
      newNumber: function () {
        this.sendNewChildEvent(0, 'number')
      },
      newVariable: function () {
        this.sendNewChildEvent('newVar', 'variable')
      },
      sendNewChildEvent: function (value, type) {
        let newChildObj = [{
          modifyAction: 'create',
          detailsObj: {id: (Math.floor(Math.random() * 1000) + 20), value, type}
        }]
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
    top: -2em;
    right: -30px;
    border: 5px solid blueviolet;
    border-radius: 5px;
    width: 60px;
  }
  .newChildOptions .span {
    text-align: center;
    width: 25px;
    display: inline-block;
  }
  .concatExpWidget {
    position: relative;
  }
</style>
