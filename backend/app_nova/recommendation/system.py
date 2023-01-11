import numpy as np #Ananthu
import skfuzzy as fuzz #Ananthu
from skfuzzy import control as ctrl #Ananthu


##Function to set up system
#Author-Ananthu
def setup_system():
    experience = ctrl.Antecedent(np.arange(0, 31, 1), 'Experience')
    hourly_rate = ctrl.Antecedent(np.arange(0, 91, 1), 'Hourly Rate')
    availability = ctrl.Antecedent(np.arange(0, 41, 1), 'Availability')
    success_rate = ctrl.Antecedent(np.arange(0, 101, 1), 'Success Rate')
    rating = ctrl.Antecedent(np.arange(0, 6, 1), 'Rating')

    pref_experience = ctrl.Antecedent(np.arange(0, 31, 1), 'Pref Experience')
    pref_rating = ctrl.Antecedent(np.arange(0, 6, 1), 'Pref Rating')
    pref_hourly_rate = ctrl.Antecedent(np.arange(0, 6, 1), 'Pref Hourly Rate')
    pref_availability = ctrl.Antecedent(np.arange(0, 41, 1), 'Pref Availability')
    pref_success_rate = ctrl.Antecedent(np.arange(0, 101, 1), 'Pref Success Rate')

    recommend = ctrl.Consequent(np.arange(0, 101, 1), 'Recommendation Score')

    experience['Junior'] = fuzz.trapmf(experience.universe, [0, 0, 4, 6])
    experience['Mid Level'] = fuzz.trapmf(experience.universe, [4, 6, 9, 12])
    experience['Senior'] = fuzz.trapmf(experience.universe, [9, 12, 31, 31])

    hourly_rate['Low'] = fuzz.trapmf(hourly_rate.universe, [0, 0, 20, 35])
    hourly_rate['Medium'] = fuzz.trapmf(hourly_rate.universe, [20, 35, 45, 60])
    hourly_rate['High'] = fuzz.trapmf(hourly_rate.universe, [45, 60, 91, 91])

    availability['Low'] = fuzz.trapmf(availability.universe, [0, 0, 5, 10])
    availability['Medium'] = fuzz.trapmf(availability.universe, [5, 10, 15, 20])
    availability['High'] = fuzz.trapmf(availability.universe, [15, 20, 41, 41])

    success_rate['Low'] = fuzz.trapmf(success_rate.universe, [0, 0, 35, 50])
    success_rate['Medium'] = fuzz.trapmf(success_rate.universe, [35, 50, 65, 80])
    success_rate['High'] = fuzz.trapmf(success_rate.universe, [65, 80, 100, 100])

    rating['Very Poor'] = fuzz.trapmf(rating.universe, [0, 0, 0, 1])
    rating['Poor'] = fuzz.trapmf(rating.universe, [0, 1, 1, 2])
    rating['Weak'] = fuzz.trapmf(rating.universe, [1, 2, 2, 3])
    rating['Good'] = fuzz.trapmf(rating.universe, [2, 3, 3, 4])
    rating['Very Good'] = fuzz.trapmf(rating.universe, [3, 4, 4, 5])
    rating['Excellent'] = fuzz.trapmf(rating.universe, [4, 5, 5, 5])

    pref_hourly_rate['Low'] = fuzz.trapmf(pref_hourly_rate.universe, [0, 0, 20, 35])
    pref_hourly_rate['Medium'] = fuzz.trapmf(pref_hourly_rate.universe, [20, 35, 45, 60])
    pref_hourly_rate['High'] = fuzz.trapmf(pref_hourly_rate.universe, [45, 60, 91, 91])

    pref_rating['Very Poor'] = fuzz.trapmf(pref_rating.universe, [0, 0, 0, 1])
    pref_rating['Poor'] = fuzz.trapmf(pref_rating.universe, [0, 1, 1, 2])
    pref_rating['Weak'] = fuzz.trapmf(pref_rating.universe, [1, 2, 2, 3])
    pref_rating['Good'] = fuzz.trapmf(pref_rating.universe, [2, 3, 3, 4])
    pref_rating['Very Good'] = fuzz.trapmf(pref_rating.universe, [3, 4, 4, 5])
    pref_rating['Excellent'] = fuzz.trapmf(pref_rating.universe, [4, 5, 5, 5])

    pref_availability['Low'] = fuzz.trapmf(pref_availability.universe, [0, 0, 5, 10])
    pref_availability['Medium'] = fuzz.trapmf(pref_availability.universe, [5, 10, 15, 20])
    pref_availability['High'] = fuzz.trapmf(pref_availability.universe, [15, 20, 41, 41])

    pref_experience['Junior'] = fuzz.trapmf(pref_experience.universe, [0, 0, 4, 6])
    pref_experience['Mid Level'] = fuzz.trapmf(pref_experience.universe, [4, 6, 9, 12])
    pref_experience['Senior'] = fuzz.trapmf(pref_experience.universe, [9, 12, 31, 31])

    pref_success_rate['Low'] = fuzz.trapmf(pref_success_rate.universe, [0, 0, 35, 50])
    pref_success_rate['Medium'] = fuzz.trapmf(pref_success_rate.universe, [35, 50, 65, 80])
    pref_success_rate['High'] = fuzz.trapmf(pref_success_rate.universe, [65, 80, 100, 100])

    recommend['Low'] = fuzz.trapmf(recommend.universe, [0, 0, 35, 50])
    recommend['Medium'] = fuzz.trapmf(recommend.universe, [35, 50, 65, 80])
    recommend['High'] = fuzz.trapmf(recommend.universe, [65, 80, 100, 100])

    rule_1 = ctrl.Rule((pref_hourly_rate['Low'] | pref_hourly_rate['Medium']) & (pref_rating['Excellent'] | pref_rating['Very Good']) & pref_availability['High'] & pref_experience['Senior'] & (pref_success_rate['Medium'] | pref_success_rate['High']) & (
                (experience['Senior'] | experience['Mid Level']) & (rating['Excellent'] | rating['Very Good'] | rating['Good']) & (hourly_rate['Low'] | 
                hourly_rate['Medium']) & (availability['High'] | availability['Medium']) & (success_rate['High'] | success_rate['Medium'])), recommend['Medium'])

    rule_2 = ctrl.Rule(pref_hourly_rate['High'] & (pref_rating['Excellent'] | pref_rating['Very Good']) & pref_availability['High'] & pref_experience['Senior'] & (pref_success_rate['Medium'] | pref_success_rate['High']) & (
                (experience['Senior'] | experience['Mid Level']) & (rating['Excellent'] | rating['Very Good'] | rating['Good']) & (hourly_rate['High'] | 
                hourly_rate['Medium']) & (availability['High'] | availability['Medium']) & success_rate['High']), recommend['High'])

    rule_3 = ctrl.Rule(pref_hourly_rate['High'] & (pref_rating['Very Good'] | pref_rating['Good']) & pref_availability['High'] & pref_experience['Senior'] & (pref_success_rate['Medium'] | pref_success_rate['High']) & (
                (experience['Senior'] | experience['Mid Level']) & (rating['Very Good'] | rating['Good']) & (hourly_rate['High'] | 
                hourly_rate['Medium']) & (availability['High'] | availability['Medium']) & success_rate['High']), recommend['High'])

    rule_4 = ctrl.Rule(pref_hourly_rate['Medium'] & (pref_rating['Good'] | pref_rating['Weak']) & pref_availability['Medium'] & pref_experience['Mid Level'] & (pref_success_rate['Medium'] | pref_success_rate['High']) & (
                (experience['Senior'] | experience['Mid Level']) & (rating['Good'] | rating['Weak']) & (hourly_rate['Medium'] | 
                hourly_rate['Medium']) & (availability['High'] | availability['Medium']) & success_rate['Medium']), recommend['Medium'])
    
    rule_5 = ctrl.Rule(pref_hourly_rate['Low'] & (pref_rating['Very Poor'] | pref_rating['Poor']) & pref_availability['Low'] & pref_experience['Junior'] & (pref_success_rate['Medium'] | pref_success_rate['Low']) & (
                experience['Junior'] & (rating['Very Poor'] | rating['Poor']) & hourly_rate['Low'] & availability['Low']  & success_rate['Low']), recommend['Low'])

    rule_6 = ctrl.Rule(pref_hourly_rate['Low'] & (pref_rating['Good'] | pref_rating['Weak']) & pref_availability['Low'] & pref_experience['Mid Level'] & (pref_success_rate['Medium'] | pref_success_rate['Low']) & (
                (experience['Senior'] | experience['Mid Level']) & (rating['Good'] | rating['Weak']) & (hourly_rate['Low']) & (availability['Low'] | availability['Medium']) & (success_rate['Medium'] | success_rate['Low'])), recommend['Low'])

    rule_7 = ctrl.Rule((pref_hourly_rate['Medium'] | pref_hourly_rate['Low']) & (pref_rating['Good'] | pref_rating['Very Good']) & (pref_availability['High'] | pref_availability['Medium']) & (pref_experience['Senior'] | pref_experience['Mid Level']) & (pref_success_rate['Medium'] | pref_success_rate['High']) & (
                (experience['Senior'] | experience['Mid Level']) & (rating['Very Good'] | rating['Good']) & (hourly_rate['Medium']) & (availability['High'] | availability['Medium']) & (success_rate['Medium'] | success_rate['High'])), recommend['Medium'])

    rule_8 = ctrl.Rule((pref_hourly_rate['Medium'] | pref_hourly_rate['Low']) & (pref_rating['Excellent'] | pref_rating['Very Good']) & (pref_availability['High'] | pref_availability['Medium']) & (pref_experience['Senior'] | pref_experience['Mid Level']) & (pref_success_rate['Medium'] | pref_success_rate['High']) & (
                (experience['Senior'] | experience['Mid Level']) & (rating['Very Good'] | rating['Good']) & (hourly_rate['Medium']) & (availability['High'] | availability['Medium']) & (success_rate['Medium'] | success_rate['High'])), recommend['Medium'])

    rule_9 = ctrl.Rule((pref_hourly_rate['Medium'] | pref_hourly_rate['Low']) & (pref_rating['Good'] | pref_rating['Very Good']) & (pref_availability['High'] | pref_availability['Medium']) & (pref_experience['Senior'] | pref_experience['Mid Level']) & (pref_success_rate['Medium'] | pref_success_rate['High']) & (
                (experience['Senior'] | experience['Mid Level']) & (rating['Very Good'] | rating['Good']) & (hourly_rate['Medium']) & (availability['High'] | availability['Medium']) & (success_rate['Medium'] | success_rate['High'])), recommend['Medium'])

    rule_10 = ctrl.Rule((pref_hourly_rate['Medium'] | pref_hourly_rate['High']) & (pref_rating['Excellent'] | pref_rating['Very Good']) & (pref_availability['High'] | pref_availability['Medium']) & (pref_experience['Senior'] | pref_experience['Mid Level']) & (pref_success_rate['Medium'] | pref_success_rate['High']) & (
                (experience['Senior'] | experience['Mid Level']) & (rating['Very Good'] | rating['Excellent']) & (hourly_rate['Medium']) & (availability['High'] | availability['Medium']) & (success_rate['Medium'] | success_rate['High'])), recommend['High'])

    user_ctrl = ctrl.ControlSystem([rule_1, rule_2, rule_3, rule_4, rule_5, rule_6, rule_7, rule_8, rule_9, rule_10])

    return user_ctrl