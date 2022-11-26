import numpy as np #Ananthu
import pandas as pd #Ananthu
import skfuzzy as fuzz #Ananthu
from skfuzzy import control as ctrl #Ananthu


##Function to set up system
#Author-Ananthu
def setup_system():
    experience = ctrl.Antecedent(np.arange(0, 31, 1), 'Experience')
    hourly_rate = ctrl.Antecedent(np.arange(0, 91, 1), 'Hourly Rate')
    availability = ctrl.Antecedent(np.arange(0, 41, 1), 'Availability')
    rating = ctrl.Antecedent(np.arange(0, 6, 1), 'Rating')

    user_experience = ctrl.Antecedent(np.arange(0, 31, 1), 'Experience')
    user_rating = ctrl.Antecedent(np.arange(0, 6, 1), 'User Rating')
    user_hourly_rate = ctrl.Antecedent(np.arange(0, 6, 1), 'User Hourly Rate')
    user_availability = ctrl.Antecedent(np.arange(0, 41, 1), 'Availability')

    recommend = ctrl.Consequent(np.arange(0, 1.1, 0.1), 'Recommendation Score')

    experience['Junior'] = fuzz.trapmf(experience.universe, [0, 0, 4, 6])
    experience['Mid Level'] = fuzz.trapmf(experience.universe, [4, 6, 9, 12])
    experience['Senior'] = fuzz.trapmf(experience.universe, [9, 12, 31, 31])

    hourly_rate['Low'] = fuzz.trapmf(hourly_rate.universe, [0, 0, 20, 35])
    hourly_rate['Medium'] = fuzz.trapmf(hourly_rate.universe, [20, 35, 45, 60])
    hourly_rate['High'] = fuzz.trapmf(hourly_rate.universe, [45, 60, 91, 91])

    availability['Low'] = fuzz.trapmf(availability.universe, [0, 0, 5, 10])
    availability['Medium'] = fuzz.trapmf(availability.universe, [5, 10, 15, 20])
    availability['High'] = fuzz.trapmf(availability.universe, [15, 20, 41, 41])

    rating['Very Poor'] = fuzz.trimf(rating.universe, [0, 0, 1])
    rating['Poor'] = fuzz.trimf(rating.universe, [0, 1, 2])
    rating['Weak'] = fuzz.trimf(rating.universe, [1, 2, 3])
    rating['Good'] = fuzz.trimf(rating.universe, [2, 3, 4])
    rating['Very Good'] = fuzz.trimf(rating.universe, [3, 4, 5])
    rating['Excellent'] = fuzz.trimf(rating.universe, [4, 5, 5])

    user_hourly_rate['Low'] = fuzz.trapmf(user_hourly_rate.universe, [0, 0, 20, 35])
    user_hourly_rate['Medium'] = fuzz.trapmf(user_hourly_rate.universe, [20, 35, 45, 60])
    user_hourly_rate['High'] = fuzz.trapmf(user_hourly_rate.universe, [45, 60, 91, 91])

    user_rating['Very Poor'] = fuzz.trimf(user_rating.universe, [0, 0, 1])
    user_rating['Poor'] = fuzz.trimf(user_rating.universe, [0, 1, 2])
    user_rating['Weak'] = fuzz.trimf(user_rating.universe, [1, 2, 3])
    user_rating['Good'] = fuzz.trimf(user_rating.universe, [2, 3, 4])
    user_rating['Very Good'] = fuzz.trimf(user_rating.universe, [3, 4, 5])
    user_rating['Excellent'] = fuzz.trimf(user_rating.universe, [4, 5, 5])

    user_availability['Low'] = fuzz.trapmf(user_availability.universe, [0, 0, 5, 10])
    user_availability['Medium'] = fuzz.trapmf(user_availability.universe, [5, 10, 15, 20])
    user_availability['High'] = fuzz.trapmf(user_availability.universe, [15, 20, 41, 41])

    user_experience['Junior'] = fuzz.trapmf(user_experience.universe, [0, 0, 4, 6])
    user_experience['Mid Level'] = fuzz.trapmf(user_experience.universe, [4, 6, 9, 12])
    user_experience['Senior'] = fuzz.trapmf(user_experience.universe, [9, 12, 31, 31])

    recommend['Recommend'] = fuzz.smf(recommend.universe, 0, 1)

    rule_1 = ctrl.Rule(user_hourly_rate['High'] & user_rating['Excellent'] & user_availability['High'] & user_experience['Senior'] (
        experience['Senior'] | rating['Excellent'] | hourly_rate['High'] | availability['High'] ), recommend['Recommend'])
    
    rule_2 = ctrl.Rule(user_hourly_rate['High'] & user_rating['Excellent'] & user_availability['High'] & user_experience['Mid Level'] (
        experience['Mid Level'] | rating['Excellent'] | hourly_rate['High'] | availability['High'] ), recommend['Recommend'])
    
    rule_3 = ctrl.Rule(user_hourly_rate['High'] & user_rating['Excellent'] & user_availability['High'] & user_experience['Junior'] (
        experience['Junior'] | rating['Excellent'] | hourly_rate['High'] | availability['High'] ), recommend['Recommend'])

    rule_4 = ctrl.Rule(user_hourly_rate['High'] & user_rating['Excellent'] & user_availability['Medium'] & user_experience['Junior'] (
        experience['Junior'] | rating['Excellent'] | hourly_rate['High'] | availability['Medium'] ), recommend['Recommend'])

    rule_5 = ctrl.Rule(user_experience['Mid Level'] & user_hourly_rate['High'] & user_rating['Excellent'] & user_availability['Medium'] &  (
        experience['Mid Level'] | rating['Excellent'] | hourly_rate['High'] | availability['High'] ), recommend['Recommend'])

    rule_2 = ctrl.Rule(user_hourly_rate['High'] & user_rating['Very Good'] & (
        experience['Senior'] | rating['Very Good'] | hourly_rate['High'] | availability['High'] ),
        recommend['Recommend'])
    
    rule_3 = ctrl.Rule(user_hourly_rate['High'] & user_rating['Good'] & (
        experience['Senior'] | rating['Good'] | hourly_rate['High'] | availability['High'] ),
        recommend['Recommend'])

    rule_4 = ctrl.Rule(user_hourly_rate['High'] & user_rating['Weak'] & (
        rating['Weak'] | hourly_rate['High'] | availability['High'] ),
        recommend['Recommend'])
    
    rule_5 = ctrl.Rule(user_hourly_rate['High'] & user_rating['Poor'] & (
        rating['Poor'] | hourly_rate['High'] | availability['High'] ),
        recommend['Recommend'])
    
    rule_6 = ctrl.Rule(user_hourly_rate['High'] & user_rating['Very Poor'] & (
        rating['Poor'] | hourly_rate['High'] | availability['High'] ),
        recommend['Recommend'])
    
    rule_7 = ctrl.Rule(user_hourly_rate['Medium'] & user_rating['Excellent'] & (
        experience['Senior'] | rating['Excellent'] | hourly_rate['High'] | availability['High'] ),
        recommend['Recommend'])
    
    rule_8 = ctrl.Rule(user_hourly_rate['Medium'] & user_rating['Very Good'] & (
        experience['Senior'] | rating['Very Good'] | hourly_rate['High'] | availability['High'] ),
        recommend['Recommend'])
    
    rule_9 = ctrl.Rule(user_hourly_rate['Medium'] & user_rating['Good'] & (
        experience['Senior'] | rating['Good'] | hourly_rate['High'] | availability['High'] ),
        recommend['Recommend'])

    rule_10 = ctrl.Rule(user_hourly_rate['Medium'] & user_rating['Weak'] & (
        rating['Weak'] | hourly_rate['High'] | availability['High'] ),
        recommend['Recommend'])
    
    rule_11 = ctrl.Rule(user_hourly_rate['Medium'] & user_rating['Poor'] & (
        rating['Poor'] | hourly_rate['High'] | availability['High'] ),
        recommend['Recommend'])
    
    rule_12 = ctrl.Rule(user_hourly_rate['Medium'] & user_rating['Very Poor'] & (
        rating['Poor'] | hourly_rate['High'] | availability['High'] ),
        recommend['Recommend'])
    
    rule_13 = ctrl.Rule(user_hourly_rate['Low'] & user_rating['Excellent'] & (
        experience['Senior'] | rating['Excellent'] | hourly_rate['High'] | availability['High'] ),
        recommend['Recommend'])
    
    rule_14 = ctrl.Rule(user_hourly_rate['Low'] & user_rating['Very Good'] & (
        experience['Senior'] | rating['Very Good'] | hourly_rate['High'] | availability['High'] ),
        recommend['Recommend'])
    
    rule_15 = ctrl.Rule(user_hourly_rate['Low'] & user_rating['Good'] & (
        experience['Senior'] | rating['Good'] | hourly_rate['High'] | availability['High'] ),
        recommend['Recommend'])

    rule_16 = ctrl.Rule(user_hourly_rate['Low'] & user_rating['Weak'] & (
        rating['Weak'] | hourly_rate['High'] | availability['High'] ),
        recommend['Recommend'])
    
    rule_17 = ctrl.Rule(user_hourly_rate['Low'] & user_rating['Poor'] & (
        rating['Poor'] | hourly_rate['High'] | availability['High'] ),
        recommend['Recommend'])
    
    rule_18 = ctrl.Rule(user_hourly_rate['Low'] & user_rating['Very Poor'] & (
        rating['Poor'] | hourly_rate['High'] | availability['High'] ),
        recommend['Recommend'])

    user_ctrl = ctrl.ControlSystem([rule_1, rule_2, rule_3, rule_4, rule_5, rule_6, rule_7, rule_8, rule_9, 
                                        rule_10, rule_11, rule_12, rule_13, rule_14, rule_15, rule_16, rule_17, rule_18])

    return user_ctrl