var funcNames = {
  addition: {
    func: function (paramsArr = []) {
      return paramsArr.reduce((tot, num) => tot + num, 0)
    },
    textRep: '+'
  },
  subtraction: {
    func: function ([head, ...tail] = []) {
      return tail.reduce((tot, num) => tot - num, head)
    },
    textRep: '-'
  },
  multiplication: {
    func: function (paramsArr = []) {
      return paramsArr.reduce((tot, num) => tot * num, 1)
    },
    textRep: '*'
  },
  division: {
    func: function ([head, ...tail] = []) {
      return tail.reduce((tot, num) => tot / num, head)
    },
    textRep: '/'
  },
  mean: {
    func: function (paramsArr = []) {
      return paramsArr.reduce((tot, num) => tot + num, 0) / paramsArr.length
    },
    textRep: 'μ'
  },
  min: {
    func: function (paramsArr = []) {
      return Math.min.apply(undefined, paramsArr)
    },
    textRep: 'min'
  }
}

export default funcNames
