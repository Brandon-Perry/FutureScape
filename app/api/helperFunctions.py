###HELPER FUNCTIONS
def unpack_predictions(data):
    
    for el in data:
        new_list = []
        for prediction in el['predictions']:
            new_list.append(prediction.to_dict_min())
        el['predictions'] = new_list
    
    return data


def unpack_category(data):
    for el in data:
        el['category'] = el['category'].to_dict()
    return data

def unpack_users_from_comments(data):
    for el in data:
        el['user'] = el['user'].to_dict()
    return data

def unpack_users_from_predictions(data):
    for el in data:
        el['users'] = el['users'].to_dict()
    return data

def unpack_choice_from_predictions(data):
    for el in data:
        el['choices'] = el['choices'].to_dict_min()
    return data