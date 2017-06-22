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

function expressionEval (exprObj, varsObj) {
  if (exprObj.type === 'expression') {
    return funcNames[exprObj.functionName].func(
      exprObj.value.map((childObj) => expressionEval(childObj, varsObj)))
  }
  return exprObj.type === 'variable' ? varsObj[exprObj.value] : exprObj.value
}

export {funcNames, expressionEval}
