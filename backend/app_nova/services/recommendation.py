import numpy as np #Ananthu
import skfuzzy as fuzz #Ananthu
from skfuzzy import control as ctrl #Ananthu


##Function to compute rank
#Author-Ananthu
def compute_rank(exp, cost, user_rating):
    experience = ctrl.Antecedent(np.arange(0, 21, 1), 'experience')
    per_hour_cost = ctrl.Antecedent(np.arange(0, 101, 1), 'per_hour_cost')
    rating = ctrl.Antecedent(np.arange(0, 6, 1), 'rating')

    availability = ctrl.Antecedent(np.arange(0, 6, 1), 'availability')
    
    rank = ctrl.Consequent(np.arange(0, 101, 1), 'rank')

    experience.automf(3)
    per_hour_cost.automf(3)
    rating.automf(3)

    rank['low'] = fuzz.trimf(rank.universe, [0, 0, 33])
    rank['medium'] = fuzz.trimf(rank.universe, [0, 33, 66])
    rank['high'] = fuzz.trimf(rank.universe, [33, 66, 101])

    rule1 = ctrl.Rule(experience['poor'] | per_hour_cost['poor'] | rating['poor'], rank['low'])
    rule2 = ctrl.Rule(experience['average'] | per_hour_cost['average'] | rating['average'], rank['medium'])
    rule3 = ctrl.Rule(experience['good'] | per_hour_cost['good'] | rating['good'], rank['high'])

    rank_ctrl = ctrl.ControlSystem([rule1, rule2, rule3])

    rank = ctrl.ControlSystemSimulation(rank_ctrl)

    rank.input['experience'] = 5
    rank.input['per_hour_cost'] = 20
    rank.input['rating'] = 3.5

    return rank.compute()