<template>
  <span class="scalar number">
    <span v-if="!editing" v-on:dblclick="toggleEdit">
      {{dataObj.value | rounded}}
    </span>
    <span class="removeButton" v-on:dblclick="removeNumber">^</span>
    <span v-if="editing">
      <input class="editNum"
             v-focus
             v-model="editNum"
             v-on:blur="saveEdit">
    </span>
  </span>
</template>

<script>

  export default {
    name: 'number',
    props: ['dataObj'],
    data () {
      return {
        editing: false,
        editNum: this.dataObj.value
      }
    },
    watch: {
      dataObj: function () {
        this.sendValueUpdate()
      }
    },
    methods: {
      removeNumber: function () {
        this.$emit('modifyChild', [{modifyAction: 'remove', detailsObj: this.dataObj.id}])
        this.sendValueUpdate()
      },
      sendValueUpdate: function () {
        this.$emit('variableChange', {id: this.dataObj.id, value: this.dataObj.value})
      },
      toggleEdit: function () {
        this.editing = !this.editing
      },
      saveEdit: function () {
        if (this.editNum !== this.dataObj.value) {
          this.$emit('modifyChild', [{
            modifyAction: 'edit', detailsObj: parseFloat(this.editNum)},
            this.dataObj.id])
          this.sendValueUpdate()
        }
        this.toggleEdit()
      }
    },
    mounted: function () {
      this.sendValueUpdate()
    },
    filters: {
      rounded: function (num) {
        return num % 1 > 0 ? num.toFixed(2) : num
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .removeButton {
    display: none;
    position: absolute;
    top: 1em;
  }
  .number:hover > .removeButton {
    display: block;
  }
  .number {
    position: relative;
    display: inline-block;
  }
</style>
