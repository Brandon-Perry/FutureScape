from flask import Blueprint, jsonify, request

from ..models import Category

category_routes = Blueprint('categories', __name__)

@category_routes.route('/')
def get_all_categories():
    categories = Category.query.all()
    print(categories)
    return {'categories':[category.to_dict() for category in categories]}