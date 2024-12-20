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
install.packages("ggplot2")
library(ggplot2)

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
  tmp <- data[data$rt > 300 & data$rt < 5000 & data$correct == TRUE,]

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
    d_score <- (incongruent_means - congruent_means) / pooled_sd
    
## Step 7: Return D-score
    return(d_score)
}


## Initiate function called score_questionnaire that accepts a single argument called `data`. Within this function...
score_questionnaire <- function(data){
  
  # Extract questionnaire data cell
  json_data <- data[data$trialType == "Questionnaire", "response"]
  
  ## Use fromJSON to convert from JSON to data frame
  questionnaire <- fromJSON(json_data)
  questionnaire <- as.data.frame(questionnaire)
  
  ## Convert to numeric
  questionnaire <- as.data.frame(lapply(questionnaire, as.numeric))
  
  ## Reverse score if necessary
  rev_items <- c("question5", "question6", "question10", "question12", "question13", "question14")
  for(rev_item in rev_items) {
    questionnaire[,rev_item] <- 4 - questionnaire[,rev_item]
  }
  
  ## Calculate mean or sum score
  score <- rowMeans(questionnaire, na.rm = TRUE)
  
  return(score)
}


#### Question 5 -----iat_data1#### Question 5 -----

## Set a variable called directory_path with the path to the location of your data csv files. This directory should *only* contain your raw participant csv data files and no other files.
directory_path <- "~/Documents/psy1903/osfstorage-archive"

## Create a list of all the files in that directory.
files_list <- list.files(path = directory_path, pattern = "\\.csv$", full.names = TRUE)

## Create an empty data frame called dScores that has two columns (IAT) or three columns (EST) and as many rows as you have data files (e.g., participants)
dScores <- data.frame(matrix(nrow = length(files_list), ncol = 4))

## Rename the default column names to something meaningful
colnames(dScores) <- c("participant_ID", "d_score", "whichPrime", "questionnaire")

## Initiate variable i to represent row numbers for each iteration, starting with 1
i = 1
## Now fill in the remaining code following the commented instructions:
## Initiate a for loop that iterates across each file in files_list

for (file in files_list){
  
  # Use read.csv to read in your file as a temporary data frame called tmp
  tmp <- read.csv(file)
  tmp$rt <- as.numeric(tmp$rt)
  tmp$correct <- as.logical(tmp$correct)
  
  column_names <- c("expectedCategory", "expectedCategoryAsDisplayed", "leftCategory", "rightCategory")
  for (column_name in column_names){
    tmp[,column_name] <- as.factor(tmp[,column_name])
  }
  
  # Assign participant_ID as the basename of the file
  participant_ID <- tools::file_path_sans_ext(basename(file))
  
  # Isolate the participant_ID column for the current row number (i) and assign it to be the current participant_ID variable
  dScores[i, "participant_ID"] <- participant_ID
  
  # Using similar logic, isolate the d_score OR c("emotionA_d_score", "emotionB_d_score") column(s) for the current row number (i) and assign it to be the current d-score(s) by using our calculate_IAT_dscore or calculate_EST_dscore on the tmp data file
  
  dScores[i, "d_score"] <- calculate_IAT_dscore(tmp)

  # Remove the temporary data file tmp
  
  #Whichprime
  dScores[i, "whichPrime"] <- tmp[tmp$trialType == "prime", "whichPrime"]
  #print(dScores[i, "whichPrime"])
  
  dScores[i, "questionnaire"] <- score_questionnaire(tmp)
  rm(tmp)
  
  # Increase our row number variable i by one for the next iteration
  i <- i + 1
}

dScores$whichPrime <- as.factor(dScores$whichPrime)
dScores$d_score <- as.numeric(dScores$d_score)
dScores$questionnaire <- as.numeric(dScores$questionnaire)


## Outside of the for loop, save the new dScores data frame using write.csv() into your data_cleaning/data subdirectory:
write.csv(dScores,"~/Documents/psy1903/stats/data_cleaning/data/participant_dScores.csv", row.names = FALSE)

anova_scores <- aov(dScores$d_score ~ dScores$whichPrime)
summary(anova_scores)

TukeyHSD(anova_scores)

cor.test(dScores$d_score, dScores$questionnaire)

png("~/Documents/psy1903/stats/data_cleaning/output/Fig1_baseR_histogram.png", width = 600, height = 500)

hist(dScores$d_score,
     xlab = "D-Scores",
     ylab = "Frequency",
     main = "Distribution of D-Scores",)

dev.off()


#histogram ggplot
png("~/Documents/psy1903/stats/data_cleaning/output/Fig2_ggplot_histogram.png", width = 600, height = 500)

ggplot(data = dScores,aes(x = d_score))+
  geom_histogram(fill="skyblue",
                 col = "black",
                 binwidth = 0.1 )+
  labs(title = "Distribution of D-Scores",
       x = "D-Scores",
       y = "Frequency")+
  theme_minimal()

dev.off()

#hist by prime
png("~/Documents/psy1903/stats/data_cleaning/output/Fig3_ggplot_histogram_by_prime.png", width = 600, height = 500)

ggplot(data = dScores,aes(x = d_score))+
  geom_histogram(fill="skyblue",
               col = "black",
               binwidth = 0.1)+
  labs(title = "Distribution of D-Scores",
       x = "D-Scores",
       y = "Frequency")+
  theme_classic()+
  facet_wrap(~whichPrime)

dev.off()

#boxplot
png("~/Documents/psy1903/stats/data_cleaning/output/Fig4_ggplot_boxplot.png", width = 600, height = 500)

ggplot(data = dScores,aes(x = whichPrime, y = d_score, fill = whichPrime))+
  geom_boxplot(col = "black")+
  labs(title = "Effect of Prime on D-Scores",
       x = "Prime Condition",
       y = "D-Scores")+
  theme_classic()+
  theme(legend.position = "none")+
  scale_x_discrete(labels = c("Queer" = "Queer", "Control" = "Control", "CisHet" = "Cisgender Heterosexual"))


dev.off()

#scatterplot
png("~/Documents/psy1903/stats/data_cleaning/output/Fig5_ggplot_scatter.png", width = 600, height = 500)

ggplot(data = dScores,aes(x = questionnaire, y = d_score))+
  geom_point()+
  labs(title = "Correlation Between Questionnaire and D-Scores",
       x = "Questionnaire",
       y = "D-Scores")+
  theme_classic()+
  geom_smooth(method = "lm", se = FALSE)
  
dev.off()

# Creating my own theme
my_theme <- function(my_colors = NULL) {
  font <- "Arial"  # Define font
  
  # Base theme
  theme_classic(base_family = font) +
    theme(
      # Grid elements
      panel.grid.major = element_blank(),
      panel.grid.minor = element_blank(),
      
      # Titles
      plot.title = element_text(color = "dodgerblue3", size = 18),
      axis.title.x = element_text(color = "deepskyblue4"),
      axis.title.y = element_text(color = "deepskyblue4"),
      
      # Background
      plot.background = element_rect(fill = "lightpink1", color = "black", size = 1.5),
      panel.background = element_rect(fill = "white", color = "black", size = 1),
      
      # Legend
      legend.background = element_rect(fill = "deeppink1", color = "black"),
      legend.key = element_rect(fill = "lightpink1", color = "black"),
      
      # Legend position
      legend.position = "none"  # Move this setting here
    )
}

#boxplot
png("~/Documents/psy1903/stats/data_cleaning/output/Fig6_custom_theme.png", width = 600, height = 500)

ggplot(data = dScores,aes(x = whichPrime, y = d_score, fill = whichPrime))+
  geom_boxplot(col = "black")+
  labs(title = "Effect of Prime on D-Scores",
       x = "Prime Condition",
       y = "D-Scores")+
  my_theme()+
  theme(legend.position = "none")+
  scale_x_discrete(labels = c("Queer" = "Queer 1", "Control" = "Control", "CisHet" = "Cisgender Heterosexual"))


dev.off()








