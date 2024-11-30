# Outside Resources Log - Week 12

## AI Prompts
+ "What is wrong with this " ggplot(data = dScores,aes(x = d_score))+
  geom_histogram(fill="skyblue",
                 col = "black",
                 binwidth = 0.1 )+
  labs(title = "Distribution of D-Scores",
       x = "D-Scores",
       y = "Frequency")""

+ "What is wrong with this "ggplot(data = dScores,aes(x = whichPrime, y = d_score))+
  geom_boxplot(fill = "A4A4A4", col = "black")+
  labs(title = "Effect of Prime on D-Scores",
       x = "Prime Condition",
       y = "D-Scores")+
  theme_classic()+
  theme(position = "none")+
  scale_x_discrete(labels(c("Queer" = "Queer", "Control" = "Control", "CisHet" = "Cisgender Heterosexual")))""

+ "Error in geom_boxplot():
! Problem while converting geom to grob.
ℹ Error occurred in the 1st layer.
Caused by error:
! Unknown colour name: A4A4A4
Run rlang::last_trace() to see where the error occurred.
Warning message:
Removed 1 row containing non-finite outside the scale range
(stat_boxplot())."

+ What do I use to customize the grid elements in ggplot
+ What kind of background elements can I change when making a custom theme in ggplot
+ What do I do so that when I make a bar graph or box plot, the theme will tell it to automatically use a specific set of colors
+ What does this mean " Error: unexpected ',' in:
"  #Grid elements
    panel.grid.major = element_line(color = "black", size = 0.6),""
+ What does this error mean "Error: unexpected symbol in:
"    panel.grid.major = element_line(color = "black", size = 0.6)
    panel.grid.minor""
+ I got this error - Error in my_theme():
! Can't add (if (!is.null(my_colors)) scale_fill_manual(values = my_colors)
  else NULL) to a theme object.
Run rlang::last_trace() to see where the error occurred.
+ Why cant I see any of my titles


## Outside sites
+ [Histogram](https://r-charts.com/distribution/histogram-binwidth-ggplot2/)

+ [ggplot](https://www.sthda.com/english/wiki/ggplot2-box-plot-quick-start-guide-r-software-and-data-visualization)

+ [Scatterplots](https://www.sthda.com/english/wiki/ggplot2-scatter-plots-quick-start-guide-r-software-and-data-visualization)

+ [custom theme](https://rpubs.com/mclaire19/ggplot2-custom-themes)

+ [colors] (https://sape.inf.usi.ch/quick-reference/ggplot2/colour)

