const numbersOfCastles = require('../assignment_1')

describe('numbersOfCastles', () => {

  test('should return 0 if array is empty array', () => {
      const actualResult = numbersOfCastles([])
      expect(actualResult).toBe(0)
  })

  test('should return 0 if array is undefined', () => {
    const actualResult = numbersOfCastles([])
    expect(actualResult).toBe(0)
  })

  test('should return ​the ​number ​of castles 1', () => {
    const actualResult = numbersOfCastles([3,3,3,3])
    expect(actualResult).toBe(1)
  })

  test('should return ​the ​number ​of castles 2', () => {
    const correctInputs = [
      { input: [1,5,2], expected: 2 },
      { input: [2,6,6,6,3], expected: 2 },
      { input: [9,1,9], expected: 2 },
    ]
    
    correctInputs.forEach(({ input, expected }) => {
      const actualResult = numbersOfCastles(input)
      expect(actualResult).toBe(expected)
    })
  })

  test('should return ​the ​number ​of castles 4', () => {
    const actualResult = numbersOfCastles([9,1,9,1,9])
    expect(actualResult).toBe(4)
  })

  test('should return ​the ​number ​of castles 8', () => {
    const actualResult = numbersOfCastles([3,4,4,5,6,1,9,2,2,4,3,8,6,6])
    expect(actualResult).toBe(8)
  })

  test('should return ​the ​number ​of castles 10', () => {
    const actualResult = numbersOfCastles([1,2,1,2,3,4,1,1,2,9,1,1,2,1,1,2,1])
    expect(actualResult).toBe(10)
  })
})
