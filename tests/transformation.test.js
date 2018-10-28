const transformers = require('../assignment_2')

describe('transformers', () => { 
  test('should calculate winner Soundwave, Survivors Hubcap', () => {
    const actualResult = transformers(["Soundwave, D,8,9,2,6,7,5,6,10","Bluestreak, A,6,6,7,9,5,2,9,7","Hubcap,A,4,4,4,4,4,4,4,4"])
    expect(actualResult).toBe("1 battle, Winning team (Deception): Soundwave, Survivors from the losing team (Autobot):Hubcap")
  })

  test('should calculate a Tie if both transformer have the same overall rating', () => {
    const actualResult = transformers(["Soundwave, D,10,10,10,10,10,10,10,10","Bluestreak,A,10,10,10,10,10,10,10,10"])
    expect(actualResult).toBe("Fight tie: both Transformers destroyed")
  })

  test('should calculate winner if any fighter is down 4 or more points of courage and 3 or more points of strength', () => {
    const actualResult = transformers(["Soundwave, D,4,10,10,10,10,2,10,10","Bluestreak,A,7,1,1,1,9,6,3,5"])
    expect(actualResult).toBe("1 battle, Winning team (Autobot): Bluestreak")
  })

  test('should calculate winner if one of the fighters is 3 or more points of skill above', () => {
    const actualResult = transformers(["Soundwave, D,110,10,10,10,1,10,3","Bluestreak,A,1,1,1,1,1,1,1,8"])
    expect(actualResult).toBe("1 battle, Winning team (Deception): Soundwave")
  })

  test('Special​ ​rules: should calculate winner if name is Optimus Prime', () => {
    const actualResult2 = transformers(["Soundwave, D,8,9,2,6,7,5,6,10","OptimusPrime, A,0,0,0,0,0,0,0,0","robot name, A,10,10,10,10,10,10,10,10"])
    expect(actualResult2).toBe("1 battle, Winning team (Autobot): OptimusPrime")
  })

  test('Special​ ​rules: should calculate winner if name is Predaking', () => {
    const actualResult2 = transformers(["Soundwave, D,8,9,2,6,7,5,6,10","Predaking, A,0,0,0,0,0,0,0,0","robot name, A,10,10,10,10,10,10,10,10"])
    expect(actualResult2).toBe("1 battle, Winning team (Autobot): Predaking")
  })

  test('Special​ ​rules: Transformer ​named ​Optimus ​Prime ​or ​Predaking ​face ​each ​the ​game immediately ​ends ​with ​all ​competitors ​destroyed', () => {
      const actualResult = transformers(["Predaking, A,6,6,7,9,5,2,9,7","OptimusPrime,D,4,4,4,4,4,4,4,4"])
      expect(actualResult).toBe("End Game : Transformer Optimus ​Prime ​or ​Predaking face each other")
  })
})
