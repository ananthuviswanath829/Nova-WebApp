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
    def calculate(self, curr_user_rating, curr_user_hourly_rate):
        self.user_set = {'user_id': [], 'experience': [], 'rating': [], 'per_hour_rate': [], 'availability': [], 'score': []}

        for index in range(len(self.data)):
            try:
                self.name.input['User Rating'] = curr_user_rating
                self.name.input['User Hourly Rate'] = curr_user_hourly_rate
                self.name.input['Experience'] = self.data.experience.iloc[index]
                self.name.input['Hourly Rate'] = int(self.data.per_hour_rate.iloc[index])
                self.name.input['Availability'] = int(self.data.availability.iloc[index])
                self.name.input['Rating'] = int(self.data.rating.iloc[index])
                
                self.name.compute()
                self.user_set['user_id'].append(self.data.user_id.iloc[index])
                self.user_set['experience'].append(self.data.experience.iloc[index])
                self.user_set['rating'].append(self.data.rating.iloc[index])
                self.user_set['per_hour_rate'].append(self.data.per_hour_rate.iloc[index])
                self.user_set['availability'].append(self.data.availability.iloc[index])
                self.user_set['score'].append(self.name.output['Recommendation Score'])
            except:
                pass
    
    
    #Function to sort list based on recommended score
    def results(self):
        res = pd.DataFrame.from_dict(self.user_set)
        res = res.sort_values(by=['score'], ascending=[False])
        return res