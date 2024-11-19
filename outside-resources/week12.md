# Outside Resources Log - Week 12

## AI Prompts
+ ""## Initiate function called score_questionnaire that accepts a single argument called data. Within this function...
score_questionnaire <- function(data){

  Extract questionnaire data cell
  json_data <- data[data$trialType == "Questionnaire", "response"]
  
    Use fromJSON to convert from JSON to data frame
  questionnaire <- fromJSON(json_data)
  str(questionnaire)
  questionnaire <- as.data.frame(questionnaire)
  view(questionnaire)
  
  Convert to numeric
  questionnaire <- as.data.frame(lapply(questionnaire, as.numeric))

  Reverse score if necessary
  rev_items <- c("question5", "question6", "question10", "question12", "question13", "question14")
  for(rev_item in rev_items) {
    questionnaire[,rev_item] <- 4 - questionnaire[,rev_item]
  }

  Calculate mean or sum score
  score <- rowMeans(questionnaire, na.rm = TRUE)
  
  return(score)
}"  This is returning the wrong number for score, why?" 

+ How do you reverse score items in R

## Outside sites
+ None
