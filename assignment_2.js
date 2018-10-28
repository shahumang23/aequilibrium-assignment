function transformers(transformerRequest){
  
    var robotType = {
      autobots: [],
      deceptions: []
    };
  
    var deceptionswiningCount = 0;
    var autobotswiningCount = 0;
  
    var survivors = {
      winnerTeam: "",
      looserTeam: "",
      winnersAutobot: "",
      winnersDeception: "",
      loosersAutobot: "",
      loosersDeception: "",
      battleCount: 0
    };
  
    var winnerResult;
  
    /**
      Initialisation stuff here
    **/
    function init() {
      game(transformerRequest);
    }
  
    /**
       @param {sortby} sortType
       @param {data} data
       @return sortByRankValue
    */
    function sortbyRank(sortby, data) {
      return data.sort(function (previous, next) {
          return (parseInt(previous[sortby]) - parseInt(next[sortby]))
      });
    }
  
    /**
       @param {filtervalue} filterValue
       @param {data} data
       @return filterGroupValue
    */
    function filterbygroup (filterValue, data) {
      return  data.filter(function (criteria) {
          return criteria.group == filterValue;
      });
    }
  
    /**
       @param {TransformerType} transformer
       @return caluclate rating
    */
    function overallRating(transformer) {
      var rating = 0;
      rating = transformer.strength + transformer.intelligence + transformer.speed + transformer.endurance + transformer.firepower;
      return rating;
    }
  
    /**
      Caluction of game result
      @return gameResult
    */
    function gameResult () {
        let result = "";
        if (deceptionswiningCount > autobotswiningCount) {
            survivors.winnerTeam = "Deception";
            survivors.looserTeam = "Autobot";
            let count = survivors.battleCount + " battle";
            let winnigTeam = ", Winning team (" + survivors.winnerTeam + "):" + survivors['winners' + survivors.winnerTeam];
            let survivorsTeam = survivors.loosersAutobot ? ", Survivors from the losing team (" + survivors.looserTeam + "):" + survivors.loosersAutobot : '';
            result = count+winnigTeam+survivorsTeam;
        }
        else if (deceptionswiningCount < autobotswiningCount) {
            survivors.winnerTeam = "Autobot",
            survivors.looserTeam = "Deception";
            let count = survivors.battleCount + " battle";
            let winnigTeam = ", Winning team (" + survivors.winnerTeam + "):" + survivors['winners' + survivors.winnerTeam];
            let survivorsTeam = survivors.loosersAutobot ? ", Survivors from the losing team (" + survivors.looserTeam + "):" + survivors.loosersAutobot : '';
            result = count+winnigTeam+survivorsTeam;
        }
        else if (deceptionswiningCount == autobotswiningCount) {
            survivors.winnerTeam = "";
            result = "Fight tie: both Transformers destroyed";
        }
        return result;
    }
  
    function apponentFighter() {
        if (robotType.autobots.length > 0 && robotType.deceptions.length > 0) {
            survivors.battleCount = (robotType.autobots.length > robotType.deceptions.length) ? robotType.deceptions.length : robotType.autobots.length
  
            for (var i = 0; i < survivors.battleCount; i++) {
                let result = {};
                result = battle(robotType.autobots[i], robotType.deceptions[i]);
                if(result.winner === 'End Game') {
                  return 'End Game : Transformer Optimus ​Prime ​or ​Predaking face each other';
                }
                else {
                  if (result.winner && result.winner.group == 'D') {
                      deceptionswiningCount += 1;
                      survivors.winnersDeception += " " + result.winner.name;
                    }
                    else if (result.winner && result.winner.group == 'A') {
                      autobotswiningCount += 1;
                      survivors.winnersAutobot += " " + result.winner.name;
                    }
                    else {
                      survivors.winnerTeam = "";
                    }
                }
            }
            return gameResult();
        }
        return "you don't have any apponent for fight";
    }
  
  /**
       @param {Transformer} autobot
       @param {Transformer} decepticon
       @return none
  */
    function battle (autobot, decepticon) {
  
        var fighterInfo = {};
      
        //Special Rules
        if ((autobot.name == "OptimusPrime" && decepticon.name == "Predaking") ||
            (autobot.name == "Predaking" && decepticon.name == "OptimusPrime")) {
            fighterInfo.winner = 'End Game';
            return fighterInfo;
        }
        else if (autobot.name == "OptimusPrime" || autobot.name == "Predaking") {
            fighterInfo.winner = autobot;
            fighterInfo.looser = decepticon;
            return fighterInfo
        }
        else if (decepticon.name == "OptimusPrime" || decepticon.name == "Predaking") {
            fighterInfo.winner = decepticon;
            fighterInfo.looser = autobot;
            return fighterInfo
        }
        else if (((autobot.courage - decepticon.courage) >= 4) && ((autobot.strength - decepticon.strength) >= 3)) {
            fighterInfo.winner = autobot;
            fighterInfo.looser = decepticon;
            return fighterInfo
        } else if (((decepticon.courage - autobot.courage) >= 4) && ((decepticon.strength - autobot.strength) >= 3)) {
            fighterInfo.winner = decepticon;
            fighterInfo.looser = autobot;
            return fighterInfo
        } else if ((autobot.skill - decepticon.skill) >= 3) {
            fighterInfo.autobot = autobot;
            return fighterInfo
        }
        //  Overall Rating 
        else {
            var autobotRating = overallRating(autobot)
            var decepticonRating = overallRating(decepticon)
  
            if (autobotRating > decepticonRating) {
                fighterInfo.winner = autobot;
                fighterInfo.looser = decepticon;
            } else if (autobotRating < decepticonRating) {
                fighterInfo.winner = decepticon;
                fighterInfo.looser = autobot;
            }
        }
      
        fighterInfo.looser && fighterInfo.looser.group == "A"  ? survivors.loosersAutobot = fighterInfo.looser.name : '';
        fighterInfo.looser && fighterInfo.looser.group == "D"  ? survivors.loosersDeception += fighterInfo.looser.name : '';
        return fighterInfo;
    }
  
    /**
       @param {TransformerArray} transformerRequest
       @return split array and assigned value to appropriate Criteria
    */
    function getCriteriaData(transformerRequest){
      let criteriaData = [];
      for (var i = 0; i < transformerRequest.length; i++) {
          let resultArray = transformerRequest[i].split(",")
          var criteria = {
              "name": resultArray[0].toString().trim(),
              "group": resultArray[1].toString().trim(),
              "strength": resultArray[2].toString().trim(),
              "intelligence": resultArray[3].toString().trim(),
              "speed": resultArray[4].toString().trim(),
              "endurance": resultArray[5].toString().trim(),
              "rank": parseInt(resultArray[6]),
              "courage": resultArray[7].toString().trim(),
              "firepower": resultArray[8].toString().trim(),
              "skill": parseInt(resultArray[9])
          }
          criteriaData[i] = criteria;
      }
      return criteriaData;
    }
  
    function game(transformerRequest) {
      let sortedObject = sortbyRank("rank", getCriteriaData(transformerRequest));
      robotType.autobots = filterbygroup("A", sortedObject);
      robotType.deceptions = filterbygroup("D", sortedObject);
      winnerResult = apponentFighter();
    }
  
    init();
  
    return winnerResult;
}
  
module.exports = transformers;