import urllib.request
import urllib.response
import urllib.parse

from bs4 import BeautifulSoup
import re


class Data:

    def __init__(self, search_param, request='', area=''):
        self.search_param = search_param
        self.request = request
        self.area = area
        self.global_config = {
            'areas': {
                'Калининград': 41,
                'Кострома': 52
            }
        }

    def get(self, parse_function):
        get_link, config = parse_function(self.search_param, self.request)
        param = config['search_params'][self.search_param]

        html = self.get_html(get_link(self.area and self.global_config['areas'][self.area]) or '')
        if html != -1:
            result = re.search(param['place'], str(BeautifulSoup(html, "lxml")))
            if result:
                return result.group(1)
            else:
                return 0
        else:
            return 'Error'

    def get_html(self, link):
        try:
            fp = urllib.request.urlopen(link)
            return fp.read().decode("utf8")
        except Exception as e:
            print(repr(e))
            return -1


def parse_hh(search_param, request):
    config = {
        'link': 'https://kostroma.hh.ru/search/',
        'default_data': {
            'exp_period': 'all_time',
            'isDefaultArea': 'true'
        },
        'search_params': {
            'vacancy': {
                'data': {
                    'st': 'searchVacancy'
                },
                'place': r'<h1.*data-qa=\"bloko-header-1\".*>([0-9\s]+).*</h1>'
            },
            'resume': {
                'data': {
                    'st': 'resumeSearch',
                    'logic': 'normal',
                    'pos': 'position'
                },
                'place': r'<h1.*data-qa=\"bloko-header-1\">[^0-9]+([0-9\s]+).*</h1>'
            }
        }
    }

    def get_link(area):
        data = {
            **config['search_params'][search_param]['data'],
            **config['default_data'],
            'text': request
        }
        if area:
            data['area'] = area
        return config['link'] + str(search_param) + '?' + urllib.parse.urlencode(data)

    return get_link, config


if __name__ == '__main__':

    countVacancies = Data('vacancy', 'инженер', 'Калининград').get(parse_hh)
    print(countVacancies)
