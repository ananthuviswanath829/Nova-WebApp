import numpy as np #Ananthu
import pandas as pd #Ananthu
import skfuzzy as fuzz #Ananthu

from skfuzzy import control as ctrl #Ananthu
from .system import setup_system #Ananthu


##Class to recommend users
#Author-Ananthu
class UserController:

    #Constructor to store the data
    def __init__(self, user_list) -> None:
        self.data = pd.DataFrame(user_list)
        self.user_ctrl = setup_system()


    #Function to create sim instance
    def create_sim_instance(self, name):
        self.name = ctrl.ControlSystemSimulation(self.user_ctrl)
    

    #Function to calculate scores
    def calculate(self, pref_experience, pref_per_hour_rate, pref_availability, pref_rating, pref_success_rate):
        self.user_set = {'user_id': [], 'score': []}

        for index in range(len(self.data)):
            try:
                self.name.input['Pref Rating'] = float(pref_rating)
                self.name.input['Pref Hourly Rate'] = float(pref_per_hour_rate)
                self.name.input['Pref Experience'] = float(pref_experience)
                self.name.input['Pref Availability'] = float(pref_availability)
                self.name.input['Pref Success Rate'] = float(pref_success_rate)
                self.name.input['Hourly Rate'] = float(self.data.per_hour_rate.iloc[index])
                self.name.input['Rating'] = float(self.data.rating.iloc[index])
                self.name.input['Availability'] = float(self.data.availability.iloc[index])
                self.name.input['Experience'] = float(self.data.experience.iloc[index])
                self.name.input['Success Rate'] = float(self.data.success_rate.iloc[index])

                self.name.compute()
                self.user_set['user_id'].append(self.data.user_id.iloc[index])
                self.user_set['score'].append(self.name.output['Recommendation Score'])
                print(self.name.output)
            except:
                pass
    
    
    #Function to sort list based on recommended score
    def results(self):
        res = pd.DataFrame.from_dict(self.user_set)
        res = res.sort_values(by=['score'], ascending=[False])
        res = res.to_dict('records')
        return res