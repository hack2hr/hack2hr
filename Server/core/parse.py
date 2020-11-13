class Data:

    def __init__(self, search_param, request='', area='Калининград'):
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

        html = self.get_html(get_link(self.global_config['areas'][self.area]))
        if html != -1:
            result = re.search(param['place'], str(BeautifulSoup(html, "lxml")))
            if result:
                return result.group(1)
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
                'place': r'<h1.*data-qa=\"bloko-header-1\".*>([0-9]+).*</h1>'
            },
            'resume': {
                'data': {
                    'st': 'resumeSearch',
                    'logic': 'normal',
                    'pos': 'position'
                },
                'place': r'<h1.*data-qa=\"bloko-header-1\">[^0-9]+([0-9]+).*</h1>'
            }
        }
    }

    def get_link(area):
        data = urllib.parse.urlencode({
            **config['search_params'][search_param]['data'],
            **config['default_data'],
            'area': area,
            'text': request
        })
        return config['link'] + str(search_param) + '?' + data

    return get_link, config


if __name__ == '__main__':
    import urllib.request
    import urllib.response
    import urllib.parse

    from bs4 import BeautifulSoup
    import re

    countVacancies = Data('resume', 'инженер').get(parse_hh)
    print(countVacancies)
