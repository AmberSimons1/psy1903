##Week 11 Task set
##create directories
getwd()
setwd("~/Documents/psy1903/stats/")
dir.create("data_cleaning")
dir.create("data_cleaning/scripts")
dir.create("data_cleaning/data")
dir.create("data_cleaning/output")

setwd("~/Documents/psy1903/stats/data_cleaning/scripts")

## Use pacman
if (!require("pacman")) {install.packages("pacman"); require("pacman")}  # First install and load in pacman to R

## Then use p_load and a list of all of the packages that you need for the project (with each one being in "quotes")
p_load("tidyverse","rstudioapi","lme4","emmeans","psych","corrplot", "jsonlite")  # tidyverse contains many packages like dplyr, tidyr, stringr, and ggplot2, among others, and the additional packages should cover our data manipulations, plotting, and analyses

## Create a data frame for the first iat participant 
iat_data1 <- read.csv("~/Documents/psy1903/osfstorage-archive/no-closet-2024-11-05-21-47-34.csv", header = TRUE, sep = ",", na.strings = "NA")

## examining the data frame
str(iat_data1)
summary(iat_data1)

#### Question 3 ----

iat_data2 <- iat_data1[iat_data1$expectedCategoryAsDisplayed == "Mental illness or Cishet" |
                         iat_data1$expectedCategoryAsDisplayed == "Mental illness or LGBTQ+" | 
                         iat_data1$expectedCategoryAsDisplayed == "Physical illness or Cishet" |
                         iat_data1$expectedCategoryAsDisplayed == "Physical illness or LGBTQ+", c("trial_index", "rt", "response", "word",
                            "expectedCategory", "expectedCategoryAsDisplayed", "leftCategory", "rightCategory", "correct")]
## factor 

column_names <- c("expectedCategory", "expectedCategoryAsDisplayed", "leftCategory", "rightCategory")

for (column_name in column_names){
  iat_data2[,column_name] <- as.factor(iat_data2[,column_name])
}

str(iat_data2)


#### IAT -----

## Step 1: Specify your function with one argument, data

calculate_IAT_dscore <- function(data){

## Step 2: Filter out trials with rt < 300 & > 5000 ms or only select trials between those (subset full data frame into new data frame called tmp)
  tmp <- data[data$rt > 300 & data$rt < 5000,]

## Step 3: Separate congruent and incongruent trials (subset tmp into two new data frames: congruent_trials and incongruent_trials) 
    congruent_trials <- tmp[tmp$expectedCategoryAsDisplayed == "Mental illness or LGBTQ+" |
                    tmp$expectedCategoryAsDisplayed == "Physical illness or Cishet",]
    incongruent_trials <- tmp[tmp$expectedCategoryAsDisplayed == "Mental illness or Cishet" |
                       tmp$expectedCategoryAsDisplayed == "Physical illness or LGBTQ+",]
  
## Step 4: Calculate mean for congruent and mean for incongruent trials (mean_congruent, mean_incongruent)
    congruent_means <- mean(congruent_trials$rt, na.rm = TRUE)
    incongruent_means <- mean(incongruent_trials$rt, na.rm = TRUE)
    
## Step 5: Calculate standard deviation for all trials (pooled_sd) 
    pooled_sd <- sd(tmp$rt, na.rm = TRUE)
    
## Step 6: Calculate D-score
    d_score <- (congruent_means - incongruent_means) / pooled_sd
    
## Step 7: Return D-score
    return(d_score)
}

calculate_IAT_dscore()


#### Question 5 -----

## Set a variable called directory_path with the path to the location of your data csv files. This directory should *only* contain your raw participant csv data files and no other files.
directory_path <- "~/Documents/psy1903/osfstorage-archive"

## Create a list of all the files in that directory.
files_list <- list.files(path = directory_path, pattern = "\\.csv$", full.names = TRUE)

## Create an empty data frame called dScores that has two columns (IAT) or three columns (EST) and as many rows as you have data files (e.g., participants)
dScores <- data.frame(matrix(nrow = length(files_list), ncol = 2))

## Rename the default column names to something meaningful
colnames(dScores) <- c("participant_ID", "d_score")

## Initiate variable i to represent row numbers for each iteration, starting with 1
i = 1
## Now fill in the remaining code following the commented instructions:

## Initiate a for loop that iterates across each file in files_list

for (file in files_list){
# Use read.csv to read in your file as a temporary data frame called tmp
  tmp <- read.csv(file)

# Assign participant_ID as the basename of the file
  participant_ID <- tools::file_path_sans_ext(basename(file))

# Isolate the participant_ID column for the current row number (i) and assign it to be the current participant_ID variable
  dScores[i, "participant_ID"] <- participant_ID
  
# Using similar logic, isolate the d_score OR c("emotionA_d_score", "emotionB_d_score") column(s) for the current row number (i) and assign it to be the current d-score(s) by using our calculate_IAT_dscore or calculate_EST_dscore on the tmp data file
  dScores[i, "d_score"] <- calculate_IAT_dscore(tmp)
# Remove the temporary data file tmp

  rm(tmp)
# Increase our row number variable i by one for the next iteration
 i <- i + 1
}
## Outside of the for loop, save the new dScores data frame using write.csv() into your data_cleaning/data subdirectory:
write.csv(dScores,"~/Documents/psy1903/stats/data_cleaning/data/participant_dScores.csv", row.names = FALSE)


