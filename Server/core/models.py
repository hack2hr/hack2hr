import numpy as np
from sklearn.linear_model import LinearRegression


class Model:

    def __init__(self, data, params):
        self.data = data
        self.id, self.start_year, self.years_amount = params
        self.X = []
        self.Y = []

    def predict(self, model='linear'):
        # TODO разобраться с парсингом json данных
        for year, trend in self.data.items():
            if year == self.start_year:
                self.Y = trend
            else:
                self.X.append(trend)

        self.X = np.array(self.X).T
        return getattr(self, model)()

    def linear(self):
        return LinearRegression() \
            .fit(self.X[: (-1) * self.years_amount], self.Y[: (-1) * self.years_amount]) \
            .predict(self.X[(-1) * self.years_amount:])

    def exponential(self):
        pass

    def logarithmic(self):
        pass


if __name__ == '__main__':
    Model({
        2016: [1, 2, 3],
        2017: [2, 3, 4],
        2018: [3, 4, 5],
        2019: [3, 4, 5],
        2020: [3, 4, 5],
        2021: [3, 4, 5]
    }, {
        'id': [],
        'start_year': 2021,
        'years_amount': 6
    }).predict()
