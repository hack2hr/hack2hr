import numpy as np
from sklearn.linear_model import LinearRegression


class Model:

    def __init__(self, data, params):
        self.data = data
        self.current_year = params['current_year']
        self.years_to_predict = params['years_to_predict']
        self.x_params = params['x_params']
        self.y_param = params['y_param']

        self.X = []
        self.Y = []

    def parse_param(self, path, data):
        if len(path) == 1:
            return int(data[path[0]])
        return self.parse_param(path[1:], data[path[0]])

    def predict(self, model='default'):
        if model != 'default':
            for x_param in self.x_params:
                self.X.append([self.parse_param(x_param.split('.'), year) for year in self.data])

            self.Y = [self.parse_param(self.y_param.split('.'), year) for year in self.data]

            self.X = np.array(self.X).T

        return getattr(self, model)()

    def linear(self):
        return LinearRegression() \
            .fit(self.X[: (-1) * self.years_to_predict], self.Y[: (-1) * self.years_to_predict]) \
            .predict(self.X[(-1) * self.years_to_predict:])

    def exponential(self):
        return [np.exp(i) for i in LinearRegression()
                .fit(self.X[: (-1) * self.years_to_predict], np.log(self.Y[: (-1) * self.years_to_predict]))
                .predict(self.X[(-1) * self.years_to_predict:])]

    def logarithmic(self):
        return LinearRegression() \
            .fit(np.log(self.X[: (-1) * self.years_to_predict]), self.Y[: (-1) * self.years_to_predict]) \
            .predict(np.log(self.X[(-1) * self.years_to_predict:]))

    def default(self):
        """
        1. Данные 2020, кол-во занятых
        2. Объемы проз-ва, по 26-ой год -> индекс роста объема проз=ва (тек / пред года)
        3. Произ=ть труда по 26-ой год, -> индекс роста (тек / пред)

        Можем посчитать кол-во занятых за 21-ый год = занятость в 20-ом году * иденкс роста объмов про-ва / индекс роста произ-ва
        :return:
        """
        people = self.data['people']
        pr = self.data['pr']
        tr = self.data['tr']

        def iob_pr(year):
            return pr[int(year)][self.y_param] / pr[int(year) - 1][self.y_param]

        def ipr_tr(year):
            return tr[int(year)][self.y_param] / tr[int(year) - 1][self.y_param]

        return [
            self.parse_param(self.y_param.split('.'), year) * iob_pr(year['year']) / ipr_tr(year['year'])
            for year in people[: (-1) * self.years_to_predict]
        ]


if __name__ == '__main__':
    string = [{}, {}]

    print(Model(string, {
        'current_year': 1999,
        'years_to_predict': 1,
        'x_params': ['other.old', 'workAble'],
        'y_param': 'migrants'
    }).predict('exponential'))
