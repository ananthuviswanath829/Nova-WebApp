##Class to generate fuzzyset for Experience
#Author-Ananthu
class Experience:

    def junior(self, exp):
        """Junor range - 1 to 3"""
        if exp < 4:
            return 1.0
        elif 4 <= exp < 7:
            return float((7 - exp) / 4)
        else:
            return 0.0
    
    def mid_level(self, exp):
        """Mid level range - 7 to 9"""
        if 4 <= exp <= 6:
            return float((exp - 3) / 4)
        elif 6 < exp <= 9:
            return 1.0
        elif 9 < exp <= 12:
            return float((13 - exp) / 4)
        else:
            return 0.0
    
    def senior(self, exp):
        """Senor range - 13 or above"""
        if exp >= 13:
            return 1.0
        elif 9 < exp <= 12:
            return float((exp - 9) / 4)
        else:
            return 0.0
    
    def get_fuzzy_set(self, exp):
        """Get fuzzy set values of given experience."""
        return [self.junior(exp), self.mid_level(exp), self.senior(exp)]


##Class to generate fuzzyset for Per Hour Cost
#Author-Ananthu
class HourlyRate:

    def low(self, rate):
        """Get value for low fuzzy set for given rate."""
        if rate < 20.0:
            return 1.0
        elif 20.0 <= rate < 35.0:
            return float((35-rate)/15.0)
        else:
            return 0.0
        
    def medium(self, rate):
        """Get value for medium fuzzy set for given rate."""
        if rate <= 20 or rate > 60:
            return 0.0
        elif 20 < rate <= 35:
            return float(rate-20)/15
        elif 35 < rate <= 45:
            return 1.0
        elif 45 < rate <= 60:
            return (60-rate)/15.0
        
    def high(self, rate):
        """get value for high fuzzy set for given rate."""
        if rate <= 45:
            return 0.0
        elif 45 < rate <= 60:
            return (rate-45.0)/15
        else:
            return 1.0
    
    def get_fuzzy_set(self, rate):
        """Get fuzzy set values of given rate."""
        return [self.low(rate), self.medium(rate), self.high(rate)]


##Class to generate fuzzyset for availability
#Author-Ananthu
class Availability:

    def low(self, availability):
        """Get value for low fuzzy set for given availability."""
        if 0 < availability <= 5:
            return 1.0
        elif 5 < availability <= 10:
            return float((10 - availability) / 5)
        else:
            return 0.0
    
    def medium(self, availability):
        """Get value for medium fuzzy set for given availability."""
        if 5 < availability <= 10:
            return float((availability - 5) / 5)
        elif 10 < availability <= 15:
            return 1.0
        elif 15 < availability <= 20:
            return float((20 - availability) / 5)
        else:
            return 0.0
    
    def high(self, availability):
        """Get value for high fuzzy set for given availability."""
        if availability > 20:
            return 1.0
        elif 15 < availability <= 20:
            return float((availability - 15) / 5)
        else:
            return 0.0
    
    def get_fuzzy_set(self, availability):
        """Get fuzzy set values of given availability."""
        return [self.low(availability), self.medium(availability), self.high(availability)]


##Class to generate fuzzyset for rating
#Author-Ananthu
class Rating:

    def excellent(self, rating):
        """Get value for excellent fuzzy set for given rating."""
        if rating == 5:
            return 1.0
        elif 4 < rating < 5:
            return float((rating - 4))
        else:
            return 0.0
    
    def very_good(self, rating):
        """Get value for very good fuzzy set for given rating."""
        if rating == 4:
            return 1.0
        elif 3 < rating < 4:
            return float(rating - 3)
        elif 4 < rating < 5:
            return float(5 - rating)
        else:
            return 0.0

    def good(self, rating):
        """Get value for good fuzzy set for given rating."""
        if rating == 3:
            return 1.0
        elif 2 < rating < 3:
            return float(rating - 2)
        elif 3 < rating < 4:
            return float(4 - rating)
        else:
            return 0.0
    
    def weak(self, rating):
        """Get value for weak fuzzy set for given rating."""
        if rating == 2:
            return 1.0
        elif 1 < rating < 2:
            return float(rating - 1)
        elif 2 < rating < 3:
            return float(3 - rating)
        else:
            return 0.0
    
    def poor(self, rating):
        """Get value for poor fuzzy set for given rating."""
        if rating <= 1:
            return 1.0
        elif 1 < rating < 2:
            return float(2 - rating)
        else:
            return 0.0
    
    def get_fuzzy_set(self, rating):
        """Get fuzzy set values of given rating."""
        return [self.excellent(rating), self.very_good(rating), self.good(rating), self.weak(rating), self.poor(rating)]