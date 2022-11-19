import matplotlib.pyplot as plt

from fuzzy_sets import *


def plot_graph(obj, max_val, title, label_list):
    x1, x2, x3 = [], [], []

    y = list(range(max_val))

    for num in y:
        val = obj.get_fuzzy_set(num)
        x1.append(val[0])
        x2.append(val[1])
        x3.append(val[2])
    
    plt.plot(y, x1, label = label_list[0])
    plt.plot(y, x2, label = label_list[1])
    plt.plot(y, x3, label = label_list[2])
    plt.title(title)
    plt.legend()
    plt.show()
    

def plot_experience():
    plot_graph(Experience(), 20, 'Experience', ['Junior', 'Mid Level', 'Senior'])


def plot_hourly_rate():
    plot_graph(HourlyRate(), 65, 'Hourly Rate', ['Low', 'Average', 'High'])


def plot_availability():
    plot_graph(Availability(), 35, 'Availability', ['Low', 'Average', 'High'])


def plot_rating():
    obj = Rating()
    xs = [x * 0.1 for x in range(0, 51)]
    x1, x2, x3, x4, x5 = [], [], [], [], []

    for num in xs:
        val = obj.get_fuzzy_set(num)
        x1.append(val[0])
        x2.append(val[1])
        x3.append(val[2])
        x4.append(val[3])
        x5.append(val[4])

    plt.plot(xs, x1, label = "Excellent")
    plt.plot(xs, x2, label = "Very Good")
    plt.plot(xs, x3, label = "Good")
    plt.plot(xs, x4, label = "Weak")
    plt.plot(xs, x5, label = "Poor")
    plt.title('Rating')
    plt.legend()
    plt.show()


plot_experience()
plot_hourly_rate()
plot_availability()
plot_rating()