<template>
  <span class="variable">
    <span v-if="!editing" v-on:dblclick="toggleEdit">
      <span class='varName' v-bind:class="{ hasValue }">
        {{dataObj.value}}<span class='varVal'>({{variables[dataObj.value]}})</span></span>
    </span>
    <span v-if="editing">
      <input class="editName"
             v-focus
             v-model="editName"
             v-on:blur="saveEdit">
    </span>

  </span>
</template>

<script>

  export default {
    name: 'variable',
    props: ['dataObj', 'variables'],
    data () {
      return {
        editing: false,
        editName: this.dataObj.value
      }
    },
    watch: {
      variables: function () {
        this.sendValueUpdate()
      },
      dataObj: function () {
        this.sendValueUpdate()
      }
    },
    methods: {
      sendValueUpdate: function () {
        this.$emit('variableChange', {id: this.dataObj.id, value: this.variables[this.dataObj.value]})
      },
      toggleEdit: function () {
        this.editing = !this.editing
      },
      saveEdit: function () {
        if (this.editNum !== this.dataObj.value) {
          this.$emit('modifyChild', [{
            modifyAction: 'edit', detailsObj: this.editName},
            this.dataObj.id])
          this.sendValueUpdate()
        }
        this.toggleEdit()
      }
    },
    mounted: function () {
      this.sendValueUpdate()
    },
    computed: {
      hasValue: function () {
        return this.variables[this.dataObj.value] !== undefined
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .variable {
    position: relative;
  }
  .varName {
    text-decoration: underline;
  }
  .varName.hasValue {
    color: darkgreen;
  }
  .variable:hover .varVal {
    display: inline;
  }
  .varVal {
    font-size: smaller;
  }

</style>
