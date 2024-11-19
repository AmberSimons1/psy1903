##Week 11 Task set
##create directories
getwd()
setwd("~/Documents/psy1903/stats/")

setwd("~/Documents/psy1903/stats/data_cleaning/scripts")


#### Questionnaire Scoring -----------------------------------------------------

## Read in data file to a data frame called iat_test
iat_test <- read.csv("~/Documents/Psy1903/stats/data_cleaning/data/my-iat-test-data.csv")

## Extract questionnaire data
json_data <- iat_test[iat_test$trialType == "Questionnaire", "response"]

## Use fromJSON to Convert from JSON to data frame
questionnaire <- fromJSON(json_data)
str(questionnaire)
questionnaire <- as.data.frame(questionnaire)

## Convert to numeric
questionnaire <- as.data.frame(lapply(questionnaire, as.numeric))

## Reverse score if necessary
rev_items <- c("question1", "question3", "question5", "question7")
for(rev_item in rev_items) {
  questionnaire[,rev_item] <- 6 - questionnaire[,rev_item]
}

